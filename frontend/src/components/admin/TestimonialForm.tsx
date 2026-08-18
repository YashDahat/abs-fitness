import { useEffect } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { useCreateTestimonial, useUpdateTestimonial } from '@/hooks/useContent';
import type { TestimonialDto } from '@/types/testimonial';
import { toast } from 'sonner';

const testimonialFormSchema = z.object({
  authorName: z.string().min(1, 'Author name is required'),
  quote: z.string().min(1, 'Quote is required'),
  imageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  displayOrder: z.coerce.number().min(0, 'Display order must be a non-negative number'),
});

type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;

interface TestimonialFormProps {
  initialData?: TestimonialDto;
  onSuccess?: () => void;
}

export default function TestimonialForm({
  initialData,
  onSuccess,
}: TestimonialFormProps) {
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      authorName: initialData?.authorName ?? '',
      quote: initialData?.quote ?? '',
      imageUrl: initialData?.imageUrl ?? '',
      displayOrder: initialData?.displayOrder ?? 0,
    },
  });

  const createTestimonialMutation = useCreateTestimonial();
  const updateTestimonialMutation = useUpdateTestimonial();

  useEffect(() => {
    if (initialData) {
      form.reset({
        authorName: initialData.authorName,
        quote: initialData.quote,
        imageUrl: initialData.imageUrl ?? '',
        displayOrder: initialData.displayOrder,
      });
    }
  }, [initialData, form]);

  const onSubmit = (values: TestimonialFormValues): void => {
    const testimonialRequest: TestimonialDto = {
      id: initialData?.id ?? 0, // ID is ignored for create, required for update
      authorName: values.authorName,
      quote: values.quote,
      imageUrl: values.imageUrl || null,
      displayOrder: values.displayOrder,
    };

    if (initialData) {
      updateTestimonialMutation.mutateAsync(
        { id: initialData.id.toString(), request: testimonialRequest },
      ).then(() => {
        toast.success('Testimonial updated successfully.');
        onSuccess?.();
      }).catch((error: unknown) => {
        toast.error('Failed to update testimonial.', {
          description: error instanceof Error ? error.message : 'Unknown error',
        });
      });
    } else {
      createTestimonialMutation.mutateAsync(testimonialRequest).then(() => {
        toast.success('Testimonial created successfully.');
        form.reset();
        onSuccess?.();
      }).catch((error: unknown) => {
        toast.error('Failed to create testimonial.', {
          description: error instanceof Error ? error.message : 'Unknown error',
        });
      });
    }
  };

  const isPending =
    createTestimonialMutation.isPending || updateTestimonialMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="authorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author Name</FormLabel>
              <FormControl>
                <Input data-testid="testimonial-authorName" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quote"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quote</FormLabel>
              <FormControl>
                <Textarea data-testid="testimonial-quote" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input data-testid="testimonial-imageUrl" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayOrder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Order</FormLabel>
              <FormControl>
                <Input
                  data-testid="testimonial-displayOrder"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          data-testid="testimonial-submit"
          type="submit"
          disabled={isPending}
          className="bg-[#FF5722] hover:bg-orange-600 text-white font-semibold rounded-md px-6 py-3 transition-all duration-200"
        >
          {isPending
            ? 'Saving...'
            : initialData
              ? 'Update Testimonial'
              : 'Create Testimonial'}
        </Button>
      </form>
    </Form>
  );
}