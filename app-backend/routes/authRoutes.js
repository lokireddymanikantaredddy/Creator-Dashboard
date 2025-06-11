// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { protect } = require('../middleware/auth');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d',
  });
};

// Set token cookie
const setTokenCookie = (res, token) => {
  console.log('Setting cookie with token:', token ? 'Token present' : 'No token');
  
  // Clear any existing tokens first
  res.clearCookie('token');
  res.clearCookie('jwt');
  
  // Set new token
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: '/',
    domain: 'localhost'
  });
};

// Debug route
router.get('/debug', async (req, res) => {
    try {
        console.log('Checking database connection...');
        const users = await User.find().select('-password');
        console.log('Found users:', users.length);
        res.json({
            success: true,
            count: users.length,
            users: users.map(user => ({
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }))
        });
    } catch (error) {
        console.error('Debug route error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ 
        message: userExists.email === email ? 'Email already exists' : 'Username already exists' 
      });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      // Generate token
      const token = generateToken(user._id);
      setTokenCookie(res, token);

      res.status(201).json({
        success: true,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        }
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ message: error.message });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email });

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');
    console.log('User found:', user ? '✅' : '❌');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    console.log('Password match:', isMatch ? '✅' : '❌');

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Set cookie options
    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      domain: process.env.NODE_ENV === 'production' ? undefined : 'localhost'
    };

    // Clear any existing cookies
    res.clearCookie('token');
    res.clearCookie('jwt');

    // Set new cookie
    res.cookie('jwt', token, cookieOptions);

    // Send response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
router.post('/logout', (req, res) => {
  console.log('Logout request received');
  
  // Clear all auth cookies
  res.clearCookie('token', { path: '/', domain: 'localhost' });
  res.clearCookie('jwt', { path: '/', domain: 'localhost' });
  
  res.json({ success: true, message: 'Logged out successfully' });
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    console.log('Auth check request received', {
      userId: req.user?._id,
      headers: req.headers,
      cookies: req.cookies
    });

    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching user data' 
    });
  }
});

module.exports = router;
