import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, Snowflake, SwimmingPool, Users } from 'lucide-react';

interface Facility {
  icon: React.ElementType;
  title: string;
  description: string;
}

const facilities: Facility[] = [
  {
    icon: Dumbbell,
    title: 'State-of-the-Art Equipment',
    description: 'Equipped with the latest cardio and strength training machines for all fitness levels.',
  },
  {
    icon: SwimmingPool,
    title: 'Olympic-Size Swimming Pool',
    description: 'Dive into our expansive pool for laps, aquatic workouts, or relaxation.',
  },
  {
    icon: Users,
    title: 'Personalized Training Zones',
    description: 'Dedicated areas for one-on-one coaching and specialized workout routines.',
  },
  {
    icon: Snowflake,
    title: 'Climate-Controlled Environment',
    description: 'Maintain peak performance in our perfectly regulated indoor climate.',
  },
];

export default function FacilitiesHighlight(): React.JSX.Element {
  return (
    <section className="py-16 px-4 bg-[#F5F5F5]" data-testid="facilities-highlight-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-[#1A1A1A]">Our Premium Facilities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilities.map((facility, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-200 hover:shadow-lg">
              <CardHeader className="pb-4">
                <facility.icon className="h-12 w-12 text-[#FF5722] mb-4" />
                <CardTitle className="text-xl font-bold text-[#1A1A1A]">{facility.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 leading-relaxed">
                {facility.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}