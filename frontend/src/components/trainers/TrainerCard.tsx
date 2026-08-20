import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrainerDto } from '@/types/trainer';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';

interface TrainerCardProps {
  trainer: TrainerDto;
}

export default function TrainerCard({ trainer }: TrainerCardProps) {
  return (
    <Link to={ROUTES.TRAINERS_DETAIL.replace(':id', String(trainer.id))} data-testid={`trainer-card-${trainer.id}`}>
      <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-200">
        <CardHeader className="p-0">
          <img
            src={trainer.photoUrl}
            alt={trainer.name}
            className="w-full h-60 object-cover rounded-t-xl"
          />
        </CardHeader>
        <CardContent className="flex-grow p-6">
          <CardTitle className="text-xl font-semibold mb-2">{trainer.name}</CardTitle>
          <p className="text-gray-600 text-sm">{trainer.specialties}</p>
        </CardContent>
      </Card>
    </Link>
  );
}