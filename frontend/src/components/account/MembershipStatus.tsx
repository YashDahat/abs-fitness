import { useMemberSubscriptions } from '@/hooks/membershipHooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function MembershipStatus(): React.JSX.Element {
  const { data: subscriptions, isLoading, isError } = useMemberSubscriptions();

  if (isLoading) {
    return (
      <Card className="shadow-md border border-gray-100 p-6 bg-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[#1A1A1A]">Membership Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="shadow-md border border-gray-100 p-6 bg-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[#1A1A1A]">Membership Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error loading membership status.</p>
        </CardContent>
      </Card>
    );
  }

  const activeSubscription = subscriptions?.find(sub => sub.status === 'ACTIVE');

  return (
    <Card className="shadow-md border border-gray-100 p-6 bg-white rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-[#1A1A1A]">Membership Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeSubscription ? (
          <>
            <p className="text-lg font-medium text-[#1A1A1A]">
              Plan: <span className="text-[#FF5722]">{activeSubscription.membershipPlan.name}</span>
            </p>
            <p className="text-sm text-gray-700">
              Start Date:{' '}
              {new Date(activeSubscription.startDate).toLocaleString('en-IN', { dateStyle: 'medium' })}
            </p>
            <p className="text-sm text-gray-700">
              End Date:{' '}
              {new Date(activeSubscription.endDate).toLocaleString('en-IN', { dateStyle: 'medium' })}
            </p>
            <p className={cn(
              "text-sm font-semibold",
              activeSubscription.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'
            )}>
              Status: {activeSubscription.status}
            </p>
          </>
        ) : (
          <p className="text-gray-600">
            No active membership found. Explore our{' '}
            <a href="/membership" className="text-[#FF5722] hover:underline">
              membership plans
            </a>{' '}
            to get started!
          </p>
        )}
      </CardContent>
    </Card>
  );
}