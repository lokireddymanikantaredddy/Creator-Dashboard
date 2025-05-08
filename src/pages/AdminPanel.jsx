import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  FiUsers, 
  FiFileText, 
  FiFlag, 
  FiClock,
  FiTrash2,
  FiEye,
  FiCheck,
  FiAlertCircle
} from 'react-icons/fi';

export default function AdminPanel() {
  const [dashboardData, setDashboardData] = useState({
    userCount: 0,
    contentCount: 0,
    reportedContent: [],
    recentUsers: [],
    activeUsers: 0,
    bannedUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const res = await api.get('/dashboard/admin');
        setDashboardData(res.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    if (user?.role === 'admin') fetchDashboardData();
  }, [user]);

  const handleContentAction = async (contentId, action) => {
    try {
      await api.post(`/content/${contentId}/${action}`);
      setDashboardData(prev => ({
        ...prev,
        reportedContent: prev.reportedContent.filter(item => item._id !== contentId)
      }));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 p-6 rounded-lg max-w-md text-center">
          <FiAlertCircle className="mx-auto h-12 w-12 text-red-400" />
          <h3 className="mt-2 text-lg font-medium text-red-800">Error loading dashboard</h3>
          <p className="mt-1 text-sm text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-indigo-600">Admin Panel</h1>
          <p className="text-sm text-gray-500">Welcome back, {user?.username}</p>
        </div>
        <nav className="p-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center w-full px-4 py-3 rounded-lg mb-2 ${activeTab === 'overview' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <FiUsers className="mr-3" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center w-full px-4 py-3 rounded-lg mb-2 ${activeTab === 'users' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <FiUsers className="mr-3" />
            User Management
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center w-full px-4 py-3 rounded-lg mb-2 ${activeTab === 'content' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <FiFileText className="mr-3" />
            Content Moderation
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex items-center w-full px-4 py-3 rounded-lg ${activeTab === 'reports' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <FiFlag className="mr-3" />
            Reports
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-50 text-indigo-600 mr-4">
                <FiUsers size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-2xl font-bold">{dashboardData.userCount}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm">
              <span className="text-green-600 flex items-center">
                <FiClock className="mr-1" /> +12 today
              </span>
              <span className="text-gray-500">Last 24h</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
                <FiUsers size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Users</p>
                <p className="text-2xl font-bold">{dashboardData.activeUsers}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm">
              <span className="text-green-600">+5%</span>
              <span className="text-gray-500">vs last week</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-50 text-red-600 mr-4">
                <FiUsers size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Banned Users</p>
                <p className="text-2xl font-bold">{dashboardData.bannedUsers}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm">
              <span className="text-red-600">-2</span>
              <span className="text-gray-500">vs yesterday</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-50 text-purple-600 mr-4">
                <FiFileText size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Content Items</p>
                <p className="text-2xl font-bold">{dashboardData.contentCount}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm">
              <span className="text-green-600">+24</span>
              <span className="text-gray-500">today</span>
            </div>
          </div>
        </div>
        
        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <FiClock className="mr-2 text-indigo-600" />
                Recent Users
              </h2>
              <button className="text-sm text-indigo-600 hover:text-indigo-800">
                View All
              </button>
            </div>
            {dashboardData.recentUsers.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.recentUsers.map(user => (
                  <div key={user._id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium">{user.username}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs rounded-full ${user.credits > 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {user.credits} credits
                      </span>
                      <p className="text-xs text-gray-400 mt-1">
                        Joined {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No recent users</p>
              </div>
            )}
          </div>
          
          {/* Reported Content */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <FiFlag className="mr-2 text-red-600" />
                Reported Content
              </h2>
              <span className="bg-red-100 text-red-800 text-xs px-2.5 py-0.5 rounded-full">
                {dashboardData.reportedContent.length} reports
              </span>
            </div>
            {dashboardData.reportedContent.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.reportedContent.map(content => (
                  <div key={content._id} className="border border-gray-100 rounded-lg p-4 hover:shadow-sm">
                    <div className="flex justify-between">
                      <h3 className="font-medium truncate">
                        {content.title || content.text.substring(0, 50)}...
                      </h3>
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        {content.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Reported by {content.reportedBy.length} users
                    </p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-gray-400">
                        {new Date(content.createdAt).toLocaleString()}
                      </span>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleContentAction(content._id, 'approve')}
                          className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded-full hover:bg-green-200 flex items-center"
                        >
                          <FiCheck className="mr-1" /> Approve
                        </button>
                        <button 
                          onClick={() => handleContentAction(content._id, 'remove')}
                          className="text-xs px-3 py-1 bg-red-100 text-red-800 rounded-full hover:bg-red-200 flex items-center"
                        >
                          <FiTrash2 className="mr-1" /> Remove
                        </button>
                        <button className="text-xs px-3 py-1 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 flex items-center">
                          <FiEye className="mr-1" /> View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No reported content</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}