import { getBlogPostById } from '@/app/api/blog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BlogPost } from '@/types';
import { ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const BlogPage = async ({ params }: { params: Promise<{ blog_id: number }> }) => {
  const blog_id = (await params).blog_id;
  const blog: BlogPost = await getBlogPostById(blog_id);

  if (!blog) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <h1 className='text-2xl font-bold mb-4'>Post Not Found</h1>
        <p className='text-muted-foreground mb-4'>The blog post you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild>
          <Link href='/'>Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <Button asChild variant='ghost' className='mb-6'>
        <Link href='/'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Blogs
        </Link>
      </Button>

      <article className='prose prose-gray dark:prose-invert max-w-none'>
        <div className='not-prose mb-8'>
          <div className='flex items-center gap-4 text-muted-foreground mb-6'>
            <div className='flex items-center gap-1'>
              <User className='h-4 w-4' />
              <span>{blog.author.full_name}</span>
            </div>
            <span>{new Date(blog.created_at).toLocaleDateString()}</span>
          </div>

          <Separator className='mb-8' />
        </div>

        <div className='whitespace-pre-line leading-relaxed'>{blog.content}</div>
      </article>

      <Separator className='my-8' />

      <div className='flex justify-between items-center'>
        <div>
          <h3 className='font-semibold mb-1'>About the Author</h3>
          <p className='text-muted-foreground'>
            <Link href='/profile/john-doe' className='hover:underline'>
              {blog.author.full_name}
            </Link>
          </p>
        </div>
        <Button asChild variant='outline'>
          <Link href={`/profile/${blog.author.id}`}>View Profile</Link>
        </Button>
      </div>
    </div>
  );
};

export default BlogPage;
