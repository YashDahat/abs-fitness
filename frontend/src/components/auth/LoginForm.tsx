import type { JSX } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { ROUTES } from '@/routes';

const loginSchema = z.object({
  username: z.string().min(1, 'Email or phone is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm(): React.JSX.Element {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues): Promise<void> => {
    setError(null);
    try {
      await login(values.username, values.password);
      toast.success('Logged in successfully!');
      navigate(ROUTES.ACCOUNT);
    } catch (err) {
      setError('Invalid email/phone or password. Please try again.');
      toast.error('Login failed.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 space-y-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-3xl font-bold text-center text-[#1A1A1A]">Login</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="username">Email or Phone</Label>
                <FormControl>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your email or phone"
                    {...field}
                    data-testid="login-username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="password">Password</Label>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                    data-testid="login-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
            disabled={isLoading}
            data-testid="login-submit"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Form>
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Button
          variant="link"
          onClick={() => navigate(ROUTES.SIGNUP)}
          className="text-[#FF5722] hover:text-[#E64A19] p-0 h-auto"
          data-testid="signup-link"
        >
          Sign Up
        </Button>
      </p>
    </div>
  );
}