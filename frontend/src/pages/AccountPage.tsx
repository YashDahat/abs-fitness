import { useAuth } from '@/context/AuthContext';
import ProfileDetails from '@/components/account/ProfileDetails';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';

export default function AccountPage() {
  const { user } = useAuth();

  return (
    <section className="py-16 px-4 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-8">
          Welcome, {user?.username ?? 'Member'}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card className="shadow-md border border-gray-100">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Account Navigation</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Link
                  to={ROUTES.MY_BOOKINGS}
                  className="text-[#1A1A1A] hover:text-[#FF5722] transition-all duration-200"
                  data-testid="nav-my-bookings"
                >
                  My Bookings
                </Link>
                <Separator />
                <Link
                  to={ROUTES.MY_SUBSCRIPTION}
                  className="text-[#1A1A1A] hover:text-[#FF5722] transition-all duration-200"
                  data-testid="nav-my-subscription"
                >
                  My Subscription
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <ProfileDetails />
          </div>
        </div>
      </div>
    </section>
  );
}