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
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contentRoutes = require('./routes/contentRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();

// Connect Database
connectDB();

// Security Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    exposedHeaders: ['Authorization']
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev')); // Logging

// Add request logging middleware
app.use((req, res, next) => {
    console.log('Request received:', {
        method: req.method,
        path: req.path,
        body: req.body,
        headers: req.headers
    });
    next();
});

 // Routes
 app.use('/api/auth', authRoutes);
 app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error Handling
app.use(errorHandler);

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`));


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
