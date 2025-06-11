import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../common/Navigation';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:block w-64">
        <Navigation />
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="md:hidden">
          <Navigation />
        </div>
        <Outlet />
      </main>
    </div>
  );
}
