import { Navigate, Outlet, useLocation } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import { useAuth } from '@hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children || <Outlet />;
}