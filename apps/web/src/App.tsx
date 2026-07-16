import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider } from './contexts/AuthProvider';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import RoleGate from './components/RoleGate';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ForbiddenPage from './pages/ForbiddenPage';
import DashboardPage from './pages/DashboardPage';
import OrganizerPage from './pages/OrganizerPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <RegisterPage />
              </GuestRoute>
            }
          />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route path="/forbidden" element={<ForbiddenPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <DashboardPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/organizer"
            element={
              <ProtectedRoute>
                <RoleGate roles="organizer">
                  <Layout>
                    <OrganizerPage />
                  </Layout>
                </RoleGate>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
