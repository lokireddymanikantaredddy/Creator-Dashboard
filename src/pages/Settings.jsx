import React, { useState, useRef, useEffect } from 'react';
import { FiUser, FiMoon, FiBell, FiGlobe, FiShield, FiBook, FiCamera, FiChevronDown } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '../context/UserContext';

export default function Settings() {
  const { user, updateUserProfile, updateUserSettings, updateAvatar } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [isTabMenuOpen, setIsTabMenuOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    bio: '',
    avatar: '',
    darkMode: false,
    emailNotifications: true,
    pushNotifications: true,
    language: 'en',
    twoFactorAuth: false,
    learningReminders: true,
    progressEmails: true,
    achievementAlerts: true
  });

  // Update form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
        darkMode: user.settings?.darkMode || false,
        emailNotifications: user.settings?.emailNotifications || true,
        pushNotifications: user.settings?.pushNotifications || true,
        language: user.settings?.language || 'en',
        twoFactorAuth: user.settings?.twoFactorAuth || false,
        learningReminders: user.settings?.learningReminders || true,
        progressEmails: user.settings?.progressEmails || true,
        achievementAlerts: user.settings?.achievementAlerts || true
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      const success = await updateAvatar(file);
      if (success) {
        const reader = new FileReader();
        reader.onload = () => {
          setFormData(prev => ({
            ...prev,
            avatar: reader.result
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Saving changes...');

    try {
      let success = true;

      // Update profile if in profile tab
      if (activeTab === 'profile') {
        const profileData = {
          fullName: formData.fullName,
          email: formData.email,
          bio: formData.bio
        };
        success = await updateUserProfile(profileData);
      }

      // Update settings for other tabs
      if (activeTab !== 'profile') {
        const settingsData = {
          darkMode: formData.darkMode,
          emailNotifications: formData.emailNotifications,
          pushNotifications: formData.pushNotifications,
          language: formData.language,
          twoFactorAuth: formData.twoFactorAuth,
          learningReminders: formData.learningReminders,
          progressEmails: formData.progressEmails,
          achievementAlerts: formData.achievementAlerts
        };
        success = await updateUserSettings(settingsData);
      }

      toast.dismiss(loadingToast);
      if (success) {
        toast.success('Changes saved successfully!');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to save changes');
    }
  };

  const handleCancel = () => {
    // Reset to user's current data
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
        darkMode: user.settings?.darkMode || false,
        emailNotifications: user.settings?.emailNotifications || true,
        pushNotifications: user.settings?.pushNotifications || true,
        language: user.settings?.language || 'en',
        twoFactorAuth: user.settings?.twoFactorAuth || false,
        learningReminders: user.settings?.learningReminders || true,
        progressEmails: user.settings?.progressEmails || true,
        achievementAlerts: user.settings?.achievementAlerts || true
      });
    }
    toast('Changes discarded', {
      icon: '⚠️',
    });
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'appearance', label: 'Appearance', icon: FiMoon },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'language', label: 'Language', icon: FiGlobe },
    { id: 'security', label: 'Security', icon: FiShield },
    { id: 'learning', label: 'Learning', icon: FiBook }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {formData.avatar ? (
                    <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <FiUser className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <button
                  onClick={handleAvatarClick}
                  className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors"
                >
                  <FiCamera className="w-4 h-4" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div className="space-y-1 flex-1">
                <p className="text-sm text-gray-500">Allowed file types: PNG, JPG, GIF</p>
                <p className="text-sm text-gray-500">Maximum file size: 5MB</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-gray-500 mt-1">Enable dark mode for better viewing experience</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="darkMode"
                    checked={formData.darkMode}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="font-medium text-lg">Email Notifications</h3>
              <div className="space-y-4">
                <label className="flex items-center space-x-3 p-4 rounded-lg bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={formData.emailNotifications}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div>
                    <span className="block font-medium">General email notifications</span>
                    <span className="text-sm text-gray-500">Receive emails about your account activity</span>
                  </div>
                </label>
                <label className="flex items-center space-x-3 p-4 rounded-lg bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    name="progressEmails"
                    checked={formData.progressEmails}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div>
                    <span className="block font-medium">Weekly progress updates</span>
                    <span className="text-sm text-gray-500">Get weekly summaries of your progress</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-medium text-lg">Push Notifications</h3>
              <div className="space-y-4">
                <label className="flex items-center space-x-3 p-4 rounded-lg bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    name="pushNotifications"
                    checked={formData.pushNotifications}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div>
                    <span className="block font-medium">Enable push notifications</span>
                    <span className="text-sm text-gray-500">Get real-time updates in your browser</span>
                  </div>
                </label>
                <label className="flex items-center space-x-3 p-4 rounded-lg bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    name="achievementAlerts"
                    checked={formData.achievementAlerts}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div>
                    <span className="block font-medium">Achievement alerts</span>
                    <span className="text-sm text-gray-500">Get notified when you earn achievements</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        );

      case 'language':
        return (
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-gray-50">
              <label className="block space-y-2">
                <span className="block text-sm font-medium text-gray-700">Preferred Language</span>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                  <option value="ja">Japanese</option>
                </select>
              </label>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="twoFactorAuth"
                    checked={formData.twoFactorAuth}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-gray-50">
              <button
                type="button"
                className="text-red-600 hover:text-red-700 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg px-4 py-2"
              >
                Reset Password
              </button>
            </div>
          </div>
        );

      case 'learning':
        return (
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="font-medium mb-4">Learning Preferences</h3>
              <div className="space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="learningReminders"
                    checked={formData.learningReminders}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div>
                    <span className="block font-medium">Daily learning reminders</span>
                    <span className="text-sm text-gray-500">Get daily reminders to continue your learning journey</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          {/* Mobile Tab Selector */}
          <div className="lg:hidden p-4 border-b">
            <button
              onClick={() => setIsTabMenuOpen(!isTabMenuOpen)}
              className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center space-x-2">
                {tabs.find(tab => tab.id === activeTab)?.icon({ className: "w-5 h-5" })}
                <span>{tabs.find(tab => tab.id === activeTab)?.label}</span>
              </div>
              <FiChevronDown className={`w-5 h-5 transition-transform ${isTabMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Mobile Tab Menu */}
            {isTabMenuOpen && (
              <div className="absolute z-10 mt-2 w-[calc(100%-2rem)] bg-white rounded-lg shadow-lg border">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsTabMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2 px-4 py-3 hover:bg-gray-50 ${
                      activeTab === tab.id ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-3 lg:border-r">
            <nav className="p-4 sticky top-0">
              <div className="flex flex-col space-y-1">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5 flex-shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-9 p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="max-w-3xl mx-auto">
                {renderTabContent()}
                
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 