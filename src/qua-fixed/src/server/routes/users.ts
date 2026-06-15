import express from 'express';
import { createClient } from '@supabase/supabase-js';
import { db } from '../db.js';

const router = express.Router();

const supabaseAdmin = createClient(
  process.env.VITE_SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
);

async function requireAuth(req: any, res: any, next: any) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }
  const { data, error } = await supabaseAdmin.auth.getUser(header.slice(7));
  if (error || !data.user) return res.status(401).json({ error: 'Invalid or expired token' });
  req.authUser = data.user;
  next();
}

// GET /api/users/:id  — own profile only
router.get('/:id', requireAuth, async (req: any, res: any) => {
  if (req.authUser.id !== req.params.id) return res.status(403).json({ error: 'Forbidden' });
  try {
    const user = await db.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch { res.status(500).json({ error: 'Failed to fetch user' }); }
});

// GET /api/users  — paginated list (add admin check as needed)
router.get('/', requireAuth, async (req: any, res: any) => {
  const limit = Math.min(parseInt(req.query.limit) || 10, 100);
  const offset = Math.max(parseInt(req.query.offset) || 0, 0);
  if (Number.isNaN(limit) || Number.isNaN(offset))
    return res.status(400).json({ error: 'limit and offset must be integers' });
  try {
    const [users, total] = await Promise.all([db.getAllUsers(limit, offset), db.getUserCount()]);
    res.json({ users, total, limit, offset });
  } catch { res.status(500).json({ error: 'Failed to fetch users' }); }
});

// POST /api/users  — create profile (called after signup)
router.post('/', requireAuth, async (req: any, res: any) => {
  const { userId, email, data } = req.body ?? {};
  if (!userId || !email) return res.status(400).json({ error: 'userId and email are required' });
  try {
    const user = await db.createUserProfile(userId, email, data);
    res.status(201).json(user);
  } catch (err: any) {
    if (err?.code === '23505') return res.status(409).json({ error: 'User already exists' });
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// PATCH /api/users/:id  — update own profile
router.patch('/:id', requireAuth, async (req: any, res: any) => {
  if (req.authUser.id !== req.params.id) return res.status(403).json({ error: 'Forbidden' });
  const { id: _id, email: _e, created_at: _ca, ...safeUpdates } = req.body ?? {};
  if (!Object.keys(safeUpdates).length)
    return res.status(400).json({ error: 'No valid fields to update' });
  try {
    const user = await db.updateUserProfile(req.params.id, safeUpdates);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err: any) {
    if (err?.code === '23505') return res.status(409).json({ error: 'Username already taken' });
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE /api/users/:id  — delete own profile
router.delete('/:id', requireAuth, async (req: any, res: any) => {
  if (req.authUser.id !== req.params.id) return res.status(403).json({ error: 'Forbidden' });
  try {
    const result = await db.deleteUserProfile(req.params.id);
    if (!result) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch { res.status(500).json({ error: 'Failed to delete user' }); }
});

export default router;
