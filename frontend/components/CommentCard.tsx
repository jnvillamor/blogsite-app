'use client';

import { Comment, User } from '@/types';
import React from 'react';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { EllipsisVerticalIcon } from 'lucide-react';
import { toast } from 'sonner';
import { deleteComment } from '@/lib/api/comment';
import { useRouter } from 'next/navigation';
import CommentForm from './CommentForm';

type CommentCardProps = {
  comment: Comment;
  current_user: User | null;
};

const CommentCard = ({ comment, current_user }: CommentCardProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const response = await deleteComment(comment.id);
    if (response.success) {
      toast.success('Comment deleted successfully!', {
        duration: 2000,
        description: 'The comment has been removed.'
      });
      router.refresh();
    } else {
      toast.error(`Error deleting comment: ${response.message}`, {
        duration: 2000
      });
    }
  };

  return (
    <div>
      {current_user && isEditing ? (
        <CommentForm 
          blog_id={comment.blog_id} 
          current_user={current_user} 
          isEditing={true} 
          setIsEditing={setIsEditing}
          comment={comment} 
          comment_id={comment.id} 
        />
      ) : (
        <Card>
          <CardContent>
            <div className='flex justify-between items-start mb-3'>
              <div className='flex items-center gap-2'>
                <Link href={`/profile/${comment.author.id}`} className='font-semibold hover:underline'>
                  {comment.author.first_name} {comment.author.last_name}
                </Link>
                <span className='text-sm text-muted-foreground'>{new Date(comment.created_at).toLocaleDateString()}</span>
              </div>
              {current_user && current_user.id === comment.author.id && (
                <Popover>
                  <PopoverTrigger>
                    <EllipsisVerticalIcon className='h-5 w-5' />
                  </PopoverTrigger>
                  <PopoverContent className='w-48'>
                    <div className='space-y-2'>
                      <button
                        className='text-sm text-gray-500 hover:underline block'
                        onClick={() => {
                          navigator.clipboard.writeText(comment.content);
                          toast.success('Comment copied to clipboard!', {
                            duration: 2000,
                            description: 'You can now paste it anywhere.'
                          });
                        }}>
                        Copy
                      </button>
                      <button className='text-sm text-red-500 hover:underline block' onClick={() => handleDelete()}>
                        Delete
                      </button>
                      <button className='text-sm text-blue-500 hover:underline block' onClick={() => setIsEditing(true)}>
                        Edit
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
            <p className='mb-3'>{comment.content}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommentCard;
