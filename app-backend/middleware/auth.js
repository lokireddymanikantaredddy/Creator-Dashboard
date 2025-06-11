const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    try {
        console.log('\n--- Auth Middleware ---');
        console.log('Request path:', req.path);
        console.log('Headers:', {
            authorization: req.headers.authorization,
            cookie: req.headers.cookie,
            origin: req.headers.origin
        });
        console.log('Cookies:', req.cookies);

        let token;
        let source = '';

        // Check cookies first (both possible names)
        if (req.cookies.jwt) {
            token = req.cookies.jwt;
            source = 'jwt cookie';
        } else if (req.cookies.token) {
            token = req.cookies.token;
            source = 'token cookie';
        } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            source = 'authorization header';
        }

        if (!token) {
            console.log('❌ No token found in request');
            return res.status(401).json({
                success: false,
                message: 'Authentication required. No token found.'
            });
        }

        console.log(`✅ Found token in ${source}`);

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            console.log('Token decoded successfully:', { userId: decoded.id });

            // Get user from token
            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                console.log('❌ No user found for token:', decoded.id);
                return res.status(401).json({
                    success: false,
                    message: 'User not found for this token'
                });
            }

            console.log('✅ User authenticated:', {
                userId: user._id,
                email: user.email,
                role: user.role
            });

            // Attach user to request
            req.user = user;
            next();
        } catch (error) {
            console.error('❌ Token verification failed:', {
                name: error.name,
                message: error.message,
                token: token ? token.substring(0, 10) + '...' : 'Missing'
            });

            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token'
                });
            } else if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Token expired'
                });
            }

            return res.status(401).json({
                success: false,
                message: 'Authentication failed',
                error: error.message
            });
        }
    } catch (error) {
        console.error('❌ Auth middleware error:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        return res.status(500).json({
            success: false,
            message: 'Server error in authentication',
            error: error.message
        });
    }
};

// Grant access to specific roles
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new AppError(
                `User role ${req.user.role} is not authorized to access this route`,
                403
            );
        }
        next();
    };
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as admin' });
    }
};

module.exports = { protect, authorize, admin }; 