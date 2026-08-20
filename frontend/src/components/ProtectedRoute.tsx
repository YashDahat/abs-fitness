import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/routes';

interface ProtectedRouteProps extends React.PropsWithChildren {
  roles?: string[];
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles, redirectPath = ROUTES.LOGIN }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigate(`${redirectPath}?redirect=${location.pathname}`, { replace: true });
      } else if (roles && user && !roles.includes(user.role)) {
        // Redirect to home or an unauthorized page if roles don't match
        // For now, redirect to home as /unauthorized is not in scope
        navigate(ROUTES.HOME, { replace: true });
      }
    }
  }, [isAuthenticated, isLoading, user, roles, navigate, location.pathname, redirectPath]);

  if (isLoading || !isAuthenticated || (roles && user && !roles.includes(user.role))) {
    return null; // Or a loading spinner/skeleton
  }

  return <>{children}</>;
};

export default ProtectedRoute;