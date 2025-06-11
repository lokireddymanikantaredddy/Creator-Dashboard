import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    id: 1,
    username: 'Demo User',
    email: 'demo@example.com',
    avatar: null,
    credits: 150,
    settings: {
      notifications: true,
      theme: 'light',
      language: 'en'
    }
  });
  const [loading, setLoading] = useState(false);

  const updateUserProfile = async (userData) => {
    try {
      setUser(prev => ({ ...prev, ...userData }));
      toast.success('Profile updated successfully');
      return true;
    } catch (error) {
      toast.error('Error updating profile');
      return false;
    }
  };

  const updateUserSettings = async (settings) => {
    try {
      setUser(prev => ({ ...prev, settings: { ...prev.settings, ...settings } }));
      toast.success('Settings updated successfully');
      return true;
    } catch (error) {
      toast.error('Error updating settings');
      return false;
    }
  };

  const updateAvatar = async (avatarData) => {
    try {
      // In a real app, you would upload the avatar to a server
      setUser(prev => ({ ...prev, avatar: URL.createObjectURL(avatarData) }));
      toast.success('Profile picture updated successfully');
      return true;
    } catch (error) {
      toast.error('Error updating profile picture');
      return false;
    }
  };

  const value = {
    user,
    loading,
    updateUserProfile,
    updateUserSettings,
    updateAvatar
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
} 