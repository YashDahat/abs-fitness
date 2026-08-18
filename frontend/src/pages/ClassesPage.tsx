import ClassSchedule from '@/components/classes/ClassSchedule';
import { useGymClasses } from '@/hooks/useBooking';
import { Skeleton } from '@/components/ui/skeleton';

export default function ClassesPage() {
  const { data: gymClasses, isLoading, isError, error } = useGymClasses();

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">Our Class Schedule</h1>
          <p className="text-xl text-gray-600 mb-8">Find Your Perfect Workout</p>
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Skeleton className="flex-grow h-10" />
              <Skeleton className="w-full sm:w-[200px] h-10" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto text-center text-red-600">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Error</h1>
          <p className="text-xl">Failed to load classes: {error?.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4" data-testid="classes-page-title">
          Our Class Schedule
        </h1>
        <p className="text-xl text-gray-600 mb-8" data-testid="classes-page-subtitle">
          Find Your Perfect Workout
        </p>
        {gymClasses && gymClasses.length > 0 ? (
          <ClassSchedule classes={gymClasses} />
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg">No classes are currently scheduled. Please check back later!</p>
          </div>
        )}
      </div>
    </section>
  );
}