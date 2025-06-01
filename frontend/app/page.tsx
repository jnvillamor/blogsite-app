import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { getBlogPosts } from './api/blog';
import { BlogPost, PaginatedResponse } from '@/types';

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const page = (await searchParams).page || '1';
  const limit = (await searchParams).limit || '10';

  const blogPosts: PaginatedResponse<BlogPost> = await getBlogPosts(Number(page), Number(limit));
  return (
    <>
      <Header />
      <div className='container mx-auto px-4 py-8'>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {blogPosts.data.map((post) => (
            <Card key={post.id} className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <CardTitle className='line-clamp-2'>
                  <Link href={`/post/${post.id}`} className='hover:underline'>
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className='line-clamp-3'>{post.content}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex justify-between items-center text-sm text-muted-foreground'>
                  <span>By {post.author.full_name}</span>
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
