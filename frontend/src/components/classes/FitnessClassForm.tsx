"use client";

import type { JSX } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FitnessClassDto } from "@/types/fitnessClass";
import { useTrainers } from "@/hooks/trainerHooks";
import { toast } from "sonner";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Class name is required"),
  description: z.string().min(1, "Description is required"),
  scheduleTime: z.string().min(1, "Schedule time is required"),
  durationMinutes: z.coerce.number().min(1, "Duration must be at least 1 minute"),
  capacity: z.coerce.number().min(1, "Capacity must be at least 1"),
  trainerId: z.coerce.number().min(1, "Trainer is required"),
});

export interface FitnessClassFormProps {
  initialData?: FitnessClassDto;
  onSubmit: (data: FitnessClassDto) => void;
}

export function FitnessClassForm({ initialData, onSubmit }: FitnessClassFormProps): React.JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      description: initialData?.description ?? "",
      scheduleTime: initialData?.scheduleTime ?? "",
      durationMinutes: initialData?.durationMinutes ?? 0,
      capacity: initialData?.capacity ?? 0,
      trainerId: initialData?.trainerId ?? 0,
    },
  });

  const { data: trainers, isLoading: isLoadingTrainers, isError: isErrorTrainers, error: trainersError } = useTrainers();

  useEffect(() => {
    if (isErrorTrainers) {
      toast.error("Failed to load trainers", {
        description: trainersError?.message || "An unknown error occurred.",
      });
    }
  }, [isErrorTrainers, trainersError]);

  const handleSubmit = (values: z.infer<typeof formSchema>): void => {
    const fitnessClassDto: FitnessClassDto = {
      id: initialData?.id ?? 0, // ID is 0 for new classes, will be ignored by backend
      name: values.name,
      description: values.description,
      scheduleTime: values.scheduleTime,
      durationMinutes: values.durationMinutes,
      capacity: values.capacity,
      trainerId: values.trainerId,
      trainerName: trainers?.find(t => t.id === values.trainerId)?.name ?? "", // Trainer name is derived
    };
    onSubmit(fitnessClassDto);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Class Name</FormLabel>
              <FormControl>
                <Input placeholder="Yoga Flow" {...field} data-testid="class-name" />
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
                <Textarea placeholder="A relaxing yoga session..." {...field} data-testid="class-description" />
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
              <FormLabel>Schedule Time (HH:MM)</FormLabel>
              <FormControl>
                <Input type="time" {...field} data-testid="class-schedule-time" />
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
                <Input type="number" {...field} data-testid="class-duration" />
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
                <Input type="number" {...field} data-testid="class-capacity" />
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
              <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value.toString()} disabled={isLoadingTrainers}>
                <FormControl>
                  <SelectTrigger data-testid="class-trainer-select">
                    <SelectValue placeholder="Select a trainer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {trainers?.map((trainer) => (
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
        <Button type="submit" data-testid="class-submit">
          {initialData ? "Update Class" : "Create Class"}
        </Button>
      </form>
    </Form>
  );
}