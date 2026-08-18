import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Facility {
  title: string;
  description: string;
  imageUrl: string;
}

const facilities: Facility[] = [
  {
    title: 'State-of-the-Art Equipment',
    description: 'Experience the latest in fitness technology with our wide range of modern equipment.',
    imageUrl: 'https://images.unsplash.com/photo-1534368959878-b5c517d5e865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMzNXwwfDF8c2VhcmNofDEzfHdoeSUyMGd5bXxlbnwwfHx8fDE3MTY3MjQzODV8MA&ixlib=rb-4.0.3&q=80&w=1080',
  },
  {
    title: 'Olympic-Size Swimming Pool',
    description: 'Dive into our pristine Olympic-size pool for a refreshing workout or leisurely swim.',
    imageUrl: 'https://images.unsplash.com/photo-1571025219010-92815157a916?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMzNXwwfDF8c2VhcmNofDE2fHxzd2ltbWluZyUyMHBvb2wlMjBneW18ZW58MHx8fHwxNzE2NzI0NDI3fDA&ixlib=rb-4.0.3&q=80&w=1080',
  },
  {
    title: 'Expert Personal Trainers',
    description: 'Achieve your goals faster with personalized guidance from our certified fitness professionals.',
    imageUrl: 'https://images.unsplash.com/photo-1571025219010-92815157a916?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMzNXwwfDF8c2VhcmNofDE2fHxzd2ltbWluZyUyMHBvb2wlMjBneW18ZW58MHx8fHwxNzE2NzI0NDI3fDA&ixlib=rb-4.0.3&q=80&w=1080',
  },
  {
    title: 'Group Fitness Classes',
    description: 'Join invigorating group classes from yoga to HIIT, designed for all fitness levels.',
    imageUrl: 'https://images.unsplash.com/photo-1590487988256-9dd3816a5193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMzNXwwfDF8c2VhcmNofDE2fHxncm91cCUyMGZpdG5lc3MlMjBjbGFzc2VzfGVufDB8fHx8MTcxNjc2MTQ2NHww&ixlib=rb-4.0.3&q=80&w=1080',
  },
  {
    title: 'Spa and Wellness Center',
    description: 'Relax and rejuvenate with our luxurious spa services and wellness treatments.',
    imageUrl: 'https://images.unsplash.com/photo-1590487988256-9dd3816a5193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMzNXwwfDF8c2VhcmNofDE2fHxncm91cCUyMGZpdG5lc3MlMjBjbGFzc2VzfGVufDB8fHx8MTcxNjc2MTQ2NHww&ixlib=rb-4.0.3&q=80&w=1080',
  },
  {
    title: 'Nutritional Counseling',
    description: 'Optimize your diet with expert nutritional advice tailored to your fitness journey.',
    imageUrl: 'https://images.unsplash.com/photo-1590487988256-9dd3816a5193?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMzNXwwfDF8c2VhcmNofDE2fHxncm91cCUyMGZpdG5lc3MlMjBjbGFzc2VzfGVufDB8fHx8MTcxNjc2MTQ2NHww&ixlib=rb-4.0.3&q=80&w=1080',
  },
];

export default function FacilitiesHighlight() {
  return (
    <section className="py-16 px-4 bg-[#F5F5F5]" data-testid="facilities-highlight-section">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] mb-4">Our World-Class Facilities</h2>
        <p className="text-lg text-[#1A1A1A] leading-relaxed mb-12">
          Discover the premium amenities that make ABS FITNESS the ultimate destination for your health and wellness journey.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <Card key={index} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center text-center transition-all duration-200 hover:shadow-lg" data-testid={`facility-card-${index}`}>
              <img
                src={facility.imageUrl}
                alt={facility.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <CardHeader className="p-0 mb-2">
                <CardTitle className="text-xl font-semibold text-[#1A1A1A]">{facility.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-[#1A1A1A] leading-relaxed">
                {facility.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}