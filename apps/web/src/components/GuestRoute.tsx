import { Navigate } from 'react-router';
import { useAuth } from '../contexts/useAuth';
import Spinner from './Spinner';
import type { ReactNode } from 'react';

interface GuestRouteProps {
  children: ReactNode;
}

export default function GuestRoute({ children }: GuestRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
