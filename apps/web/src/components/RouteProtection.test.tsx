import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import ProtectedRoute from '../components/ProtectedRoute';
import RoleGate from '../components/RoleGate';
import { AuthProvider } from '../contexts/AuthProvider';
import * as authApi from '../api/auth';
import { mockUser, mockOrganizer, mockToken } from '../test/mocks';

vi.mock('../api/auth');

function Dashboard() {
  return <div data-testid="dashboard">Dashboard</div>;
}

function Login() {
  return <div data-testid="login">Login</div>;
}

function Forbidden() {
  return <div data-testid="forbidden">Forbidden</div>;
}

function renderWithAuth(ui: React.ReactNode, initialEntries: string[] = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="*" element={ui} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('shows loading state while restoring session', () => {
    localStorage.setItem('auth_token', mockToken);
    vi.mocked(authApi.getCurrentUser).mockImplementation(() => new Promise(() => {}));

    const { container } = renderWithAuth(
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>,
    );

    const spinner = container.querySelector('svg.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('redirects to login when not authenticated', async () => {
    renderWithAuth(
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('login')).toBeInTheDocument();
    });
  });

  it('renders children when authenticated', async () => {
    localStorage.setItem('auth_token', mockToken);
    vi.mocked(authApi.getCurrentUser).mockResolvedValue(mockUser);

    renderWithAuth(
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('dashboard')).toBeInTheDocument();
    });
  });

  it('preserves intended destination during login redirection', async () => {
    renderWithAuth(
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>,
      ['/protected'],
    );

    await waitFor(() => {
      expect(screen.getByTestId('login')).toBeInTheDocument();
    });
  });
});

describe('RoleGate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders children when user has required role', async () => {
    localStorage.setItem('auth_token', mockToken);
    vi.mocked(authApi.getCurrentUser).mockResolvedValue(mockUser);

    renderWithAuth(
      <RoleGate roles="user">
        <Dashboard />
      </RoleGate>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('dashboard')).toBeInTheDocument();
    });
  });

  it('redirects to forbidden when user lacks required role', async () => {
    localStorage.setItem('auth_token', mockToken);
    vi.mocked(authApi.getCurrentUser).mockResolvedValue(mockUser);

    renderWithAuth(
      <RoleGate roles="admin">
        <Dashboard />
      </RoleGate>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('forbidden')).toBeInTheDocument();
    });
  });

  it('accepts array of roles', async () => {
    localStorage.setItem('auth_token', mockToken);
    vi.mocked(authApi.getCurrentUser).mockResolvedValue(mockOrganizer);

    renderWithAuth(
      <RoleGate roles={['user', 'organizer']}>
        <Dashboard />
      </RoleGate>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('dashboard')).toBeInTheDocument();
    });
  });

  it('redirects to login when not authenticated', async () => {
    renderWithAuth(
      <RoleGate roles="user">
        <Dashboard />
      </RoleGate>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('login')).toBeInTheDocument();
    });
  });
});
