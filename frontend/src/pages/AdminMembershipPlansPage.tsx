import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MembershipPlanTable } from '@/components/membership/MembershipPlanTable';
import { MembershipPlanForm } from '@/components/membership/MembershipPlanForm';
import { DeleteConfirmationDialog } from '@/components/shared/DeleteConfirmationDialog';
import { useAdminGetAllMembershipPlans, useCreateMembershipPlan, useUpdateMembershipPlan, useDeleteMembershipPlan, useMembershipPlanById } from '@/hooks/membershipHooks';
import { MembershipPlanDto } from '@/types/membership';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

const AdminMembershipPlansPage = () => {
  const { data: plans, isLoading, isError, error, refetch } = useAdminGetAllMembershipPlans();
  const createMutation = useCreateMembershipPlan();
  const updateMutation = useUpdateMembershipPlan();
  const deleteMutation = useDeleteMembershipPlan();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

  const { data: selectedPlanData } = useMembershipPlanById(selectedPlanId !== null ? selectedPlanId : -1);

  const handleCreateOrUpdate = async (data: MembershipPlanDto) => {
    try {
      if (selectedPlanId) {
        await updateMutation.mutateAsync({ id: selectedPlanId, request: data });
        toast.success('Membership plan updated successfully!');
      } else {
        await createMutation.mutateAsync(data);
        toast.success('Membership plan created successfully!');
      }
      setIsFormOpen(false);
      setSelectedPlanId(null);
      refetch();
    } catch (err) {
      toast.error('Failed to save membership plan.');
      console.error('Failed to save membership plan:', err);
    }
  };

  const handleDelete = async () => {
    if (selectedPlanId !== null) {
      try {
        await deleteMutation.mutateAsync(selectedPlanId);
        toast.success('Membership plan deleted successfully!');
        setIsDeleteConfirmOpen(false);
        setSelectedPlanId(null);
        refetch();
      } catch (err) {
        toast.error('Failed to delete membership plan.');
        console.error('Failed to delete membership plan:', err);
      }
    }
  };

  const openEditDialog = (plan: MembershipPlanDto) => {
    setSelectedPlanId(plan.id);
    setIsFormOpen(true);
  };

  const openDeleteDialog = (id: number) => {
    setSelectedPlanId(id);
    setIsDeleteConfirmOpen(true);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-[200px] w-full" />
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="text-red-500">Error: {error?.message || 'Failed to load membership plans.'}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Membership Plans</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button data-testid="add-membership-plan-cta" onClick={() => { setSelectedPlanId(null); setIsFormOpen(true); }}>
              Add New Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedPlanId ? 'Edit Membership Plan' : 'Create New Membership Plan'}</DialogTitle>
            </DialogHeader>
            <MembershipPlanForm
              initialData={selectedPlanId ? selectedPlanData : undefined}
              onSubmit={handleCreateOrUpdate}
            />
          </DialogContent>
        </Dialog>
      </div>

      <MembershipPlanTable
        plans={plans || []}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this membership plan? This action cannot be undone."
      />
    </AdminLayout>
  );
};

export default AdminMembershipPlansPage;