import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center px-4 py-16">
      <h1 className="text-6xl md:text-9xl font-bold text-gray-800 mb-4" data-testid="notfound-heading">
        404
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-8" data-testid="notfound-message">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to={ROUTES.HOME} data-testid="notfound-home-link">
        <Button className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200">
          Go to Homepage
        </Button>
      </Link>
    </div>
  );
}