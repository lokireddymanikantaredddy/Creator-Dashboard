import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiHome, 
  FiCompass, 
  FiSettings, 
  FiUsers,
  FiChevronDown,
  FiChevronRight,
  FiBookmark,
  FiTrendingUp,
  FiUser
} from 'react-icons/fi';
import logo from '../assets/logo.png'; // Replace with your logo

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({
    content: location.pathname.includes('/content'),
    management: location.pathname.includes('/management')
  });

  const toggleExpand = (item) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen flex flex-col border-r border-gray-700">
      {/* Logo/Branding */}
      <div className="p-6 pb-4 flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-8 w-8" />
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          ContentHub
        </h1>
      </div>

      {/* User Profile */}
      <div className="px-4 py-3 mb-4 flex items-center space-x-3 bg-gray-700 mx-3 rounded-lg">
        <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
          <FiUser className="text-white" />
        </div>
        <div>
          <p className="font-medium">{user?.name || 'User'}</p>
          <p className="text-xs text-gray-400">{user?.role || 'Member'}</p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <NavLink 
          to="/dashboard" 
          className={({ isActive }) => 
            `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${
              isActive 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`
          }
        >
          <FiHome className="flex-shrink-0" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/feed" 
          className={({ isActive }) => 
            `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${
              isActive 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`
          }
        >
          <FiCompass className="flex-shrink-0" />
          <span>Content Feed</span>
          <span className="ml-auto bg-indigo-500 text-xs px-2 py-0.5 rounded-full">
            New
          </span>
        </NavLink>

        <NavLink 
          to="/saved" 
          className={({ isActive }) => 
            `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${
              isActive 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`
          }
        >
          <FiBookmark className="flex-shrink-0" />
          <span>Saved Content</span>
        </NavLink>

        <NavLink 
          to="/trending" 
          className={({ isActive }) => 
            `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${
              isActive 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`
          }
        >
          <FiTrendingUp className="flex-shrink-0" />
          <span>Trending</span>
        </NavLink>

        {/* Admin Section - Collapsible */}
        {user?.role === 'admin' && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div 
              className="flex items-center justify-between px-3 py-2.5 text-gray-400 hover:text-white cursor-pointer"
              onClick={() => toggleExpand('management')}
            >
              <div className="flex items-center space-x-3">
                <FiSettings className="flex-shrink-0" />
                <span className="font-medium">Management</span>
              </div>
              {expandedItems.management ? (
                <FiChevronDown className="text-sm" />
              ) : (
                <FiChevronRight className="text-sm" />
              )}
            </div>

            {expandedItems.management && (
              <div className="ml-8 mt-1 space-y-1">
                <NavLink 
                  to="/admin/users" 
                  className={({ isActive }) => 
                    `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all ${
                      isActive 
                        ? 'bg-indigo-600/30 text-white' 
                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                >
                  <FiUsers className="flex-shrink-0 text-xs" />
                  <span>User Management</span>
                </NavLink>

                <NavLink 
                  to="/admin/content" 
                  className={({ isActive }) => 
                    `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all ${
                      isActive 
                        ? 'bg-indigo-600/30 text-white' 
                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                >
                  <FiCompass className="flex-shrink-0 text-xs" />
                  <span>Content Moderation</span>
                </NavLink>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Footer/Settings */}
      <div className="p-4 border-t border-gray-700">
        <NavLink 
          to="/settings" 
          className={({ isActive }) => 
            `flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ${
              isActive 
                ? 'bg-gray-700 text-white' 
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`
          }
        >
          <FiSettings className="flex-shrink-0" />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
}