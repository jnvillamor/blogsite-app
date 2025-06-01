import { BlogPost, PaginatedResponse } from '@/types';
import { getBlogPosts } from '../api/blog';
import BlogCard from '@/components/BlogCard';

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const page = (await searchParams).page || '1';
  const limit = (await searchParams).limit || '10';

  const blogPosts: PaginatedResponse<BlogPost> = await getBlogPosts(Number(page), Number(limit));

  if (!blogPosts || !blogPosts.data || blogPosts.data.length === 0) {
    return <div className='container mx-auto px-4 py-8 text-center'>No blog posts found.</div>;
  }

  return (
    <div>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {blogPosts.data.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
