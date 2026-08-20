import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TrainerTable } from '@/components/trainers/TrainerTable';
import { TrainerForm } from '@/components/trainers/TrainerForm';
import { DeleteConfirmationDialog } from '@/components/shared/DeleteConfirmationDialog';
import { useAdminGetAllTrainers, useCreateTrainer, useUpdateTrainer, useDeleteTrainer } from '@/hooks/trainerHooks';
import { TrainerDto } from '@/types/trainer';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminTrainersPage() {
  const { data: trainers, isLoading, isError, error } = useAdminGetAllTrainers();
  const { mutate: createTrainer } = useCreateTrainer();
  const { mutate: updateTrainer } = useUpdateTrainer();
  const { mutate: deleteTrainer } = useDeleteTrainer();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerDto | null>(null);
  const [trainerToDeleteId, setTrainerToDeleteId] = useState<string | null>(null);

  const handleCreateTrainer = (data: TrainerDto): void => {
    createTrainer(data, {
      onSuccess: () => {
        toast.success('Trainer created successfully.');
        setIsFormOpen(false);
        setSelectedTrainer(null);
      },
      onError: (err) => {
        toast.error(`Failed to create trainer: ${err.message}`);
      },
    });
  };

  const handleEditTrainer = (trainer: TrainerDto): void => {
    setSelectedTrainer(trainer);
    setIsFormOpen(true);
  };

  const handleUpdateTrainer = (data: TrainerDto): void => {
    if (selectedTrainer) {
      updateTrainer(
        { id: selectedTrainer.id.toString(), request: data },
        {
          onSuccess: () => {
            toast.success('Trainer updated successfully.');
            setIsFormOpen(false);
            setSelectedTrainer(null);
          },
          onError: (err) => {
            toast.error(`Failed to update trainer: ${err.message}`);
          },
        },
      );
    }
  };

  const handleDeleteTrainer = (id: string): void => {
    setTrainerToDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteTrainer = (): void => {
    if (trainerToDeleteId) {
      deleteTrainer(trainerToDeleteId, {
        onSuccess: () => {
          toast.success('Trainer deleted successfully.');
          setIsDeleteDialogOpen(false);
          setTrainerToDeleteId(null);
        },
        onError: (err) => {
          toast.error(`Failed to delete trainer: ${err.message}`);
        },
      });
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Trainers</h1>
          <Skeleton className="w-32 h-10" />
        </div>
        <Skeleton className="h-[500px] w-full" />
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="text-red-500">Error loading trainers: {error?.message}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Trainers</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedTrainer(null)} data-testid="add-trainer-cta">Add New Trainer</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedTrainer ? 'Edit Trainer' : 'Create New Trainer'}</DialogTitle>
            </DialogHeader>
            <TrainerForm
              initialData={selectedTrainer || undefined}
              onSubmit={selectedTrainer ? handleUpdateTrainer : handleCreateTrainer}
            />
          </DialogContent>
        </Dialog>
      </div>

      <TrainerTable trainers={trainers || []} onEdit={handleEditTrainer} onDelete={handleDeleteTrainer} />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDeleteTrainer}
        title="Confirm Delete"
        description="Are you sure you want to delete this trainer? This action cannot be undone."
      />
    </AdminLayout>
  );
}