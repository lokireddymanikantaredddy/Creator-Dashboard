import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FiClock, FiBookmark, FiAward, FiHelpCircle, FiZap, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import Tooltip from '../components/common/Tooltip';

export default function Dashboard() {
  const { user } = useAuth();

  // Get display name from user data
  const displayName = user?.username || user?.email?.split('@')[0] || 'User';

  // Stats data with proper styling and layout
  const stats = [
    {
      id: 1,
      name: 'Daily Active',
      value: '3.2h',
      icon: FiClock,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      tooltip: 'Time spent actively engaging with content today'
    },
    {
      id: 2,
      name: 'Content Saved',
      value: '24',
      icon: FiBookmark,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      tooltip: 'Number of content items you have saved for later'
    },
    {
      id: 3,
      name: 'Achievements',
      value: '5/12',
      icon: FiAward,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      tooltip: 'Completed achievements out of total available'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'login',
      description: 'Daily login bonus',
      credits: '+10 credits',
      time: '2 hours ago',
      icon: FiZap,
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    },
    {
      id: 2,
      type: 'content',
      description: 'Saved "React Tips"',
      time: '5 hours ago',
      icon: FiBookmark,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    }
  ];

  const creditWays = [
    { icon: FiCalendar, text: 'Daily login bonus', credits: '+10' },
    { icon: FiCheckCircle, text: 'Complete tasks', credits: '+5-20' }
  ];

  return (
    <div className="bg-white rounded-lg">
      {/* Welcome Section */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {displayName} 👋
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats Section */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((item) => (
          <div 
            key={item.id} 
            className="bg-white border rounded-lg p-6"
          >
            <div className="flex items-center">
              <div className={`${item.iconBg} rounded-lg p-3`}>
                <item.icon className={`h-6 w-6 ${item.iconColor}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 truncate">
                  {item.name}
                </p>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {item.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 border-t">
        {/* Credits Section */}
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Your Credits</h2>
            <Tooltip content="Learn how to earn and use credits">
              <button className="text-sm text-indigo-600 hover:text-indigo-900 flex items-center">
                <FiHelpCircle className="h-4 w-4 mr-1" />
                How it works
              </button>
            </Tooltip>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline">
              <p className="text-4xl font-semibold text-gray-900">{user?.credits || 0}</p>
              <p className="ml-2 text-sm text-gray-500">Available credits</p>
            </div>
            <div className="mt-4">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <Tooltip content="Unlock special rewards at 500 credits!">
                    <span className="text-xs font-semibold inline-block text-gray-600">
                      Next reward at 500 credits
                    </span>
                  </Tooltip>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-gray-600">
                      {user?.credits || 0}/500
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded transition-all duration-500"
                    style={{ width: `${Math.min(((user?.credits || 0) / 500) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Ways to earn credits:</h3>
              {creditWays.map((way, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <way.icon className="h-4 w-4 mr-2" />
                    <span>{way.text}</span>
                  </div>
                  <span className="text-green-600 font-medium">{way.credits}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-900">View All</button>
          </div>
          <div className="mt-6 flow-root">
            <ul className="-mb-8">
              {recentActivity.map((item, itemIdx) => (
                <li key={item.id}>
                  <div className="relative pb-8">
                    {itemIdx !== recentActivity.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                      <div>
                        <span className={`${item.iconBg} h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white`}>
                          <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          {item.credits && (
                            <p className="text-xs text-green-600 font-medium mt-0.5">{item.credits}</p>
                          )}
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time>{item.time}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}