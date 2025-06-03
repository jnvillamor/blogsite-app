'use client';

import { User } from '@/types';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CommentSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCommentAction } from '@/lib/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type CommentInputs = z.infer<typeof CommentSchema>;

const CommentForm = ({ current_user, blog_id }: { current_user: User; blog_id: number }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CommentInputs>({
    resolver: zodResolver(CommentSchema)
  });

  const createComment = async (data: CommentInputs) => {
    const response = await createCommentAction(data, blog_id);

    if (response.error) {
      console.log('Error creating comment:', response.message);
      toast.error(response.message || 'Failed to create comment');
    }

    if (!response.error) {
      toast.success('Comment created successfully!');
      reset(); // Reset the form fields
      router.refresh(); // Refresh the page to show the new comment
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>Add a Comment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(createComment)} className='space-y-4'>
          <input type='hidden' {...register('author_id', { valueAsNumber: true })} value={current_user.id} />
          <input type='hidden' {...register('blog_id', { valueAsNumber: true })} value={blog_id} />

          <div>
            <Textarea placeholder='Write your comment here...' {...register('content')} rows={3} />
            {errors.content && <p className='text-red-500 text-xs mt-1'>{errors.content.message}</p>}
          </div>
          <Button disabled={isSubmitting}>{isSubmitting ? 'Posting' : 'Post Comment'}</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommentForm;
