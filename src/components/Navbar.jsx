import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiUser, FiMenu } from 'react-icons/fi';

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            >
              <span className="sr-only">Open menu</span>
              <FiMenu className="h-6 w-6" />
            </button>
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center space-x-3"
            >
              <img 
                src="/logo.svg" 
                alt="Creator Dashboard Logo" 
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition">
                Creator Dashboard
              </span>
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {user && (
              <>
                {/* User info - hidden on mobile */}
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <FiUser className="h-5 w-5 text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.username || user.email?.split('@')[0] || 'User'}
                  </span>
                </div>

                {/* Logout button */}
                <button
                  onClick={logout}
                  className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  <FiLogOut className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}