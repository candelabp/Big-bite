import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const PublicRoute = () => {
  const { user } = useContext(UserContext);

  if (user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

