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
import { FitnessClassDto } from '@/types/fitnessClass';
import { useCreateBooking } from '@/hooks/bookingHooks';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  fitnessClass: FitnessClassDto | null;
}

export default function BookingModal({
  isOpen,
  onClose,
  fitnessClass,
}: BookingModalProps) {
  const { mutate: createBooking, isPending } = useCreateBooking();
  const [isBookingConfirmed, setIsBookingConfirmed] = useState<boolean>(false);

  const handleConfirmBooking = (): void => {
    if (fitnessClass) {
      createBooking(
        { fitnessClassId: fitnessClass.id },
        {
          onSuccess: () => {
            toast.success('Booking successful!');
            setIsBookingConfirmed(true);
            onClose();
          },
          onError: (error) => {
            toast.error(`Booking failed: ${error.message}`);
          },
        },
      );
    }
  };

  if (!fitnessClass) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle data-testid="booking-modal-title">Confirm Booking</DialogTitle>
          <DialogDescription>
            Review the class details and confirm your booking.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-semibold">Class:</span>
            <span className="col-span-3" data-testid="booking-modal-class-name">{fitnessClass.name}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-semibold">Trainer:</span>
            <span className="col-span-3" data-testid="booking-modal-trainer-name">{fitnessClass.trainerName}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-semibold">Time:</span>
            <span className="col-span-3" data-testid="booking-modal-schedule-time">
              {format(new Date(fitnessClass.scheduleTime), 'PPP p')}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 font-semibold">Duration:</span>
            <span className="col-span-3" data-testid="booking-modal-duration">{fitnessClass.durationMinutes} minutes</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} data-testid="booking-modal-cancel-button">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmBooking}
            disabled={isPending}
            data-testid="booking-modal-confirm-button"
          >
            {isPending ? 'Booking...' : 'Confirm Booking'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}