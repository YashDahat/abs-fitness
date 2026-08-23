import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { BookingTable } from '@/components/booking/BookingTable';
import BookingFilter from '@/components/booking/BookingFilter';
import { useBookings } from '@/hooks/bookingHooks';
import { FitnessClassDto } from '@/types/fitnessClass';
import { useFitnessClasses } from '@/hooks/fitnessClassHooks';
import { useAdminGetAllTrainers } from '@/hooks/trainerHooks';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function AdminBookingsPage() {
  const [filters, setFilters] = useState<{ classId?: number; userId?: number; startDate?: string; endDate?: string; }>({});
  const { data: bookings, isLoading: isLoadingBookings, isError: isErrorBookings } = useBookings();
  const { data: classes, isLoading: isLoadingClasses } = useFitnessClasses();
  const { data: trainers, isLoading: isLoadingTrainers } = useAdminGetAllTrainers();

  const handleFilterChange = (newFilters: { classId?: number; userId?: number; startDate?: string; endDate?: string; }) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  const filteredBookings = bookings?.filter(booking => {
    const matchesClass = filters.classId ? booking.fitnessClassId === filters.classId : true;
    const matchesUserId = filters.userId ? booking.userId === filters.userId : true;
    const bookingScheduleTime = new Date(booking.scheduleTime);
    const matchesStartDate = filters.startDate ? bookingScheduleTime >= new Date(filters.startDate) : true;
    const matchesEndDate = filters.endDate ? bookingScheduleTime <= new Date(filters.endDate) : true;
    return matchesClass && matchesUserId && matchesStartDate && matchesEndDate;
  }) || [];

  if (isLoadingBookings || isLoadingClasses || isLoadingTrainers) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">Manage Bookings</h1>
          <p>Loading bookings...</p>
        </div>
      </AdminLayout>
    );
  }

  if (isErrorBookings) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-6">Manage Bookings</h1>
          <p className="text-red-500">Error loading bookings.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Manage Bookings</h1>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Filter Bookings</h2>
          <BookingFilter onFilterChange={handleFilterChange} />
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <BookingTable bookings={filteredBookings} />
        </div>
      </div>
    </AdminLayout>
  );
}