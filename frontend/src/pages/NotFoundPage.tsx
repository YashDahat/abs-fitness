import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';

export default function NotFoundPage() {
  return (
    <section className="py-16 px-4 text-center bg-white min-h-[calc(100vh-var(--site-header-height)-var(--site-footer-height))] flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl md:text-9xl font-bold text-[#FF5722] mb-4">404</h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-[#1A1A1A] mb-6">Page Not Found</h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button asChild className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="back-to-home-cta">
          <Link to={ROUTES.HOME}>Go to Homepage</Link>
        </Button>
      </div>
    </section>
  );
}