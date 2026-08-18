import { useState } from 'react';
import { useAdminAllBookings } from '@/hooks/useBooking';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BookingDto } from '@/types/booking';
import { ArrowUpDown } from 'lucide-react';

type SortKey = keyof BookingDto;

export default function BookingsOverviewTable() {
  const { data: bookings, isLoading, isError, error } = useAdminAllBookings();
  const [filter, setFilter] = useState<string>('');
  const [sortKey, setSortKey] = useState<SortKey>('bookingTime');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilter(e.target.value);
  };

  const handleSort = (key: SortKey): void => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const filteredBookings = bookings?.filter(booking =>
    booking.gymClassName.toLowerCase().includes(filter.toLowerCase()) ||
    booking.trainerName.toLowerCase().includes(filter.toLowerCase()) ||
    booking.status.toLowerCase().includes(filter.toLowerCase())
  ) || [];

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  if (isLoading) {
    return <div>Loading bookings...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Filter bookings..."
        value={filter}
        onChange={handleFilterChange}
        className="max-w-sm"
        data-testid="booking-filter-input"
      />
      <div className="rounded-md border">
        <Table data-testid="bookings-overview-table">
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('gymClassName')} data-testid="sort-gymClassName">
                  Class Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('gymClassStartTime')} data-testid="sort-gymClassStartTime">
                  Start Time
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('trainerName')} data-testid="sort-trainerName">
                  Trainer
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('bookingTime')} data-testid="sort-bookingTime">
                  Booking Time
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('status')} data-testid="sort-status">
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedBookings.length > 0 ? (
              sortedBookings.map((booking) => (
                <TableRow key={booking.id} data-testid={`booking-row-${booking.id}`}>
                  <TableCell>{booking.gymClassName}</TableCell>
                  <TableCell>{new Date(booking.gymClassStartTime).toLocaleString()}</TableCell>
                  <TableCell>{booking.trainerName}</TableCell>
                  <TableCell>{new Date(booking.bookingTime).toLocaleString()}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}