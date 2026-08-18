import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';

function NotFoundPage() {
  return (
    <section className="py-16 px-4 flex items-center justify-center min-h-[calc(100vh-var(--header-height)-var(--footer-height))]">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-[#1A1A1A]">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A] mt-4">Page Not Found</h2>
        <p className="text-lg text-gray-700 mt-2">
          The page you are looking for does not exist.
        </p>
        <Button asChild className="mt-8 bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="go-home-cta">
          <Link to={ROUTES.HOME}>Go to Homepage</Link>
        </Button>
      </div>
    </section>
  );
}

export default NotFoundPage;