import { getCurrentSession } from '@/lib/api/auth';
import { Comment, User } from '@/types';
import { MessageCircle } from 'lucide-react';
import React from 'react';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

type Props = {
  comments: Comment[];
  comment_count: number;
  blog_id: number;
};

const CommentsSection = async ({ comments, comment_count, blog_id }: Props) => {
  const current_user: User | null = await getCurrentSession();

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-2'>
        <MessageCircle className='h-6 w-6' />
        <h2 className='text-2xl font-semibold'>Comments ({comment_count})</h2>
      </div>
      {/* Add Comment Card */}
      {current_user && <CommentForm current_user={current_user}  blog_id={blog_id}/>}

      {/* Comments */}
      <div className='space-y-4'>
        {comment_count > 0 ? (
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        ): (
          <p className='text-muted-foreground'>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
