import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';
import { Button } from '@/components/ui/button';
import { useTrainers } from '@/hooks/trainerHooks';
import TrainerCard from '@/components/trainers/TrainerCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function AboutPage() {
  const { data: trainers, isLoading, isError } = useTrainers();

  return (
    <div className="bg-white text-[#1A1A1A]">
      {/* Hero Section */}
      <section
        className="relative h-[400px] md:h-[500px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/images/about-hero.webp')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="about-hero-heading">
            Our Story
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Empowering you to achieve your fitness goals and live a healthier, happier life.
          </p>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Our Philosophy</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="mb-4 leading-relaxed">
                At ABS FITNESS, we believe that true fitness is a journey, not a destination. It's about
                cultivating a lifestyle that embraces physical strength, mental clarity, and emotional
                well-being. Our philosophy is rooted in personalized care, innovative training methods,
                and a supportive community that inspires growth and resilience.
              </p>
              <p className="leading-relaxed">
                We are committed to providing a holistic fitness experience, offering a diverse range
                of classes, state-of-the-art equipment, and expert guidance. We empower our members to
                discover their potential, push their limits, and celebrate every milestone along the way.
              </p>
            </div>
            <div>
              <img
                src="/images/philosophy.webp"
                alt="Our Philosophy"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our History Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Our History</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/history.webp"
                alt="Our History"
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div>
              <p className="mb-4 leading-relaxed">
                Founded in 2005, ABS FITNESS started as a small community gym with a big vision: to make
                fitness accessible and enjoyable for everyone. Over the years, we've grown into a leading
                fitness center, expanding our facilities and diversifying our offerings to meet the evolving
                needs of our members.
              </p>
              <p className="leading-relaxed">
                From our humble beginnings, we've remained true to our core values of excellence, integrity,
                and community. We're proud of the countless success stories we've witnessed and the positive
                impact we've had on the lives of our members. Our journey continues, driven by a passion
                for health and a commitment to empowering individuals to achieve their best selves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Trainers Section */}
      <section className="py-16 px-4 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Meet Our Trainers</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="h-80 w-full rounded-xl" />
              ))}
            </div>
          ) : isError || !trainers || trainers.length === 0 ? (
            <div className="text-center text-gray-600">
              <p>No trainers found or an error occurred.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainers.slice(0, 3).map((trainer) => (
                <TrainerCard key={trainer.id} trainer={trainer} />
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Button asChild className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="view-all-trainers-cta">
              <Link to={ROUTES.TRAINERS}>View All Trainers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-[#1A1A1A] text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Fitness Journey?</h2>
          <p className="text-lg mb-8 leading-relaxed">
            Join ABS FITNESS today and experience a transformative approach to health and wellness.
            Our dedicated team and world-class facilities are here to support you every step of the way.
          </p>
          <Button asChild className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="join-now-cta">
            <Link to={ROUTES.MEMBERSHIP}>Join Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}