import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize axios instance with environment-aware baseURL
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 
            (process.env.NODE_ENV === 'production' 
              ? 'https://creator-dashboard-backend-lvf1.onrender.com/api'  // Updated backend URL
              : 'http://localhost:5001/api'),
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    validateStatus: status => {
      return status >= 200 && status < 500; // Don't reject if status is 2xx or 4xx
    }
  });

  // Add request interceptor for debugging
  api.interceptors.request.use(
    (config) => {
      console.log('Making request:', {
        method: config.method,
        url: config.url,
        data: config.data,
        headers: config.headers
      });
      return config;
    },
    (error) => {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );

  // Add response interceptor for debugging
  api.interceptors.response.use(
    (response) => {
      console.log('Received response:', {
        status: response.status,
        data: response.data,
        headers: response.headers
      });
      return response;
    },
    (error) => {
      console.error('Response error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      return Promise.reject(error.response?.data || error);
    }
  );

  // Check auth state on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get('/auth/me');
        if (res.data.success && res.data.user) {
          setUser(res.data.user);
          console.log('Auth check successful:', res.data.user);
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const register = async (formData) => {
    try {
      const res = await api.post('/auth/register', formData);
      if (res.data.success) {
        setUser(res.data.user);
        toast.success('Registration successful!');
        navigate('/dashboard');
        return res.data;
      }
      throw new Error(res.data.message || 'Registration failed');
    } catch (err) {
      console.error('Registration error:', err);
      throw err.message || 'Registration failed';
    }
  };

  const login = async (formData) => {
    try {
      console.log('Sending login request with:', formData);
      const res = await api.post('/auth/login', formData);
      
      console.log('Login response:', res.data);
      
      if (res.data.success) {
        setUser(res.data.user);
        return res.data;
      } else {
        throw new Error(res.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      throw err.response?.data?.message || err.message || 'Login failed';
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      // Still clear the user state even if the logout request fails
      setUser(null);
      navigate('/login');
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    api
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};