import AdminLayout from '@/components/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAdminMembershipPlans, useMembershipPlans } from '@/hooks/useMembership';
import { useGymClasses } from '@/hooks/useBooking';
import { useAllEnquiries } from '@/hooks/useContent';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminDashboardPage() {
  const { data: membershipPlans, isLoading: isLoadingMemberships, isError: isErrorMemberships } = useAdminMembershipPlans();
  const { data: gymClasses, isLoading: isLoadingClasses, isError: isErrorClasses } = useGymClasses();
  const { data: enquiries, isLoading: isLoadingEnquiries, isError: isErrorEnquiries } = useAllEnquiries();

  const activeMembershipsCount = membershipPlans?.filter(plan => plan.isActive).length || 0;
  const upcomingClassesCount = gymClasses?.filter(cls => new Date(cls.startTime) > new Date()).length || 0;
  const newEnquiriesCount = enquiries?.filter(enq => enq.status === 'NEW').length || 0;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card data-testid="active-memberships-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Memberships</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingMemberships ? (
                <Skeleton className="h-8 w-1/2" />
              ) : isErrorMemberships ? (
                <p className="text-red-500">Error loading memberships.</p>
              ) : (
                <div className="text-2xl font-bold">{activeMembershipsCount}</div>
              )}
              <p className="text-xs text-muted-foreground">
                <Link to={ROUTES.ADMIN_MEMBERSHIPS} className="text-primary hover:underline">
                  View all memberships
                </Link>
              </p>
            </CardContent>
          </Card>

          <Card data-testid="upcoming-classes-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Classes</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingClasses ? (
                <Skeleton className="h-8 w-1/2" />
              ) : isErrorClasses ? (
                <p className="text-red-500">Error loading classes.</p>
              ) : (
                <div className="text-2xl font-bold">{upcomingClassesCount}</div>
              )}
              <p className="text-xs text-muted-foreground">
                <Link to={ROUTES.ADMIN_CLASSES} className="text-primary hover:underline">
                  View all classes
                </Link>
              </p>
            </CardContent>
          </Card>

          <Card data-testid="new-enquiries-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Enquiries</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingEnquiries ? (
                <Skeleton className="h-8 w-1/2" />
              ) : isErrorEnquiries ? (
                <p className="text-red-500">Error loading enquiries.</p>
              ) : (
                <div className="text-2xl font-bold">{newEnquiriesCount}</div>
              )}
              <p className="text-xs text-muted-foreground">
                <Link to={ROUTES.ADMIN_CONTENT} className="text-primary hover:underline">
                  View all enquiries
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}