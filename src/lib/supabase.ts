import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set');
}

/**
 * Supabase client for frontend operations
 * - Authentication
 * - User-level data operations
 * - RealTime subscriptions
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Type-safe query builder for common database operations
 */
export const db = {
  /**
   * Get user profile data
   */
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Update user profile
   */
  async updateUserProfile(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Create user profile
   */
  async createUserProfile(profile: any) {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([profile])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Get all users (admin only - should use RLS)
   */
  async getAllUsers() {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*');
    
    if (error) throw error;
    return data;
  },

  /**
   * Delete user profile
   */
  async deleteUserProfile(userId: string) {
    const { error } = await supabase
      .from('user_profiles')
      .delete()
      .eq('id', userId);
    
    if (error) throw error;
  },
};
