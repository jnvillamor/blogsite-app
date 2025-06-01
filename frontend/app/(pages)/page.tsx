import { BlogPost, PaginatedResponse } from '@/types';
import { getBlogPosts } from '../api/blog';
import BlogCard from '@/components/BlogCard';
import { Separator } from '@/components/ui/separator';
import PaginationButtons from '@/components/PaginationButtons';

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const page = (await searchParams).page || '1';
  const limit = (await searchParams).limit || '9';

  const blogPosts: PaginatedResponse<BlogPost> = await getBlogPosts(Number(page), Number(limit));
  
  return (
    <div>
      <div className='container mx-auto px-4 py-8 space-y-8'>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {blogPosts.data.length > 0 ? blogPosts.data.map((post) => (
            <BlogCard key={post.id} post={post} />
          )) : <div className='container mx-auto px-4 py-8 text-center'>No blog posts found.</div>}
        </div>
        <Separator />
        <PaginationButtons blogPosts={blogPosts} />
      </div>
    </div>
  );
}
