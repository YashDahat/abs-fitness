import { useTrainers } from '@/hooks/trainerHooks';
import TrainerGrid from '@/components/trainer/TrainerGrid';
import { Skeleton } from '@/components/ui/skeleton';

export default function TrainersPage() {
  const { data: trainers, isLoading, isError } = useTrainers();

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-[#1A1A1A] mb-4">Meet Our Expert Trainers</h1>
          <p className="text-[#1A1A1A] leading-relaxed mb-8">
            Achieve your fitness goals with guidance from the best in the industry.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center text-red-600">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Error</h1>
          <p className="text-lg">Failed to load trainers. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-[#1A1A1A] mb-4" data-testid="trainers-page-title">
          Meet Our Expert Trainers
        </h1>
        <p className="text-[#1A1A1A] leading-relaxed mb-8" data-testid="trainers-page-subtitle">
          Achieve your fitness goals with guidance from the best in the industry.
        </p>
        {trainers && trainers.length > 0 ? (
          <TrainerGrid trainers={trainers} />
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">No trainers available at the moment. Please check back later!</p>
          </div>
        )}
      </div>
    </section>
  );
}