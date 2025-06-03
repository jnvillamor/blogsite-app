import { Comment } from '@/types';
import React from 'react';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';

type CommentCardProps = {
  comment: Comment;
};

const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <Card>
      <CardContent>
        <div className='flex justify-between items-start mb-3'>
          <div className='flex items-center gap-2'>
            <Link href={`/user/${comment.author.id}`} className='font-semibold hover:underline'>
              {comment.author.first_name} {comment.author.last_name}
            </Link>
            <span className='text-sm text-muted-foreground'>{new Date(comment.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        <p className='mb-3'>{comment.content}</p>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
