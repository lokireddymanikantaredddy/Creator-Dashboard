import React, { Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { ToastProvider } from './components/common/Toast';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

// Lazy load routes
const AppRoutes = React.lazy(() => import('./routes/AppRoutes'));

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <ToastProvider>
              <Suspense fallback={<LoadingSpinner />}>
                <AppRoutes />
              </Suspense>
            </ToastProvider>
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}