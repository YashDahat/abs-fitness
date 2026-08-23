import type { JSX } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { FitnessClassDto } from '@/types/fitnessClass';
import { PencilIcon, Trash2Icon } from 'lucide-react';

interface ClassTableProps {
  classes: FitnessClassDto[];
  onEdit: (fitnessClass: FitnessClassDto) => void;
  onDelete: (classId: number) => void;
}

export default function ClassTable({
  classes,
  onEdit,
  onDelete,
}: ClassTableProps): React.JSX.Element {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Schedule Time</TableHead>
            <TableHead>Duration (min)</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Booked Slots</TableHead>
            <TableHead>Trainer</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4">
                No fitness classes found.
              </TableCell>
            </TableRow>
          ) : (
            classes.map((fitnessClass) => (
              <TableRow key={fitnessClass.id}>
                <TableCell className="font-medium">{fitnessClass.name}</TableCell>
                <TableCell>{fitnessClass.description}</TableCell>
                <TableCell>
                  {new Date(fitnessClass.scheduleTime).toLocaleString()}
                </TableCell>
                <TableCell>{fitnessClass.durationMinutes}</TableCell>
                <TableCell>{fitnessClass.capacity}</TableCell>
                <TableCell>{fitnessClass.bookedSlots}</TableCell>
                <TableCell>{fitnessClass.trainerName}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(fitnessClass)}
                    className="mr-2"
                    data-testid={`edit-class-${fitnessClass.id}`}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(fitnessClass.id)}
                    data-testid={`delete-class-${fitnessClass.id}`}
                  >
                    <Trash2Icon className="h-4 w-4" />
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