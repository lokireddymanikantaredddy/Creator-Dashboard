import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FiZap, FiCalendar, FiGift, FiCheckCircle } from 'react-icons/fi';

export default function CreditsDisplay() {
  const { user } = useAuth();

  // Sample credit earning methods - replace with your actual data
  const earningMethods = [
    { id: 1, icon: <FiCalendar size={16} />, method: 'Daily login bonus', credits: '+10' },
    { id: 2, icon: <FiCheckCircle size={16} />, method: 'Complete tasks', credits: '+5-20' },
    { id: 3, icon: <FiGift size={16} />, method: 'Refer friends', credits: '+50 each' },
    { id: 4, icon: <FiZap size={16} />, method: 'Weekly streak', credits: '+100' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-semibold">Your Credits</h2>
        <button className="text-xs px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full hover:bg-indigo-200 transition-colors duration-200">
          How it works
        </button>
      </div>
      
      {/* Main Credit Display */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mr-3">
              <FiZap size={24} />
            </div>
            <p className="text-4xl font-bold text-indigo-600">{user?.credits || 0}</p>
          </div>
          <p className="text-sm text-gray-500">Available credits</p>
        </div>
        
        <div className="text-center">
          <div className="h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 mx-auto mb-2">
            <FiCalendar size={24} />
          </div>
          <p className="text-2xl font-bold text-orange-600">{user?.streak || 0}</p>
          <p className="text-sm text-gray-500">Day streak</p>
        </div>
      </div>
      
      {/* Progress Bar (example) */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-500">Next reward at 500 credits</span>
          <span className="font-medium text-indigo-600">{Math.min(user?.credits || 0, 500)}/500</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full" 
            style={{ width: `${Math.min(((user?.credits || 0) / 500) * 100, 100)}%` }}
          ></div>
        </div>
      </div>
      
      {/* Earning Methods */}
      <div>
        <h3 className="font-medium mb-3 text-gray-700">Ways to earn credits:</h3>
        <ul className="space-y-3">
          {earningMethods.map(method => (
            <li key={method.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors duration-150">
              <div className="flex items-center">
                <span className="text-indigo-500 mr-3">{method.icon}</span>
                <span className="text-sm font-medium">{method.method}</span>
              </div>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                {method.credits}
              </span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* CTA Button */}
      <button className="mt-6 w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center">
        <FiGift className="mr-2" />
        Claim Daily Bonus
      </button>
    </div>
  );
}