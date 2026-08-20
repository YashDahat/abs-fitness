import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMembershipPlans } from '@/hooks/membershipHooks';
import { useCart } from '@/cart/CartContext';
import MembershipPlanCard from '@/components/membership/MembershipPlanCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ROUTES } from '@/routes';
import type { MembershipPlan } from '@/types/membership';

export default function MembershipPage() {
  const { data: membershipPlans, isLoading, isError } = useMembershipPlans();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleSelectPlan = (plan: MembershipPlan): void => {
    addItem({
      id: plan.id,
      name: plan.name,
      unitPrice: plan.price,
      imageUrl: null, // Membership plans don't typically have images
      variantKey: `membership-${plan.id}`,
      metadata: { durationInMonths: plan.durationInMonths },
    });
    navigate(ROUTES.CHECKOUT);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <section className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(/images/hero-membership.webp)' }}>
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 text-center text-white p-4">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-8 w-80 mx-auto" />
          </div>
        </section>
        <section className="py-16 px-4 bg-[#F5F5F5]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-600 text-lg">Error loading membership plans.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: 'url(/images/hero-membership.webp)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="membership-hero-title">
            Unlock Your Potential with ABS FITNESS Memberships
          </h1>
          <p className="text-lg md:text-xl" data-testid="membership-hero-subtitle">
            Choose the plan that fits your fitness journey.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-[#1A1A1A]">Our Membership Plans</h2>
          {membershipPlans && membershipPlans.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {membershipPlans.map((plan) => (
                <MembershipPlanCard key={plan.id} plan={plan} onSelectPlan={handleSelectPlan} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 text-lg">No membership plans available at the moment.</div>
          )}
        </div>
      </section>
    </div>
  );
}

function CardSkeleton(): React.JSX.Element {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
      <Skeleton className="h-8 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <Skeleton className="h-6 w-1/2 mb-6" />
      <Skeleton className="h-12 w-full rounded-full" />
    </div>
  );
}