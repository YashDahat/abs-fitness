import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { EnquiryDto } from '@/types/enquiry';

interface EnquiryTableProps {
  enquiries: EnquiryDto[];
  onViewDetails: (id: number) => void;
}

export function EnquiryTable({ enquiries, onViewDetails }: EnquiryTableProps) {
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryDto | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState<boolean>(false);

  const handleViewDetailsClick = (enquiry: EnquiryDto): void => {
    setSelectedEnquiry(enquiry);
    setIsDetailsDialogOpen(true);
    onViewDetails(enquiry.id);
  };

  const handleCloseDetailsDialog = (): void => {
    setIsDetailsDialogOpen(false);
    setSelectedEnquiry(null);
  };

  return (
    <div className="overflow-x-auto">
      <Table data-testid="enquiry-table">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Received At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {enquiries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No enquiries found.
              </TableCell>
            </TableRow>
          ) : (
            enquiries.map((enquiry) => (
              <TableRow key={enquiry.id} data-testid={`enquiry-row-${enquiry.id}`}>
                <TableCell>{enquiry.name}</TableCell>
                <TableCell>{enquiry.email}</TableCell>
                <TableCell>{enquiry.phone}</TableCell>
                <TableCell className="max-w-xs truncate">{enquiry.message}</TableCell>
                <TableCell>{new Date(enquiry.createdAt).toLocaleString()}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetailsClick(enquiry)}
                    data-testid={`view-details-button-${enquiry.id}`}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle data-testid="enquiry-details-title">Enquiry Details</DialogTitle>
            <DialogDescription>
              Details of the selected enquiry.
            </DialogDescription>
          </DialogHeader>
          {selectedEnquiry && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium col-span-1">Name:</span>
                <span className="col-span-3" data-testid="enquiry-detail-name">{selectedEnquiry.name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium col-span-1">Email:</span>
                <span className="col-span-3" data-testid="enquiry-detail-email">{selectedEnquiry.email}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium col-span-1">Phone:</span>
                <span className="col-span-3" data-testid="enquiry-detail-phone">{selectedEnquiry.phone}</span>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <span className="text-sm font-medium col-span-1">Message:</span>
                <span className="col-span-3 break-words" data-testid="enquiry-detail-message">{selectedEnquiry.message}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-sm font-medium col-span-1">Received At:</span>
                <span className="col-span-3" data-testid="enquiry-detail-createdAt">{new Date(selectedEnquiry.createdAt).toLocaleString()}</span>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button onClick={handleCloseDetailsDialog} data-testid="enquiry-details-close-button">Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}