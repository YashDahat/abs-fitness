import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FitnessClassDto } from '@/types/fitnessClass';
import { TrainerDto } from '@/types/trainer';
import { useEffect } from 'react';

const formSchema = z.object({
  name: z.string().min(1, 'Class name is required'),
  description: z.string().min(1, 'Description is required'),
  scheduleTime: z.string().min(1, 'Schedule time is required'),
  durationMinutes: z.coerce.number().min(1, 'Duration must be at least 1 minute'),
  capacity: z.coerce.number().min(1, 'Capacity must be at least 1'),
  trainerId: z.coerce.number().min(1, 'Trainer is required'),
});

type ClassFormValues = Omit<FitnessClassDto, 'id' | 'bookedSlots' | 'trainerName'>;

interface ClassFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: FitnessClassDto | null;
  trainers: TrainerDto[];
  onSubmit: (data: ClassFormValues) => void;
}

export default function ClassForm({
  isOpen,
  onClose,
  initialData,
  trainers,
  onSubmit,
}: ClassFormProps): React.JSX.Element {
  const form = useForm<ClassFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      scheduleTime: '',
      durationMinutes: 0,
      capacity: 0,
      trainerId: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        description: initialData.description,
        scheduleTime: initialData.scheduleTime,
        durationMinutes: initialData.durationMinutes,
        capacity: initialData.capacity,
        trainerId: initialData.trainerId,
      });
    } else {
      form.reset({
        name: '',
        description: '',
        scheduleTime: '',
        durationMinutes: 0,
        capacity: 0,
        trainerId: 0,
      });
    }
  }, [initialData, form]);

  const handleSubmit = (values: ClassFormValues): void => {
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Class' : 'Create Class'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Name</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="class-name" />
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
                    <Textarea {...field} data-testid="class-description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="scheduleTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Schedule Time</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} data-testid="class-schedule-time" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="durationMinutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (minutes)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} data-testid="class-duration" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} data-testid="class-capacity" />
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
                  <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger data-testid="class-trainer-select">
                        <SelectValue placeholder="Select a trainer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {trainers.map((trainer) => (
                        <SelectItem key={trainer.id} value={trainer.id.toString()}>
                          {trainer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" data-testid="class-submit">
                {initialData ? 'Save Changes' : 'Create Class'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}