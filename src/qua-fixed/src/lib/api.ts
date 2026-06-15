/**
 * Centralised API client — all frontend fetch() calls live here.
 * Falls back to the Supabase client directly for auth/profile ops,
 * and hits the Express backend for contact form + admin tasks.
 */

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error ?? `Request failed: ${res.status}`);
  }

  // 204 No Content
  if (res.status === 204) return undefined as unknown as T;
  return res.json() as Promise<T>;
}

// ─── Contact ─────────────────────────────────────────────────────────────────
export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export const contactApi = {
  send: (payload: ContactPayload) =>
    request<{ message: string }>('/api/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};

// ─── Users (authenticated) ────────────────────────────────────────────────────
export const usersApi = {
  getProfile: (userId: string, token: string) =>
    request<any>(`/api/users/${userId}`, {}, token),

  updateProfile: (userId: string, updates: Record<string, unknown>, token: string) =>
    request<any>(`/api/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }, token),

  deleteProfile: (userId: string, token: string) =>
    request<{ message: string }>(`/api/users/${userId}`, {
      method: 'DELETE',
    }, token),
};
