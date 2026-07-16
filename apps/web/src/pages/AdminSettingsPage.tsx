import { Settings } from 'lucide-react';
import Card from '../components/ui/Card';

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
          </div>
          <p className="mt-1 text-gray-600">Platform configuration and settings</p>
        </div>

        <Card className="p-8 text-center">
          <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Platform Settings</h3>
          <p className="text-gray-600">Platform settings coming soon...</p>
        </Card>
      </div>
    </div>
  );
}
