import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { MembershipPlanDto } from '@/types/membership';

interface MembershipPlanCardProps {
  plan: MembershipPlanDto;
  onEnroll: (plan: MembershipPlanDto) => void;
}

export default function MembershipPlanCard({ plan, onEnroll }: MembershipPlanCardProps): React.JSX.Element {
  const formattedPrice = plan.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

  return (
    <Card className="flex flex-col justify-between h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-[#1A1A1A]">{plan.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-700 mb-4 leading-relaxed">{plan.description}</p>
        <p className="text-3xl font-bold text-[#FF5722] mb-2">{formattedPrice}</p>
        <p className="text-gray-600">Duration: {plan.durationInMonths} months</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => onEnroll(plan)}
          className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          data-testid={`enroll-${plan.id}-cta`}
        >
          Enroll Now
        </Button>
      </CardFooter>
    </Card>
  );
}