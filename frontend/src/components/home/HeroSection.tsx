import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section
      className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b231b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="hero-headline">
          ABS FITNESS
          <br />
          <span className="text-2xl md:text-4xl font-semibold block mt-2">
            Unleash Your Potential
          </span>
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Your journey to a healthier, stronger you starts here.
        </p>
        <Button
          asChild
          className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          data-testid="hero-cta"
        >
          <Link to={ROUTES.MEMBERSHIP}>Join Now</Link>
        </Button>
      </div>
    </section>
  );
}