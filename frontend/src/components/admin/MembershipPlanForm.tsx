'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import { useCreateAdminMembershipPlan, useUpdateAdminMembershipPlan } from '@/hooks/useMembership';
import type { MembershipPlanDto } from '@/types/membership';

const membershipPlanSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0, 'Price must be non-negative'),
  durationInMonths: z.coerce.number().min(1, 'Duration must be at least 1 month'),
  isActive: z.boolean(),
});

interface MembershipPlanFormProps {
  initialData?: MembershipPlanDto;
  onSuccess?: () => void;
}

export default function MembershipPlanForm({ initialData, onSuccess }: MembershipPlanFormProps) {
  const form = useForm<z.infer<typeof membershipPlanSchema>>({
    resolver: zodResolver(membershipPlanSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      price: initialData?.price ?? 0,
      durationInMonths: initialData?.durationInMonths ?? 1,
      isActive: initialData?.isActive ?? true,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const createPlanMutation = useCreateAdminMembershipPlan();
  const updatePlanMutation = useUpdateAdminMembershipPlan();

  const onSubmit = async (values: z.infer<typeof membershipPlanSchema>): Promise<void> => {
    try {
      if (initialData?.id) {
        await updatePlanMutation.mutateAsync({ id: initialData.id, request: values as MembershipPlanDto });
        toast.success('Membership plan updated successfully.');
      } else {
        await createPlanMutation.mutateAsync(values as MembershipPlanDto);
        toast.success('Membership plan created successfully.');
      }
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to save membership plan.');
    }
  };

  const isPending = createPlanMutation.isPending || updatePlanMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input data-testid="membership-name" {...field} />
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
                <Textarea data-testid="membership-description" {...field} />
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
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input data-testid="membership-price" type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
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
                <Input data-testid="membership-duration" type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active</FormLabel>
              </div>
              <FormControl>
                <Switch
                  data-testid="membership-active"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button data-testid="membership-submit" type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : initialData?.id ? 'Update Plan' : 'Create Plan'}
        </Button>
      </form>
    </Form>
  );
}