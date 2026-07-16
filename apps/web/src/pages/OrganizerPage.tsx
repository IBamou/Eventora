import { useAuth } from '../contexts/useAuth';

export default function OrganizerPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Organizer Panel</h1>
        <p className="mt-1 text-gray-600">
          Manage your events, {user?.name}.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-4">
          <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Event Management</h2>
        <p className="mt-2 text-gray-600 max-w-md mx-auto">
          Create and manage your events. This is where you&apos;ll be able to set up event details, manage attendees, and track registrations.
        </p>
        <button
          type="button"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Your First Event
        </button>
      </div>
    </div>
  );
}
