import { Link } from 'react-router';
import { useAuth } from '../contexts/useAuth';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <svg className="h-8 w-8 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xl font-bold text-gray-900">Eventora</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  Dashboard
                </Link>
                {user?.role === 'organizer' && (
                  <Link
                    to="/organizer"
                    className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                  >
                    Organizer
                  </Link>
                )}
                <div className="flex items-center gap-3 ml-2 pl-3 border-l border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-indigo-700">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                  >
                    Sign out
                  </button>
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
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
