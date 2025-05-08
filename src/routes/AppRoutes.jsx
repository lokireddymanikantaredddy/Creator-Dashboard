import React from 'react'; // Add this import
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import AdminPanel from '../pages/AdminPanel';
import Feed from '../pages/Feed';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/login" 
        element={!user ? <Login /> : <Navigate to="/dashboard" />} 
      />
      <Route 
        path="/register" 
        element={!user ? <Register /> : <Navigate to="/dashboard" />} 
      />
      <Route 
        path="/dashboard" 
        element={user ? <Dashboard /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/feed" 
        element={user ? <Feed /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/admin" 
        element={user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/dashboard" />} 
      />
      <Route path="*" element={<NotFound />} />
      <Route path="/dash" element={<Dashboard />} />
      <Route path="/ad" element={<AdminPanel />} />
      <Route path="/fed" element={<Feed />} />
    </Routes>
  );
}