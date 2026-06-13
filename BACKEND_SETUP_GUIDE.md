# Backend Database Integration Guide

## Overview

Your project now has a complete backend infrastructure for database operations using PostgreSQL (Supabase). This guide covers:

1. **Environment Variables** - PostgreSQL connection string
2. **Database Utilities** - Connection pooling and helpers
3. **API Routes** - Express server with user endpoints
4. **Frontend Integration** - Using database from React components

---

## 1. Environment Variables Setup

### Update `.env.local`

```bash
# Copy the template
cp .env.local.example .env.local
```

Add your PostgreSQL credentials:

```env
# Supabase Frontend
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# PostgreSQL Backend
DATABASE_URL=postgresql://postgres:YOUR-PASSWORD@db.iajhzbrbrsoktlkxnfwr.supabase.co:5432/postgres
SERVER_PORT=3001
NODE_ENV=development
```

### Connection String Format

```
postgresql://username:password@host:port/database
```

- **Username**: `postgres`
- **Password**: Your Supabase password
- **Host**: `db.iajhzbrbrsoktlkxnfwr.supabase.co`
- **Port**: `5432`
- **Database**: `postgres`

---

## 2. Database Utilities

### Frontend Database Operations (`src/lib/supabase.ts`)

Use in React components with automatic RLS (Row Level Security):

```tsx
import { db, supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

function UserProfile() {
  const { user } = useAuth();
  
  // Fetch profile
  const profile = await db.getUserProfile(user.id);
  
  // Update profile
  await db.updateUserProfile(user.id, { 
    full_name: 'John Doe' 
  });
  
  // Create profile
  await db.createUserProfile({
    id: user.id,
    email: user.email
  });
}
```

### Backend Database Operations (`src/server/db.ts`)

Use in Node.js/Express for elevated privileges:

```typescript
import { db, closePool } from './src/server/db';

// Get user
const user = await db.getUserById(userId);

// Create user
const newUser = await db.createUserProfile(userId, email, data);

// Update user
const updated = await db.updateUserProfile(userId, { status: 'active' });

// Delete user
await db.deleteUserProfile(userId);
```

**Key Differences:**
- Frontend: Uses Supabase JS client + RLS policies
- Backend: Direct database access with connection pooling
- Backend has elevated privileges for admin operations

---

## 3. Backend Server Setup

### Install Dependencies

```bash
npm install express cors pg dotenv
npm install --save-dev @types/express @types/node @types/pg ts-node typescript
```

### Configure `package.json`

Add scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "server": "ts-node server.ts",
    "dev:full": "concurrently \"npm run dev\" \"npm run server\"",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

(Optional) Install concurrently to run frontend and backend together:
```bash
npm install --save-dev concurrently
```

### Start the Server

**Option 1: Run only backend**
```bash
npm run server
```
Runs on `http://localhost:3001`

**Option 2: Run frontend and backend together**
```bash
npm run dev:full
```

---

## 4. API Routes

### Available Endpoints

All endpoints: `http://localhost:3001/api/users`

#### Get User
```bash
GET /api/users/:id
```
Response:
```json
{
  "id": "user-123",
  "email": "user@example.com",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

#### Get All Users (with pagination)
```bash
GET /api/users?limit=10&offset=0
```
Response:
```json
{
  "users": [...],
  "total": 100,
  "limit": 10,
  "offset": 0
}
```

#### Create User
```bash
POST /api/users
Content-Type: application/json

{
  "userId": "user-123",
  "email": "user@example.com",
  "data": { "full_name": "John Doe" }
}
```

#### Update User
```bash
PATCH /api/users/:id
Content-Type: application/json

{
  "email": "newemail@example.com",
  "status": "active"
}
```

#### Delete User
```bash
DELETE /api/users/:id
```

---

## 5. Frontend Integration

### Update Components to Use Database

Example: User Profile Component

```tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/supabase';

export function UserProfile() {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');

  // userProfile is automatically loaded from database
  useEffect(() => {
    if (userProfile?.full_name) {
      setFullName(userProfile.full_name);
    }
  }, [userProfile]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await db.updateUserProfile(user.id, { 
        full_name: fullName 
      });
      alert('Profile updated!');
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <input 
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <button onClick={handleUpdate} disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
}
```

---

## 6. Database Schema

### Automatic Setup (Supabase)

You should have a `user_profiles` table. If not, create it:

```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  bio TEXT,
  avatar_url TEXT,
  status TEXT DEFAULT 'active',
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only access their own profile
CREATE POLICY "Users can access own profile"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Create policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Create policy: Authenticated users can insert their profile
CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);
```

---

## 7. Advanced Features

### Transactions

```typescript
import { transaction } from './src/server/db';

await transaction(async (client) => {
  // All queries are automatically rolled back if any fails
  await client.query('UPDATE users SET status = $1', ['active']);
  await client.query('INSERT INTO logs VALUES ($1)', ['User updated']);
});
```

### Connection Pooling

Configured automatically in `src/server/db.ts`:
- **Max connections**: 20
- **Idle timeout**: 30 seconds
- **Connection timeout**: 2 seconds

### Raw Queries

```typescript
import { db } from './src/server/db';

const result = await db.raw(
  'SELECT * FROM user_profiles WHERE status = $1',
  ['active']
);
```

---

## 8. Deployment

### Frontend (Vite)
Deploy to Vercel, Netlify, or GitHub Pages:
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Node.js)
Deploy to Heroku, Railway, Render, or AWS:

```bash
# Set DATABASE_URL in production environment
# DATABASE_URL=postgresql://...

npm run build
node dist/server.js
```

---

## 9. Troubleshooting

### Connection Refused
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
- Verify DATABASE_URL is correct
- Check PostgreSQL is running
- Restart development server

### "too many connections"
- Increase pool size in `src/server/db.ts`
- Check for connection leaks
- Restart server

### Module Not Found Errors
- Run `npm install` again
- Clear `node_modules` and reinstall
- Check TypeScript compilation

### CORS Errors
- Frontend calling backend? Use `http://localhost:3001`
- CORS middleware already configured in `server.ts`

---

## 10. Security Best Practices

✅ **Always do:**
- Use `DATABASE_URL` for backend only
- Implement RLS policies in database
- Validate input on backend
- Use connection pooling
- Never commit `.env.local`

❌ **Never:**
- Use database URL in frontend code
- Skip input validation
- Create database passwords in code
- Share `.env.local` file

---

## Quick Reference

| Task | Command |
|------|---------|
| Start frontend | `npm run dev` |
| Start backend | `npm run server` |
| Run both | `npm run dev:full` |
| Check server health | `curl http://localhost:3001/health` |
| Get users | `curl http://localhost:3001/api/users` |
| View logs | Check terminal output |

---

## Next Steps

1. ✅ Configure environment variables
2. ✅ Create `user_profiles` table in Supabase
3. ✅ Test frontend authentication
4. ✅ Start backend server
5. ✅ Test API endpoints
6. ✅ Implement RLS policies
7. ✅ Deploy frontend
8. ✅ Deploy backend

For more info:
- [Supabase Docs](https://supabase.com/docs)
- [Express Docs](https://expressjs.com/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
