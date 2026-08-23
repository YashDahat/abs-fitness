import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import TrainerTable from '@/components/trainer/TrainerTable';
import { TrainerForm } from '@/components/trainer/TrainerForm';
import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import { useAdminGetAllTrainers, useCreateTrainer, useUpdateTrainer, useDeleteTrainer } from '@/hooks/trainerHooks';
import { TrainerDto } from '@/types/trainer';
import { toast } from 'sonner';

const AdminTrainersPage = () => {
  const { data: trainers, isLoading, isError, error } = useAdminGetAllTrainers();
  const { mutate: createTrainer } = useCreateTrainer();
  const { mutate: updateTrainer } = useUpdateTrainer();
  const { mutate: deleteTrainer } = useDeleteTrainer();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState<TrainerDto | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [trainerToDelete, setTrainerToDelete] = useState<TrainerDto | null>(null);

  const handleCreateNew = () => {
    setEditingTrainer(null);
    setIsFormOpen(true);
  };

  const handleEditTrainer = (trainer: TrainerDto) => {
    setEditingTrainer(trainer);
    setIsFormOpen(true);
  };

  const handleDeleteTrainer = (trainer: TrainerDto) => {
    setTrainerToDelete(trainer);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (trainerToDelete) {
      deleteTrainer(trainerToDelete.id, {
        onSuccess: () => {
          toast.success(`Trainer ${trainerToDelete.name} deleted successfully.`);
          setIsDeleteDialogOpen(false);
          setTrainerToDelete(null);
        },
        onError: (err) => {
          toast.error(`Failed to delete trainer: ${err.message}`);
        },
      });
    }
  };

  const handleSubmit = (data: Omit<TrainerDto, 'id'>) => {
    if (editingTrainer) {
      updateTrainer(
        { id: editingTrainer.id, request: data as TrainerDto },
        {
          onSuccess: () => {
            toast.success(`Trainer ${data.name} updated successfully.`);
            setIsFormOpen(false);
            setEditingTrainer(null);
          },
          onError: (err) => {
            toast.error(`Failed to update trainer: ${err.message}`);
          },
        },
      );
    } else {
      createTrainer(data as TrainerDto, {
        onSuccess: () => {
          toast.success(`Trainer ${data.name} created successfully.`);
          setIsFormOpen(false);
        },
        onError: (err) => {
          toast.error(`Failed to create trainer: ${err.message}`);
        },
      });
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">Manage Trainers</h1>
          <p>Loading trainers...</p>
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">Manage Trainers</h1>
          <p className="text-red-500">Error loading trainers: {error?.message}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Manage Trainers</h1>
            <Button onClick={handleCreateNew} data-testid="create-trainer-cta">
              Add New Trainer
            </Button>
          </div>

          {trainers && trainers.length > 0 ? (
            <TrainerTable trainers={trainers} onEdit={handleEditTrainer} onDelete={handleDeleteTrainer} />
          ) : (
            <p className="text-gray-600">No trainers found. Add a new trainer to get started.</p>
          )}

          <TrainerForm
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            initialData={editingTrainer}
            onSubmit={handleSubmit}
          />

          <DeleteConfirmationDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onConfirm={confirmDelete}
            itemToDeleteName={trainerToDelete?.name || 'trainer'}
          />
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminTrainersPage;