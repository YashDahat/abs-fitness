import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/cart/CartContext';
import { useCreateMemberSubscription } from '@/hooks/membershipHooks';
import { toast } from 'sonner';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { ROUTES } from '@/routes';

export default function CheckoutPage() {
  const { cartItems, totals, clearCart } = useCart();
  const navigate = useNavigate();
  const { mutateAsync: createSubscription, isPending: isCreatingSubscription } = useCreateMemberSubscription();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    if (cartItems.length === 0) {
      setError('Your cart is empty. Please add a membership plan to proceed.');
      toast.error('Your cart is empty. Please add a membership plan to proceed.');
      return;
    }

    const membershipPlanItem = cartItems.find(item => item.metadata?.type === 'membership');

    if (!membershipPlanItem) {
      setError('No membership plan found in your cart.');
      toast.error('No membership plan found in your cart.');
      return;
    }

    try {
      await createSubscription({ membershipPlanId: membershipPlanItem.id });
      clearCart();
      toast.success('Membership purchased successfully!');
      navigate(ROUTES.ACCOUNT);
    } catch (err) {
      console.error('Failed to create subscription:', err);
      setError('Failed to process your membership. Please try again.');
      toast.error('Failed to process your membership. Please try again.');
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1A1A]">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-[#1A1A1A]">Order Summary</h2>
            <OrderSummary cartItems={cartItems} totals={totals} />
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6 text-[#1A1A1A]">Payment Details</h2>
            <CheckoutForm onSubmit={handleSubmit} />
            {isCreatingSubscription && (
              <div className="flex items-center justify-center mt-4">
                <p className="text-lg text-gray-700">Processing your order...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}