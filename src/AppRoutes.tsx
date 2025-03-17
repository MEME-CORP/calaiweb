import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './features/auth/ProtectedRoute';
import LoginScreen from './features/auth/LoginScreen';
import RegistrationScreen from './features/auth/RegistrationScreen';
import OnboardingFlow from './features/profile/OnboardingFlow';
import { useAuthStore } from './store/authStore';
import { useOnboardingStore } from './store/onboardingStore';

// Placeholder Dashboard component
const Dashboard = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>Dashboard</h1>
    <p>Welcome to your nutrition dashboard! This will be implemented in the next sub-batch.</p>
  </div>
);

const AppRoutes: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isOnboardingCompleted = useOnboardingStore((state) => state.isCompleted);
  
  return (
    <Routes>
      {/* Public routes */}
      <Route 
        path="/login" 
        element={
          isAuthenticated ? (
            <Navigate to={isOnboardingCompleted ? '/dashboard' : '/onboarding'} />
          ) : (
            <LoginScreen />
          )
        } 
      />
      <Route path="/register" element={<RegistrationScreen />} />
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route 
          path="/onboarding" 
          element={
            isOnboardingCompleted ? <Navigate to="/dashboard" /> : <OnboardingFlow />
          } 
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      
      {/* Default redirect */}
      <Route 
        path="*" 
        element={
          isAuthenticated ? (
            <Navigate to={isOnboardingCompleted ? '/dashboard' : '/onboarding'} />
          ) : (
            <Navigate to="/login" />
          )
        } 
      />
    </Routes>
  );
};

export default AppRoutes;