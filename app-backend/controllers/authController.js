const User = require('../models/User');
const { AppError } = require('../middleware/errorHandler');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Helper function to create and send token response
const sendTokenResponse = (user, statusCode, res) => {
    try {
        console.log('Generating token for user:', user._id);
        const token = user.getSignedJwtToken();
        console.log('Generated token:', token ? '✅ Success' : '❌ Failed');

        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
            httpOnly: true
        };

        if (process.env.NODE_ENV === 'production') {
            options.secure = true;
        }

        console.log('Setting cookie with options:', options);
        res
            .status(statusCode)
            .cookie('token', token, options)
            .json({
                success: true,
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    credits: user.credits,
                    streak: user.streak,
                    profileImage: user.profileImage,
                    bio: user.bio,
                    socialLinks: user.socialLinks,
                    isVerified: user.isVerified,
                    profileCompleted: user.profileCompleted
                }
            });
    } catch (error) {
        console.error('Token generation error:', error);
        throw error;
    }
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        console.log('Registration request received:', {
            body: req.body,
            headers: req.headers,
            method: req.method
        });
        
        const { username, email, password } = req.body;
        console.log('Register attempt:', { username, email });

        // Validate input
        if (!username || !email || !password) {
            console.log('Missing required fields:', { username: !!username, email: !!email, password: !!password });
            throw new AppError('Please provide all required fields', 400);
        }

        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            throw new AppError('User already exists', 400);
        }

        // Create user
        const user = await User.create({
            username,
            email,
            password,
            credits: 100, // Welcome bonus
            streak: 1,    // Initial streak
            lastLogin: new Date(),
            profileCompleted: false
        });

        sendTokenResponse(user, 201, res);
    } catch (error) {
        console.error('Registration error:', error);
        next(error);
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt:', { email });

        // Validate input
        if (!email || !password) {
            throw new AppError('Please provide email and password', 400);
        }

        // Check for user and include password in this query
        console.log('Finding user with email:', email);
        const user = await User.findOne({ email }).select('+password');
        console.log('User found:', user ? '✅ Yes' : '❌ No');

        if (!user) {
            throw new AppError('Invalid credentials', 401);
        }

        // Check if password matches
        console.log('Checking password match...');
        const isMatch = await user.matchPassword(password);
        console.log('Password match:', isMatch ? '✅ Yes' : '❌ No');

        if (!isMatch) {
            throw new AppError('Invalid credentials', 401);
        }

        console.log('Login successful, generating token...');
        sendTokenResponse(user, 200, res);
    } catch (error) {
        console.error('Login error:', error);
        next(error);
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                credits: user.credits,
                streak: user.streak,
                profileImage: user.profileImage,
                bio: user.bio,
                socialLinks: user.socialLinks,
                isVerified: user.isVerified,
                profileCompleted: user.profileCompleted
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            throw new AppError('There is no user with that email', 404);
        }

        // Get reset token
        const resetToken = user.getResetPasswordToken();
        await user.save({ validateBeforeSave: false });

        // Create reset url
        const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

        // TODO: Send email with reset URL
        // For now, just return the reset URL in the response
        res.status(200).json({
            success: true,
            message: 'Password reset email sent',
            resetUrl // Remove this in production
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
exports.resetPassword = async (req, res, next) => {
    try {
        // Get hashed token
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.resettoken)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            throw new AppError('Invalid or expired token', 400);
        }

        // Set new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        sendTokenResponse(user, 200, res);
    } catch (error) {
        next(error);
    }
};

// @desc    Logout user / clear cookie
// @route   GET /api/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        data: {}
    });
};