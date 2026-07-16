import { Settings } from 'lucide-react';
import { useAuth } from '../contexts/useAuth';
import Card from '../components/ui/Card';

export default function OrganizerSettingsPage() {
  useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Organizer Settings</h1>
          </div>
          <p className="mt-1 text-gray-600">Manage your organizer profile and preferences</p>
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Profile</h2>
          <p className="text-gray-600">Profile settings coming soon...</p>
        </Card>
      </div>
    </div>
  );
}
