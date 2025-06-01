import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import Link from 'next/link';
import { BlogPost } from '@/types';

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <Card key={post.id} className='hover:shadow-lg transition-shadow'>
      <CardHeader>
        <CardTitle className='line-clamp-2'>
          <Link href={`/blog/${post.id}`} className='hover:underline'>
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className='line-clamp-3'>{post.content}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex justify-between items-center text-sm text-muted-foreground'>
          <span>By {post.author.full_name }</span>
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
