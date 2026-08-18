'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import MembershipPlanTable from '@/components/admin/MembershipPlanTable';
import MembershipPlanForm from '@/components/admin/MembershipPlanForm';
import { MembershipPlanDto } from '@/types/membership';

export default function AdminMembershipsPage() {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlanDto | undefined>(undefined);

  const handleEditPlan = (plan: MembershipPlanDto): void => {
    setSelectedPlan(plan);
    setIsFormOpen(true);
  };

  const handleNewPlan = (): void => {
    setSelectedPlan(undefined);
    setIsFormOpen(true);
  };

  const handleFormSuccess = (): void => {
    setIsFormOpen(false);
    setSelectedPlan(undefined);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Membership Plans</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNewPlan} data-testid="add-membership-plan-button">
              <PlusCircleIcon className="mr-2 h-4 w-4" /> Add New Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedPlan ? 'Edit Membership Plan' : 'Create New Membership Plan'}</DialogTitle>
            </DialogHeader>
            <MembershipPlanForm initialData={selectedPlan} onSuccess={handleFormSuccess} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-6">
        <MembershipPlanTable onEdit={handleEditPlan} />
      </div>
    </div>
  );
}