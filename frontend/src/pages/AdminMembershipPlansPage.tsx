import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import MembershipPlanTable from '@/components/membership/MembershipPlanTable';
import { MembershipPlanForm } from '@/components/membership/MembershipPlanForm';
import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import {
  useMembershipPlans,
  useCreateMembershipPlan,
  useUpdateMembershipPlan,
  useDeleteMembershipPlan,
} from '@/hooks/membershipHooks';
import { MembershipPlanDto } from '@/types/membership';
import { toast } from 'sonner';

const AdminMembershipPlansPage = () => {
  const { data: plans, isLoading, isError, error } = useMembershipPlans();
  const { mutate: createPlan } = useCreateMembershipPlan();
  const { mutate: updatePlan } = useUpdateMembershipPlan();
  const { mutate: deletePlan } = useDeleteMembershipPlan();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingPlan, setEditingPlan] = useState<MembershipPlanDto | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [planToDelete, setPlanToDelete] = useState<MembershipPlanDto | null>(null);

  const handleCreateNew = (): void => {
    setEditingPlan(null);
    setIsFormOpen(true);
  };

  const handleEdit = (plan: MembershipPlanDto): void => {
    setEditingPlan(plan);
    setIsFormOpen(true);
  };

  const handleDelete = (planId: number): void => {
    const plan = plans?.find(p => p.id === planId) || null;
    setPlanToDelete(plan);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = (): void => {
    if (planToDelete) {
      deletePlan(planToDelete.id);
      toast.success(`Membership plan "${planToDelete.name}" deleted successfully.`);
      setIsDeleteDialogOpen(false);
      setPlanToDelete(null);
    }
  };

  const handleSubmit = (data: Omit<MembershipPlanDto, 'id'>): void => {
    if (editingPlan) {
      updatePlan({ id: editingPlan.id, request: data as MembershipPlanDto });
      toast.success(`Membership plan "${data.name}" updated successfully.`);
      setIsFormOpen(false);
      setEditingPlan(null);
    } else {
      createPlan(data as MembershipPlanDto);
      toast.success(`Membership plan "${data.name}" created successfully.`);
      setIsFormOpen(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">Membership Plans</h1>
          <p>Loading membership plans...</p>
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">Membership Plans</h1>
          <p className="text-red-500">Error loading plans: {error?.message}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Membership Plans</h1>
          <Button
            onClick={handleCreateNew}
            className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
            data-testid="create-plan-cta"
          >
            Add New Plan
          </Button>
        </div>

        {plans && plans.length > 0 ? (
          <MembershipPlanTable plans={plans} onEdit={handleEdit} onDelete={handleDelete} />
        ) : (
          <p>No membership plans found.</p>
        )}

        <MembershipPlanForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          initialData={editingPlan}
          onSubmit={handleSubmit}
        />

        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          itemToDeleteName={planToDelete?.name || 'membership plan'}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminMembershipPlansPage;