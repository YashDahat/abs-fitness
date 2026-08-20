import { useParams } from 'react-router-dom';
import { useTrainerById } from '@/hooks/trainerHooks';
import { useFitnessClasses } from '@/hooks/fitnessClassHooks';
import TrainerDetail from '@/components/trainers/TrainerDetail';
import { Skeleton } from '@/components/ui/skeleton';

export default function TrainersDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: trainer, isLoading: isLoadingTrainer, isError: isErrorTrainer } = useTrainerById(id!);
  const { data: classes, isLoading: isLoadingClasses, isError: isErrorClasses } = useFitnessClasses();

  if (isLoadingTrainer || isLoadingClasses) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative h-[300px] md:h-[400px] bg-gray-300 flex items-center justify-center mb-8">
            <Skeleton className="absolute inset-0 w-full h-full" />
            <Skeleton className="h-12 w-64 md:w-96 bg-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
            <div className="md:col-span-2">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/2 mb-6" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isErrorTrainer || isErrorClasses || !trainer) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-red-600">
            Error loading trainer details or classes.
          </h2>
          <p className="text-gray-600 mt-4">Please try again later.</p>
        </div>
      </section>
    );
  }

  const trainerClasses = classes?.filter((c) => c.trainerId === trainer.id) || [];

  return (
    <div>
      <section className="relative h-[300px] md:h-[400px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${trainer.photoUrl})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white" data-testid="trainer-name-headline">
            {trainer.name}
          </h1>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <TrainerDetail trainer={trainer} classes={trainerClasses} />
        </div>
      </section>
    </div>
  );
}