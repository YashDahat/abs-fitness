import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ReviewDto } from '@/types/review';
import { PencilIcon, Trash2Icon, CheckCircleIcon } from 'lucide-react';

interface ReviewTableProps {
  reviews: ReviewDto[];
  onEdit: (review: ReviewDto) => void;
  onDelete: (id: number) => void;
  onApprove: (id: number) => void;
}

export function ReviewTable({ reviews, onEdit, onDelete, onApprove }: ReviewTableProps): React.JSX.Element {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Author</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No reviews found.
              </TableCell>
            </TableRow>
          ) : (
            reviews.map((review) => (
              <TableRow key={review.id} data-testid={`review-row-${review.id}`}>
                <TableCell>{review.author}</TableCell>
                <TableCell>{review.rating}</TableCell>
                <TableCell className="max-w-[300px] truncate">{review.comment}</TableCell>
                <TableCell>{review.source}</TableCell>
                <TableCell>{new Date(review.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onApprove(review.id)}
                    data-testid={`approve-review-${review.id}`}
                  >
                    <CheckCircleIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onEdit(review)}
                    data-testid={`edit-review-${review.id}`}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onDelete(review.id)}
                    data-testid={`delete-review-${review.id}`}
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