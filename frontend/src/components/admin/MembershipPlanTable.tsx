'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { useAdminMembershipPlans, useDeleteAdminMembershipPlan } from '@/hooks/useMembership';
import { MembershipPlanDto } from '@/types/membership';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface MembershipPlanTableProps {
  onEdit: (plan: MembershipPlanDto) => void;
}

export default function MembershipPlanTable({ onEdit }: MembershipPlanTableProps) {
  const { data: membershipPlans, isLoading, isError, error } = useAdminMembershipPlans();
  const { mutate: deletePlan, isPending: isDeleting } = useDeleteAdminMembershipPlan();
  const [deletePlanId, setDeletePlanId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setDeletePlanId(id);
  };

  const confirmDelete = () => {
    if (deletePlanId !== null) {
      deletePlan(deletePlanId, {
        onSuccess: () => {
          toast.success('Membership plan deleted successfully.');
          setDeletePlanId(null);
        },
        onError: (err) => {
          toast.error('Failed to delete membership plan.', {
            description: err.message,
          });
          setDeletePlanId(null);
        },
      });
    }
  };

  if (isLoading) {
    return <div>Loading membership plans...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      <Table data-testid="membership-plan-table">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Duration (Months)</TableHead>
            <TableHead>Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {membershipPlans?.map((plan) => (
            <TableRow key={plan.id} data-testid={`membership-plan-row-${plan.id}`}>
              <TableCell>{plan.name}</TableCell>
              <TableCell>{plan.description}</TableCell>
              <TableCell>${plan.price.toFixed(2)}</TableCell>
              <TableCell>{plan.durationInMonths}</TableCell>
              <TableCell>{plan.isActive ? 'Yes' : 'No'}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(plan)}
                  data-testid={`edit-membership-plan-${plan.id}`}
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(plan.id)}
                  data-testid={`delete-membership-plan-${plan.id}`}
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={deletePlanId !== null} onOpenChange={(open) => !open && setDeletePlanId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the membership plan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={isDeleting} data-testid="confirm-delete-membership-plan">
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}