'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateBlogSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createBlogAction } from '@/lib/actions';
import { toast } from 'sonner';

type CreateBlogInputs = z.infer<typeof CreateBlogSchema>;

const CreateBlogForm = ({ current_user_id }: { current_user_id: number }) => {

  const [isPreview, setIsPreview] = React.useState<boolean>(false);
  
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm<CreateBlogInputs>({
    resolver: zodResolver(CreateBlogSchema)
  });

  const processForm: SubmitHandler<CreateBlogInputs> = async (data: CreateBlogInputs) => {
    const res = await createBlogAction(data);

    if (res.error) {
      console.error('Login failed:', res.message);
      toast.error(res.message || 'Login failed. Please try again.');
      return;
    }

    toast.success('Blog post created successfully!');
    setTimeout(() => {
      window.location.href = `/profile/${current_user_id}`;
    }, 750);
  };


  return (
    <form onSubmit={handleSubmit(processForm)} className='container mx-auto px-4 py-8 max-w-4xl'>
      <div className='flex justify-between items-center mb-6'>
        <Button type='button' asChild variant='ghost'>
          <Link href='/'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Home
          </Link>
        </Button>

        <div className='flex gap-2'>
          <Button type='button' variant='outline' onClick={() => setIsPreview(!isPreview)}>
            <Eye className='mr-2 h-4 w-4' />
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>
      {!isPreview ? (
        <Card>
          <CardHeader>
            <CardTitle>Write New Post</CardTitle>
            <CardDescription>Share your thoughts and knowledge with the community</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <Input type='hidden' value={current_user_id} {...register('author_id', { valueAsNumber: true})} />
            {errors.author_id && <p className='text-sm text-red-500'>{errors.author_id.message}</p>}
            
            <div className='space-y-2'>
              <Label htmlFor='title'>Title</Label>
              <div>
                <Input id='title' placeholder='Enter your post title...' {...register('title')} />
                {errors.title && <p className='text-sm text-red-500'>{errors.title.message}</p>}
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='content'>Content</Label>
              <div>
                <Textarea
                  id='content'
                  placeholder='Write your post content here... You can use Markdown formatting.'
                  {...register('content')}
                  className='min-h-[400px] resize-none'
                />
                {errors.content && <p className='text-sm text-red-500'>{errors.content.message}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>This is how your post will appear to readers</CardDescription>
          </CardHeader>
          <CardContent>
            <article className='prose prose-gray dark:prose-invert max-w-none'>
              <h1>{getValues('title') || 'Untitled Post'}</h1>
              <div className='whitespace-pre-line'>{getValues('content') || 'No content yet. Start writing to see the preview.'}</div>
            </article>
          </CardContent>
        </Card>
      )}
    </form>
  );
}

export default CreateBlogForm