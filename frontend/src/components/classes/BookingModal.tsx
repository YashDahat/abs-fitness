import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCreateBooking, useGymClass } from '@/hooks/useBooking';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  gymClassId: number | null;
}

export default function BookingModal({ isOpen, onClose, gymClassId }: BookingModalProps) {
  const { data: gymClass, isLoading: isLoadingClass } = useGymClass(gymClassId ?? 0);
  const { mutate: createBooking, isPending: isBookingPending } = useCreateBooking();
  const { isAuthenticated } = useAuth();

  const handleBooking = () => {
    if (!gymClassId) {
      toast.error('No class selected for booking.');
      return;
    }

    createBooking(
      { gymClassId },
      {
        onSuccess: () => {
          toast.success('Class booked successfully!');
          onClose();
        },
        onError: (error) => {
          toast.error(`Failed to book class: ${error.message}`);
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Your Booking</DialogTitle>
          <DialogDescription>
            Review the class details and confirm your booking.
          </DialogDescription>
        </DialogHeader>
        {isLoadingClass ? (
          <div className="text-center py-4">Loading class details...</div>
        ) : gymClass ? (
          <div className="space-y-4 py-4">
            <p className="text-lg font-semibold">{gymClass.name}</p>
            <p className="text-sm text-gray-600">
              Trainer: {gymClass.trainerName}
            </p>
            <p className="text-sm text-gray-600">
              Time: {new Date(gymClass.startTime).toLocaleTimeString()} -{' '}
              {new Date(gymClass.endTime).toLocaleTimeString()}
            </p>
            <p className="text-sm text-gray-600">
              Capacity: {gymClass.bookedSlots}/{gymClass.capacity}
            </p>
            <p className="text-sm text-gray-600">{gymClass.description}</p>
          </div>
        ) : (
          <div className="text-center py-4 text-red-500">
            Class details not found.
          </div>
        )}
        <DialogFooter>
          {!isAuthenticated ? (
            <div className="flex flex-col items-center w-full space-y-2">
              <p className="text-sm text-gray-600">Please log in to book a class.</p>
              <Button asChild className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full transition-all duration-200" data-testid="login-to-book-cta">
                <Link to={ROUTES.LOGIN}>Login</Link>
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleBooking}
              disabled={isBookingPending || !gymClassId}
              className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full transition-all duration-200"
              data-testid="confirm-booking-cta"
            >
              {isBookingPending ? 'Booking...' : 'Confirm Booking'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}