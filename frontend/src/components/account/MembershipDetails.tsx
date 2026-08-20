import { MemberSubscription } from '@/types/membership';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface MembershipDetailsProps {
  subscriptions: MemberSubscription[];
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

const formatDate = (isoDate: string): string => {
  return new Date(isoDate).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function MembershipDetails({ subscriptions }: MembershipDetailsProps) {
  if (!subscriptions || subscriptions.length === 0) {
    return (
      <Card className="p-6 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Membership Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">No active or past memberships found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[#1A1A1A]">My Membership</h2>
      {subscriptions.map((subscription) => (
        <Card key={subscription.id} className="p-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">{subscription.membershipPlan.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Plan Description:</p>
                <p className="font-medium">{subscription.membershipPlan.description}</p>
              </div>
              <div>
                <p className="text-gray-600">Duration:</p>
                <p className="font-medium">{subscription.membershipPlan.durationMonths} Months</p>
              </div>
              <div>
                <p className="text-gray-600">Price:</p>
                <p className="font-medium">{formatCurrency(subscription.membershipPlan.price)}</p>
              </div>
              <div>
                <p className="text-gray-600">Status:</p>
                <p className={`font-medium ${subscription.status === 'ACTIVE' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {subscription.status}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Start Date:</p>
                <p className="font-medium">{formatDate(subscription.startDate)}</p>
              </div>
              <div>
                <p className="text-gray-600">End Date:</p>
                <p className="font-medium">{formatDate(subscription.endDate)}</p>
              </div>
            </div>
            <Separator className="my-4" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Payment History</h3>
              {/* Assuming payment history would be part of MemberSubscription or fetched separately */}
              <p className="text-gray-600">No detailed payment history available for this subscription.</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}