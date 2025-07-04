import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const PrivateRoute = ({ roles }: { roles?: string[] }) => {
  const { user } = useAuth();

  console.log('User from context:', user);
  
  if (!user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};
