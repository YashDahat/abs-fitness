import { useNavigate } from 'react-router-dom';
import { useActiveMembershipPlans } from '@/hooks/membershipHooks';
import { useCart } from '@/cart/CartContext';
import MembershipPlanCard from '@/components/membership/MembershipPlanCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';
import { MembershipPlanDto } from '@/types/membership';
import { CartItem } from '@/cart/types';

export default function MembershipPage() {
  const { data: membershipPlans, isLoading, isError } = useActiveMembershipPlans();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleEnroll = (plan: MembershipPlanDto) => {
    const cartItem: CartItem = {
      id: plan.id,
      name: plan.name,
      unitPrice: plan.price,
      quantity: 1,
      metadata: {
        durationInMonths: plan.durationInMonths,
        description: plan.description,
      },
    };
    addItem(cartItem);
    navigate(ROUTES.CHECKOUT);
  };

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[300px] w-full" />
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
          Failed to load membership plans. Please try again later.
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative h-[500px] md:h-[600px] bg-[url('/images/membership-hero.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Unlock Your Potential with Our Membership Plans
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Choose the plan that fits your fitness journey and start today!
          </p>
          <Button
            className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
            onClick={() => {
              const plansSection = document.getElementById('membership-plans');
              plansSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            data-testid="view-plans-cta"
          >
            View Plans
          </Button>
        </div>
      </section>

      <section id="membership-plans" className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">
            Our Flexible Membership Options
          </h2>
          {membershipPlans && membershipPlans.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {membershipPlans.map((plan) => (
                <MembershipPlanCard
                  key={plan.id}
                  plan={plan}
                  onEnroll={handleEnroll}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              No membership plans available at the moment. Please check back later!
            </div>
          )}
        </div>
      </section>
    </>
  );
}