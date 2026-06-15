-- Supabase Database Schema Setup
-- Run these SQL commands in your Supabase SQL Editor
-- Path: https://app.supabase.com/project/[YOUR_PROJECT]/sql/new

-- ============================================
-- 1. CREATE USER PROFILES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID NOT NULL,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  bio TEXT,
  avatar_url TEXT,
  status TEXT NOT NULL DEFAULT 'active'::text,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id),
  CONSTRAINT fk_user_profiles_auth_users FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- ============================================
-- 2. ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 3. CREATE POLICIES (RLS)
-- ============================================

-- Policy: Users can SELECT their own profile
CREATE POLICY "Users can view own profile"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can UPDATE their own profile
CREATE POLICY "Users can update own profile"
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Policy: Users can INSERT their own profile
CREATE POLICY "Users can insert own profile"
  ON public.user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policy: Users can DELETE their own profile
CREATE POLICY "Users can delete own profile"
  ON public.user_profiles
  FOR DELETE
  USING (auth.uid() = id);

-- ============================================
-- 4. CREATE INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS user_profiles_email_idx ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS user_profiles_status_idx ON public.user_profiles(status);
CREATE INDEX IF NOT EXISTS user_profiles_created_at_idx ON public.user_profiles(created_at);

-- ============================================
-- 5. CREATE FUNCTION FOR UPDATED_AT TRIGGER
-- ============================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 6. CREATE TRIGGER FOR UPDATED_AT
-- ============================================

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 7. CREATE AUDIT LOG TABLE (Optional)
-- ============================================

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_id UUID,
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  changes JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id),
  CONSTRAINT fk_audit_logs_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS on audit logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can view their own audit logs
CREATE POLICY "Users can view own audit logs"
  ON public.audit_logs
  FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- ============================================
-- 8. CREATE ADMIN VIEWS (Optional)
-- ============================================

-- View for user statistics (requires service_role key)
CREATE OR REPLACE VIEW public.user_stats AS
SELECT
  COUNT(*) as total_users,
  COUNT(CASE WHEN status = 'active' THEN 1 END) as active_users,
  COUNT(CASE WHEN status = 'inactive' THEN 1 END) as inactive_users,
  MAX(created_at) as latest_signup
FROM public.user_profiles;

-- ============================================
-- 9. SAMPLE DATA (Optional - for testing)
-- ============================================

-- Insert sample users (replace with actual auth.users data)
-- INSERT INTO public.user_profiles (id, email, full_name, status)
-- VALUES 
--   ('550e8400-e29b-41d4-a716-446655440000', 'user1@example.com', 'John Doe', 'active'),
--   ('550e8400-e29b-41d4-a716-446655440001', 'user2@example.com', 'Jane Smith', 'active');

-- ============================================
-- 10. GRANT PERMISSIONS
-- ============================================

-- Grant permissions to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_profiles TO authenticated;
GRANT SELECT ON public.user_stats TO authenticated;

-- Grant read-only access to anon users (if needed)
GRANT SELECT ON public.user_profiles TO anon;

-- ============================================
-- 11. VERIFY SETUP
-- ============================================

-- Run these to verify everything is working:
-- SELECT * FROM information_schema.tables WHERE table_schema = 'public';
-- SELECT * FROM information_schema.constraint_column_usage WHERE table_name = 'user_profiles';
-- SELECT * FROM pg_indexes WHERE tablename = 'user_profiles';

-- ============================================
-- NOTES FOR DEPLOYMENT
-- ============================================

-- Before going live:
-- 1. Review and adjust RLS policies for your use case
-- 2. Add proper email verification in auth settings
-- 3. Set up email templates in Supabase
-- 4. Enable 2FA if needed
-- 5. Set up backups
-- 6. Review security settings
-- 7. Test all policies thoroughly
-- 8. Set up monitoring and alerts
-- 9. Document your schema for team
-- 10. Plan for scaling and optimization

-- For more information:
-- - Supabase Security: https://supabase.com/docs/guides/auth/overview
-- - RLS Policies: https://supabase.com/docs/guides/auth/row-level-security
-- - PostgreSQL Documentation: https://www.postgresql.org/docs/


-- ============================================
-- 12. CONTACT MESSAGES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id          UUID NOT NULL DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  message     TEXT NOT NULL,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Only service role (server) can read/write contact messages
CREATE POLICY "Service role only"
  ON public.contact_messages
  USING (false);

-- ============================================
-- 13. ADD USERNAME COLUMN (if not present)
-- ============================================

ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;

CREATE UNIQUE INDEX IF NOT EXISTS user_profiles_username_idx
  ON public.user_profiles (username);
