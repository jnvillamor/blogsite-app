'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { PenIcon, Trash2Icon } from 'lucide-react';
import { deleteBlogPost } from '@/app/api/blog';
import { toast } from 'sonner';

const OwnerButton = ({ blog_id }: { blog_id: number }) => {
  const [deleting, setDeleting] = React.useState<boolean>(false);

  const handleDelete = async () => {
    setDeleting(true);
    if (!confirm('Are you sure you want to delete this blog post?')) {
      setDeleting(false);
      return;
    }

    const response = await deleteBlogPost(Number(blog_id));

    if (!response.success) {
      toast.error('Failed to delete blog post');
    } else {
      toast.success('Blog post deleted successfully');
      window.location.reload();
    }
    setDeleting(false);
  };

  return (
    <div className='flex items-center space-x-4'>
      <Link href={`/blog/edit/${blog_id}`} className='text-sm text-blue-500 hover:underline ml-2'>
        <Button variant={'outline'} size={'sm'} className='inline-flex items-center gap-1'>
          <PenIcon className='h-4 w-4' />
        </Button>
      </Link>
      <Button
        disabled={deleting}
        onClick={() => handleDelete()}
        variant={'destructive'}
        size={'sm'}
        className='inline-flex items-center gap-1 cursor-pointer'>
        {deleting ? (
          <div className='animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full'></div>
        ) : (
          <Trash2Icon className='h-4 w-4' />
        )}
      </Button>
    </div>
  );
};

export default OwnerButton;
