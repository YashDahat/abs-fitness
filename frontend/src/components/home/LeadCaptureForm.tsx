import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

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
import { Textarea } from '@/components/ui/textarea';
import { useSubmitEnquiry } from '@/hooks/useContent';
import type { CreateEnquiryRequest } from '@/types/enquiry';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number cannot exceed 15 digits'),
  message: z.string().min(1, 'Message is required'),
});

export default function LeadCaptureForm() {
  const { mutate: submitEnquiry, isPending } = useSubmitEnquiry();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const request: CreateEnquiryRequest = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      message: values.message,
    };

    submitEnquiry(request, {
      onSuccess: () => {
        toast.success('Enquiry submitted successfully! We will contact you shortly.');
        form.reset();
      },
      onError: (error) => {
        toast.error('Failed to submit enquiry. Please try again.');
        console.error('Enquiry submission error:', error);
      },
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100" data-testid="lead-capture-form">
      <h2 className="text-2xl font-semibold text-center mb-6 text-[#1A1A1A]">Request a Free Trial / Tour</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} data-testid="lead-name" />
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
                  <Input type="email" placeholder="Your Email" {...field} data-testid="lead-email" />
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
                  <Input type="tel" placeholder="Your Phone Number" {...field} data-testid="lead-phone" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us about your fitness goals" {...field} data-testid="lead-message" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
            disabled={isPending}
            data-testid="lead-submit"
          >
            {isPending ? 'Submitting...' : 'Request a Free Trial'}
          </Button>
        </form>
      </Form>
    </div>
  );
}