'use server';

import { cookies } from "next/headers";

export const deleteComment = async (comment_id: number) => {
  try {
    const token = (await cookies()).get('access_token')?.value || '';

    const response = await fetch(`${process.env.API_URL}/comments/${comment_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to delete comment');
    }

    return {
      success: true,
      message: 'Comment deleted successfully',
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}