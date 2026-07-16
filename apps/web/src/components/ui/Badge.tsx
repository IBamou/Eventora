type BadgeVariant = 'user' | 'organizer' | 'admin';

interface BadgeProps {
  variant: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  user: 'bg-green-100 text-green-700',
  organizer: 'bg-blue-100 text-blue-700',
  admin: 'bg-red-100 text-red-700',
};

const labels: Record<BadgeVariant, string> = {
  user: 'Attendee',
  organizer: 'Organizer',
  admin: 'Admin',
};

export default function Badge({ variant, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {labels[variant]}
    </span>
  );
}
