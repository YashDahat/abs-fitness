import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrainerDto } from '@/types/trainer';
import { ROUTES } from '@/routes';

interface TrainerProfileCardProps {
  trainer: TrainerDto;
}

export default function TrainerProfileCard({ trainer }: TrainerProfileCardProps): React.JSX.Element {
  return (
    <Card className="bg-white rounded-xl shadow-md border border-gray-100 p-6 transition-all duration-200 hover:shadow-lg">
      <CardHeader className="p-0 pb-4">
        <img
          src={trainer.imageUrl}
          alt={trainer.name}
          className="w-full h-48 object-cover rounded-md mb-4"
          data-testid={`trainer-image-${trainer.id}`}
        />
        <CardTitle className="text-xl font-semibold text-[#1A1A1A]" data-testid={`trainer-name-${trainer.id}`}>
          {trainer.name}
        </CardTitle>
        <p className="text-sm text-gray-600" data-testid={`trainer-specialty-${trainer.id}`}>
          {trainer.specialty}
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-sm text-gray-700 mb-4" data-testid={`trainer-experience-${trainer.id}`}>
          {trainer.experienceYears} Years Experience
        </p>
        <Link to={ROUTES.TRAINER_DETAIL.replace(':id', trainer.id.toString())}>
          <Button
            className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200 w-full"
            data-testid={`view-profile-cta-${trainer.id}`}
          >
            View Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}