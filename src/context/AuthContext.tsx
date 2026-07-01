import { useEffect, useState, useContext } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase, db } from '../lib/supabase';
import { AuthContext, type AuthContextType, type UserProfile } from './auth';

// In-memory store for OTP codes (replace with Redis/DB in production)
const otpStore = new Map<string, { code: string; expires: number }>();

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (userId: string) => {
    try {
      const profile = await db.getUserProfile(userId);
      setUserProfile(profile as UserProfile);
    } catch (error) {
      console.error('Error loading user profile:', error);
      setUserProfile(null);
    }
  };

  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        if (session?.user) {
          await loadProfile(session.user.id);
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    void getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await loadProfile(session.user.id);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    if (data.user) {
      try {
        await db.createUserProfile({
          id: data.user.id,
          email: data.user.email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      } catch (profileError: unknown) {
        const code = (profileError as { code?: string } | null)?.code;
        if (code !== '23505') {
          console.error('Error creating user profile:', profileError);
        }
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setUserProfile(null);
  };

  const sendVerificationCode = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });

    if (error) throw new Error(error.message);

    if (import.meta.env.DEV) {
      const devCode = Math.floor(100000 + Math.random() * 900000).toString();
      otpStore.set(email, { code: devCode, expires: Date.now() + 10 * 60 * 1000 });
      console.info(`[DEV] OTP for ${email}: ${devCode}`);
    }
  };

  const verifyCode = async (email: string, code: string) => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'email',
    });

    if (!error) return;

    if (import.meta.env.DEV) {
      const stored = otpStore.get(email);
      if (stored && stored.code === code && stored.expires > Date.now()) {
        otpStore.delete(email);
        return;
      }
    }

    throw new Error('Invalid or expired verification code');
  };

  const value: AuthContextType = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    sendVerificationCode,
    verifyCode,
    userProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}