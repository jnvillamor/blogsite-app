import { getCurrentSession } from '@/app/api/auth';
import CreateBlogForm from '@/components/CreateBlogForm';
import Link from 'next/link';
import React from 'react';

const CreateBlog = async () => {
  const user = await getCurrentSession();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">You must be logged in to create a blog post.</p>
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </div>
    );
  }

  return (
    <CreateBlogForm current_user_id={user.id} />
  )
};

export default CreateBlog;
