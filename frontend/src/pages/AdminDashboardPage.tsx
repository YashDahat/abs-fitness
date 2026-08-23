import AdminLayout from '@/components/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useBookings } from '@/hooks/bookingHooks';
import { useFitnessClasses } from '@/hooks/fitnessClassHooks';
import { useInquiries } from '@/hooks/inquiryHooks';
import { useMembershipPlans } from '@/hooks/membershipHooks';
import { useTrainers } from '@/hooks/trainerHooks';
import { CalendarDays, Users, MessageSquare, Dumbbell } from 'lucide-react';

export default function AdminDashboardPage() {
  const { data: membershipPlans, isLoading: isLoadingMembershipPlans } = useMembershipPlans();
  const { data: fitnessClasses, isLoading: isLoadingFitnessClasses } = useFitnessClasses();
  const { data: bookings, isLoading: isLoadingBookings } = useBookings();
  const { data: inquiries, isLoading: isLoadingInquiries } = useInquiries();
  const { data: trainers, isLoading: isLoadingTrainers } = useTrainers();

  const totalMembers = membershipPlans?.filter(plan => plan.isActive).length || 0;
  const upcomingClasses = fitnessClasses?.filter(cls => new Date(cls.scheduleTime) > new Date()).length || 0;
  const recentBookings = bookings?.filter(booking => new Date(booking.bookingTime) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length || 0; // Last 7 days
  const newInquiries = inquiries?.filter(inquiry => new Date(inquiry.submissionTime) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length || 0; // Last 7 days
  const activeTrainers = trainers?.length || 0;

  const isLoading = isLoadingMembershipPlans || isLoadingFitnessClasses || isLoadingBookings || isLoadingInquiries || isLoadingTrainers;

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Loading...</CardTitle>
                    <Dumbbell className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">...</div>
                    <p className="text-xs text-gray-500">...</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white rounded-xl shadow-md border border-gray-100 p-6" data-testid="total-members-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                  <Users className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalMembers}</div>
                  <p className="text-xs text-gray-500">Active members</p>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-xl shadow-md border border-gray-100 p-6" data-testid="upcoming-classes-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Classes</CardTitle>
                  <CalendarDays className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingClasses}</div>
                  <p className="text-xs text-gray-500">Scheduled in the future</p>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-xl shadow-md border border-gray-100 p-6" data-testid="recent-bookings-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Bookings</CardTitle>
                  <Dumbbell className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{recentBookings}</div>
                  <p className="text-xs text-gray-500">Bookings in the last 7 days</p>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-xl shadow-md border border-gray-100 p-6" data-testid="new-inquiries-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{newInquiries}</div>
                  <p className="text-xs text-gray-500">Received in the last 7 days</p>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-xl shadow-md border border-gray-100 p-6" data-testid="active-trainers-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Trainers</CardTitle>
                  <Users className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeTrainers}</div>
                  <p className="text-xs text-gray-500">Currently employed trainers</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </AdminLayout>
  );
}