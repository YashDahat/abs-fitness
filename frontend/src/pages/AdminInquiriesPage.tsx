import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { InquiryTable } from '@/components/inquiry/InquiryTable';
import InquiryDetailView from '@/components/inquiry/InquiryDetailView';
import DeleteConfirmationDialog from '@/components/shared/DeleteConfirmationDialog';
import { useInquiries, useDeleteInquiry } from '@/hooks/inquiryHooks';
import { InquiryDto } from '@/types/inquiry';
import { toast } from 'sonner';

const AdminInquiriesPage = () => {
  const { data: inquiries, isLoading, isError, error } = useInquiries();
  const { mutate: deleteInquiry } = useDeleteInquiry();

  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryDto | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [inquiryToDelete, setInquiryToDelete] = useState<InquiryDto | null>(null);

  const handleViewInquiry = (inquiry: InquiryDto): void => {
    setSelectedInquiry(inquiry);
    setIsDetailViewOpen(true);
  };

  const handleDeleteInquiry = (inquiryId: number): void => {
    const inquiry = inquiries?.find(i => i.id === inquiryId) || null;
    setInquiryToDelete(inquiry);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = (): void => {
    if (inquiryToDelete) {
      deleteInquiry(inquiryToDelete.id);
      toast.success('Inquiry deleted successfully!');
      setIsDeleteDialogOpen(false);
      setInquiryToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">Manage Inquiries</h1>
          <p>Loading inquiries...</p>
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">Manage Inquiries</h1>
          <p className="text-red-500">Error loading inquiries: {error?.message}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Manage Inquiries</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          {inquiries && inquiries.length > 0 ? (
            <InquiryTable
              inquiries={inquiries}
              onView={handleViewInquiry}
              onDelete={handleDeleteInquiry}
            />
          ) : (
            <p className="text-center text-gray-500">No inquiries found.</p>
          )}
        </div>

        <InquiryDetailView
          isOpen={isDetailViewOpen}
          onClose={() => setIsDetailViewOpen(false)}
          inquiry={selectedInquiry}
        />

        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          itemToDeleteName={inquiryToDelete?.name || 'inquiry'}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminInquiriesPage;