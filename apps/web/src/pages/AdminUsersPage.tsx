import { Users } from 'lucide-react';
import Card from '../components/ui/Card';

export default function AdminUsersPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
          </div>
          <p className="mt-1 text-gray-600">View and manage platform users</p>
        </div>

        <Card className="p-8 text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">User Management</h3>
          <p className="text-gray-600">User management features coming soon...</p>
        </Card>
      </div>
    </div>
  );
}
