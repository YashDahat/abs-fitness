import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/cart/CartContext';
import { useCheckout } from '@/cart/useCheckout';
import type { CheckoutStep } from '@/cart/types';
import { useCreateSubscription, useVerifySubscriptionPayment } from '@/hooks/membershipHooks';
import type { VerifyPaymentRequest } from '@/types/verify';
import PaymentStep from '@/components/checkout/PaymentStep';
import ConfirmationStep from '@/components/checkout/ConfirmationStep';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { ROUTES } from '@/routes';

const CheckoutPage = () => {
  const { cartItems, totals, clearCart } = useCart();
  const navigate = useNavigate();

  const [membershipPlanName, setMembershipPlanName] = useState<string>('');

  useEffect(() => {
    if (cartItems.length > 0) {
      const firstMembershipItem = cartItems.find(item => item.metadata?.type === 'membership');
      if (firstMembershipItem) {
        setMembershipPlanName(firstMembershipItem.name);
      }
    }
  }, [cartItems]);

  const steps: CheckoutStep[] = [
    { id: 'review', label: 'Review Order' },
    { id: 'payment', label: 'Payment' },
    { id: 'confirmation', label: 'Confirmation' },
  ];

  const {
    current,
    index,
    isFirst,
    isLast,
    next,
    back,
    goTo,
    error: checkoutError,
  } = useCheckout(steps);

  const { mutateAsync: createSubscription, isPending: isCreatingSubscription } = useCreateSubscription();
  const { mutateAsync: verifySubscriptionPayment, isPending: isVerifyingPayment } = useVerifySubscriptionPayment();

  const handleProceedToPayment = async (): Promise<void> => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty. Please add a membership plan to proceed.');
      return;
    }

    const membershipPlan = cartItems.find(item => item.metadata?.type === 'membership');
    if (!membershipPlan) {
      toast.error('No membership plan found in cart.');
      return;
    }

    try {
      const response = await createSubscription({ planId: membershipPlan.id });
      // Store payment order response in state or context if needed for PaymentStep
      // For now, we assume PaymentStep will receive totalAmount and handle its own payment initiation
      next(); // Move to payment step
    } catch (error) {
      toast.error('Failed to initiate subscription. Please try again.');
      console.error('Error creating subscription:', error);
    }
  };

  const handlePaymentSuccess = async (paymentDetails: VerifyPaymentRequest): Promise<void> => {
    try {
      await verifySubscriptionPayment(paymentDetails);
      clearCart();
      next(); // Move to confirmation step
    } catch (error) {
      toast.error('Payment verification failed. Please contact support.');
      console.error('Error verifying payment:', error);
    }
  };

  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  if (cartItems.length === 0 && current?.id !== 'confirmation') {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Your Cart is Empty</h1>
          <p className="mt-4 text-lg text-gray-600">Please add a membership plan to proceed to checkout.</p>
          <Button onClick={() => navigate(ROUTES.MEMBERSHIP)} className="mt-6 bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="browse-memberships-cta">
            Browse Memberships
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-[#F5F5F5]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#1A1A1A] mb-10">Complete Your Membership Purchase</h1>

        <div className="flex justify-between mb-8">
          {steps.map((step, i) => (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white
                  ${i === index ? 'bg-[#FF5722]' : i < index ? 'bg-green-500' : 'bg-gray-400'}`}
              >
                {i + 1}
              </div>
              <span className={`mt-2 text-sm ${i === index ? 'text-[#FF5722] font-semibold' : 'text-gray-600'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            {current?.id === 'review' && (
              <div data-testid="review-step">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-semibold text-[#1A1A1A]">Review Your Order</CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <p className="text-lg font-medium text-[#1A1A1A]">{item.name}</p>
                      <p className="text-lg text-gray-800">{formatCurrency(item.unitPrice)}</p>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between items-center font-bold text-xl text-[#1A1A1A]">
                    <span>Total:</span>
                    <span>{formatCurrency(totals.total)}</span>
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <Button
                    onClick={handleProceedToPayment}
                    disabled={isCreatingSubscription}
                    className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
                    data-testid="proceed-to-payment-cta"
                  >
                    {isCreatingSubscription ? 'Processing...' : 'Proceed to Payment'}
                  </Button>
                </div>
              </div>
            )}

            {current?.id === 'payment' && (
              <div data-testid="payment-step">
                <PaymentStep
                  totalAmount={totals.total}
                  onPaymentSuccess={handlePaymentSuccess}
                />
                <div className="flex justify-between mt-8">
                  <Button
                    onClick={back}
                    variant="outline"
                    className="border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white rounded-full px-6 py-3 transition-all duration-200"
                    data-testid="back-to-review-cta"
                  >
                    Back
                  </Button>
                </div>
              </div>
            )}

            {current?.id === 'confirmation' && (
              <div data-testid="confirmation-step">
                <ConfirmationStep
                  membershipPlanName={membershipPlanName}
                  totalAmount={totals.total}
                />
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={() => navigate(ROUTES.HOME)}
                    className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
                    data-testid="go-home-cta"
                  >
                    Go to Home
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {checkoutError && (
          <Alert variant="destructive" className="mt-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{checkoutError}</AlertDescription>
          </Alert>
        )}
      </div>
    </section>
  );
};

export default CheckoutPage;