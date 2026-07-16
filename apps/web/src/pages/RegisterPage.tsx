import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router';
import { register as apiRegister } from '../api/auth';
import { useAuth } from '../contexts/useAuth';
import type { ValidationErrors } from '../types/auth';

const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password_confirmation: z.string().min(1, 'Please confirm your password'),
    role: z.enum(['user', 'organizer'], { error: 'Please select a role' }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [serverErrors, setServerErrors] = useState<ValidationErrors>({});
  const [generalError, setGeneralError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormData) {
    setServerErrors({});
    setGeneralError('');

    try {
      const response = await apiRegister(data);
      login(response.user, response.token);
      navigate('/');
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { status?: number; data?: { errors?: ValidationErrors; message?: string } };
      };

      if (axiosError.response?.status === 422 && axiosError.response?.data?.errors) {
        setServerErrors(axiosError.response.data.errors);
      } else {
        setGeneralError('An unexpected error occurred. Please try again.');
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <svg className="h-10 w-10 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-2xl font-bold text-gray-900">Eventora</span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {generalError && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-red-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-700">{generalError}</p>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                {...register('name')}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm transition-colors"
                placeholder="John Doe"
              />
              {(errors.name || serverErrors.name) && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.name?.message || serverErrors.name?.[0]}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email')}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm transition-colors"
                placeholder="you@example.com"
              />
              {(errors.email || serverErrors.email) && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.email?.message || serverErrors.email?.[0]}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                {...register('password')}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm transition-colors"
                placeholder="At least 8 characters"
              />
              {(errors.password || serverErrors.password) && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.password?.message || serverErrors.password?.[0]}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm password
              </label>
              <input
                id="password_confirmation"
                type="password"
                autoComplete="new-password"
                {...register('password_confirmation')}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:text-sm transition-colors"
                placeholder="Re-enter your password"
              />
              {errors.password_confirmation && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">I want to</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 transition-all">
                  <input type="radio" value="user" {...register('role')} className="sr-only" />
                  <div className="flex flex-col items-center gap-2">
                    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">Attendee</span>
                    <span className="text-xs text-gray-500">Find events</span>
                  </div>
                </label>
                <label className="relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 transition-all">
                  <input type="radio" value="organizer" {...register('role')} className="sr-only" />
                  <div className="flex flex-col items-center gap-2">
                    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">Organizer</span>
                    <span className="text-xs text-gray-500">Host events</span>
                  </div>
                </label>
              </div>
              {(errors.role || serverErrors.role) && (
                <p className="mt-1.5 text-sm text-red-600">
                  {errors.role?.message || serverErrors.role?.[0]}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
