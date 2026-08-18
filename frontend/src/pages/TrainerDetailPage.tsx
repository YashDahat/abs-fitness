import { useParams } from 'react-router-dom';
import { useTrainer } from '@/hooks/useBooking';
import TrainerProfile from '@/components/trainers/TrainerProfile';
import { Skeleton } from '@/components/ui/skeleton';

export default function TrainerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const trainerId = id || '';

  const { data: trainer, isLoading, isError, error } = useTrainer(trainerId);

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-8 p-8 bg-white rounded-lg shadow-lg">
            <Skeleton className="w-64 h-64 rounded-lg" />
            <div className="flex-grow">
              <Skeleton className="h-10 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
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
          Error loading trainer details: {error?.message}
        </div>
      </section>
    );
  }

  if (!trainer) {
    return (
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto text-center text-gray-700">
          Trainer not found.
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto">
        <TrainerProfile trainer={trainer} />
      </div>
    </section>
  );
}