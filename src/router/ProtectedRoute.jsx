import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { user, role } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};



