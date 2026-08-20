import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useMembershipPlans } from '@/hooks/membershipHooks';
import { ROUTES } from '@/routes';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

export default function MembershipTiers() {
  const { data: membershipPlans, isLoading, isError } = useMembershipPlans();

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-white" data-testid="membership-tiers-section">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-8">Membership Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="flex flex-col justify-between h-full">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-1/3 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !membershipPlans) {
    return (
      <section className="py-16 px-4 bg-white" data-testid="membership-tiers-section">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-8">Membership Plans</h2>
          <p className="text-red-500">Failed to load membership plans. Please try again later.</p>
        </div>
      </section>
    );
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  return (
    <section className="py-16 px-4 bg-white" data-testid="membership-tiers-section">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-8">Membership Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {membershipPlans.map((plan) => (
            <Card key={plan.id} className="flex flex-col justify-between h-full transition-all duration-200 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-[#1A1A1A]">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600">{plan.durationInMonths} Months</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-3xl font-bold text-[#FF5722] mb-4">{formatPrice(plan.price)}</p>
                <p className="text-gray-700 leading-relaxed">{plan.description}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid={`join-now-cta-${plan.id}`}>
                  <Link to={ROUTES.MEMBERSHIP}>Join Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}