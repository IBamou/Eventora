import { vi } from 'vitest';
import type { User, AuthResponse } from '../types/auth';

export const mockUser: User = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  role: 'user',
  created_at: '2026-01-01T00:00:00.000000Z',
  updated_at: '2026-01-01T00:00:00.000000Z',
};

export const mockOrganizer: User = {
  ...mockUser,
  id: 2,
  name: 'Test Organizer',
  email: 'organizer@example.com',
  role: 'organizer',
};

export const mockAdmin: User = {
  ...mockUser,
  id: 3,
  name: 'Test Admin',
  email: 'admin@example.com',
  role: 'admin',
};

export const mockToken = 'test-token-123';

export function mockAuthResponse(user: User = mockUser): AuthResponse {
  return { user, token: mockToken };
}

export function mockApiModule() {
  return {
    register: vi.fn(),
    login: vi.fn(),
    getCurrentUser: vi.fn(),
    logout: vi.fn(),
  };
}
