import { useParams } from 'react-router-dom';
import { useTrainerById } from '@/hooks/trainerHooks';
import { useFitnessClasses } from '@/hooks/fitnessClassHooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { TrainerDto } from '@/types/trainer';

interface TrainerDetailProps {
  trainer: TrainerDto;
}

export default function TrainerDetail({ trainer }: TrainerDetailProps) {
  const { data: classes, isLoading: isLoadingClasses, isError: isErrorClasses } = useFitnessClasses();

  const trainerClasses = classes?.filter(
    (fitnessClass) => fitnessClass.trainerId === trainer.id
  );

  if (!trainer) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl font-semibold text-gray-700">Trainer not found.</h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          {trainer.photoUrl ? (
            <img
              src={trainer.photoUrl}
              alt={trainer.name}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          ) : (
            <Skeleton className="w-full h-64 rounded-lg" />
          )}
        </div>
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-3xl font-bold text-[#1A1A1A]">{trainer.name}</h2>
          <p className="text-xl text-[#FF5722] font-semibold">{trainer.specialties}</p>
          <Separator />
          <p className="text-gray-700 leading-relaxed">{trainer.bio}</p>
        </div>
      </div>

      <Separator />

      <section>
        <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-6">Classes Taught by {trainer.name}</h3>
        {isLoadingClasses ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : isErrorClasses ? (
          <p className="text-red-500">Failed to load classes.</p>
        ) : trainerClasses && trainerClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainerClasses.map((fitnessClass) => (
              <Card key={fitnessClass.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-[#1A1A1A]">{fitnessClass.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-700">
                  <p>{fitnessClass.description}</p>
                  <p>
                    <span className="font-medium">Schedule:</span>{' '}
                    {new Date(fitnessClass.scheduleTime).toLocaleString('en-IN', {
                      weekday: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <p>
                    <span className="font-medium">Duration:</span> {fitnessClass.durationMinutes} minutes
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No classes currently listed for {trainer.name}.</p>
        )}
      </section>
    </div>
  );
}