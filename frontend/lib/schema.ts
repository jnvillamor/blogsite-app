import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().nonempty('Password is required')
});

export const SignupSchema = z.object({
  first_name: z
    .string()
    .nonempty('First name is required.')
    .max(100, 'First name must be at most 100 characters long.'),
  last_name: z
    .string()
    .nonempty('Last name is required.')
    .max(100, 'Last name must be at most 100 characters long.'),
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .max(250, 'Password must be at most 250 characters long.'),
  confirm_password: z
    .string()
    .nonempty('Confirm password is required')
})
.refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password']
});

export const CreateBlogSchema = z.object({
  title: z.string().nonempty('Title is required').max(255, 'Title must be at most 250 characters long.'),
  content: z.string().nonempty('Content is required').max(5000, 'Content must be at most 5000 characters long.'),
  author_id: z.number().int().positive('Author ID must be a positive integer')
})