const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    try {
        let token;

        // Check if token exists in headers
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.token) {
            // Check if token exists in cookies
            token = req.cookies.token;
        }

        if (!token) {
            throw new AppError('Not authorized to access this route', 401);
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
            next();
        } catch (err) {
            throw new AppError('Not authorized to access this route', 401);
        }
    } catch (error) {
        next(error);
    }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
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