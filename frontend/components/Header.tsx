import { getCurrentSession } from '@/app/api/auth';
import { User } from '@/types';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Avatar, AvatarFallback } from './ui/avatar';
import LogoutButton from './LogoutButton';

const Header = async () => {
  const user: User | null = await getCurrentSession();

  return (
    <header className='border-b'>
      <div className='container mx-auto px-4 py-4'>
        <nav className='flex justify-between items-center'>
          <div className='flex items-center space-x-4'>
            <h1 className='text-xl font-bold'>BlogSite App</h1>
          </div>
          <div className='flex items-center space-x-4'>
            <Link href='/' className='text-sm hover:underline'>
              Home
            </Link>
            <Link href='/write' className='text-sm hover:underline'>
              Write
            </Link>
            {user ? (
              <Popover>
                <PopoverTrigger>
                  <Avatar>
                    <AvatarFallback>{user.first_name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className='w-48'>
                  <div className='flex flex-col space-y-2'>
                    <Link href={`/profile/${user.id}`} className='text-sm hover:underline'>
                      Profile
                    </Link>
                    <LogoutButton />
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Link href='/login' className='text-sm hover:underline'>
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
