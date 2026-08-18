import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { TrainerDto } from '@/types/trainer';

interface TrainerProfileProps {
  trainer: TrainerDto;
}

export default function TrainerProfile({ trainer }: TrainerProfileProps) {
  return (
    <div className="flex flex-col md:flex-row items-start gap-8 p-8 bg-white rounded-lg shadow-lg">
      <div className="flex-shrink-0">
        <img
          src={trainer.imageUrl}
          alt={trainer.name}
          className="w-64 h-64 object-cover rounded-lg shadow-md"
          data-testid="trainer-image"
        />
      </div>
      <div className="flex-grow">
        <h1 className="text-4xl font-bold text-[#1A1A1A] mb-2" data-testid="trainer-name">
          {trainer.name}
        </h1>
        <p className="text-lg text-[#FF5722] font-semibold mb-4" data-testid="trainer-specializations">
          {trainer.specializations}
        </p>
        <Separator className="my-4" />
        <Card className="border-none shadow-none">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-2xl font-semibold text-[#1A1A1A]">About {trainer.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-gray-700 leading-relaxed" data-testid="trainer-bio">
              {trainer.bio}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}