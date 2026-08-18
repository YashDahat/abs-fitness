import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ClassTable from '@/components/admin/ClassTable';
import ClassForm from '@/components/admin/ClassForm';
import type { GymClassDto } from '@/types/gym';

export default function AdminClassesPage() {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<GymClassDto | undefined>(undefined);

  const handleCreateNewClass = (): void => {
    setSelectedClass(undefined);
    setIsFormOpen(true);
  };

  const handleEditClass = (gymClass: GymClassDto): void => {
    setSelectedClass(gymClass);
    setIsFormOpen(true);
  };

  const handleFormSuccess = (): void => {
    setIsFormOpen(false);
    setSelectedClass(undefined);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Manage Classes</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreateNewClass} data-testid="create-class-button">
              Add New Class
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedClass ? 'Edit Class' : 'Create New Class'}</DialogTitle>
            </DialogHeader>
            <ClassForm initialData={selectedClass} onSuccess={handleFormSuccess} />
          </DialogContent>
        </Dialog>
      </div>
      <ClassTable onEdit={handleEditClass} />
    </AdminLayout>
  );
}