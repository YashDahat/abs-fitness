import type { JSX } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BookingDto } from '@/types/booking';

interface BookingTableProps {
  bookings: BookingDto[];
}

export function BookingTable({ bookings }: BookingTableProps): React.JSX.Element {
  const formatDate = (isoString: string): string => {
    return new Date(isoString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Class Name</TableHead>
            <TableHead>Schedule Time</TableHead>
            <TableHead>Booking Time</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No bookings found.
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.id}</TableCell>
                <TableCell>{booking.userId}</TableCell>
                <TableCell>{booking.fitnessClassName}</TableCell>
                <TableCell>{formatDate(booking.scheduleTime)}</TableCell>
                <TableCell>{formatDate(booking.bookingTime)}</TableCell>
                <TableCell>{booking.status}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}