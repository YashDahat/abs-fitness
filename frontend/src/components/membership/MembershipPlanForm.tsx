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
import type { MembershipPlanDto } from '@/types/membership';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  durationInMonths: z.coerce.number().min(1, 'Duration must be at least 1 month'),
  price: z.coerce.number().min(0, 'Price cannot be negative'),
});

export interface MembershipPlanFormProps {
  initialData?: MembershipPlanDto;
  onSubmit: (data: MembershipPlanDto) => void;
}

export function MembershipPlanForm({ initialData, onSubmit }: MembershipPlanFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      durationInMonths: initialData?.durationInMonths ?? 1,
      price: initialData?.price ?? 0,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>): void => {
    const plan: MembershipPlanDto = {
      id: initialData?.id ?? 0, // ID is 0 for new plans, will be ignored by backend
      name: values.name,
      description: values.description,
      durationInMonths: values.durationInMonths,
      price: values.price,
    };
    onSubmit(plan);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Monthly Basic" {...field} data-testid="membership-plan-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Detailed description of the plan" {...field} data-testid="membership-plan-description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="durationInMonths"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (Months)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} data-testid="membership-plan-duration" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (₹)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} data-testid="membership-plan-price" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold transition-all duration-200" data-testid="membership-plan-submit">
          {initialData ? 'Update Plan' : 'Create Plan'}
        </Button>
      </form>
    </Form>
  );
}