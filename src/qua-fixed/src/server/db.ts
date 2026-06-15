import { Pool, PoolClient } from 'pg';

let pool: Pool | null = null;

function getDatabasePool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      'DATABASE_URL is not set. Add it to your .env file or Railway/Vercel environment.'
    );
  }
  return new Pool({
    connectionString,
    max: 20,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 2_000,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });
}

export function getPool(): Pool {
  if (!pool) pool = getDatabasePool();
  return pool;
}

export async function query<T = any>(text: string, params?: any[]): Promise<any> {
  try {
    return await getPool().query<T>(text, params);
  } catch (error) {
    console.error('DB query error:', { text, params, error });
    throw error;
  }
}

export async function closePool(): Promise<void> {
  if (pool) { await pool.end(); pool = null; }
}

export async function transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export const db = {
  async getUserById(userId: string) {
    const r = await query('SELECT * FROM user_profiles WHERE id = $1', [userId]);
    return r.rows[0] ?? null;
  },
  async getUserByEmail(email: string) {
    const r = await query('SELECT * FROM user_profiles WHERE email = $1', [email]);
    return r.rows[0] ?? null;
  },
  async createUserProfile(userId: string, email: string, data?: object) {
    const r = await query(
      `INSERT INTO user_profiles (id, email, created_at, updated_at, data)
       VALUES ($1, $2, NOW(), NOW(), $3)
       ON CONFLICT (id) DO NOTHING RETURNING *`,
      [userId, email, JSON.stringify(data ?? {})]
    );
    return r.rows[0] ?? null;
  },
  async updateUserProfile(userId: string, updates: Record<string, unknown>) {
    const fields = Object.keys(updates);
    if (!fields.length) throw new Error('No fields to update');
    const values = Object.values(updates);
    const setClause = fields.map((f, i) => `"${f}" = $${i + 1}`).join(', ');
    const r = await query(
      `UPDATE user_profiles SET ${setClause}, updated_at = NOW()
       WHERE id = $${fields.length + 1} RETURNING *`,
      [...values, userId]
    );
    return r.rows[0] ?? null;
  },
  async getAllUsers(limit = 10, offset = 0) {
    const r = await query(
      'SELECT * FROM user_profiles ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [Math.min(limit, 100), offset]
    );
    return r.rows;
  },
  async getUserCount(): Promise<number> {
    const r = await query('SELECT COUNT(*) FROM user_profiles');
    return parseInt(r.rows[0].count, 10);
  },
  async deleteUserProfile(userId: string) {
    const r = await query('DELETE FROM user_profiles WHERE id = $1 RETURNING id', [userId]);
    return r.rows[0] ?? null;
  },
};

export default { query, getPool, closePool, transaction, db };
