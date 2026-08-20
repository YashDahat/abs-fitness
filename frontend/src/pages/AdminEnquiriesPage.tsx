import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { EnquiryTable } from '@/components/enquiries/EnquiryTable';
import { useEnquiries, useEnquiryById } from '@/hooks/enquiryHooks';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function AdminEnquiriesPage() {
  const { data: enquiries, isLoading, isError, error } = useEnquiries();
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState<boolean>(false);
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<number | null>(null);

  const { data: selectedEnquiry, isLoading: isLoadingSelectedEnquiry } = useEnquiryById(
    selectedEnquiryId ? String(selectedEnquiryId) : ''
  );

  const handleViewDetails = (id: number): void => {
    setSelectedEnquiryId(id);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = (): void => {
    setIsDetailsModalOpen(false);
    setSelectedEnquiryId(null);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-4">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="text-red-500">Error: {error?.message || 'Failed to load enquiries.'}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-6">Manage Enquiries</h1>
          {enquiries && enquiries.length > 0 ? (
            <EnquiryTable enquiries={enquiries} onViewDetails={handleViewDetails} />
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600">No enquiries found.</p>
            </div>
          )}
        </div>
      </section>

      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
            <DialogDescription>
              View the full details of the selected enquiry.
            </DialogDescription>
          </DialogHeader>
          {isLoadingSelectedEnquiry ? (
            <div className="space-y-4 py-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : selectedEnquiry ? (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value={selectedEnquiry.name} readOnly className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" value={selectedEnquiry.email} readOnly className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" value={selectedEnquiry.phone} readOnly className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="message" className="text-right">
                  Message
                </Label>
                <Textarea id="message" value={selectedEnquiry.message} readOnly className="col-span-3 h-24" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="createdAt" className="text-right">
                  Submitted At
                </Label>
                <Input id="createdAt" value={new Date(selectedEnquiry.createdAt).toLocaleString()} readOnly className="col-span-3" />
              </div>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-600">Enquiry details not found.</div>
          )}
          <div className="flex justify-end">
            <Button onClick={handleCloseDetailsModal}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}