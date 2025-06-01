import { getCurrentSession } from '@/app/api/auth';
import { User } from '@/types';
import Link from 'next/link';

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
            <Link href='/about' className='text-sm hover:underline'>
              Write
            </Link>
            {user ? (
              <>
                <Link href='/dashboard' className='text-sm hover:underline'>
                  Dashboard
                </Link>
                <h1 className='text-sm'>Welcome! {user.first_name}</h1>
              </>
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
