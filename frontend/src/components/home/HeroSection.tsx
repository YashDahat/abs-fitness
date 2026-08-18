import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';

const HeroSection = () => {
  return (
    <section className="relative h-[500px] md:h-[600px] bg-cover bg-center flex items-center justify-center">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://assets.mixkit.co/videos/preview/mixkit-man-lifting-weights-in-a-gym-2342-large.mp4" // Example video URL
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">ABS FITNESS</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Unleash Your Potential. Transform Your Body. Elevate Your Life.
        </p>
        <Button
          asChild
          className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
          data-testid="start-trial-cta"
        >
          <Link to={ROUTES.CONTACT}>Start Your Free Trial</Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;