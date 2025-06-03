import CommentsSection from '@/components/CommentsSection';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getBlogPostById } from '@/lib/api/blog';
import { BlogPost } from '@/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export async function generateMetadata({ params }: { params: Promise<{ blog_id: number }> }) {
  const blog_id = (await params).blog_id;
  const blog: BlogPost | null = await getBlogPostById(blog_id);

  if (!blog) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for does not exist.'
    };
  }

  return {
    title: blog.title,
    description: 'Read the full blog post.'
  };
}

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

        {/* Title and Author */}
        <h1 className='text-4xl font-bold mb-4'>{blog.title}</h1>
        <div className='not-prose mb-8'>
          <div className='flex items-center gap-4 text-muted-foreground mb-6'>
            <Link href={`/user/${blog.author.id}`} className='hover:underline'>
              By {blog.author.first_name} {blog.author.last_name}
            </Link>
            <span>•</span>
            <span>{new Date(blog.created_at).toLocaleDateString()}</span>
          </div>
          <Separator className='mb-8' />
        </div>

        {/* Blog Content */}
        <div className='whitespace-pre-line leading-relaxed'>{blog.content}</div>
      </article>

      <Separator className='my-8' />

      {/* Comments Section */}
      <CommentsSection comments={blog.comments} comment_count={blog. comment_count} blog_id={blog_id}/>
    </div>
  );
};

export default BlogPage;
