import { useTrainers } from '@/hooks/trainerHooks';
import TrainerCard from '@/components/trainers/TrainerCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function TrainersPage() {
  const { data: trainers, isLoading, isError } = useTrainers();

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative h-[300px] md:h-[400px] bg-cover bg-center flex items-center justify-center rounded-lg overflow-hidden mb-12" style={{ backgroundImage: 'url(/images/trainers-hero.webp)' }}>
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center relative z-10" data-testid="trainers-hero-heading">
            Meet Our World-Class Trainers at ABS FITNESS
          </h1>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8" data-testid="trainers-section-heading">
          Our Expert Team
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="flex flex-col items-center text-center p-6">
                <Skeleton className="w-32 h-32 rounded-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </Card>
            ))}
          </div>
        ) : isError || !trainers ? (
          <div className="text-center text-red-500">Failed to load trainers. Please try again later.</div>
        ) : trainers.length === 0 ? (
          <div className="text-center text-gray-600">No trainers available at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer) => (
              <TrainerCard key={trainer.id} trainer={trainer} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}