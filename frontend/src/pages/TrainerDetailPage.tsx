import { useParams } from 'react-router-dom';
import { useTrainerById } from '@/hooks/trainerHooks';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function TrainerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const trainerId = Number(id);
  const { data: trainer, isLoading, isError, error } = useTrainerById(trainerId);

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <Skeleton className="w-full md:w-1/3 h-96 rounded-xl" />
            <div className="w-full md:w-2/3 space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-48" />
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
          <h2 className="text-2xl font-semibold">Error loading trainer details</h2>
          <p>{error?.message || 'An unexpected error occurred.'}</p>
        </div>
      </section>
    );
  }

  if (!trainer) {
    return (
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto text-center text-gray-700">
          <h2 className="text-2xl font-semibold">Trainer not found</h2>
          <p>The trainer you are looking for does not exist.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3">
            <img
              src={trainer.imageUrl}
              alt={trainer.name}
              className="w-full h-auto object-cover rounded-xl shadow-lg"
              data-testid="trainer-image"
            />
          </div>
          <div className="w-full md:w-2/3 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-[#1A1A1A]" data-testid="trainer-name">
              {trainer.name}
            </h1>
            <p className="text-xl text-[#FF5722] font-semibold" data-testid="trainer-specialty">
              {trainer.specialty}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed" data-testid="trainer-bio">
              {trainer.bio}
            </p>
            <p className="text-md text-gray-600" data-testid="trainer-experience">
              Experience: {trainer.experienceYears} years
            </p>
            <Button
              className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
              data-testid="book-session-cta"
            >
              Book a Session
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}