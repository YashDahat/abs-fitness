'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAdminTestimonials, useDeleteTestimonial } from '@/hooks/useContent';
import { TestimonialDto } from '@/types/testimonial';
import { toast } from 'sonner';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import TestimonialForm from './TestimonialForm';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function TestimonialTable() {
  const { data: testimonials, isLoading, isError, error } = useAdminTestimonials();
  const deleteMutation = useDeleteTestimonial();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<TestimonialDto | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Testimonial deleted successfully.');
    } catch (err) {
      toast.error('Failed to delete testimonial.');
      console.error('Failed to delete testimonial:', err);
    }
  };

  const handleEdit = (testimonial: TestimonialDto) => {
    setSelectedTestimonial(testimonial);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedTestimonial(null);
    setIsFormOpen(true);
  };

  if (isLoading) {
    return <div>Loading testimonials...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleCreate} data-testid="create-testimonial-button">
        Add New Testimonial
      </Button>
      <Table data-testid="testimonial-table">
        <TableHeader>
          <TableRow>
            <TableHead>Author</TableHead>
            <TableHead>Quote</TableHead>
            <TableHead>Image URL</TableHead>
            <TableHead>Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testimonials?.map((testimonial) => (
            <TableRow key={testimonial.id} data-testid={`testimonial-row-${testimonial.id}`}>
              <TableCell>{testimonial.authorName}</TableCell>
              <TableCell className="max-w-xs truncate">{testimonial.quote}</TableCell>
              <TableCell className="max-w-xs truncate">{testimonial.imageUrl}</TableCell>
              <TableCell>{testimonial.displayOrder}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(testimonial)}
                    data-testid={`edit-testimonial-${testimonial.id}`}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        data-testid={`delete-testimonial-${testimonial.id}`}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the testimonial.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(testimonial.id.toString())}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedTestimonial ? 'Edit Testimonial' : 'Create Testimonial'}</DialogTitle>
          </DialogHeader>
          <TestimonialForm
            initialData={selectedTestimonial}
            onSuccess={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}