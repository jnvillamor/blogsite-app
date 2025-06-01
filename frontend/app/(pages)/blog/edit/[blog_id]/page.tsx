import { getCurrentSession } from '@/app/api/auth';
import { getBlogPostById } from '@/app/api/blog';
import CreateBlogForm from '@/components/CreateBlogForm';
import Link from 'next/link';
import React from 'react'

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