import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { useTrainers } from '@/hooks/trainerHooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/routes';

export default function TrainerSpotlight(): React.JSX.Element {
  const { data: trainers, isLoading, isError } = useTrainers();

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-8 text-center">
            Our Expert Trainers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <CardHeader className="flex flex-col items-center">
                  <Skeleton className="w-24 h-24 rounded-full mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="text-center">
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !trainers || trainers.length === 0) {
    return (
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto text-center text-[#1A1A1A]">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Our Expert Trainers
          </h2>
          <p>No trainers available at the moment. Please check back later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-8 text-center">
          Our Expert Trainers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.slice(0, 3).map((trainer) => (
            <Link to={ROUTES.TRAINER_DETAIL.replace(':id', String(trainer.id))} key={trainer.id} data-testid={`trainer-card-${trainer.id}`}>
              <Card className="bg-white rounded-xl shadow-md border border-gray-100 p-6 h-full flex flex-col justify-between transition-all duration-200 hover:shadow-lg">
                <CardHeader className="flex flex-col items-center">
                  {trainer.imageUrl && (
                    <img
                      src={trainer.imageUrl}
                      alt={trainer.name}
                      className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-[#FF5722]"
                    />
                  )}
                  <CardTitle className="text-xl font-bold text-[#1A1A1A] mb-2">
                    {trainer.name}
                  </CardTitle>
                  <p className="text-[#FF5722] text-sm font-medium">{trainer.specialty}</p>
                </CardHeader>
                <CardContent className="text-center text-gray-700">
                  <p className="text-sm">{trainer.bio.substring(0, 100)}...</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}