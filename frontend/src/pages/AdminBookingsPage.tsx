import AdminLayout from '@/components/AdminLayout';
import BookingsOverviewTable from '@/components/admin/BookingsOverviewTable';
import { Separator } from '@/components/ui/separator';

export default function AdminBookingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Bookings Overview</h2>
        <Separator />
        <BookingsOverviewTable />
      </div>
    </AdminLayout>
  );
}