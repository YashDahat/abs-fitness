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
import { TrainerDto } from '@/types/trainer';

const trainerFormSchema = z.object({
  name: z.string().min(1, 'Trainer name is required'),
  specialties: z.string().min(1, 'Specialties are required'),
  bio: z.string().min(1, 'Bio is required'),
  photoUrl: z.string().url('Must be a valid URL').min(1, 'Photo URL is required'),
});

export type TrainerFormProps = {
  initialData?: TrainerDto;
  onSubmit: (data: TrainerDto) => void;
};

export function TrainerForm({ initialData, onSubmit }: TrainerFormProps) {
  const form = useForm<z.infer<typeof trainerFormSchema>>({
    resolver: zodResolver(trainerFormSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      specialties: initialData?.specialties ?? '',
      bio: initialData?.bio ?? '',
      photoUrl: initialData?.photoUrl ?? '',
    },
  });

  const handleSubmit = (values: z.infer<typeof trainerFormSchema>): void => {
    const trainerDto: TrainerDto = {
      id: initialData?.id ?? 0, // ID is ignored for create, but required for type
      name: values.name,
      specialties: values.specialties,
      bio: values.bio,
      photoUrl: values.photoUrl,
    };
    onSubmit(trainerDto);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4" data-testid="trainer-form">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Trainer's Name" {...field} data-testid="trainer-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialties"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specialties</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Weightlifting, Yoga, Cardio" {...field} data-testid="trainer-specialties" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="A short bio about the trainer" {...field} data-testid="trainer-bio" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="photoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/trainer.jpg" {...field} data-testid="trainer-photoUrl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" data-testid="trainer-submit">
          {initialData ? 'Update Trainer' : 'Create Trainer'}
        </Button>
      </form>
    </Form>
  );
}