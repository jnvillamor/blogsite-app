'use server';

import { z } from "zod";
import { CreateBlogSchema, LoginSchema, SignupSchema } from "./schema";
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