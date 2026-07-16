import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import LoginPage from '../pages/LoginPage';
import { AuthProvider } from '../contexts/AuthProvider';
import * as authApi from '../api/auth';
import { mockAuthResponse } from '../test/mocks';

vi.mock('../api/auth');

function renderLoginPage() {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders login form', () => {
    renderLoginPage();

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in$/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    renderLoginPage();

    await userEvent.click(screen.getByRole('button', { name: /sign in$/i }));

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('shows invalid credentials error on 401', async () => {
    vi.mocked(authApi.login).mockRejectedValue({
      response: { status: 401 },
    });

    renderLoginPage();

    await userEvent.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'wrongpassword');
    await userEvent.click(screen.getByRole('button', { name: /sign in$/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid email or password.')).toBeInTheDocument();
    });
  });

  it('submits login and calls API', async () => {
    vi.mocked(authApi.login).mockResolvedValue(mockAuthResponse());

    renderLoginPage();

    await userEvent.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /sign in$/i }));

    await waitFor(() => {
      expect(authApi.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('disables submit button while submitting', async () => {
    vi.mocked(authApi.login).mockImplementation(() => new Promise(() => {}));

    renderLoginPage();

    await userEvent.type(screen.getByLabelText(/email address/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /sign in$/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled();
    });
  });

  it('links to registration page', () => {
    renderLoginPage();

    const registerLink = screen.getByRole('link', { name: /create one/i });
    expect(registerLink).toHaveAttribute('href', '/register');
  });
});
