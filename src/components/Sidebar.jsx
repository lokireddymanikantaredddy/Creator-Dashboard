import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiGrid, FiBookOpen, FiBarChart2, FiSettings, FiX } from 'react-icons/fi';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiHome },
    { name: 'Content', path: '/content', icon: FiGrid },
    { name: 'Learning', path: '/learning', icon: FiBookOpen },
    { name: 'Analytics', path: '/analytics', icon: FiBarChart2 },
    { name: 'Settings', path: '/settings', icon: FiSettings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`
          fixed inset-0 bg-gray-600 transition-opacity duration-300 ease-in-out lg:hidden
          ${isOpen ? 'opacity-50 z-40' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 sticky
          flex flex-col bg-white shadow-lg
          transform transition-transform duration-300 ease-in-out
          lg:transform-none lg:translate-x-0 lg:relative lg:shadow-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span className="sr-only">Close menu</span>
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 pt-5 pb-4 px-2 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => onClose()}
              className={`
                group flex items-center px-3 py-3
                text-sm font-medium rounded-lg
                transition-all duration-200
                ${
                  isActive(item.path)
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <item.icon
                className={`
                  mr-3 h-5 w-5 flex-shrink-0
                  transition-colors duration-200
                  ${isActive(item.path) ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'}
                `}
              />
              <span>{item.name}</span>
              {isActive(item.path) && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
              )}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-sm text-gray-600">Online</span>
          </div>
          <div className="mt-2">
            <span className="text-xs text-gray-500">Version 1.0.0</span>
          </div>
        </div>
      </aside>
    </>
  );
}