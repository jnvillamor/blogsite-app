'use server'

import { cookies } from "next/headers";

const API_ENDPOINT = process.env.API_URL;

export const getBlogPosts = async (page: number, limit: number) => {
  const response = await fetch(`${API_ENDPOINT}/blogs?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  console.log('Fetching blog posts from:', `${API_ENDPOINT}/blog/posts?page=${page}&limit=${limit}`);

  if (!response.ok) {
    throw new Error('Failed to fetch blog posts');
  }

  const data = await response.json();
  return data;
}

export const getBlogPostById = async (blogId: number) => {
  try {
    const res = await fetch(`${API_ENDPOINT}/blogs/${blogId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch blog post');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
}

export const deleteBlogPost = async (blogId: number) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }

  try { 
    const res = await fetch(`${API_ENDPOINT}/blogs/${blogId}`, {
      method: 'DELETE',
      headers: headers,
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log('Error deleting blog post:', errorData);
      return { success: false, error: errorData.detail || 'Failed to delete blog post' };
    }

    return { success: true };
  }
  catch (error) {
    console.error('Error deleting blog post:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}