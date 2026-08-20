"use client";

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
import { ReviewDto } from "@/types/review";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const reviewFormSchema = z.object({
  author: z.string().min(1, "Author is required"),
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(1, "Comment is required"),
  source: z.string().min(1, "Source is required"),
});

export type ReviewFormProps = {
  initialData?: ReviewDto;
  onSubmit: (data: ReviewDto) => void;
};

export function ReviewForm({ initialData, onSubmit }: ReviewFormProps) {
  const form = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      author: initialData?.author ?? "",
      rating: initialData?.rating ?? 5,
      comment: initialData?.comment ?? "",
      source: initialData?.source ?? "",
    },
  });

  const handleSubmit = (values: z.infer<typeof reviewFormSchema>): void => {
    try {
      onSubmit({
        ...initialData,
        author: values.author,
        rating: values.rating,
        comment: values.comment,
        source: values.source,
        id: initialData?.id ?? 0, // ID is handled by the backend for new reviews
        createdAt: initialData?.createdAt ?? new Date().toISOString(),
      } as ReviewDto);
    } catch (error) {
      toast.error("Failed to save review.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Review author" {...field} data-testid="review-author" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  value={String(field.value)}
                  className="flex flex-row space-x-2"
                  data-testid="review-rating"
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <RadioGroupItem value={String(rating)} id={`rating-${rating}`} />
                      <Label htmlFor={`rating-${rating}`}>{rating}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea placeholder="Review comment" {...field} data-testid="review-comment" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source</FormLabel>
              <FormControl>
                <Input placeholder="Review source" {...field} data-testid="review-source" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" data-testid="review-submit">
          {initialData ? "Save Changes" : "Create Review"}
        </Button>
      </form>
    </Form>
  );
}