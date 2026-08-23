import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { TrainerDto } from '@/types/trainer';
import { PencilIcon, Trash2Icon } from 'lucide-react';

interface TrainerTableProps {
  trainers: TrainerDto[];
  onEdit: (trainer: TrainerDto) => void;
  onDelete: (trainerId: number) => void;
}

export default function TrainerTable({
  trainers,
  onEdit,
  onDelete,
}: TrainerTableProps): React.JSX.Element {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Experience (Years)</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trainers.map((trainer) => (
            <TableRow key={trainer.id} data-testid={`trainer-row-${trainer.id}`}>
              <TableCell>
                {trainer.imageUrl && (
                  <img
                    src={trainer.imageUrl}
                    alt={trainer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
              </TableCell>
              <TableCell>{trainer.name}</TableCell>
              <TableCell>{trainer.specialty}</TableCell>
              <TableCell>{trainer.experienceYears}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(trainer)}
                  data-testid={`edit-trainer-${trainer.id}`}
                  className="hover:bg-gray-100 transition-all duration-200"
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(trainer.id)}
                  data-testid={`delete-trainer-${trainer.id}`}
                  className="hover:bg-red-100 transition-all duration-200"
                >
                  <Trash2Icon className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}