'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LoginSchema } from '@/lib/schema';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { loginAction } from '@/lib/actions';
import { toast } from 'sonner';

type LoginInputs = z.infer<typeof LoginSchema>;

const LoginForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginInputs>({
    resolver: zodResolver(LoginSchema)
  });

  const processForm: SubmitHandler<LoginInputs> = async (data: LoginInputs) => {
    const res = await loginAction(data);

    if (res.error) {
      console.error('Login failed:', res.message);
      toast.error(res.message || 'Login failed. Please try again.');
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(processForm)}>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>
          <div>
            <Input type='email' placeholder='Enter your email' {...register('email')} />
            {errors.email?.message && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='password'>Password</Label>
          <div>
            <Input type='password' placeholder='Enter your password' {...register('password')} />
            {errors.password?.message && <span className='text-red-500 text-xs'>{errors.password.message}</span>}
          </div>
        </div>
        
        <Button className='w-full mt-4' disabled={isSubmitting}> {isSubmitting ? 'Logging In' : 'Login'}</Button>
      </div>
    </form>
  );
};

export default LoginForm;
