import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { AuthProvider } from '../contexts/AuthProvider';
import { useAuth } from '../contexts/useAuth';
import * as authApi from '../api/auth';
import { mockUser, mockToken, mockAuthResponse } from '../test/mocks';

vi.mock('../api/auth');

function TestComponent() {
  const { user, isLoading, isAuthenticated } = useAuth();
  return (
    <div>
      <div data-testid="loading">{isLoading.toString()}</div>
      <div data-testid="authenticated">{isAuthenticated.toString()}</div>
      <div data-testid="user">{user ? user.name : 'null'}</div>
    </div>
  );
}

describe('AuthProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('restores session on mount when token exists', async () => {
    localStorage.setItem('auth_token', mockToken);
    vi.mocked(authApi.getCurrentUser).mockResolvedValue(mockUser);

    render(
      <MemoryRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });

    expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    expect(screen.getByTestId('user')).toHaveTextContent('Test User');
  });

  it('clears session when token is invalid', async () => {
    localStorage.setItem('auth_token', mockToken);
    vi.mocked(authApi.getCurrentUser).mockRejectedValue(new Error('Unauthorized'));

    render(
      <MemoryRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });

    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('user')).toHaveTextContent('null');
    expect(localStorage.getItem('auth_token')).toBeNull();
  });

  it('login stores token and sets user', async () => {
    vi.mocked(authApi.register).mockResolvedValue(mockAuthResponse());

    function LoginTest() {
      const { login, user, isAuthenticated } = useAuth();
      return (
        <div>
          <button
            onClick={() => login(mockUser, mockToken)}
            data-testid="login-btn"
          >
            Login
          </button>
          <div data-testid="user">{user ? user.name : 'null'}</div>
          <div data-testid="authenticated">{isAuthenticated.toString()}</div>
        </div>
      );
    }

    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginTest />
        </AuthProvider>
      </MemoryRouter>,
    );

    await userEvent.click(screen.getByTestId('login-btn'));

    expect(screen.getByTestId('user')).toHaveTextContent('Test User');
    expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    expect(localStorage.getItem('auth_token')).toBe(mockToken);
  });

  it('logout clears token and user', async () => {
    localStorage.setItem('auth_token', mockToken);
    vi.mocked(authApi.getCurrentUser).mockResolvedValue(mockUser);
    vi.mocked(authApi.logout).mockResolvedValue();

    function LogoutTest() {
      const { logout, user, isAuthenticated } = useAuth();
      return (
        <div>
          <button onClick={logout} data-testid="logout-btn">
            Logout
          </button>
          <div data-testid="user">{user ? user.name : 'null'}</div>
          <div data-testid="authenticated">{isAuthenticated.toString()}</div>
        </div>
      );
    }

    render(
      <MemoryRouter>
        <AuthProvider>
          <LogoutTest />
        </AuthProvider>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    });

    await userEvent.click(screen.getByTestId('logout-btn'));

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('null');
    });

    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
    expect(localStorage.getItem('auth_token')).toBeNull();
  });
});
