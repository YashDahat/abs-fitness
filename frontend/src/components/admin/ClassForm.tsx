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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTrainers } from '@/hooks/useBooking';
import { useCreateGymClass, useUpdateGymClass } from '@/services/classService'; // Assuming these hooks exist in classService
import type { GymClassDto } from '@/types/gym';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

const classFormSchema = z.object({
  name: z.string().min(1, 'Class name is required'),
  description: z.string().min(1, 'Description is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  capacity: z.coerce.number().min(1, 'Capacity must be at least 1'),
  trainerId: z.string().min(1, 'Trainer is required'),
});

type ClassFormValues = z.infer<typeof classFormSchema>;

interface ClassFormProps {
  initialData?: GymClassDto;
  onSuccess?: () => void;
}

export default function ClassForm({ initialData, onSuccess }: ClassFormProps) {
  const queryClient = useQueryClient();
  const form = useForm<ClassFormValues>({
    resolver: zodResolver(classFormSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      startTime: initialData?.startTime ?? '',
      endTime: initialData?.endTime ?? '',
      capacity: initialData?.capacity ?? 1,
      trainerId: initialData?.trainerId ?? '',
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        description: initialData.description,
        startTime: initialData.startTime,
        endTime: initialData.endTime,
        capacity: initialData.capacity,
        trainerId: initialData.trainerId,
      });
    }
  }, [initialData, form]);

  const { data: trainers, isLoading: isLoadingTrainers } = useTrainers();
  const createClassMutation = useCreateGymClass();
  const updateClassMutation = useUpdateGymClass();

  const onSubmit = async (values: ClassFormValues): Promise<void> => {
    try {
      const classDto: GymClassDto = {
        id: initialData?.id ?? 0, // ID is 0 for new classes, will be ignored by backend
        name: values.name,
        description: values.description,
        startTime: values.startTime,
        endTime: values.endTime,
        capacity: values.capacity,
        bookedSlots: initialData?.bookedSlots ?? 0, // Maintain existing booked slots or 0 for new
        trainerId: values.trainerId,
        trainerName: trainers?.find(t => t.id === values.trainerId)?.name ?? 'Unknown', // Derive trainer name
      };

      if (initialData) {
        await updateClassMutation.mutateAsync({ classId: initialData.id, request: classDto });
        toast.success('Class updated successfully!');
      } else {
        await createClassMutation.mutateAsync(classDto);
        toast.success('Class created successfully!');
      }
      queryClient.invalidateQueries({ queryKey: ['gymClasses'] });
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to save class.');
      console.error('Failed to save class:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="class-form">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Name</FormLabel>
              <FormControl>
                <Input placeholder="Yoga Basics" {...field} data-testid="class-name" />
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
                <Textarea placeholder="A beginner-friendly yoga class." {...field} data-testid="class-description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} data-testid="class-start-time" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} data-testid="class-end-time" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))} data-testid="class-capacity" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="trainerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trainer</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="class-trainer-select">
                    <SelectValue placeholder="Select a trainer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoadingTrainers ? (
                    <SelectItem value="loading" disabled>Loading trainers...</SelectItem>
                  ) : (
                    trainers?.map((trainer) => (
                      <SelectItem key={trainer.id} value={trainer.id.toString()} data-testid={`class-trainer-option-${trainer.id}`}>
                        {trainer.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-[#FF5722] hover:bg-orange-600 text-white font-semibold transition-all duration-200"
          disabled={createClassMutation.isPending || updateClassMutation.isPending}
          data-testid="class-submit"
        >
          {initialData ? 'Update Class' : 'Create Class'}
        </Button>
      </form>
    </Form>
  );
}