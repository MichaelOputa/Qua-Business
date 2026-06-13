import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, db } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  sendVerificationCode: (email: string) => Promise<void>;
  verifyCode: (email: string, code: string) => Promise<void>;
  userProfile: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        
        // Load user profile if logged in
        if (session?.user) {
          try {
            const profile = await db.getUserProfile(session.user.id);
            setUserProfile(profile);
          } catch (error) {
            console.error('Error loading user profile:', error);
          }
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        try {
          const profile = await db.getUserProfile(session.user.id);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      } else {
        setUserProfile(null);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    
    // Create user profile in database
    if (data.user) {
      try {
        await db.createUserProfile({
          id: data.user.id,
          email: data.user.email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Error creating user profile:', error);
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUserProfile(null);
  };

  const sendVerificationCode = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });
    if (error) throw error;
  };

  const verifyCode = async (email: string, code: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'email',
    });
    if (error) throw error;
    
    // Create user profile if it doesn't exist
    if (data.user) {
      try {
        const existing = await db.getUserProfile(data.user.id);
        if (!existing) {
          await db.createUserProfile({
            id: data.user.id,
            email: data.user.email,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        }
      } catch (error) {
        console.error('Error creating user profile:', error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, sendVerificationCode, verifyCode, userProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
