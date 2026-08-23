import TrainerProfileCard from '@/components/trainer/TrainerProfileCard';
import { TrainerDto } from '@/types/trainer';

interface TrainerGridProps {
  trainers: TrainerDto[];
}

export default function TrainerGrid({ trainers }: TrainerGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {trainers.map((trainer) => (
        <TrainerProfileCard key={trainer.id} trainer={trainer} />
      ))}
    </div>
  );
}