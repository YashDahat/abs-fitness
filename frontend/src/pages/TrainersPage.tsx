import TrainerCard from '@/components/trainers/TrainerCard';
import { useTrainers } from '@/hooks/useBooking';
import { Skeleton } from '@/components/ui/skeleton';

export default function TrainersPage() {
  const { data: trainers, isLoading, isError, error } = useTrainers();

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-4">Meet Our Expert Trainers</h1>
          <p className="text-lg text-gray-600 mb-8">Guidance for Your Fitness Journey</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="w-full h-96 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-4">Meet Our Expert Trainers</h1>
          <p className="text-lg text-gray-600 mb-8">Guidance for Your Fitness Journey</p>
          <div className="text-red-500">Error loading trainers: {error?.message}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-4" data-testid="trainers-page-title">
          Meet Our Expert Trainers
        </h1>
        <p className="text-lg text-gray-600 mb-8" data-testid="trainers-page-subtitle">
          Guidance for Your Fitness Journey
        </p>
        {trainers && trainers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer) => (
              <TrainerCard key={trainer.id} trainer={trainer} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">No trainers found.</div>
        )}
      </div>
    </section>
  );
}