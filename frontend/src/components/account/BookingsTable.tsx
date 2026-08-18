import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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
import { useCancelBooking, useMyBookings } from '@/hooks/useBooking';
import type { BookingDto } from '@/types/booking';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

interface BookingsTableProps {
  bookings: BookingDto[];
}

export default function BookingsTable({ bookings }: BookingsTableProps): React.JSX.Element {
  const { mutate: cancelBookingMutation, isPending: isCancelling } = useCancelBooking();
  const { isLoading: isLoadingBookings } = useMyBookings();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);

  const handleCancelBooking = (bookingId: number): void => {
    setSelectedBookingId(bookingId);
    setOpenDialog(true);
  };

  const confirmCancel = (): void => {
    if (selectedBookingId !== null) {
      cancelBookingMutation(selectedBookingId, {
        onSuccess: () => {
          toast.success('Booking cancelled successfully.');
          setOpenDialog(false);
          setSelectedBookingId(null);
        },
        onError: (error) => {
          toast.error(`Failed to cancel booking: ${error.message}`);
          setOpenDialog(false);
          setSelectedBookingId(null);
        },
      });
    }
  };

  if (isLoadingBookings) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        You have no bookings yet.
      </div>
    );
  }

  return (
    <>
      <Table data-testid="bookings-table">
        <TableHeader>
          <TableRow>
            <TableHead>Class Name</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Trainer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id} data-testid={`booking-row-${booking.id}`}>
              <TableCell className="font-medium">{booking.gymClassName}</TableCell>
              <TableCell>{format(parseISO(booking.gymClassStartTime), 'MMM dd, yyyy HH:mm')}</TableCell>
              <TableCell>{format(parseISO(booking.gymClassEndTime), 'HH:mm')}</TableCell>
              <TableCell>{booking.trainerName}</TableCell>
              <TableCell>{booking.status}</TableCell>
              <TableCell className="text-right">
                {booking.status === 'CONFIRMED' && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleCancelBooking(booking.id)}
                    disabled={isCancelling}
                    data-testid={`cancel-booking-button-${booking.id}`}
                  >
                    Cancel
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently cancel your booking.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="cancel-dialog-cancel-button">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel} disabled={isCancelling} data-testid="cancel-dialog-confirm-button">
              {isCancelling ? 'Cancelling...' : 'Continue'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}