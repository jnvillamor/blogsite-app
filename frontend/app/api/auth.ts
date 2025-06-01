'use server';

import { cookies } from 'next/headers';

const API_ENDPOINT = process.env.API_URL;

export const getCurrentSession = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get('access_token')?.value;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_ENDPOINT}/auth/me`, {
    method: 'GET',
    headers,
    credentials: 'include'
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data;
};
