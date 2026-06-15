import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRoutes from './src/server/routes/users.js';
import contactRoutes from './src/server/routes/contact.js';
import { closePool } from './src/server/db.js';

const app = express();
const PORT = parseInt(process.env.PORT ?? '3001', 10);

app.use(cors({
  origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '8mb' }));   // 8 MB for base64 avatar uploads

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok', ts: Date.now() }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);

// 404
app.use((_req, res) => res.status(404).json({ error: 'Route not found' }));

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const server = app.listen(PORT, () => {
  console.log(`✅  API server → http://localhost:${PORT}`);
  if (process.env.DATABASE_URL) {
    console.log(`🗄️   DB host    → ${process.env.DATABASE_URL.split('@')[1]?.split('/')[0]}`);
  }
});

const shutdown = async (signal: string) => {
  console.log(`\n${signal} — shutting down…`);
  server.close(async () => {
    await closePool();
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT',  () => shutdown('SIGINT'));

export default app;
