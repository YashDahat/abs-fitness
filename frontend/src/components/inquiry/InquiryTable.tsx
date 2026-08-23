import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { InquiryDto } from '@/types/inquiry';

interface InquiryTableProps {
  inquiries: InquiryDto[];
  onView: (inquiry: InquiryDto) => void;
  onDelete: (inquiryId: number) => void;
}

export function InquiryTable({ inquiries, onView, onDelete }: InquiryTableProps): React.JSX.Element {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Submission Time</TableHead>
            <TableHead>Message Snippet</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No inquiries found.
              </TableCell>
            </TableRow>
          ) : (
            inquiries.map((inquiry) => (
              <TableRow key={inquiry.id} data-testid={`inquiry-row-${inquiry.id}`}>
                <TableCell>{inquiry.name}</TableCell>
                <TableCell>{inquiry.email}</TableCell>
                <TableCell>{inquiry.phone}</TableCell>
                <TableCell>{inquiry.inquiryType}</TableCell>
                <TableCell>{new Date(inquiry.submissionTime).toLocaleString()}</TableCell>
                <TableCell>{inquiry.message.substring(0, 50)}...</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(inquiry)}
                    className="mr-2"
                    data-testid={`view-inquiry-${inquiry.id}`}
                  >
                    View
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(inquiry.id)}
                    data-testid={`delete-inquiry-${inquiry.id}`}
                  >
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