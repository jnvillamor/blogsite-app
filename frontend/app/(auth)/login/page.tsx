import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

export async function generateMetadata() {
  return {
    title: 'Login',
    description: 'Login to your account or create a new one to access all features of Blog Post.',
  }
}

const LoginPage = () => {
  return (
    <main className='max-w-lg mx-4 lg:mx-auto flex items-center justify-center min-h-[80vh]'>
      <div className='w-full max-w-md'>
        <div className='text-center mb-6'>
          <h1 className='text-3xl font-bold'>Welcome to Blog Post</h1>
          <h4 className='text-muted-foreground mt-2'>Sign in to your account or create a new one</h4>
        </div>

        <Tabs defaultValue='login' className='w-full'>
          <TabsList className='w-full'>
            <TabsTrigger value='login' className='w-full'>Login</TabsTrigger>
            <TabsTrigger value='register' className='w-full'>Register</TabsTrigger>
          </TabsList>
          <TabsContent value='login'>
            <Card className='w-full'>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials to access your account.</CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='register'>
            <Card className='w-full'>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Enter your information to create a new account.</CardDescription>
              </CardHeader>
              <CardContent>
                <SignupForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default LoginPage;
