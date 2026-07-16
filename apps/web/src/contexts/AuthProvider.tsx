import { useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User } from '../types/auth';
import { getCurrentUser, logout as apiLogout } from '../api/auth';
import { tokenStorage } from '../lib/token';
import { AuthContext, type AuthContextValue } from './AuthContext';

function useAuthState(): AuthContextValue {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = user !== null;

  const login = useCallback((newUser: User, token: string) => {
    tokenStorage.set(token);
    setUser(newUser);
    setIsLoading(false);
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch {
      // Logout even if API call fails
    } finally {
      tokenStorage.remove();
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    } catch {
      tokenStorage.remove();
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      const token = tokenStorage.get();
      if (!token) {
        if (!cancelled) {
          setIsLoading(false);
        }
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        if (!cancelled) {
          setUser(currentUser);
        }
      } catch {
        tokenStorage.remove();
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null);
      setIsLoading(false);
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  return { user, isLoading, isAuthenticated, login, logout, refreshUser };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const authState = useAuthState();

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}
