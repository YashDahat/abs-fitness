import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import type { TrainerDto } from '@/types/trainer';

const trainerFormSchema = z.object({
  name: z.string().min(1, 'Trainer name is required'),
  specialty: z.string().min(1, 'Specialty is required'),
  bio: z.string().min(1, 'Bio is required'),
  imageUrl: z.string().url('Must be a valid URL').min(1, 'Image URL is required'),
  experienceYears: z.coerce.number().min(0, 'Experience years must be non-negative'),
});

type TrainerFormValues = z.infer<typeof trainerFormSchema>;

interface TrainerFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: TrainerDto | null;
  onSubmit: (data: Omit<TrainerDto, 'id'>) => void;
}

export function TrainerForm({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}: TrainerFormProps): React.JSX.Element {
  const form = useForm<TrainerFormValues>({
    resolver: zodResolver(trainerFormSchema),
    defaultValues: initialData || {
      name: '',
      specialty: '',
      bio: '',
      imageUrl: '',
      experienceYears: 0,
    },
  });

  const handleSubmit = (values: TrainerFormValues): void => {
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Trainer' : 'Create Trainer'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input data-testid="trainer-name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialty</FormLabel>
                  <FormControl>
                    <Input data-testid="trainer-specialty" {...field} />
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
                    <Textarea data-testid="trainer-bio" {...field} />
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
                    <Input data-testid="trainer-imageUrl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experienceYears"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Years</FormLabel>
                  <FormControl>
                    <Input data-testid="trainer-experienceYears" type="number" {...field} onChange={e => field.onChange(e.target.valueAsNumber)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
              data-testid="trainer-submit"
            >
              {initialData ? 'Save Changes' : 'Create Trainer'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}