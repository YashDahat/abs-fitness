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
import { BookingDto, CreateBookingRequest } from '@/types/booking';
import { useCreateBooking } from '@/hooks/bookingHooks';
import { toast } from 'sonner';

interface ClassBookingModalProps {
  classToBook: FitnessClassDto | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: (booking: BookingDto) => void;
}

export default function ClassBookingModal({
  classToBook,
  isOpen,
  onClose,
  onBookingSuccess,
}: ClassBookingModalProps): React.JSX.Element {
  const { mutate: createBooking, isPending } = useCreateBooking();

  const handleConfirmBooking = (): void => {
    if (!classToBook) return;

    const request: CreateBookingRequest = {
      fitnessClassId: classToBook.id,
    };

    createBooking(request, {
      onSuccess: (booking) => {
        toast.success('Class booked successfully!');
        onBookingSuccess(booking);
        onClose();
      },
      onError: (error) => {
        toast.error(`Failed to book class: ${error.message}`);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Class Booking</DialogTitle>
          <DialogDescription>
            Are you sure you want to book this class?
          </DialogDescription>
        </DialogHeader>
        {classToBook && (
          <div className="py-4">
            <h3 className="text-lg font-semibold">{classToBook.name}</h3>
            <p className="text-sm text-gray-600">
              Trainer: {classToBook.trainerName}
            </p>
            <p className="text-sm text-gray-600">
              Time: {new Date(classToBook.scheduleTime).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              Duration: {classToBook.durationMinutes} minutes
            </p>
            <p className="text-sm text-gray-600">
              Available Slots: {classToBook.capacity - classToBook.bookedSlots}
            </p>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose} data-testid="cancel-booking-button">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmBooking}
            disabled={isPending}
            className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold transition-all duration-200"
            data-testid="confirm-booking-button"
          >
            {isPending ? 'Booking...' : 'Confirm Booking'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}