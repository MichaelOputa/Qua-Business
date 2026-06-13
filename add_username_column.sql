-- Add username column to user_profiles table
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;

-- Create index on username for faster lookups
CREATE INDEX IF NOT EXISTS user_profiles_username_idx ON public.user_profiles(username);

-- Optional: Create a function to validate username format
CREATE OR REPLACE FUNCTION validate_username()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.username IS NOT NULL THEN
    IF length(NEW.username) < 3 THEN
      RAISE EXCEPTION 'Username must be at least 3 characters';
    END IF;
    IF NEW.username !~ '^[a-zA-Z0-9_-]+$' THEN
      RAISE EXCEPTION 'Username can only contain letters, numbers, underscores, and hyphens';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for username validation
DROP TRIGGER IF EXISTS check_username_format ON public.user_profiles;
CREATE TRIGGER check_username_format
  BEFORE INSERT OR UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION validate_username();

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_profiles TO authenticated;
