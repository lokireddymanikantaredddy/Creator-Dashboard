import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FiHome, 
  FiBook, 
  FiGrid, 
  FiSettings, 
  FiX,
  FiUser,
  FiLogOut,
  FiBarChart2
} from 'react-icons/fi';

export default function Navigation({ onClose }) {
  const { user, logout } = useAuth();
  
  const navigation = [
    { name: 'Dashboard', to: '/dashboard', icon: FiHome },
    { name: 'Content', to: '/content', icon: FiGrid },
    { name: 'Learning', to: '/learning', icon: FiBook },
    { name: 'Analytics', to: '/analytics', icon: FiBarChart2 },
    { name: 'Settings', to: '/settings', icon: FiSettings },
  ];

  const getLinkClasses = (isActive) => {
    return `flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors
      ${isActive 
        ? 'text-blue-600 bg-blue-50 border-r-2 border-blue-600' 
        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
      }`;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header with Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img src="/logo.svg" alt="Creator Dashboard Logo" className="w-10 h-10" />
          <div className="flex flex-col">
            <span className="text-blue-600 font-bold text-lg leading-none">Creator</span>
            <span className="text-blue-600 font-bold text-lg leading-none">Dashboard</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden ml-auto p-2 text-gray-500 hover:text-gray-600"
            >
              <FiX className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      
      {/* Navigation Links */}
      <div className="flex-1 py-4 overflow-y-auto">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) => getLinkClasses(isActive)}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* User Profile */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <FiUser className="h-4 w-4 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {user?.username || user?.email?.split('@')[0] || 'User'}
            </p>
            <p className="text-xs text-gray-500">{user?.email || ''}</p>
          </div>
        </div>
        <button 
          onClick={() => {
            if (onClose) onClose();
            logout();
          }}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
        >
          <FiLogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
} 