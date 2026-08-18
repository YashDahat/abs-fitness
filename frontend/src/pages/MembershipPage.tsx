import MembershipGrid from '@/components/membership/MembershipGrid';
import { useMembershipPlans } from '@/hooks/useMembership';
import { Skeleton } from '@/components/ui/skeleton';

export default function MembershipPage() {
  const { data: membershipPlans, isLoading, isError, error } = useMembershipPlans();

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-center text-[#1A1A1A] mb-4">
            Unlock Your Potential with ABS FITNESS Memberships
          </h1>
          <p className="text-xl text-center text-gray-600 mb-12">
            Choose the plan that fits your fitness journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center text-red-600">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Error</h1>
          <p className="text-xl">Failed to load membership plans: {error?.message}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-[#1A1A1A] mb-4">
          Unlock Your Potential with ABS FITNESS Memberships
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Choose the plan that fits your fitness journey.
        </p>
        {membershipPlans && membershipPlans.length > 0 ? (
          <MembershipGrid plans={membershipPlans} />
        ) : (
          <div className="text-center text-gray-500 text-lg">
            No membership plans available at the moment. Please check back later!
          </div>
        )}
      </div>
    </section>
  );
}