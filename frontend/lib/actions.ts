'use server';

import { z } from "zod";
import { CommentSchema, CreateBlogSchema, LoginSchema, SignupSchema } from "./schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_ENDPOINT = process.env.API_URL;

export const signupAction = async (data: z.infer<typeof SignupSchema>) => {
  const payload = {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    password: data.password,
  }

  const response = await fetch(`${API_ENDPOINT}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  })

  if (!response.ok) {
    const errorData = await response.json();
    return {
      'error': true,
      'message': errorData.detail
    }
  }

  const result = await response.json();  
  return result;
}

export const loginAction = async (data: z.infer<typeof LoginSchema>) => {
  const form_data = new FormData();
  form_data.append('username', data.email);
  form_data.append('password', data.password);

  const cookieStore = await cookies();

  const res = await fetch(`${API_ENDPOINT}/auth/login`, {
    method: "POST",
    body: form_data,
    credentials: "include",
  });

  console.log('Response from /auth/login:', res);

  if (!res.ok) {
    const errorData = await res.json();
    console.log('Error data:', errorData);
    return {
      'error': true,
      'message': errorData.detail
    }
  }

  const result = await res.json();
  cookieStore.set('access_token', result.access_token);
  cookieStore.set('refresh_token', result.refresh_token);
  redirect('/');
}

export const logoutAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');

  redirect('/login');
}

export const createBlogAction = async (data: z.infer<typeof CreateBlogSchema>) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  console.log(data);
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  try {
    const res = await fetch(`${API_ENDPOINT}/blogs`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const errorData = await res.json();
      return {
        'error': true,
        'message': errorData.detail || 'Failed to create blog post.'
      }
    }

    return {
      'error': false,
      'message': 'Blog post created successfully!'
    };
  }
  catch (error) {
    console.error('Error creating blog post:', error);
    return {
      'error': true,
      'message': 'Failed to create blog post. Please try again later.'
    }
  }
}

export const updateBlogAction = async (data: z.infer<typeof CreateBlogSchema>, blog_id: number) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  try { 
    const res = await fetch(`${API_ENDPOINT}/blogs/${blog_id}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        'error': true,
        'message': errorData.detail || 'Failed to update blog post.'
      }
    }

    return {
      'error': false,
      'message': 'Blog post updated successfully!'
    };
  } 
  catch (error) {
    console.error('Error updating blog post:', error);
    return {
      'error': true,
      'message': 'Failed to update blog post. Please try again later.'
    }
  }
}

export const createCommentAction = async (data: z.infer<typeof CommentSchema>, blog_id: number) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };

  try {
    const res = await fetch(`${API_ENDPOINT}/comments`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        content: data.content,
        blog_id: blog_id,
        author_id: data.author_id
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        'error': true,
        'message': errorData.detail || 'Failed to create comment.'
      }
    }

    return {
      'error': false,
      'message': 'Comment created successfully!'
    };
  } catch (error) {
    console.error('Error creating comment:', error);
    return {
      'error': true,
      'message': 'Failed to create comment. Please try again later.'
    }
  }
}

export const updateCommentAction = async (data: z.infer<typeof CommentSchema>, comment_id: number) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  try {
    const res = await fetch(`${API_ENDPOINT}/comments/${comment_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        'error': true,
        'message': errorData.detail || 'Failed to update comment.'
      }
    }

    return {
      'error': false,
      'message': 'Comment updated successfully!'
    };
  } catch (error) {
    console.error('Error updating comment:', error);
    return {
      'error': true,
      'message': 'Failed to update comment. Please try again later.'
    }
  }
}