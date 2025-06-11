import React from 'react';
import { Link } from 'react-router-dom';

// Simple icon components to replace react-icons
const CoinsIcon = () => <span className="text-2xl">🪙</span>;
const RssIcon = () => <span className="text-2xl">📰</span>;
const ChartIcon = () => <span className="text-2xl">📊</span>;
const AdminIcon = () => <span className="text-2xl">👨‍💼</span>;
const ArrowIcon = () => <span className="ml-2">→</span>;

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Creator Dashboard</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Your all-in-one platform to manage content, track engagement, and grow your creator business
          </p>
          <Link 
            to="/dashboard" 
            className="inline-flex items-center bg-white text-blue-600 px-6 py-2 md:px-8 md:py-3 rounded-full font-bold hover:bg-gray-100 transition"
          >
            Go to Dashboard <ArrowIcon />
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <CoinsIcon />
              <h3 className="text-xl font-semibold mt-4">Earn Credits</h3>
              <p className="mt-2 text-gray-600">Earn credits for your content and engagement</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <RssIcon />
              <h3 className="text-xl font-semibold mt-4">Content Management</h3>
              <p className="mt-2 text-gray-600">Organize and manage your content efficiently</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <ChartIcon />
              <h3 className="text-xl font-semibold mt-4">Analytics</h3>
              <p className="mt-2 text-gray-600">Track your performance and growth</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <AdminIcon />
              <h3 className="text-xl font-semibold mt-4">Admin Tools</h3>
              <p className="mt-2 text-gray-600">Powerful tools for content creators</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}