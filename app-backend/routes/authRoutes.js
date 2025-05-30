// routes/authRoutes.js
const express = require('express');
const {
    register,
    login,
    getMe,
    forgotPassword,
    resetPassword,
    logout
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

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

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.get('/logout', logout);

module.exports = router;
