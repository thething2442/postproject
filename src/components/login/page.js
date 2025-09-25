'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import * as card from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import useApi from '@/hooks/use-api';
import { Eye, EyeOff, Mail, Lock, Github, Chrome } from "lucide-react"
export default function LoginPage() {
  const apiLogin = process.env.NEXT_PUBLIC_API_BASE_URL
  const [showPassword, setShowPassword] = useState(false)
  const [content, setContent] = useState({
    email: "",
    password: ""
  });
  const router = useRouter();
  const { post, error } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming your external backend has a login endpoint at /auth/login
      await post(`${apiLogin}/auth/login`, content);
      router.push('/'); // Redirect to home page on successful login
    } catch (err) {
      console.error('Login failed:', err);
      // Handle login error, e.g., display a message to the user
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
    <card.Card className='mx-auto max-w-sm w-full'>
        <card.CardHeader className='space-y-1'>
          <card.CardTitle className='text-2xl font-semibold'>Login</card.CardTitle>
          <card.CardDescription>
            Enter your email below to login to your account
          </card.CardDescription>
        </card.CardHeader>
        <card.CardContent className='space-y-4'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                name='email'
                placeholder="Enter your email"
                value={content.email}
                onChange={handleChange}
                className="pl-10"
                required
                
              />
            </div>
            <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name='password'
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={content.password}
                onChange={handleChange}
                className="pl-10 pr-10"
                required
                
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
              <Button type='submit' className='w-full'>
                Login
              </Button>
              <Button variant='outline' className='w-full'>
                Login with Google
              </Button>
            </div>
          </form>
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link href='/register' className='underline'>
              Sign up
            </Link>
          </div>
        </card.CardContent>
      </card.Card>
  );
}