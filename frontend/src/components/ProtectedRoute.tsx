import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(`${ROUTES.LOGIN}?redirect=${location.pathname}`, { replace: true });
    } else if (!isLoading && isAuthenticated && allowedRoles && user && !allowedRoles.includes(user.role)) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location.pathname, allowedRoles, user]);

  if (isLoading || !isAuthenticated || (allowedRoles && user && !allowedRoles.includes(user.role))) {
    return null; // Or a loading spinner/skeleton
  }

  return <>{children}</>;
}