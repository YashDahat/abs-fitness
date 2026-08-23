import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';

export default function HeroSection() {
  return (
    <section className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}>
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          ABS FITNESS
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Unleash Your Potential. Transform Your Body.
        </p>
        <Button
          asChild
          className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          data-testid="hero-membership-cta"
        >
          <Link to={ROUTES.MEMBERSHIP}>Join Now</Link>
        </Button>
      </div>
    </section>
  );
}