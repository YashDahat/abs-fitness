import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { GymClassDto } from '@/types/gym';
import BookingModal from './BookingModal';

interface ClassCardProps {
  gymClass: GymClassDto;
}

export default function ClassCard({ gymClass }: ClassCardProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  const handleBookNowClick = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-lg" data-testid={`class-card-${gymClass.id}`}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{gymClass.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-2">{gymClass.description}</p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Trainer:</span> {gymClass.trainerName}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Time:</span> {formatTime(gymClass.startTime)} - {formatTime(gymClass.endTime)}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Capacity:</span> {gymClass.bookedSlots}/{gymClass.capacity}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleBookNowClick}
          className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200 w-full"
          data-testid={`book-now-cta-${gymClass.id}`}
        >
          Book Now
        </Button>
      </CardFooter>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        gymClass={gymClass}
      />
    </Card>
  );
}