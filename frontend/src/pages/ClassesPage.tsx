import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { useFitnessClasses } from '@/hooks/fitnessClassHooks';
import ClassSchedule from '@/components/classes/ClassSchedule';
import BookingModal from '@/components/classes/BookingModal';
import { FitnessClassDto } from '@/types/fitnessClass';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function ClassesPage() {
  const { data: classes, isLoading, isError } = useFitnessClasses();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<FitnessClassDto | null>(null);

  const handleClassSelect = (fitnessClass: FitnessClassDto): void => {
    setSelectedClass(fitnessClass);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = (): void => {
    setIsBookingModalOpen(false);
    setSelectedClass(null);
  };

  if (isError) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-red-500">
          Error loading classes. Please try again later.
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/classes-hero.jpg')" }}
        data-testid="classes-hero-section"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="classes-hero-headline">
            Achieve Your Fitness Goals with Expert-Led Classes at ABS FITNESS
          </h1>
          <p className="text-lg md:text-xl">
            Diverse classes for all levels, led by certified trainers.
          </p>
        </div>
      </section>

      {/* Class Schedule Section */}
      <section className={cn("py-16 px-4 bg-white")}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10" data-testid="classes-schedule-heading">
            Our Class Schedule
          </h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </Card>
              ))}
            </div>
          ) : (
            <ClassSchedule classes={classes || []} onSelectClass={handleClassSelect} />
          )}
        </div>
      </section>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        fitnessClass={selectedClass}
      />
    </div>
  );
}