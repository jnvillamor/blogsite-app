'use client';

import { SignupSchema } from '@/lib/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { signupAction } from '@/lib/actions';
import { toast } from 'sonner';

type SignupInputs = z.infer<typeof SignupSchema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignupInputs>({
    resolver: zodResolver(SignupSchema)
  });

  const processForm = async (data: SignupInputs) => {
    try {
      const response = await signupAction(data);
      if (response.error) {
        console.error('Signup failed:', response.message);
        toast.error(response.message || 'Signup failed. Please try again.');
        return;
      }

      toast.success('Signup successful! Please login.');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(processForm)}>
      <section className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='first_name'>First Name</Label>
          <div>
            <Input type='text' placeholder='Enter your first name' {...register('first_name')} />
            {errors.first_name && <span className='text-red-500 text-xs'>{errors.first_name.message}</span>}
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='last_name'>Last Name</Label>
          <div>
            <Input type='text' placeholder='Enter your last name' {...register('last_name')} />
            {errors.last_name && <span className='text-red-500 text-xs'>{errors.last_name.message}</span>}
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <div>
            <Input type='email' placeholder='Enter your email' {...register('email')} />
            {errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='password'>Password</Label>
          <div>
            <Input type='password' placeholder='Enter your password' {...register('password')} />
            {errors.password && <span className='text-red-500 text-xs'>{errors.password.message}</span>}
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='confirm_password'>Confirm Password</Label>
          <div>
            <Input type='password' placeholder='Enter your password' {...register('confirm_password')} />
            {errors.confirm_password && <span className='text-red-500 text-xs'>{errors.confirm_password.message}</span>}
          </div>
        </div>

        <Button className='w-full mt-4' disabled={isSubmitting}>{isSubmitting ? 'Submitting' : 'Submit'}</Button>
      </section>
    </form>
  );
};

export default SignupForm;
