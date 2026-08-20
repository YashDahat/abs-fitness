import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FitnessClassTable } from '@/components/classes/FitnessClassTable';
import { FitnessClassForm } from '@/components/classes/FitnessClassForm';
import { DeleteConfirmationDialog } from '@/components/shared/DeleteConfirmationDialog';
import { useAdminGetAllFitnessClasses, useCreateFitnessClass, useUpdateFitnessClass, useDeleteFitnessClass, useFitnessClassById } from '@/hooks/fitnessClassHooks';
import { FitnessClassDto } from '@/types/fitnessClass';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminClassesPage() {
  const { data: classes, isLoading, isError, error } = useAdminGetAllFitnessClasses();
  const { mutateAsync: createClass } = useCreateFitnessClass();
  const { mutateAsync: updateClass } = useUpdateFitnessClass();
  const { mutateAsync: deleteClass } = useDeleteFitnessClass();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [editingClassId, setEditingClassId] = useState<string | null>(null);
  const [deletingClassId, setDeletingClassId] = useState<string | null>(null);

  const { data: editingClass, isLoading: isLoadingEditingClass } = useFitnessClassById(editingClassId || '');

  const handleCreateClass = async (data: FitnessClassDto): Promise<void> => {
    try {
      await createClass(data);
      toast.success('Fitness class created successfully.');
      setIsFormOpen(false);
      setEditingClassId(null);
    } catch (err: unknown) {
      toast.error(`Failed to create fitness class: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleEditClass = async (data: FitnessClassDto): Promise<void> => {
    if (editingClassId) {
      try {
        await updateClass({ id: editingClassId, request: data });
        toast.success('Fitness class updated successfully.');
        setIsFormOpen(false);
        setEditingClassId(null);
      } catch (err: unknown) {
        toast.error(`Failed to update fitness class: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    }
  };

  const handleDeleteClass = async (): Promise<void> => {
    if (deletingClassId) {
      try {
        await deleteClass(deletingClassId);
        toast.success('Fitness class deleted successfully.');
        setIsDeleteDialogOpen(false);
        setDeletingClassId(null);
      } catch (err: unknown) {
        toast.error(`Failed to delete fitness class: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    }
  };

  const onEdit = (fitnessClass: FitnessClassDto): void => {
    setEditingClassId(String(fitnessClass.id));
    setIsFormOpen(true);
  };

  const onDelete = (id: string): void => {
    setDeletingClassId(id);
    setIsDeleteDialogOpen(true);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Fitness Classes</h1>
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-[500px] w-full" />
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="text-red-500">Error loading fitness classes: {error?.message}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Fitness Classes</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingClassId(null); setIsFormOpen(true); }} data-testid="add-class-button">
              Add New Class
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingClassId ? 'Edit Fitness Class' : 'Create New Fitness Class'}</DialogTitle>
            </DialogHeader>
            {isLoadingEditingClass && editingClassId ? (
              <Skeleton className="h-[400px] w-full" />
            ) : (
              <FitnessClassForm
                initialData={editingClassId ? editingClass : undefined}
                onSubmit={editingClassId ? handleEditClass : handleCreateClass}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      <FitnessClassTable classes={classes || []} onEdit={onEdit} onDelete={onDelete} />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteClass}
        title="Confirm Deletion"
        description="Are you sure you want to delete this fitness class? This action cannot be undone."
      />
    </AdminLayout>
  );
}