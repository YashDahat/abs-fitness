import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import ClassTable from '@/components/classes/ClassTable';
import ClassForm from '@/components/classes/ClassForm';
import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import { useFitnessClasses, useCreateFitnessClass, useUpdateFitnessClass } from '@/hooks/fitnessClassHooks';
import { useDeleteFitnessClass } from '@/hooks/fitness-classHooks';
import { useAdminGetAllTrainers } from '@/hooks/trainerHooks';
import { toast } from 'sonner';
import type { FitnessClassDto } from '@/types/fitnessClass';

const AdminClassesPage = () => {
  const { data: classes, isLoading, isError, error } = useFitnessClasses();
  const { data: trainers, isLoading: isLoadingTrainers } = useAdminGetAllTrainers();
  const { mutate: createClass } = useCreateFitnessClass();
  const { mutate: updateClass } = useUpdateFitnessClass();
  const { mutate: deleteClass } = useDeleteFitnessClass();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingClass, setEditingClass] = useState<FitnessClassDto | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [classToDelete, setClassToDelete] = useState<FitnessClassDto | null>(null);

  const handleOpenCreateForm = (): void => {
    setEditingClass(null);
    setIsFormOpen(true);
  };

  const handleEditClass = (fitnessClass: FitnessClassDto): void => {
    setEditingClass(fitnessClass);
    setIsFormOpen(true);
  };

  const handleDeleteClass = (classId: number): void => {
    const fitnessClass = classes?.find(c => c.id === classId) || null;
    setClassToDelete(fitnessClass);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = (): void => {
    if (classToDelete) {
      deleteClass(classToDelete.id);
      toast.success('Fitness class deleted successfully!');
      setIsDeleteDialogOpen(false);
      setClassToDelete(null);
    }
  };

  const handleFormSubmit = (data: Omit<FitnessClassDto, 'id' | 'bookedSlots' | 'trainerName'>): void => {
    if (editingClass) {
      updateClass({ id: editingClass.id, request: { ...editingClass, ...data, trainerName: trainers?.find(t => t.id === data.trainerId)?.name || '' } });
      toast.success('Fitness class updated successfully!');
      setIsFormOpen(false);
      setEditingClass(null);
    } else {
      createClass({ id: 0, ...data, bookedSlots: 0, trainerName: trainers?.find(t => t.id === data.trainerId)?.name || '' });
      toast.success('Fitness class created successfully!');
      setIsFormOpen(false);
    }
  };

  if (isLoading || isLoadingTrainers) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-6">Manage Fitness Classes</h1>
          <p>Loading classes...</p>
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-6">Manage Fitness Classes</h1>
          <p className="text-red-500">Error loading classes: {error?.message}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Manage Fitness Classes</h1>
          <Button
            onClick={handleOpenCreateForm}
            className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
            data-testid="add-class-button"
          >
            Add New Class
          </Button>
        </div>

        <ClassTable classes={classes || []} onEdit={handleEditClass} onDelete={handleDeleteClass} />

        <ClassForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          initialData={editingClass}
          trainers={trainers || []}
          onSubmit={handleFormSubmit}
        />

        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          itemToDeleteName={classToDelete?.name || 'fitness class'}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminClassesPage;