import { useParams, useNavigate } from 'react-router-dom';
import { useMembershipPlan } from '@/hooks/useMembership';
import OrderSummary from '@/components/checkout/OrderSummary';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlert } from 'lucide-react';
import { ROUTES } from '@/routes';

export default function CheckoutPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const membershipPlanId = id ? parseInt(id) : undefined;

  const { data: membershipPlan, isLoading, isError, error } = useMembershipPlan(
    membershipPlanId !== undefined ? membershipPlanId : -1, // Pass -1 or a similar invalid ID if undefined
  );

  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-center mb-10">
            Complete Your ABS FITNESS Membership Purchase
          </h1>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-1/2">
              <Skeleton className="h-64 w-full" />
            </div>
            <div className="w-full lg:w-1/2">
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !membershipPlan) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-center mb-10">
            Complete Your ABS FITNESS Membership Purchase
          </h1>
          <Alert variant="destructive" className="max-w-xl mx-auto">
            <TriangleAlert className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {isError ? error?.message : 'Membership plan not found or an unexpected error occurred.'}
              <br />
              Please try again or select a different plan.
              <button
                onClick={() => navigate(ROUTES.MEMBERSHIP)}
                className="text-[#FF5722] hover:underline ml-2"
              >
                Go to Membership Plans
              </button>
            </AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-10">
          Complete Your ABS FITNESS Membership Purchase
        </h1>
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-1/2">
            <OrderSummary membershipPlan={membershipPlan} />
          </div>
          <div className="w-full lg:w-1/2">
            <CheckoutForm
              membershipPlanId={membershipPlan.id}
              planName={membershipPlan.name}
              planPrice={membershipPlan.price}
            />
          </div>
        </div>
      </div>
    </section>
  );
}