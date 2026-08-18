import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { MemberSubscriptionDto } from '@/types/membership';
import { ROUTES } from '@/routes';

interface SubscriptionStatusCardProps {
  subscription: MemberSubscriptionDto | undefined;
}

export default function SubscriptionStatusCard({ subscription }: SubscriptionStatusCardProps) {
  if (!subscription) {
    return (
      <Card data-testid="subscription-status-card">
        <CardHeader>
          <CardTitle>Membership Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">No active subscription found.</p>
          <Link to={ROUTES.MEMBERSHIP}>
            <Button className="mt-4 bg-[#FF5722] hover:bg-[#e64a19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="subscribe-now-cta">
              Subscribe Now
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const isExpiredOrCancelled = subscription.status === 'EXPIRED' || subscription.status === 'CANCELLED';

  return (
    <Card data-testid="subscription-status-card">
      <CardHeader>
        <CardTitle>Membership Status</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold">{subscription.membershipPlanName}</p>
        <p className="text-gray-600">Status: <span className={`font-medium ${isExpiredOrCancelled ? 'text-red-600' : 'text-green-600'}`}>{subscription.status}</span></p>
        <p className="text-gray-600">Start Date: {new Date(subscription.startDate).toLocaleDateString()}</p>
        <p className="text-gray-600">End Date: {new Date(subscription.endDate).toLocaleDateString()}</p>

        {isExpiredOrCancelled && (
          <Link to={ROUTES.MEMBERSHIP}>
            <Button className="mt-4 bg-[#FF5722] hover:bg-[#e64a19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="renew-now-cta">
              Renew Now
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}