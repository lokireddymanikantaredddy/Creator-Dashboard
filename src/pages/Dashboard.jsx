import React from 'react';
import { useAuth } from '../context/AuthContext';
import CreditsDisplay from '../components/CreditsDisplay';
import { FiActivity, FiTrendingUp, FiAward, FiClock } from 'react-icons/fi';

export default function Dashboard() {
  const { user } = useAuth();

  // Sample activity data - replace with your actual data
  const recentActivity = [
    { id: 1, type: 'login', value: '+10 credits', time: '2 hours ago' },
    { id: 2, type: 'content_saved', value: 'Saved "React Tips"', time: '5 hours ago' },
    { id: 3, type: 'streak', value: '3 day streak!', time: 'Yesterday' },
    { id: 4, type: 'profile', value: 'Profile 80% complete', time: '2 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || 'User'}!</h1>
          <p className="mt-2 text-lg text-gray-600">Here's what's happening with your account today.</p>
        </div>
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Credits Display - spans first column */}
          <div className="lg:col-span-1">
            <CreditsDisplay />
          </div>
          
          {/* Activity Section - spans remaining columns */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-50 text-green-600 mr-4">
                    <FiActivity size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Daily Active</p>
                    <p className="text-2xl font-bold">3.2h</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
                    <FiTrendingUp size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Content Saved</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-50 text-purple-600 mr-4">
                    <FiAward size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Achievements</p>
                    <p className="text-2xl font-bold">5/12</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Activity Feed */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <FiClock className="mr-2 text-indigo-600" />
                  Recent Activity
                </h2>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-start p-3 hover:bg-gray-50 rounded-lg transition-colors duration-150">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                        {activity.type === 'login' && <FiActivity size={16} />}
                        {activity.type === 'content_saved' && <FiTrendingUp size={16} />}
                        {activity.type === 'streak' && <FiAward size={16} />}
                        {activity.type === 'profile' && <FiClock size={16} />}
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.type === 'login' && 'Daily login bonus'}
                          {activity.type === 'content_saved' && 'Content saved'}
                          {activity.type === 'streak' && 'Streak maintained'}
                          {activity.type === 'profile' && 'Profile updated'}
                        </p>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{activity.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors duration-200">
              Add Content
            </button>
            <button className="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200">
              Invite Friends
            </button>
            <button className="p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors duration-200">
              View Achievements
            </button>
            <button className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200">
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}