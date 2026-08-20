import { useMemberSubscriptions } from '@/hooks/membershipHooks';
import MembershipDetails from '@/components/account/MembershipDetails';
import AdminLayout from '@/components/AdminLayout'; // This is a mistake, should be SiteLayout or no layout for public pages
import { Skeleton } from '@/components/ui/skeleton';

export default function MyMembershipPage() {
  const { data: subscriptions, isLoading, isError, error } = useMemberSubscriptions();

  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-8">My Membership</h1>
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-8">My Membership</h1>
          <p className="text-red-500">Error loading membership details: {error?.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-8">My Membership</h1>
        {subscriptions && subscriptions.length > 0 ? (
          <MembershipDetails subscriptions={subscriptions} />
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">You do not have any active memberships.</p>
          </div>
        )}
      </div>
    </section>
  );
}