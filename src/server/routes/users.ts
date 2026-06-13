/**
 * Express API Route Examples
 * This file demonstrates how to set up API endpoints using the database
 * 
 * To use this in your project:
 * 1. Install express: npm install express cors
 * 2. Create server.js in project root
 * 3. Import these routes and register them
 * 
 * Example server.js:
 * ```
 * import express from 'express';
 * import cors from 'cors';
 * import userRoutes from './src/server/routes/users.js';
 * 
 * const app = express();
 * app.use(cors());
 * app.use(express.json());
 * app.use('/api/users', userRoutes);
 * 
 * app.listen(3001, () => console.log('Server running on :3001'));
 * ```
 */

import express from 'express';
import { db } from '../db.ts';

const router = express.Router();

/**
 * GET /api/users/:id
 * Get user profile by ID
 */
router.get('/:id', async (req: any, res: any) => {
  try {
    const user = await db.getUserById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

/**
 * GET /api/users
 * Get all users (with pagination)
 */
router.get('/', async (req: any, res: any) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    
    const users = await db.getAllUsers(limit, offset);
    const count = await db.getUserCount();
    
    res.json({
      users,
      total: count,
      limit,
      offset,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

/**
 * POST /api/users
 * Create new user profile
 */
router.post('/', async (req: any, res: any) => {
  try {
    const { userId, email, data } = req.body;
    
    if (!userId || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const user = await db.createUserProfile(userId, email, data);
    res.status(201).json(user);
  } catch (error: any) {
    if (error.code === '23505') { // Unique violation
      return res.status(409).json({ error: 'User already exists' });
    }
    res.status(500).json({ error: 'Failed to create user' });
  }
});

/**
 * PATCH /api/users/:id
 * Update user profile
 */
router.patch('/:id', async (req: any, res: any) => {
  try {
    const user = await db.updateUserProfile(req.params.id, req.body);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

/**
 * DELETE /api/users/:id
 * Delete user profile
 */
router.delete('/:id', async (req: any, res: any) => {
  try {
    const result = await db.deleteUserProfile(req.params.id);
    
    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

export default router;
