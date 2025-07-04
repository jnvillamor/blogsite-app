import CreateBlogForm from '@/components/CreateBlogForm';
import { getBlogPostById } from '@/lib/api/blog';
import Link from 'next/link';
import React from 'react'

export async function generateMetadata({ params }: { params: Promise<{ blog_id: number }> }) {
  const { blog_id } = await params;
  const blogPost = await getBlogPostById(blog_id);

  if (!blogPost) {
    return {
      title: 'Blog Post Not Found',
      description: 'The blog post you are trying to edit does not exist.',
    };
  }

  return {
    title: `Edit Blog Post: ${blogPost.title}`,
    description: `Edit the blog post titled "${blogPost.title}".`,
  };
}

const EditPage = async ({ params }: {params: Promise<{ blog_id: number}>}) => {
  const { blog_id } = await params;
  const blogToEdit = await getBlogPostById(blog_id);
  const user = await getCurrentSession();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">You must be logged in to create a blog post.</p>
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </div>
    );
  }

  return (
    <CreateBlogForm current_user_id={user.id} blogToEdit={blogToEdit} isEditing={true} />
  )
}

export default EditPage