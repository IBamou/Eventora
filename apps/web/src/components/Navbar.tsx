import { useState } from 'react';
import { Link } from 'react-router';
import { Menu, X, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/useAuth';
import { getDashboardUrl } from '../lib/dashboard';
import Badge from './ui/Badge';
import Avatar from './ui/Avatar';
import Button from './ui/Button';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dashboardUrl = getDashboardUrl(user?.role || 'user');

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Calendar className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">Eventora</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to={dashboardUrl}
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  Dashboard
                </Link>
                <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
                  <div className="flex items-center gap-2">
                    <Avatar name={user?.name || ''} size="sm" />
                    <div className="hidden lg:block">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <Badge variant={user?.role || 'user'} />
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    Sign out
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  Sign in
                </Link>
                <Link to="/register">
                  <Button size="sm">Get started</Button>
                </Link>
              </>
            )}
          </div>

          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
              <div className="px-4 py-3 space-y-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                  <Avatar name={user?.name || ''} size="md" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <Badge variant={user?.role || 'user'} />
                  </div>
                </div>
                <Link
                  to="/"
                  className="block text-sm font-medium text-gray-700 hover:text-indigo-600 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to={dashboardUrl}
                  className="block text-sm font-medium text-gray-700 hover:text-indigo-600 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); logout(); }}
                  className="block w-full text-left text-sm font-medium text-red-600 hover:text-red-700 py-2"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="block text-sm font-medium text-gray-700 hover:text-indigo-600 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className="block text-sm font-medium text-gray-700 hover:text-indigo-600 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link to="/register" className="block" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Get started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
