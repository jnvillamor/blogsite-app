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
  try {
    const res = await fetch(`${API_ENDPOINT}/auth/me`, {
      method: 'GET',
      headers,
      credentials: 'include'
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log('Error fetching session:', errorData);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log('Error fetching session:', error);
    return null;
  }
};

export const getUserById = async (userId: number) => {
  try {
    const res = await fetch(`${API_ENDPOINT}/auth/users/${userId}`)

    if (!res.ok) {
      const errorData = await res.json();
      console.log('Error fetching user:', errorData);
      return null;
    }

    const data = await res.json();
    return data;
  }
  catch (error) {
    console.log('Error fetching user:', error);
    return null;
  }
}
