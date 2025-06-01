'use client';

import React from 'react';
import { Button } from './ui/button';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import { BlogPost, PaginatedResponse } from '@/types';

const PaginationButtons = ({ blogPosts }: { blogPosts: PaginatedResponse<BlogPost> }) => {
  return (
    <div className='flex gap-4 items-center justify-center'>
      {/* First Page */}
      <div>
        <Button
          onClick={() => window.location.replace(`?page=1&limit=${blogPosts.limit}`)}
          variant={'outline'}
          disabled={!blogPosts.has_prev || blogPosts.page === 1}>
          <ChevronsLeftIcon className='bg-transparent w-4 h-4' />
        </Button>
      </div>
      <div>
        <Button
          onClick={() => window.location.replace(`?page=${blogPosts.page - 1}&limit=${blogPosts.limit}`)}
          variant={'outline'}
          disabled={!blogPosts.has_prev || blogPosts.page === 1}>
          <ChevronLeftIcon className='bg-transparent w-4 h-4' />
        </Button>
      </div>
      <div>{<p>{blogPosts.page}</p>}</div>
      {/* Next Page */}
      <div>
        <Button
          onClick={() => window.location.replace(`?page=${blogPosts.page + 1}&limit=${blogPosts.limit}`)}
          variant={'outline'}
          disabled={!blogPosts.has_next || blogPosts.max_page === blogPosts.page}>
          <ChevronRightIcon className='bg-transparent w-4 h-4' />
        </Button>
      </div>
      <div>
        <Button
          onClick={() => window.location.replace(`?page=${blogPosts.max_page}&limit=${blogPosts.limit}`)}
          variant={'outline'}
          disabled={!blogPosts.has_next || blogPosts.max_page === blogPosts.page}>
          <ChevronsRightIcon className='bg-transparent w-4 h-4' />
        </Button>
      </div>
    </div>
  );
};

export default PaginationButtons;
