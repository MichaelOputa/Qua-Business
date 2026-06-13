/**
 * Backend Database Utility
 * For server-side operations using direct PostgreSQL connection
 * Usage: Node.js server, API routes, or backend services
 * 
 * This file demonstrates how to use the PostgreSQL connection
 * for backend operations that require elevated privileges.
 */

import { Pool } from 'pg';

// Database connection pool configuration
const getDatabasePool = () => {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  return new Pool({
    connectionString,
    // Connection pool settings
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // How long a client is allowed to remain idle
    connectionTimeoutMillis: 2000, // How long to wait to connect
  });
};

let pool: Pool | null = null;

/**
 * Get or create database pool
 */
export const getPool = (): Pool => {
  if (!pool) {
    pool = getDatabasePool();
  }
  return pool;
};

/**
 * Execute a query on the database
 */
export const query = async <T = any>(
  text: string,
  params?: any[]
): Promise<any> => {
  const pool = getPool();
  try {
    return await pool.query<T>(text, params);
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

/**
 * Close the connection pool
 */
export const closePool = async (): Promise<void> => {
  if (pool) {
    await pool.end();
    pool = null;
  }
};

/**
 * Perform a transaction
 */
export const transaction = async <T>(
  callback: (client: any) => Promise<T>
): Promise<T> => {
  const pool = getPool();
  const client = await pool.connect();

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
};

/**
 * Database operations helper
 */
export const db = {
  /**
   * Get user by ID
   */
  async getUserById(userId: string) {
    const result = await query(
      'SELECT * FROM user_profiles WHERE id = $1',
      [userId]
    );
    return result.rows[0];
  },

  /**
   * Get user by email
   */
  async getUserByEmail(email: string) {
    const result = await query(
      'SELECT * FROM user_profiles WHERE email = $1',
      [email]
    );
    return result.rows[0];
  },

  /**
   * Create user profile
   */
  async createUserProfile(userId: string, email: string, data?: any) {
    const result = await query(
      `INSERT INTO user_profiles (id, email, created_at, updated_at, data)
       VALUES ($1, $2, NOW(), NOW(), $3)
       RETURNING *`,
      [userId, email, JSON.stringify(data || {})]
    );
    return result.rows[0];
  },

  /**
   * Update user profile
   */
  async updateUserProfile(userId: string, updates: any) {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(', ');

    const result = await query(
      `UPDATE user_profiles SET ${setClause}, updated_at = NOW()
       WHERE id = $${fields.length + 1}
       RETURNING *`,
      [...values, userId]
    );
    return result.rows[0];
  },

  /**
   * Get all users with pagination
   */
  async getAllUsers(limit = 10, offset = 0) {
    const result = await query(
      'SELECT * FROM user_profiles ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  },

  /**
   * Get user count
   */
  async getUserCount() {
    const result = await query('SELECT COUNT(*) FROM user_profiles');
    return parseInt(result.rows[0].count, 10);
  },

  /**
   * Delete user profile
   */
  async deleteUserProfile(userId: string) {
    const result = await query(
      'DELETE FROM user_profiles WHERE id = $1 RETURNING id',
      [userId]
    );
    return result.rows[0];
  },

  /**
   * Execute raw query (be careful!)
   */
  async raw(sql: string, params?: any[]) {
    return await query(sql, params);
  },
};

export default {
  query,
  getPool,
  closePool,
  transaction,
  db,
};
