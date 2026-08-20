import type { JSX } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { BookingDto, BookingStatus } from '@/types/booking';

interface BookingTableProps {
  bookings: BookingDto[];
  onCancel: (bookingId: string) => void;
}

export function BookingTable({ bookings, onCancel }: BookingTableProps): React.JSX.Element {
  const getStatusColor = (status: BookingStatus): string => {
    switch (status) {
      case 'CONFIRMED':
        return 'text-green-600';
      case 'CANCELLED':
        return 'text-red-600';
      case 'PENDING':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="rounded-md border">
      <Table data-testid="booking-table">
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Class Name</TableHead>
            <TableHead>Schedule Time</TableHead>
            <TableHead>Duration (minutes)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No bookings found.
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking) => (
              <TableRow key={booking.id} data-testid={`booking-row-${booking.id}`}>
                <TableCell>{booking.id}</TableCell>
                <TableCell>{booking.fitnessClassName}</TableCell>
                <TableCell>{new Date(booking.bookingTime).toLocaleString()}</TableCell>
                <TableCell>—</TableCell>
                <TableCell className={getStatusColor(booking.status)}>{booking.status}</TableCell>
                <TableCell className="text-right">
                  {booking.status === 'CONFIRMED' && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onCancel(booking.id.toString())}
                      data-testid={`cancel-booking-${booking.id}`}
                    >
                      Cancel
                    </Button>
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