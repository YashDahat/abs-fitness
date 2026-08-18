import { useState } from 'react';
import { useGymClasses, useCancelBooking } from '@/hooks/useBooking'; // useCancelBooking is a placeholder for useDeleteGymClass
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import type { GymClassDto } from '@/types/gym';
import ClassForm from './ClassForm'; // Assuming ClassForm will be in the same directory

interface ClassTableProps {
  onEdit: (gymClass: GymClassDto) => void;
}

export default function ClassTable({ onEdit }: ClassTableProps) {
  const { data: gymClasses, isLoading, isError, error } = useGymClasses();
  const { mutateAsync: deleteGymClass, isPending: isDeleting } = useCancelBooking(); // Placeholder for actual delete hook

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<GymClassDto | null>(null);

  const handleEditClick = (gymClass: GymClassDto): void => {
    setSelectedClass(gymClass);
    onEdit(gymClass);
    setIsFormOpen(true);
  };

  const handleDeleteClick = async (classId: number): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await deleteGymClass(classId);
        toast.success('Class deleted successfully.');
      } catch (err: unknown) {
        toast.error(`Failed to delete class: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    }
  };

  const handleFormClose = (): void => {
    setIsFormOpen(false);
    setSelectedClass(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Error: {error?.message}</div>;
  }

  return (
    <div className="space-y-4">
      <Table data-testid="class-table">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Booked Slots</TableHead>
            <TableHead>Trainer</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gymClasses?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No classes found.
              </TableCell>
            </TableRow>
          ) : (
            gymClasses?.map((gymClass) => (
              <TableRow key={gymClass.id} data-testid={`class-row-${gymClass.id}`}>
                <TableCell>{gymClass.name}</TableCell>
                <TableCell>{gymClass.description}</TableCell>
                <TableCell>{new Date(gymClass.startTime).toLocaleString()}</TableCell>
                <TableCell>{new Date(gymClass.endTime).toLocaleString()}</TableCell>
                <TableCell>{gymClass.capacity}</TableCell>
                <TableCell>{gymClass.bookedSlots}</TableCell>
                <TableCell>{gymClass.trainerName}</TableCell>
                <TableCell className="text-right">
                  <Dialog open={isFormOpen && selectedClass?.id === gymClass.id} onOpenChange={setIsFormOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditClick(gymClass)} data-testid={`edit-class-${gymClass.id}`}>
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{selectedClass?.id ? 'Edit Class' : 'Create Class'}</DialogTitle>
                        <DialogDescription>
                          {selectedClass?.id ? 'Edit the class details.' : 'Add a new class.'}
                        </DialogDescription>
                      </DialogHeader>
                      <ClassForm gymClass={selectedClass} onClassSaved={handleFormClose} />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick(gymClass.id)}
                    disabled={isDeleting}
                    data-testid={`delete-class-${gymClass.id}`}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}