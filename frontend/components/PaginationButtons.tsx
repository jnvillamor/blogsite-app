'use client';

import React from 'react';
import { Button } from './ui/button';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import { BlogPost, PaginatedResponse } from '@/types';
import { useRouter } from 'next/navigation';

const PaginationButtons = ({ blogPosts }: { blogPosts: PaginatedResponse<BlogPost> }) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevents hydration mismatch
  }

  return (
    <div className='flex gap-4 items-center justify-center'>
      {/* First Page */}
      <div>
        <Button
          onClick={() => router.replace(`?page=1&limit=${blogPosts.limit}`)}
          variant={'outline'}
          disabled={!blogPosts.has_previous || blogPosts.page === 1}>
          <ChevronsLeftIcon className='bg-transparent w-4 h-4' />
        </Button>
      </div>
      <div>
        <Button
          onClick={() => router.replace(`?page=${blogPosts.previous_page}&limit=${blogPosts.limit}`)}
          variant={'outline'}
          disabled={!blogPosts.has_previous || blogPosts.page === 1}>
          <ChevronLeftIcon className='bg-transparent w-4 h-4' />
        </Button>
      </div>
      <div>{<p>{blogPosts.page}</p>}</div>
      {/* Next Page */}
      <div>
        <Button
          onClick={() => router.replace(`?page=${blogPosts.next_page}&limit=${blogPosts.limit}`)}
          variant={'outline'}
          disabled={!blogPosts.has_next || blogPosts.max_page === blogPosts.page}>
          <ChevronRightIcon className='bg-transparent w-4 h-4' />
        </Button>
      </div>
      <div>
        <Button
          onClick={() => router.replace(`?page=${blogPosts.max_page}&limit=${blogPosts.limit}`)}
          variant={'outline'}
          disabled={!blogPosts.has_next || blogPosts.max_page === blogPosts.page}>
          <ChevronsRightIcon className='bg-transparent w-4 h-4' />
        </Button>
      </div>
    </div>
  );
};

export default PaginationButtons;
