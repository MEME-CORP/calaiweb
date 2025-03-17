import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  redirectPath?: string;
}

/**
 * A route wrapper that checks if the user is authenticated
 * If not authenticated, redirect to login page
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectPath = '/login',
}) => {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    // Redirect to login page but save the current location they tried to access
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }
  
  // If there are children, render them, otherwise render the outlet
  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;