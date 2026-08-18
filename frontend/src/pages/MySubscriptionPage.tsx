import { useAuth } from '@/context/AuthContext';
import { useMembership } from '@/hooks/useMembership';
import SubscriptionStatusCard from '@/components/account/SubscriptionStatusCard';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function MySubscriptionPage() {
  const { user, isAuthenticated } = useAuth();
  const userId = user?.id;

  // useMySubscription is not available in the provided useMembership hook.
  // Assuming a similar pattern to useMyBookings, we'll use a placeholder or
  // if there's an admin endpoint that can be filtered by userId, we'd use that.
  // For now, we'll assume there's no direct hook for a user's subscription,
  // and will display a "no subscription" state.
  // If useMembership().useMySubscription(userId) existed, it would be used here.
  // As per the contract, useMembership only exposes useMembershipPlans, useMembershipPlan,
  // useCreateSubscription, useAdminMembershipPlans, useAdminMembershipPlan,
  // useCreateAdminMembershipPlan, useUpdateAdminMembershipPlan, useDeleteAdminMembershipPlan.
  // There is no useMySubscription.
  // Therefore, we will simulate no subscription data being available for the current user.

  // If a useMySubscription hook existed:
  // const { data: subscription, isLoading, isError, error } = useMembership().useMySubscription(userId);

  // Since it doesn't, we'll pass undefined to SubscriptionStatusCard to trigger the "no subscription" state.
  const subscription = undefined; // Placeholder for actual subscription data
  const isLoading = false;
  const isError = false;
  const error = null;

  if (!isAuthenticated) {
    return (
      <ProtectedRoute>
        <div className="flex justify-center items-center h-screen">
          <p>Please log in to view your subscription.</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-8" data-testid="my-subscription-heading">
            My Subscription
          </h1>
          {isLoading ? (
            <p>Loading subscription status...</p>
          ) : isError ? (
            <p className="text-red-500">Error loading subscription: {error?.message}</p>
          ) : (
            <SubscriptionStatusCard subscription={subscription} />
          )}
        </div>
      </section>
    </ProtectedRoute>
  );
}