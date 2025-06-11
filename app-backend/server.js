require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

// Set environment
const isProduction = process.env.NODE_ENV === 'production';
console.log(`Environment: ${process.env.NODE_ENV}`);

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contentRoutes = require('./routes/contentRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();

// Connect Database
connectDB();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const allowedOrigins = [
    'http://localhost:3000',
    'https://creator-dashboard-nu.vercel.app',
    'https://creator-dashboard-git-main-lokireddymanikantaredddy.vercel.app',
    'https://creator-dashboard-lokireddymanikantaredddy.vercel.app'
];

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With']
}));

// Security middleware
app.use(helmet({
    crossOriginResourcePolicy: false
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: isProduction ? 100 : 1000 // limit each IP to 100 requests per windowMs in production
});
app.use(limiter);

// Logging
if (!isProduction) {
    app.use(morgan('dev'));
}

// Debug logging
if (!isProduction) {
    app.use((req, res, next) => {
        console.log('Request:', {
            method: req.method,
            path: req.path,
            origin: req.headers.origin,
            headers: req.headers
        });
        next();
    });
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error Handling
app.use(errorHandler);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    console.log(`Health check available at http://localhost:${PORT}/health`);
});


// const express = require("express");
// const { MongoClient } = require("mongodb");
// require("dotenv").config();
// MongoClient.connect(process.env.DB_URI).then((client) => {
//   console.log("Connected to Database");
//   const db = client.db("test");
//   const collection = db.collection("testCollection");

//   // Example of inserting a document
//   collection.insertOne({ name: "John Doe", age: 30 }).then((result) => {
//     console.log("Document inserted:", result);
//   });

//   // Example of finding a document
//   collection.findOne({ name: "John Doe" }).then((result) => {
//     console.log("Document found:", result);
//   });
// });
// console.log(process.env.DB_URI);
// const app = express();
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
