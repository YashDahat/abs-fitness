import { useState } from 'react';
import { useAvailableFitnessClasses } from '@/hooks/fitnessClassHooks';
import { useCreateBooking } from '@/hooks/bookingHooks';
import { FitnessClassDto } from '@/types/fitnessClass';
import { BookingDto } from '@/types/booking';
import { ClassSchedule } from '@/components/classes/ClassSchedule';
import ClassBookingModal from '@/components/classes/ClassBookingModal';
import { toast } from 'sonner';

export default function ClassesPage() {
  const { data: classes, isLoading, isError, error } = useAvailableFitnessClasses();
  const { mutate: createBooking } = useCreateBooking();

  const [selectedClass, setSelectedClass] = useState<FitnessClassDto | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  const handleSelectClass = (cls: FitnessClassDto): void => {
    setSelectedClass(cls);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = (): void => {
    setIsBookingModalOpen(false);
    setSelectedClass(null);
  };

  const handleBookingSuccess = (booking: BookingDto): void => {
    toast.success(`Booking confirmed for ${booking.fitnessClassName} at ${booking.scheduleTime}`);
    handleCloseBookingModal();
    // Optionally, refetch classes to update available slots
    // queryClient.invalidateQueries(['availableFitnessClasses']);
  };

  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#1A1A1A]">Loading Classes...</h1>
          <p className="mt-4 text-lg text-[#1A1A1A]">Please wait while we fetch the schedule.</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-red-600">Error</h1>
          <p className="mt-4 text-lg text-[#1A1A1A]">Failed to load classes: {error?.message}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(/images/classes-hero.jpg)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold" data-testid="classes-hero-title">Our Class Schedule</h1>
          <p className="mt-4 text-lg md:text-xl leading-relaxed">
            Find your perfect workout and book a spot today!
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 text-[#1A1A1A]">Weekly Schedule</h2>
          {classes && classes.length > 0 ? (
            <ClassSchedule classes={classes} onSelectClass={handleSelectClass} />
          ) : (
            <div className="text-center text-gray-600">
              <p className="text-lg">No classes available at the moment. Please check back later!</p>
            </div>
          )}
        </div>
      </section>

      <ClassBookingModal
        classToBook={selectedClass}
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        onBookingSuccess={handleBookingSuccess}
      />
    </>
  );
}