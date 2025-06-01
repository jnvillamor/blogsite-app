import { BlogPost, PaginatedResponse } from '@/types';
import { getBlogPosts } from '../api/blog';
import BlogCard from '@/components/BlogCard';
import { Separator } from '@/components/ui/separator';
import PaginationButtons from '@/components/PaginationButtons';
import Filters from '@/components/Filters';
import Link from 'next/link';

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const page = (await searchParams).page || '1';
  const limit = (await searchParams).limit || '9';

  const filters = {
    title: (await searchParams).title || undefined
  };

  const blogPosts: PaginatedResponse<BlogPost> | null = await getBlogPosts(Number(page), Number(limit), filters);

  if (!blogPosts) {
    return <div className='container mx-auto px-4 py-8 text-center'>Error fetching blog posts.</div>;
  }

  return (
    <div>
      <div className='container mx-auto px-4 py-8 space-y-8'>
        <div>
          <Filters />
          {/* Fiters applied */}
          {filters.title && (
            <div className='text-sm text-gray-600 mt-2'>
              Showing results for: <strong>{filters.title}</strong>
            </div>
          )}

          {/* remove filter */}
          {filters.title && (
            <div className='text-sm text-blue-600 mt-2 cursor-pointer hover:underline'>
              <Link href='/'>Clear Filters</Link>
            </div>
          )}
        </div>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {blogPosts.data.length > 0 ? (
            blogPosts.data.map((post) => <BlogCard key={post.id} post={post} />)
          ) : (
            <div className='container mx-auto px-4 py-8 text-center'>No blog posts found.</div>
          )}
        </div>
        <Separator />
        <PaginationButtons blogPosts={blogPosts} />
      </div>
    </div>
  );
}
