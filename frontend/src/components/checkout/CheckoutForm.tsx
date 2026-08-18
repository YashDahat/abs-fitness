import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useCreateSubscription } from '@/hooks/useMembership';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ROUTES } from '@/routes';

interface CheckoutFormProps {
  membershipPlanId: number;
  planName: string;
  planPrice: number;
}

export default function CheckoutForm({ membershipPlanId, planName, planPrice }: CheckoutFormProps) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { mutate: createSubscription, isPending, isError, error } = useCreateSubscription();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('You must be logged in to subscribe.');
      navigate(ROUTES.LOGIN);
      return;
    }

    // In a real application, payment processing would happen here.
    // For this exercise, we'll simulate a successful payment with a placeholder paymentId.
    const placeholderPaymentId = `PAY-${Date.now()}`;

    createSubscription({
      membershipPlanId: membershipPlanId,
      userId: 0,
      paymentId: placeholderPaymentId,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto" data-testid="checkout-form">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Payment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              type="text"
              placeholder="**** **** **** ****"
              value={paymentDetails.cardNumber}
              onChange={handleInputChange}
              required
              data-testid="checkout-card-number"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="text"
                placeholder="MM/YY"
                value={paymentDetails.expiryDate}
                onChange={handleInputChange}
                required
                data-testid="checkout-expiry-date"
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                type="text"
                placeholder="***"
                value={paymentDetails.cvv}
                onChange={handleInputChange}
                required
                data-testid="checkout-cvv"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
            disabled={isPending}
            data-testid="checkout-pay-now-button"
          >
            {isPending ? 'Processing...' : `Pay Now ${planPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}`}
          </Button>
          {isError && <p className="text-red-500 text-sm mt-2">Error: {error?.message}</p>}
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">
          By clicking "Pay Now", you agree to the terms and conditions of ABS FITNESS.
        </p>
      </CardFooter>
    </Card>
  );
}