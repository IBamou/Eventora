import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import RegisterPage from '../pages/RegisterPage';
import { AuthProvider } from '../contexts/AuthProvider';
import * as authApi from '../api/auth';
import { mockAuthResponse } from '../test/mocks';

vi.mock('../api/auth');

function renderRegisterPage() {
  return render(
    <MemoryRouter initialEntries={['/register']}>
      <AuthProvider>
        <RegisterPage />
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe('RegisterPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders registration form with role options', () => {
    renderRegisterPage();

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /attendee/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /organizer/i })).toBeInTheDocument();
  });

  it('does not display Admin as a registration option', () => {
    renderRegisterPage();

    expect(screen.queryByRole('radio', { name: /admin/i })).not.toBeInTheDocument();
  });

  it('submits registration and calls API', async () => {
    vi.mocked(authApi.register).mockResolvedValue(mockAuthResponse());

    renderRegisterPage();

    await userEvent.type(screen.getByLabelText(/full name/i), 'Test User');
    await userEvent.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password123');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'password123');
    await userEvent.click(screen.getByRole('radio', { name: /attendee/i }));
    await userEvent.click(screen.getByLabelText(/i agree to the terms and conditions/i));
    await userEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(authApi.register).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        password_confirmation: 'password123',
        role: 'user',
      });
    });
  });

  it('displays server validation errors', async () => {
    vi.mocked(authApi.register).mockRejectedValue({
      response: {
        status: 422,
        data: {
          errors: { email: ['The email has already been taken.'] },
        },
      },
    });

    renderRegisterPage();

    await userEvent.type(screen.getByLabelText(/full name/i), 'Test User');
    await userEvent.type(screen.getByLabelText(/email address/i), 'existing@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password123');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'password123');
    await userEvent.click(screen.getByRole('radio', { name: /attendee/i }));
    await userEvent.click(screen.getByLabelText(/i agree to the terms and conditions/i));
    await userEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText('The email has already been taken.')).toBeInTheDocument();
    });
  });

  it('shows terms error when checkbox not checked', async () => {
    renderRegisterPage();

    await userEvent.type(screen.getByLabelText(/full name/i), 'Test User');
    await userEvent.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'password123');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText('You must agree to the terms and conditions')).toBeInTheDocument();
    });
  });
});
