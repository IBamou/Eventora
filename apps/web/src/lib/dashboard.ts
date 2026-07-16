import type { UserRole } from '../types/auth';

export function getDashboardUrl(role: UserRole): string {
  switch (role) {
    case 'organizer':
      return '/organizer/dashboard';
    case 'admin':
      return '/admin/dashboard';
    default:
      return '/dashboard';
  }
}
