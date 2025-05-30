import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { FiMenu } from 'react-icons/fi';

export default function Layout({ children }) {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {user && (
        <>
          <button
            onClick={toggleSidebar}
            className={`fixed top-4 ${isSidebarOpen ? 'left-64' : 'left-4'} z-50 p-2 rounded-md bg-white shadow-lg hover:bg-gray-100 transition-all duration-300`}
            aria-label="Toggle Sidebar"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <Sidebar isOpen={isSidebarOpen} />
        </>
      )}
      <div className={`transition-all duration-300 ${user ? (isSidebarOpen ? 'ml-64' : 'ml-0') : ''}`}>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
} 