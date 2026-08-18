import { useAllEnquiries, useUpdateEnquiryStatus } from '@/hooks/useContent';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EnquiryDto, EnquiryStatus } from '@/types/enquiry';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Loader2 } from 'lucide-react';

export default function EnquiryTable() {
  const { data: enquiries, isLoading, isError, error } = useAllEnquiries();
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdateEnquiryStatus();
  const [openDialogId, setOpenDialogId] = useState<number | null>(null);

  const handleUpdateStatus = (id: number) => {
    updateStatus(String(id), {
      onSuccess: () => {
        toast.success('Enquiry status updated successfully.');
        setOpenDialogId(null);
      },
      onError: (err) => {
        toast.error('Failed to update enquiry status.', {
          description: err.message,
        });
        setOpenDialogId(null);
      },
    });
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading enquiries...</div>;
  }

  if (isError) {
    return <div className="text-center py-8 text-red-500">Error: {error?.message}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table data-testid="enquiry-table">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Submission Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enquiries?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No enquiries found.
              </TableCell>
            </TableRow>
          ) : (
            enquiries?.map((enquiry: EnquiryDto) => (
              <TableRow key={enquiry.id} data-testid={`enquiry-row-${enquiry.id}`}>
                <TableCell>{enquiry.name}</TableCell>
                <TableCell>{enquiry.email}</TableCell>
                <TableCell>{enquiry.phone}</TableCell>
                <TableCell className="max-w-xs truncate">{enquiry.message}</TableCell>
                <TableCell>{format(new Date(enquiry.submissionTime), 'PPP p')}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      enquiry.status === 'NEW'
                        ? 'bg-blue-500'
                        : enquiry.status === 'CONTACTED'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                    }
                  >
                    {enquiry.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {enquiry.status !== 'CLOSED' && (
                    <AlertDialog open={openDialogId === enquiry.id} onOpenChange={(isOpen) => setOpenDialogId(isOpen ? enquiry.id : null)}>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" data-testid={`update-status-button-${enquiry.id}`}>
                          Update Status
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Update Enquiry Status</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to update the status of this enquiry to the next stage?
                            Current status: {enquiry.status}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleUpdateStatus(enquiry.id)}
                            disabled={isUpdatingStatus}
                            data-testid={`confirm-update-status-button-${enquiry.id}`}
                          >
                            {isUpdatingStatus && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}