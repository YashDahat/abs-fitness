import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { CartItem, CartTotals, AdjustmentLine } from '@/cart/types';

interface OrderSummaryProps {
  cartItems: CartItem[];
  totals: CartTotals;
}

export default function OrderSummary({ cartItems, totals }: OrderSummaryProps): React.JSX.Element {
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <span className="text-lg font-medium">{item.name}</span>
              <span className="text-lg font-semibold">{formatCurrency(item.unitPrice * item.quantity)}</span>
            </div>
          ))}

          <Separator />

          <div className="flex justify-between items-center text-lg">
            <span>Subtotal</span>
            <span>{formatCurrency(totals.subtotal)}</span>
          </div>

          {totals.adjustments.map((adjustment: AdjustmentLine) => (
            <div key={adjustment.id} className="flex justify-between items-center text-lg">
              <span>{adjustment.label}</span>
              <span>{formatCurrency(adjustment.amount)}</span>
            </div>
          ))}

          <Separator />

          <div className="flex justify-between items-center text-xl font-bold text-[#FF5722]">
            <span>Total</span>
            <span>{formatCurrency(totals.total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}