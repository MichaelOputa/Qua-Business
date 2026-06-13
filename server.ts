/**
 * Backend Server Starter File
 * 
 * This file sets up an Express server with API routes for database operations.
 * 
 * Setup Instructions:
 * 1. Install dependencies:
 *    npm install express cors pg dotenv
 *    npm install --save-dev @types/express @types/node @types/pg ts-node typescript
 * 
 * 2. Update package.json scripts:
 *    "server": "ts-node server.ts"
 *    "dev": "vite & npm run server"
 * 
 * 3. Run:
 *    npm run server
 *    Server will run on http://localhost:3001
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './src/server/routes/users.ts';
import { closePool } from './src/server/db.ts';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Database: ${process.env.DATABASE_URL?.split('@')[1]}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n⏹️  Shutting down gracefully...');
  server.close(async () => {
    await closePool();
    console.log('✅ Server closed');
    process.exit(0);
  });
});

export default app;
