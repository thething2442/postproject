'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import * as card from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import useApi from '@/hooks/use-api';

export default function RegisterPage() {
  const apiRegister = process.env.NEXT_PUBLIC_API_BASE_URL
  const [content, setContent] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });
  const router = useRouter();
  const { post, error } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming your external backend has a register endpoint at /auth/register
      await post(`/${apiRegister}/auth/register`, content);
      router.push('/login'); // Redirect to login page on successful registration
    } catch (err) {
      console.error('Registration failed:', err);
      // Handle registration error, e.g., display a message to the user
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent(item => ({
      ...item,
      [name]: value
    }));
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <card.Card className='mx-auto max-w-sm'>
        <card.CardHeader>
          <card.CardTitle className='text-xl'>Sign Up</card.CardTitle>
          <card.CardDescription>
            Enter your information to create an account
          </card.CardDescription>
        </card.CardHeader>
        <card.CardContent>
          <form onSubmit={handleSubmit}>
            <div className='grid gap-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='first-name'>First name</Label>
                  <Input
                    id='first-name'
                    placeholder='Max'
                    required
                    name='firstname'
                    value={content.firstname}
                    onChange={handleChange}
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='last-name'>Last name</Label>
                  <Input
                    id='last-name'
                    placeholder='Robinson'
                    required
                    name='lastname'
                    value={content.lastname}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  required
                  name='email'
                  value={content.email}
                  onChange={handleChange}
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  name='password'
                  value={content.password}
                  onChange={handleChange}
                />
              </div>
              <Button type='submit' className='w-full'>
                Create an account
              </Button>
              <Button variant='outline' className='w-full'>
                Sign up with Google
              </Button>
            </div>
          </form>
          <div className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <Link href='/' className='underline'>
              Sign in
            </Link>
          </div>
        </card.CardContent>
      </card.Card>
    </div>
  );
}