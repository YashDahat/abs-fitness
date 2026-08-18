import BookingsTable from '@/components/account/BookingsTable';
import { useMyBookings } from '@/hooks/useBooking';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function MyBookingsPage(): React.JSX.Element {
  const { data: bookings, isLoading, isError, error } = useMyBookings();

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
          <div className="text-center text-gray-500">Loading bookings...</div>
        </div>
      </ProtectedRoute>
    );
  }

  if (isError) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto py-10">
          <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
          <div className="text-center text-red-500">Error loading bookings: {error?.message}</div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#1A1A1A]">My Bookings</h1>
          <BookingsTable bookings={bookings || []} />
        </div>
      </section>
    </ProtectedRoute>
  );
}