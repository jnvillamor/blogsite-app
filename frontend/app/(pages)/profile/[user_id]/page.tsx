import { getCurrentSession, getUserById } from '@/app/api/auth';
import OwnerButton from '@/components/OwnerButton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User } from '@/types';
import { Calendar, Mail } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Profile = async ({ params }: { params: Promise<{ user_id: number }> }) => {
  const { user_id } = await params;
  const active_user: User | null = await getCurrentSession();
  const user: User = await getUserById(user_id);

  const isOwner = active_user && user && active_user.id === user.id;

  if (!user) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <h1 className='text-2xl font-bold mb-4'>User Not Found</h1>
        <p className='text-muted-foreground mb-4'>The user profile you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href='/'>Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8 max-w-6xl'>
      <div className='grid gap-8 md:grid-cols-3'>
        {/* Profile Sidebar */}
        <div className='md:col-span-1'>
          <Card>
            <CardHeader className='text-center'>
              <Avatar className='w-24 h-24 mx-auto mb-4 bg-primary/10'>
                <AvatarFallback className='text-2xl'>
                  {user.first_name.charAt(0).toUpperCase()}
                  {user.last_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle className='text-lg font-semibold'>{user.full_name}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <Separator />
              <div className='space-y-2 text-sm'>
                <div className='flex items-center gap-2'>
                  <Mail className='h-4 w-4 text-muted-foreground' />
                  <span>{user.email}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-muted-foreground' />
                  <span>Joined {new Date(user.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <Separator />
              <div className='text-center'>
                <div className='font-bold text-lg'>{user.blog_count}</div>
                <div className='text-xs text-muted-foreground'>Blog Posts</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blog */}
        <div className='md:col-span-2'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold'>Blog Posts</h2>
          </div>
          <div>
            {user.blogs && user.blogs.length === 0 ? (
              <Card>
                <CardContent className='text-center py-8'>
                  <p className='text-muted-foreground'>No blog posts yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className='space-y-6'>
                {user.blogs.map((post) => (
                  <Card key={post.id} className='hover:shadow-lg transition-shadow'>
                    <CardHeader>
                      <CardTitle className='line-clamp-2 flex items-ceenter justify-between'>
                        <Link href={`/blog/${post.id}`} className='hover:underline'>
                          {post.title}
                        </Link>
                        {isOwner && (
                          <OwnerButton blog_id={post.id} />
                        )}
                      </CardTitle>
                      <CardDescription className='line-clamp-3'>{post.content}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='flex justify-between items-center text-sm text-muted-foreground'>
                        <span>By {user.full_name}</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
