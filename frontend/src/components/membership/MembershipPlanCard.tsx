import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MembershipPlanDto } from '@/types/membership';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes';

interface MembershipPlanCardProps {
  plan: MembershipPlanDto;
}

export default function MembershipPlanCard({ plan }: MembershipPlanCardProps) {
  const navigate = useNavigate();

  const handleJoinNow = () => {
    navigate(`${ROUTES.CHECKOUT}?planId=${plan.id}`);
  };

  const formattedPrice = plan.price.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  return (
    <Card className="flex flex-col justify-between p-6 rounded-xl shadow-md border border-gray-100 bg-white transition-all duration-200 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-[#1A1A1A]">{plan.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-lg font-bold text-[#FF5722] mb-2">{formattedPrice}</p>
        <p className="text-gray-600 mb-4">{plan.description}</p>
        <p className="text-gray-700">Duration: {plan.durationInMonths} months</p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleJoinNow}
          className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          data-testid={`join-now-${plan.id}-cta`}
        >
          Join Now
        </Button>
      </CardFooter>
    </Card>
  );
}