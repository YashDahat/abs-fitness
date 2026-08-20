import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ReviewTable } from '@/components/reviews/ReviewTable';
import { ReviewForm } from '@/components/reviews/ReviewForm';
import { DeleteConfirmationDialog } from '@/components/shared/DeleteConfirmationDialog';
import { useReviews, useCreateReview, useUpdateReview, useDeleteReview, useApproveReview } from '@/hooks/reviewHooks';
import { ReviewDto } from '@/types/review';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

const AdminReviewsPage = () => {
  const { data: reviews, isLoading, isError, error } = useReviews();
  const createReviewMutation = useCreateReview();
  const updateReviewMutation = useUpdateReview();
  const deleteReviewMutation = useDeleteReview();
  const approveReviewMutation = useApproveReview();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [editingReview, setEditingReview] = useState<ReviewDto | undefined>(undefined);
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null);

  const handleAddReview = () => {
    setEditingReview(undefined);
    setIsFormOpen(true);
  };

  const handleEditReview = (review: ReviewDto) => {
    setEditingReview(review);
    setIsFormOpen(true);
  };

  const handleDeleteReview = (id: number) => {
    setReviewToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleApproveReview = async (id: number) => {
    try {
      await approveReviewMutation.mutateAsync(id);
      toast.success('Review approved successfully!');
    } catch (error) {
      toast.error('Failed to approve review.');
      console.error('Failed to approve review:', error);
    }
  };

  const confirmDelete = async () => {
    if (reviewToDelete !== null) {
      try {
        await deleteReviewMutation.mutateAsync(reviewToDelete);
        toast.success('Review deleted successfully!');
        setIsDeleteDialogOpen(false);
        setReviewToDelete(null);
      } catch (error) {
        toast.error('Failed to delete review.');
        console.error('Failed to delete review:', error);
      }
    }
  };

  const handleSubmit = async (data: ReviewDto) => {
    try {
      if (editingReview) {
        await updateReviewMutation.mutateAsync({ id: editingReview.id, request: data });
        toast.success('Review updated successfully!');
      } else {
        await createReviewMutation.mutateAsync(data);
        toast.success('Review created successfully!');
      }
      setIsFormOpen(false);
      setEditingReview(undefined);
    } catch (error) {
      toast.error(`Failed to ${editingReview ? 'update' : 'create'} review.`);
      console.error(`Failed to ${editingReview ? 'update' : 'create'} review:`, error);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">Manage Reviews</h1>
          <Skeleton className="h-10 w-32 mb-4" />
          <Skeleton className="h-[500px] w-full" />
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">Manage Reviews</h1>
          <p className="text-red-500">Error loading reviews: {error?.message}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Manage Reviews</h1>
        <div className="flex justify-end mb-4">
          <Button onClick={handleAddReview} data-testid="add-review-button">Add New Review</Button>
        </div>
        <ReviewTable
          reviews={reviews || []}
          onEdit={handleEditReview}
          onDelete={handleDeleteReview}
          onApprove={handleApproveReview}
        />

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingReview ? 'Edit Review' : 'Create New Review'}</DialogTitle>
            </DialogHeader>
            <ReviewForm initialData={editingReview} onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>

        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          title="Confirm Delete"
          description="Are you sure you want to delete this review? This action cannot be undone."
        />
      </div>
    </AdminLayout>
  );
};

export default AdminReviewsPage;