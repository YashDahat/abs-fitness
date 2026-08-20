import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { MembershipPlan } from '@/types/membership';

interface MembershipPlanCardProps {
  plan: MembershipPlan;
  onSelectPlan: (plan: MembershipPlan) => void;
}

export default function MembershipPlanCard({ plan, onSelectPlan }: MembershipPlanCardProps) {
  const formattedPrice = plan.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

  return (
    <Card className="flex flex-col justify-between h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-[#1A1A1A]">{plan.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-700 mb-4">{plan.description}</p>
        <p className="text-lg font-bold text-[#FF5722] mb-2">{formattedPrice}</p>
        <p className="text-sm text-gray-600">Duration: {plan.durationMonths} months</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => onSelectPlan(plan)}
          className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          data-testid={`join-now-${plan.id}-cta`}
        >
          Join Now
        </Button>
      </CardFooter>
    </Card>
  );
}