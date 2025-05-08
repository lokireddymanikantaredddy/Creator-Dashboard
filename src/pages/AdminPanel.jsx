import React from 'react';
import {
  FiUsers,
  FiFileText,
  FiFlag,
  FiClock,
  FiTrash2,
  FiEye,
  FiCheck,
} from 'react-icons/fi';

export default function AdminPanel() {
  // Example static data (you can replace with real API data)
  const dashboardData = {
    userCount: 120,
    activeUsers: 87,
    bannedUsers: 3,
    contentCount: 234,
    recentUsers: [
      { _id: '1', username: 'john_doe', email: 'john@example.com', credits: 50, createdAt: new Date() },
      { _id: '2', username: 'jane_doe', email: 'jane@example.com', credits: 0, createdAt: new Date() },
    ],
    reportedContent: [
      { _id: '1', title: 'Spam content', reportedBy: [1, 2], type: 'post', createdAt: new Date() },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-indigo-600">Admin Panel</h1>
          <p className="text-sm text-gray-500">Welcome, Admin</p>
        </div>
        <nav className="p-4">
          <button className="flex items-center w-full px-4 py-3 rounded-lg mb-2 bg-indigo-50 text-indigo-700">
            <FiUsers className="mr-3" />
            Overview
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: <FiUsers size={20} />,
              label: 'Total Users',
              value: dashboardData.userCount,
              footer: '+12 today',
              color: 'indigo',
            },
            {
              icon: <FiUsers size={20} />,
              label: 'Active Users',
              value: dashboardData.activeUsers,
              footer: '+5% vs last week',
              color: 'blue',
            },
            {
              icon: <FiUsers size={20} />,
              label: 'Banned Users',
              value: dashboardData.bannedUsers,
              footer: '-2 vs yesterday',
              color: 'red',
            },
            {
              icon: <FiFileText size={20} />,
              label: 'Content Items',
              value: dashboardData.contentCount,
              footer: '+24 today',
              color: 'purple',
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-full bg-${card.color}-50 text-${card.color}-600 mr-4`}>
                  {card.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{card.label}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm">
                <span className={`text-${card.color}-600`}>{card.footer}</span>
                <span className="text-gray-500">Last 24h</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Users & Reported Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <FiClock className="mr-2 text-indigo-600" />
                Recent Users
              </h2>
            </div>
            {dashboardData.recentUsers.map(user => (
              <div
                key={user._id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="font-medium">{user.username}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      user.credits > 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {user.credits} credits
                  </span>
                  <p className="text-xs text-gray-400 mt-1">
                    Joined {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
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
            {dashboardData.reportedContent.map(content => (
              <div
                key={content._id}
                className="border border-gray-100 rounded-lg p-4 hover:shadow-sm"
              >
                <div className="flex justify-between">
                  <h3 className="font-medium truncate">
                    {content.title}
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
                    <button className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded-full hover:bg-green-200 flex items-center">
                      <FiCheck className="mr-1" /> Approve
                    </button>
                    <button className="text-xs px-3 py-1 bg-red-100 text-red-800 rounded-full hover:bg-red-200 flex items-center">
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
        </div>
      </div>
    </div>
  );
}
