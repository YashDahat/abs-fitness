import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';
import { useAdminGetAllMembershipPlans } from '@/hooks/membershipHooks';
import { useAdminGetAllFitnessClasses } from '@/hooks/fitnessClassHooks';
import { useBookings } from '@/hooks/bookingHooks';
import { useEnquiries } from '@/hooks/enquiryHooks';
import { useReviews } from '@/hooks/reviewHooks';
import { Loader2 } from 'lucide-react';

export default function AdminDashboardPage() {
  const { data: membershipPlans, isLoading: isLoadingPlans } = useAdminGetAllMembershipPlans();
  const { data: fitnessClasses, isLoading: isLoadingClasses } = useAdminGetAllFitnessClasses();
  const { data: bookings, isLoading: isLoadingBookings } = useBookings();
  const { data: enquiries, isLoading: isLoadingEnquiries } = useEnquiries();
  const { data: reviews, isLoading: isLoadingReviews } = useReviews();

  const totalMembershipPlans = membershipPlans?.length || 0;
  const totalFitnessClasses = fitnessClasses?.length || 0;
  const totalBookings = bookings?.length || 0;
  const totalEnquiries = enquiries?.length || 0;
  const totalReviews = reviews?.length || 0;

  const isLoading = isLoadingPlans || isLoadingClasses || isLoadingBookings || isLoadingEnquiries || isLoadingReviews;

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card data-testid="dashboard-card-membership-plans">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Membership Plans</CardTitle>
              <Link to={ROUTES.ADMIN_MEMBERSHIP_PLANS} data-testid="dashboard-link-membership-plans">
                <Button variant="link" className="p-0 h-auto">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {isLoadingPlans ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <div className="text-2xl font-bold">{totalMembershipPlans}</div>
              )}
            </CardContent>
          </Card>
          <Card data-testid="dashboard-card-fitness-classes">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fitness Classes</CardTitle>
              <Link to={ROUTES.ADMIN_CLASSES} data-testid="dashboard-link-fitness-classes">
                <Button variant="link" className="p-0 h-auto">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {isLoadingClasses ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <div className="text-2xl font-bold">{totalFitnessClasses}</div>
              )}
            </CardContent>
          </Card>
          <Card data-testid="dashboard-card-bookings">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bookings</CardTitle>
              <Link to={ROUTES.ADMIN_BOOKINGS} data-testid="dashboard-link-bookings">
                <Button variant="link" className="p-0 h-auto">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {isLoadingBookings ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <div className="text-2xl font-bold">{totalBookings}</div>
              )}
            </CardContent>
          </Card>
          <Card data-testid="dashboard-card-enquiries">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enquiries</CardTitle>
              <Link to={ROUTES.ADMIN_ENQUIRIES} data-testid="dashboard-link-enquiries">
                <Button variant="link" className="p-0 h-auto">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {isLoadingEnquiries ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <div className="text-2xl font-bold">{totalEnquiries}</div>
              )}
            </CardContent>
          </Card>
          <Card data-testid="dashboard-card-reviews">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reviews</CardTitle>
              <Link to={ROUTES.ADMIN_REVIEWS} data-testid="dashboard-link-reviews">
                <Button variant="link" className="p-0 h-auto">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {isLoadingReviews ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <div className="text-2xl font-bold">{totalReviews}</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}