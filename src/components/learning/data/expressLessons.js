export const expressLessons = [
  {
    id: 1,
    title: 'Express.js Basics',
    content: 'Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
    code: `// Basic Express application setup
const express = require('express');
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});`,
    quiz: {
      question: 'What is Express.js primarily used for?',
      options: [
        'Web application framework',
        'Database management',
        'Frontend development',
        'Mobile development'
      ],
      answer: 'Web application framework'
    }
  },
  {
    id: 2,
    title: 'Routing and Middleware',
    content: 'Express routing determines how your application responds to client requests. Middleware functions have access to the request and response objects.',
    code: `// Route parameters
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(\`User ID: \${userId}\`);
});

// Custom middleware
const logRequest = (req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
};

app.use(logRequest);

// Route-specific middleware
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied');
  next();
};

app.get('/protected', authenticate, (req, res) => {
  res.send('Protected route');
});`,
    quiz: {
      question: 'What is the purpose of the next() function in middleware?',
      options: [
        'Pass control to the next middleware function',
        'End the request-response cycle',
        'Redirect to next route',
        'Start a new request'
      ],
      answer: 'Pass control to the next middleware function'
    }
  },
  {
    id: 3,
    title: 'Request Handling',
    content: 'Express provides various methods to handle different types of HTTP requests and access request data.',
    code: `// Handle POST request with body
app.post('/api/users', (req, res) => {
  const { username, email } = req.body;
  // Create user...
  res.status(201).json({ message: 'User created' });
});

// Query parameters
app.get('/search', (req, res) => {
  const { q, limit } = req.query;
  res.json({ 
    query: q,
    limit: limit,
    results: []
  });
});

// File upload handling
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ 
    filename: req.file.filename 
  });
});`,
    quiz: {
      question: 'How do you access POST request body data in Express?',
      options: [
        'req.body',
        'req.data',
        'req.post',
        'req.content'
      ],
      answer: 'req.body'
    }
  },
  {
    id: 4,
    title: 'Error Handling',
    content: 'Express has built-in error handling that catches synchronous and asynchronous errors in your application.',
    code: `// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Async error handling
app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// Custom error class
class APIError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Error handler for custom errors
app.use((err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      error: err.message
    });
  }
  next(err);
});`,
    quiz: {
      question: 'How many parameters does an error handling middleware have?',
      options: ['4', '3', '2', '1'],
      answer: '4'
    }
  },
  {
    id: 5,
    title: 'Template Engines',
    content: 'Template engines enable you to use static template files and inject dynamic content at runtime.',
    code: `// Setup EJS template engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Render template
app.get('/profile', (req, res) => {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    posts: ['Post 1', 'Post 2']
  };
  
  res.render('profile', { user });
});

// Example EJS template (profile.ejs)
/*
<!DOCTYPE html>
<html>
<head>
  <title><%= user.name %>'s Profile</title>
</head>
<body>
  <h1>Welcome, <%= user.name %></h1>
  <p>Email: <%= user.email %></p>
  <h2>Posts:</h2>
  <ul>
    <% user.posts.forEach(post => { %>
      <li><%= post %></li>
    <% }); %>
  </ul>
</body>
</html>
*/`,
    quiz: {
      question: 'Which method is used to render a template in Express?',
      options: [
        'res.render()',
        'res.view()',
        'res.template()',
        'res.display()'
      ],
      answer: 'res.render()'
    }
  }
]; 