import React from 'react';
import { SearchIcon } from 'lucide-react';

const Filters = () => {
  return (
    <div>
      <form>
        <div className='flex items-center w-full md:max-w-xs space-x-2'>
          <input type='text' name='title' placeholder='Search for blogs' className='border w-full py-2 px-4 rounded-lg' />
          <button className='cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors'>
            <SearchIcon className='w-5 h-5 md:w-6 md:h-6' />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filters;
