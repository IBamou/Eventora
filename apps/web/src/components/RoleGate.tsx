import { Navigate } from 'react-router';
import { useAuth } from '../contexts/useAuth';
import Spinner from './Spinner';
import type { ReactNode } from 'react';
import type { UserRole } from '../types/auth';

interface RoleGateProps {
  roles: UserRole | UserRole[];
  children: ReactNode;
}

export default function RoleGate({ roles, children }: RoleGateProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <>{children}</>;
}
