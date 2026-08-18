import { Card, CardContent } from '@/components/ui/card';
import { TrainerDto } from '@/types/trainer';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';

interface TrainerCardProps {
  trainer: TrainerDto;
}

export default function TrainerCard({ trainer }: TrainerCardProps) {
  return (
    <Link to={ROUTES.TRAINER_DETAIL.replace(':id', String(trainer.id))} data-testid={`trainer-card-${trainer.id}`}>
      <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer">
        <img
          src={trainer.imageUrl}
          alt={trainer.name}
          className="w-full h-64 object-cover"
        />
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">{trainer.name}</h3>
          <p className="text-gray-600 text-sm">{trainer.specializations}</p>
        </CardContent>
      </Card>
    </Link>
  );
}