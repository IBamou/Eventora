import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Calendar } from 'lucide-react';
import { useAuth } from '../contexts/useAuth';
import { register as apiRegister } from '../api/auth';
import { parseApiError } from '../lib/api-errors';
import Input from '../components/ui/Input';
import PasswordInput from '../components/ui/PasswordInput';
import Button from '../components/ui/Button';
import RoleSelector from '../components/ui/RoleSelector';
import Checkbox from '../components/ui/Checkbox';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [role, setRole] = useState<'user' | 'organizer'>('user');
  const [agreesToTerms, setAgreesToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setGeneralError('');

    if (!agreesToTerms) {
      setErrors({ terms: 'You must agree to the terms and conditions' });
      return;
    }

    try {
      const response = await apiRegister({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        role,
      });
      login(response.user, response.token);
      navigate('/auth/redirect');
    } catch (err: unknown) {
      const { generalError: msg, fieldErrors } = parseApiError(err);
      setGeneralError(msg);
      setErrors(fieldErrors);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Calendar className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-xl sm:px-10 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            {generalError && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{generalError}</div>
            )}

            <RoleSelector
              value={role}
              onChange={(v) => setRole(v as 'user' | 'organizer')}
              error={errors.role}
            />

            <Input
              label="Full name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              required
            />

            <Input
              label="Email address"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
            />

            <PasswordInput
              label="Password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
            />

            <PasswordInput
              label="Confirm password"
              autoComplete="new-password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              error={errors.password_confirmation}
              required
            />

            <Checkbox
              label="I agree to the terms and conditions"
              checked={agreesToTerms}
              onChange={(e) => setAgreesToTerms(e.target.checked)}
              error={errors.terms}
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
