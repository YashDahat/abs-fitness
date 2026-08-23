import { useState } from 'react';
import { useMemberBookings, useCancelBooking } from '@/hooks/bookingHooks';
import { BookingDto } from '@/types/booking';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
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
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export default function MyBookingsTable(): React.JSX.Element {
  const { data: bookings, isLoading, isError, error } = useMemberBookings();
  const { mutate: cancelBookingMutation, isPending: isCancelling } = useCancelBooking();
  const [bookingToCancel, setBookingToCancel] = useState<number | null>(null);

  const handleCancelBooking = (bookingId: number): void => {
    setBookingToCancel(bookingId);
  };

  const confirmCancelBooking = (): void => {
    if (bookingToCancel !== null) {
      cancelBookingMutation(bookingToCancel, {
        onSuccess: () => {
          toast.success('Booking cancelled successfully.');
          setBookingToCancel(null);
        },
        onError: (err) => {
          toast.error(`Failed to cancel booking: ${err.message}`);
          setBookingToCancel(null);
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Error loading bookings: {error?.message}</div>;
  }

  if (!bookings || bookings.length === 0) {
    return <div className="text-center py-8 text-gray-600">No bookings found.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
      <Table>
        <TableCaption>A list of your fitness class bookings.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Class Name</TableHead>
            <TableHead>Schedule Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Booking Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking: BookingDto) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">{booking.fitnessClassName}</TableCell>
              <TableCell>
                {new Date(booking.scheduleTime).toLocaleString('en-IN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </TableCell>
              <TableCell>{booking.durationMinutes} mins</TableCell>
              <TableCell>
                {new Date(booking.bookingTime).toLocaleString('en-IN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </TableCell>
              <TableCell>{booking.status}</TableCell>
              <TableCell>
                {booking.status === 'CONFIRMED' && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelBooking(booking.id)}
                        data-testid={`cancel-booking-${booking.id}`}
                      >
                        Cancel
                      </Button>
                    </AlertDialogTrigger>
                    {bookingToCancel === booking.id && (
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently cancel your booking.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setBookingToCancel(null)}>
                            Dismiss
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={confirmCancelBooking}
                            disabled={isCancelling}
                            data-testid={`confirm-cancel-booking-${booking.id}`}
                          >
                            {isCancelling ? 'Cancelling...' : 'Confirm Cancel'}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    )}
                  </AlertDialog>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}