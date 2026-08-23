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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateInquiry } from '@/hooks/inquiryHooks';
import type { InquiryType } from '@/types/inquiry';

const INQUIRY_TYPES: InquiryType[] = ['FREE_TRIAL', 'TOUR_BOOKING', 'GENERAL_INQUIRY'];

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number must not exceed 15 digits'),
  inquiryType: z.enum(['FREE_TRIAL', 'TOUR_BOOKING', 'GENERAL_INQUIRY'], {
    message: 'Please select an inquiry type',
  }),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500, 'Message must not exceed 500 characters'),
});

export default function LeadCaptureForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      inquiryType: 'GENERAL_INQUIRY' as InquiryType,
      message: '',
    },
  });

  const { mutate: createInquiry, isPending } = useCreateInquiry();

  const onSubmit = (values: z.infer<typeof formSchema>): void => {
    createInquiry({
      name: values.name,
      email: values.email,
      phone: values.phone,
      inquiryType: values.inquiryType,
      message: values.message,
    });
    toast.success('Inquiry submitted successfully!');
    form.reset();
  };

  return (
    <section className="py-16 px-4 bg-white" data-testid="lead-capture-form-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-8 text-center">
          Get Started Today!
        </h2>
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} data-testid="inquiry-name" />
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
                      <Input type="email" placeholder="Your Email" {...field} data-testid="inquiry-email" />
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
                      <Input type="tel" placeholder="Your Phone Number" {...field} data-testid="inquiry-phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inquiryType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inquiry Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} data-testid="inquiry-type">
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an inquiry type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {INQUIRY_TYPES.map((type: InquiryType) => (
                          <SelectItem key={type} value={type}>
                            {type.replace(/_/g, ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      <Textarea
                        placeholder="Tell us more about your inquiry"
                        className="resize-y min-h-[100px]"
                        {...field}
                        data-testid="inquiry-message"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
                disabled={isPending}
                data-testid="inquiry-submit"
              >
                {isPending ? 'Submitting...' : 'Submit Inquiry'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}