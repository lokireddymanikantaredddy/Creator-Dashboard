import React from 'react';
import Navbar from '../components/Navbar';
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
      <Navbar />
      
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
      <div className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Credit System */}
          <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-blue-500 mb-3">
              <CoinsIcon />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Credit Points System</h3>
            <ul className="space-y-1 text-sm md:text-base text-gray-600">
              <li>• Earn points for daily logins (+10 credits)</li>
              <li>• Complete your profile (+50 credits)</li>
              <li>• Interact with content (+5 per action)</li>
            </ul>
          </div>

          {/* Feed Aggregator */}
          <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-blue-500 mb-3">
              <RssIcon />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Smart Feed Aggregator</h3>
            <ul className="space-y-1 text-sm md:text-base text-gray-600">
              <li>• Unified content from multiple platforms</li>
              <li>• Save interesting posts</li>
              <li>• One-click sharing</li>
            </ul>
          </div>

          {/* Dashboard */}
          <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-blue-500 mb-3">
              <ChartIcon />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Creator Dashboard</h3>
            <ul className="space-y-1 text-sm md:text-base text-gray-600">
              <li>• Real-time credit tracking</li>
              <li>• Saved content library</li>
              <li>• Activity history</li>
            </ul>
          </div>

          {/* Admin Panel */}
          <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-blue-500 mb-3">
              <AdminIcon />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Admin Tools</h3>
            <ul className="space-y-1 text-sm md:text-base text-gray-600">
              <li>• User credit management</li>
              <li>• Content moderation</li>
              <li>• Platform analytics</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Ready to boost your creator journey?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register" 
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition"
            >
              Sign Up Free
            </Link>
            <Link 
              to="/login" 
              className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}