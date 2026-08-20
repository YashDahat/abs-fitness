import { useMemberBookings, useCancelBooking } from '@/hooks/bookingHooks';
import BookingsList from '@/components/account/BookingsList';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { BookingDto } from '@/types/booking';

const MyBookingsPage = () => {
  const { data: bookings, isLoading, isError, error } = useMemberBookings();
  const { mutateAsync: cancelBookingMutation, isPending: isCancelling } = useCancelBooking();

  const handleCancelBooking = async (bookingId: string): Promise<void> => {
    try {
      const updatedBooking = await cancelBookingMutation(bookingId);
      toast.success(`Booking for ${updatedBooking.fitnessClassName} on ${new Date(updatedBooking.bookingTime).toLocaleDateString()} cancelled.`);
    } catch (err: unknown) {
      toast.error(`Failed to cancel booking: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-10">
          <Card>
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 w-1/4 mb-4" />
              <Skeleton className="h-10 w-full mb-2" />
              <Skeleton className="h-10 w-full mb-2" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-10">
          <Card>
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-500">Error loading bookings: {error?.message}</p>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-semibold text-[#1A1A1A]">My Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              {bookings && bookings.length > 0 ? (
                <BookingsList bookings={bookings} onCancelBooking={handleCancelBooking} />
              ) : (
                <p className="text-gray-600">No bookings found.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </AdminLayout>
  );
};

export default MyBookingsPage;