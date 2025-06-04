'use client';

import { Comment, User } from '@/types';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CommentSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCommentAction, updateCommentAction } from '@/lib/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type CommentInputs = z.infer<typeof CommentSchema>;
type CommentFormProps = {
  current_user: User;
  blog_id: number;
  comment_id?: number;
  comment?: Comment;
  isEditing?: boolean;
  setIsEditing?: (isEditing: boolean) => void;
};

const CommentForm = ({ current_user, blog_id, comment_id, comment, isEditing, setIsEditing }: CommentFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<CommentInputs>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      author_id: current_user.id,
      blog_id: blog_id,
      content: comment ? comment.content : '' // Pre-fill content if editing
    }
  });

  const handleSubmitForm = async (data: CommentInputs) => {
    if (isEditing && comment_id) {
      const response = await updateCommentAction(data, comment_id);
      if (response.error) {
        console.log('Error updating comment:', response.message);
        toast.error(response.message || 'Failed to update comment');
        return;
      }
      toast.success('Comment updated successfully!');
      setValue('content', '');
      setIsEditing?.(false); // Exit editing mode
      router.refresh();
    } else {
      const response = await createCommentAction(data, blog_id);

      if (response.error) {
        console.log('Error creating comment:', response.message);
        toast.error(response.message || 'Failed to create comment');
      }

      if (!response.error) {
        toast.success('Comment created successfully!');
        setValue('content', ''); // Clear the content field after submission
        router.refresh(); // Refresh the page to show the new comment
      }
    }
  };

  return (
    <Card>
      {!isEditing && !comment && (
        <CardHeader>
          <CardTitle className='text-lg'>Add a Comment</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <form onSubmit={handleSubmit(handleSubmitForm)} className='space-y-4'>
          <input type='hidden' {...register('author_id', { valueAsNumber: true })} value={current_user.id} />
          <input type='hidden' {...register('blog_id', { valueAsNumber: true })} value={blog_id} />

          <div>
            <Textarea placeholder='Write your comment here...' {...register('content')} rows={3} />
            {errors.content && <p className='text-red-500 text-xs mt-1'>{errors.content.message}</p>}
          </div>
          <Button disabled={isSubmitting}>{isSubmitting ? 'Posting' : `${isEditing ? 'Edit' : 'Post'} Comment`}</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommentForm;
