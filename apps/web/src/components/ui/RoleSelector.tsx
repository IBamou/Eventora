import { Ticket, Building2 } from 'lucide-react';

interface RoleOption {
  value: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface RoleSelectorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const roles: RoleOption[] = [
  {
    value: 'user',
    title: 'Attendee',
    description: 'Discover and attend events',
    icon: <Ticket className="h-6 w-6" />,
  },
  {
    value: 'organizer',
    title: 'Organizer',
    description: 'Create and manage events',
    icon: <Building2 className="h-6 w-6" />,
  },
];

export default function RoleSelector({ value, onChange, error }: RoleSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">I want to</label>
      <div
        className="grid grid-cols-2 gap-3"
        role="radiogroup"
        aria-label="Select role"
      >
        {roles.map((role) => (
          <button
            key={role.value}
            type="button"
            role="radio"
            aria-checked={value === role.value}
            onClick={() => onChange(role.value)}
            className={`relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
              value === role.value
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div
              className={`rounded-lg p-2 ${
                value === role.value ? 'bg-indigo-100' : 'bg-gray-100'
              }`}
            >
              {role.icon}
            </div>
            <span className="text-sm font-medium">{role.title}</span>
            <span className="text-xs text-gray-500">{role.description}</span>
          </button>
        ))}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
