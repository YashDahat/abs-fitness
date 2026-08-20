import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { BookingTable } from '@/components/bookings/BookingTable';
import { DeleteConfirmationDialog } from '@/components/shared/DeleteConfirmationDialog';
import { useBookings, useAdminCancelBooking } from '@/hooks/bookingHooks';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminBookingsPage() {
  const { data: bookings, isLoading, isError, error } = useBookings();
  const { mutate: cancelBooking, isPending: isCancelling } = useAdminCancelBooking();

  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState<boolean>(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  const handleCancelClick = (bookingId: string): void => {
    setSelectedBookingId(bookingId);
    setIsCancelDialogOpen(true);
  };

  const handleConfirmCancel = async (): Promise<void> => {
    if (selectedBookingId) {
      try {
        await cancelBooking(selectedBookingId);
        toast.success('Booking cancelled successfully.');
        setIsCancelDialogOpen(false);
        setSelectedBookingId(null);
      } catch (err: unknown) {
        toast.error(`Failed to cancel booking: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    }
  };

  const handleCloseCancelDialog = (): void => {
    setIsCancelDialogOpen(false);
    setSelectedBookingId(null);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="text-center text-red-500">
          Error loading bookings: {error?.message}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Bookings</h1>
          {bookings && bookings.length > 0 ? (
            <BookingTable bookings={bookings} onCancel={handleCancelClick} />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No bookings found.</p>
            </div>
          )}
        </div>
      </section>

      <DeleteConfirmationDialog
        isOpen={isCancelDialogOpen}
        onClose={handleCloseCancelDialog}
        onConfirm={handleConfirmCancel}
        title="Cancel Booking"
        description="Are you sure you want to cancel this booking? This action cannot be undone."
      />
    </AdminLayout>
  );
}