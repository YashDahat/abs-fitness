import { BookingDto, BookingStatus } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface BookingsListProps {
  bookings: BookingDto[];
  onCancelBooking: (id: string) => void;
}

export default function BookingsList({ bookings, onCancelBooking }: BookingsListProps) {
  const getStatusClass = (status: BookingStatus): string => {
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
    <div className="space-y-4">
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <Card key={booking.id} className="shadow-md">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{booking.fitnessClassName}</span>
                <span className={cn('text-sm font-semibold', getStatusClass(booking.status))}>
                  {booking.status}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <span className="font-medium">Trainer:</span> {booking.trainerName}
              </p>
              <p>
                <span className="font-medium">Scheduled:</span>{' '}
                {format(new Date(booking.bookingTime), 'PPP p')}
              </p>
              {booking.status === 'CONFIRMED' && (
                <Button
                  variant="destructive"
                  onClick={() => onCancelBooking(booking.id.toString())}
                  className="mt-2"
                  data-testid={`cancel-booking-${booking.id}`}
                >
                  Cancel Booking
                </Button>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}