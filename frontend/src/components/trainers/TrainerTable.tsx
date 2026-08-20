import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import type { TrainerDto } from '@/types/trainer';

interface TrainerTableProps {
  trainers: TrainerDto[];
  onEdit: (trainer: TrainerDto) => void;
  onDelete: (id: string) => void;
}

export function TrainerTable({ trainers, onEdit, onDelete }: TrainerTableProps) {
  return (
    <div className="rounded-md border bg-white">
      <Table data-testid="trainer-table">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Specialties</TableHead>
            <TableHead>Bio</TableHead>
            <TableHead>Photo URL</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trainers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No trainers found.
              </TableCell>
            </TableRow>
          ) : (
            trainers.map((trainer) => (
              <TableRow key={trainer.id} data-testid={`trainer-row-${trainer.id}`}>
                <TableCell className="font-medium">{trainer.name}</TableCell>
                <TableCell>{trainer.specialties}</TableCell>
                <TableCell className="max-w-xs truncate">{trainer.bio}</TableCell>
                <TableCell className="max-w-xs truncate">{trainer.photoUrl}</TableCell>
                <TableCell className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(trainer)}
                    data-testid={`edit-trainer-${trainer.id}`}
                  >
                    <PencilIcon className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(trainer.id.toString())}
                    data-testid={`delete-trainer-${trainer.id}`}
                  >
                    <Trash2Icon className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}