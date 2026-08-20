'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { AuthenticatedUser } from '@/types/auth';
import { toast } from 'sonner';
import { useUpdateUser } from '@/hooks/userHooks'; // Assuming a useUpdateUser hook exists

const profileFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  user: AuthenticatedUser;
  onUpdate: (updatedUser: AuthenticatedUser) => void;
}

export default function ProfileForm({ user, onUpdate }: ProfileFormProps) {
  const { user: authUser } = useAuth();
  const { mutate: updateUser, isPending } = useUpdateUser();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    },
  });

  const onSubmit = async (values: ProfileFormValues): Promise<void> => {
    if (!authUser?.id) {
      toast.error('User not authenticated.');
      return;
    }

    try {
      // Assuming the useUpdateUser hook takes an object with userId and the update request
      updateUser(
        {
          userId: authUser.id,
          request: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
          },
        },
        {
          onSuccess: (data) => {
            toast.success('Profile updated successfully!');
            onUpdate(data); // Pass the updated user data back to the parent
          },
          onError: (error) => {
            toast.error(`Failed to update profile: ${error.message}`);
          },
        }
      );
    } catch (error: any) {
      toast.error(`Failed to update profile: ${error.message}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="profile-form">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} data-testid="profile-firstName" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} data-testid="profile-lastName" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} data-testid="profile-email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Phone" {...field} data-testid="profile-phone" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} data-testid="profile-submit">
          {isPending ? 'Updating...' : 'Update Profile'}
        </Button>
      </form>
    </Form>
  );
}