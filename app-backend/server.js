require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const  errorHandler  = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
// const feedRoutes = require('./routes/feedRoutes');
// const adminRoutes = require('./routes/adminRoutes');

const app = express();



// Connect Database
connectDB();

// // Middleware
app.use(express.json());             // this should not throw
app.use(express.urlencoded({ extended: true }));

//  Error Handling
 app.use(errorHandler);

 // Routes
 app.use('/api/auth', authRoutes);
 app.use('/api/users', userRoutes);
//  app.use('/api/feed', feedRoutes);
 // app.use('/api/admin', adminRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


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
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
