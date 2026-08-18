import { MembershipPlanDto } from '@/types/membership';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';

interface MembershipGridProps {
  plans: MembershipPlanDto[];
}

function MembershipPlanCard({ plan }: { plan: MembershipPlanDto }) {
  const formattedPrice = plan.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

  return (
    <Card className="flex flex-col justify-between h-full transition-all duration-200 hover:shadow-lg" data-testid={`membership-plan-card-${plan.id}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
        <CardDescription className="text-gray-600">{plan.durationInMonths} Month Plan</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-3xl font-bold text-[#FF5722] mb-4">{formattedPrice}</p>
        <p className="text-gray-700 leading-relaxed">{plan.description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid={`join-now-cta-${plan.id}`}>
          <Link to={`${ROUTES.CHECKOUT}?planId=${plan.id}`}>Join Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function MembershipGrid({ plans }: MembershipGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <MembershipPlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}