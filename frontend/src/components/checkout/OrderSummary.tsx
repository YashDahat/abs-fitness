import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MembershipPlanDto } from '@/types/membership';

interface OrderSummaryProps {
  membershipPlan: MembershipPlanDto;
}

export default function OrderSummary({ membershipPlan }: OrderSummaryProps) {
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
    });
  };

  return (
    <Card className="w-full" data-testid="order-summary-card">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Plan: {membershipPlan.name}</span>
            <span className="text-lg font-semibold" data-testid="order-summary-plan-price">
              {formatCurrency(membershipPlan.price)}
            </span>
          </div>
          <div className="flex justify-between items-center text-gray-600">
            <span>Duration:</span>
            <span>{membershipPlan.durationInMonths} Months</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center font-bold text-xl">
            <span>Total:</span>
            <span data-testid="order-summary-total-price">
              {formatCurrency(membershipPlan.price)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}