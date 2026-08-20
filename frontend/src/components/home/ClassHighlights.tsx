import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFitnessClasses } from '@/hooks/fitnessClassHooks';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';

export default function ClassHighlights() {
  const { data: classes, isLoading, isError } = useFitnessClasses();

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">Our Classes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-10 w-full mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !classes || classes.length === 0) {
    return (
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-12">Our Classes</h2>
          <p className="text-gray-600">No classes available at the moment. Please check back later!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">Our Classes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.slice(0, 3).map((fitnessClass) => (
            <Card key={fitnessClass.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <CardHeader>
                <CardTitle className="text-xl font-bold">{fitnessClass.name}</CardTitle>
                <CardDescription className="text-gray-600">{fitnessClass.scheduleTime}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[#1A1A1A] leading-relaxed mb-4">{fitnessClass.description}</p>
                <Link to={ROUTES.CLASSES} data-testid="view-details-cta">
                  <Button className="w-full bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to={ROUTES.CLASSES} data-testid="all-classes-cta">
            <Button className="bg-transparent border border-[#FF5722] text-[#FF5722] hover:bg-[#FF5722] hover:text-white font-semibold rounded-full px-8 py-3 transition-all duration-200">
              View All Classes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}