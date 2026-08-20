import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ROUTES } from '@/routes';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ConfirmationStepProps {
  membershipPlanName: string;
  totalAmount: number;
}

export default function ConfirmationStep({
  membershipPlanName,
  totalAmount,
}: ConfirmationStepProps) {
  const formattedAmount = totalAmount.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="flex flex-col items-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="text-2xl md:text-3xl font-semibold text-[#1A1A1A]">
            Congratulations!
          </CardTitle>
          <p className="text-lg text-gray-700 mt-2">
            Your ABS FITNESS Membership is Confirmed!
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          <div className="flex justify-between text-lg font-medium">
            <span>Membership Plan:</span>
            <span className="text-[#FF5722]">{membershipPlanName}</span>
          </div>
          <div className="flex justify-between text-lg font-medium">
            <span>Amount Paid:</span>
            <span className="text-[#FF5722]">{formattedAmount}</span>
          </div>
          <Separator />
          <p className="text-gray-600">
            Thank you for joining the ABS FITNESS family. We're excited to help
            you on your fitness journey!
          </p>
          <div className="flex flex-col space-y-4 mt-6">
            <Button asChild className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="confirmation-dashboard-cta">
              <Link to={ROUTES.PROFILE}>Go to My Dashboard</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-8 py-3 transition-all duration-200" data-testid="confirmation-home-cta">
              <Link to={ROUTES.HOME}>Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}