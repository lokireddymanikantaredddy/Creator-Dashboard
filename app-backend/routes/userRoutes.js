// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { protect } = require('../middleware/auth');
const User = require('../models/userModel');

// Configure multer for avatar uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatars/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  }
});

// Get user profile
router.get('/profile', protect, async (req, res) => {
  try {
    console.log('\n--- Profile Request ---');
    console.log('Headers:', {
      authorization: req.headers.authorization,
      cookie: req.headers.cookie
    });
    console.log('Cookies:', req.cookies);
    console.log('User from auth middleware:', req.user ? {
      _id: req.user._id,
      email: req.user.email
    } : 'No user');
    
    if (!req.user || !req.user._id) {
      console.error('No user found in request object');
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    console.log('Attempting to find user by ID:', req.user._id);
    const user = await User.findById(req.user._id)
      .select('-password')
      .lean()
      .exec();

    console.log('Database query result:', user ? 'User found' : 'User not found');

    if (!user) {
      console.log('User not found:', req.user._id);
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log('Profile fetched successfully for user:', user._id);
    res.json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
        settings: user.settings,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('Error in profile route:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message
    });
  }
});

// Update user profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { username, email, bio } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (bio) user.bio = bio;

    await user.save();

    res.json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile',
      error: error.message
    });
  }
});

// Update user settings
router.put('/settings', protect, async (req, res) => {
  try {
    const user = req.user;
    const settings = req.body;

    // Update user settings
    if (!user.settings) {
      user.settings = {};
    }

    Object.assign(user.settings, settings);
    await user.save();

    res.json({
      message: 'Settings updated successfully',
      settings: user.settings
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating settings', error: error.message });
  }
});

// Upload avatar
router.post('/avatar', protect, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Delete old avatar if exists
    if (user.avatar) {
      const oldAvatarPath = path.join(__dirname, '..', user.avatar);
      try {
        await fs.unlink(oldAvatarPath);
      } catch (error) {
        console.error('Error deleting old avatar:', error);
      }
    }

    user.avatar = `/uploads/avatars/${req.file.filename}`;
    await user.save();

    res.json({
      success: true,
      avatar: user.avatar
    });
  } catch (error) {
    console.error('Error uploading avatar:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading avatar',
      error: error.message
    });
  }
});

// Placeholder for user routes
router.get('/test', (req, res) => {
    res.json({ message: 'User routes working' });
});

module.exports = router; // Exporting a valid router instance
