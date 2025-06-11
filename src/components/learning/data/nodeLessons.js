export const nodeLessons = [
  {
    id: 1,
    title: 'Node.js Basics',
    content: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine. It allows you to run JavaScript on the server side and build scalable network applications.',
    code: `// Basic Node.js server
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\\n');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});`,
    quiz: {
      question: 'What module is required to create an HTTP server in Node.js?',
      options: ['http', 'https', 'server', 'net'],
      answer: 'http'
    }
  },
  {
    id: 2,
    title: 'File System Operations',
    content: 'Node.js provides a built-in module called "fs" for interacting with the file system. It can be used to read, write, update, and delete files.',
    code: `// File system operations
const fs = require('fs');

// Reading a file
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Writing to a file
fs.writeFile('output.txt', 'Hello World!', (err) => {
  if (err) throw err;
  console.log('File written successfully');
});

// Async/await version
async function readFileAsync() {
  try {
    const data = await fs.promises.readFile('example.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}`,
    quiz: {
      question: 'Which module is used for file system operations in Node.js?',
      options: ['fs', 'file', 'system', 'io'],
      answer: 'fs'
    }
  },
  {
    id: 3,
    title: 'Express.js Framework',
    content: 'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
    code: `// Basic Express application
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/api/users', (req, res) => {
  const { username } = req.body;
  res.json({ message: \`User \${username} created\` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});`,
    quiz: {
      question: 'What method is used to start an Express server?',
      options: ['listen()', 'start()', 'run()', 'serve()'],
      answer: 'listen()'
    }
  },
  {
    id: 4,
    title: 'Database Integration',
    content: 'Node.js can work with various databases. Here\'s an example using MongoDB with Mongoose, a popular ODM (Object Data Modeling) library.',
    code: `// MongoDB with Mongoose
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a schema
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create a model
const User = mongoose.model('User', userSchema);

// Create and save a user
async function createUser() {
  try {
    const user = new User({
      username: 'john_doe',
      email: 'john@example.com'
    });
    await user.save();
    console.log('User saved successfully');
  } catch (err) {
    console.error(err);
  }
}`,
    quiz: {
      question: 'What is Mongoose used for in Node.js?',
      options: [
        'MongoDB object modeling',
        'SQL database queries',
        'File system operations',
        'Server creation'
      ],
      answer: 'MongoDB object modeling'
    }
  },
  {
    id: 5,
    title: 'Authentication and Security',
    content: 'Security is crucial for web applications. Node.js has various packages and practices for implementing authentication and securing your application.',
    code: `// JWT Authentication example
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Hash password
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Verify password
async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

// Generate JWT token
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    'your-secret-key',
    { expiresIn: '1h' }
  );
}

// Middleware to protect routes
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token, 'your-secret-key');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
}`,
    quiz: {
      question: 'What package is commonly used for password hashing in Node.js?',
      options: ['bcrypt', 'crypto', 'hash', 'cipher'],
      answer: 'bcrypt'
    }
  }
]; 