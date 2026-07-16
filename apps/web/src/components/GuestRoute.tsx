import { Navigate } from 'react-router';
import { useAuth } from '../contexts/useAuth';
import { getDashboardUrl } from '../lib/dashboard';
import Spinner from './Spinner';
import type { ReactNode } from 'react';

interface GuestRouteProps {
  children: ReactNode;
}

export default function GuestRoute({ children }: GuestRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={getDashboardUrl(user?.role || 'user')} replace />;
  }

  return <>{children}</>;
}
