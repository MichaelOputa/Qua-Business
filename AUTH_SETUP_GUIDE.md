# Authentication Setup Guide

## Overview
This application now includes complete authentication functionality with:
- **Sign Up**: Create new accounts with email and password
- **Login**: Traditional email/password login
- **Verification Code Login**: Passwordless login using OTP verification codes
- **Logout**: Secure logout functionality
- **Session Management**: Automatic session persistence

## Supabase Setup

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" and sign in
3. Create a new project with your preferred region
4. Wait for the project to be provisioned

### 2. Get Your API Keys
1. In your Supabase dashboard, go to **Project Settings** → **API**
2. Copy the following:
   - **Project URL**: Your `VITE_SUPABASE_URL`
   - **Anon Public Key**: Your `VITE_SUPABASE_ANON_KEY`

### 3. Configure Environment Variables
1. Copy `.env.local.example` to `.env.local`
2. Add your Supabase credentials:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Enable Email Authentication
1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Enable **Email** provider (should be enabled by default)
3. For verification codes (OTP), go to **Email Templates** and ensure they're configured

### 5. Configure Email Settings (Optional)
1. Go to **Authentication** → **Email Templates**
2. Customize the verification code email template if desired
3. Default template is usually sufficient

## Features

### Sign Up
- Email and password registration
- Password confirmation validation
- Minimum 6-character password requirement
- Automatic user creation in Supabase

### Login
- Traditional email/password authentication
- Secure session management
- Easy switch to other auth methods

### Verification Code (Passwordless Login)
- One-time password sent to email
- Secure OTP-based authentication
- Great for users who forget passwords
- Alternative authentication method

### User Session
- Automatically maintains login state
- User email displayed in navbar when logged in
- Persistent sessions across page refreshes

### Logout
- One-click logout from navbar
- Secure session termination
- Clears authentication state

## Component Structure

### AuthContext (`src/context/AuthContext.tsx`)
- Manages global authentication state
- Provides hooks: `useAuth()`
- Handles all Supabase auth operations

### Components
- **Navbar.tsx**: Updated with auth buttons and user display
- **Login.tsx**: Email/password login modal
- **SignUp.tsx**: User registration modal
- **VerificationCode.tsx**: OTP verification modal

### API Integration (`src/lib/supabase.ts`)
- Supabase client initialization
- Environment variable configuration

## Usage

### For Users
1. Click "Sign Up" in navbar to create an account
2. Enter email and password
3. Verify your email (if required by your Supabase setup)
4. Login with your credentials
5. Alternatively, use "Verification Code" for passwordless login

### For Developers
Import and use the auth context in components:

```tsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, signOut, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (user) {
    return <button onClick={signOut}>Logout {user.email}</button>;
  }
  
  return <div>Please login</div>;
}
```

## Testing Checklist
- [ ] Environment variables configured in `.env.local`
- [ ] Supabase project created and credentials added
- [ ] Email provider enabled in Supabase
- [ ] Sign up creates new user
- [ ] Login works with created account
- [ ] Verification code sends to email
- [ ] Logout clears session
- [ ] Navbar shows email when logged in
- [ ] Session persists on page refresh

## Troubleshooting

### "Supabase environment variables are not set"
- Check that `.env.local` exists in project root
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Restart dev server after adding env vars

### Sign up not working
- Check email format
- Ensure password is at least 6 characters
- Verify email provider is enabled in Supabase

### Verification code not received
- Check email spam folder
- Verify email provider is configured in Supabase
- Check Supabase dashboard for error logs

### Login not working
- Verify user exists (try signing up first)
- Check that credentials are correct
- Ensure Supabase project is active and accessible

## Security Notes
- Never commit `.env.local` to version control (add to `.gitignore`)
- Anon key is safe for frontend use (row-level security managed in Supabase)
- Passwords are securely hashed by Supabase
- All auth data is encrypted in transit

## Next Steps
- Customize auth modals to match your branding
- Add password reset functionality
- Implement social authentication (Google, GitHub)
- Add email confirmation requirements
- Implement user profiles and settings
