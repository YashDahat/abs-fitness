import type { JSX } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import type { InquiryDto } from '@/types/inquiry';

interface InquiryDetailViewProps {
  isOpen: boolean;
  onClose: () => void;
  inquiry: InquiryDto | null;
}

export default function InquiryDetailView({ isOpen, onClose, inquiry }: InquiryDetailViewProps): React.JSX.Element {
  if (!inquiry) {
    return <Dialog open={isOpen} onOpenChange={onClose} />;
  }

  const formatDateTime = (isoString: string): string => {
    return new Date(isoString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Inquiry Details</DialogTitle>
          <DialogDescription>Full details of the inquiry from {inquiry.name}.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Name:</span>
            <span className="col-span-3">{inquiry.name}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Email:</span>
            <span className="col-span-3">{inquiry.email}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Phone:</span>
            <span className="col-span-3">{inquiry.phone}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Inquiry Type:</span>
            <span className="col-span-3">{inquiry.inquiryType.replace(/_/g, ' ')}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium col-span-1">Submission Time:</span>
            <span className="col-span-3">{formatDateTime(inquiry.submissionTime)}</span>
          </div>
          <Separator className="my-2" />
          <div className="grid grid-cols-4 gap-4">
            <span className="text-sm font-medium col-span-1">Message:</span>
            <p className="col-span-3 whitespace-pre-wrap">{inquiry.message}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}