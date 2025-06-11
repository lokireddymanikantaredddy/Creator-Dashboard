# Creator Dashboard

A modern web application built with React and Node.js that provides a comprehensive dashboard for content creators to manage their learning journey, content, and analytics.

## Features

- 📊 **Interactive Dashboard**: Real-time analytics and progress tracking
- 📚 **Learning Management**: Structured learning paths with various technology tracks
- 📝 **Content Management**: Create, edit, and organize your content
- 🎯 **Progress Tracking**: Track your learning progress across different courses
- 🔐 **User Authentication**: Secure login and registration system
- 📱 **Responsive Design**: Fully responsive layout for all devices
- 🎨 **Modern UI**: Clean and intuitive interface using Tailwind CSS

## Tech Stack

### Frontend
- React 18
- React Router v6
- Tailwind CSS
- Framer Motion
- Recharts
- React Hot Toast
- Monaco Editor

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer (File uploads)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas URI)

### Installation

1. Clone the repository
```bash
git clone https://github.com/lokireddymanikantaredddy/Creator-Dashboard.git
cd Creator-Dashboard
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd app-backend
npm install
```

4. Set up environment variables
Create `.env` files in both root and app-backend directories:

Root `.env`:
```
REACT_APP_API_URL=http://localhost:5001/api
```

Backend `.env`:
```
PORT=5001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Running the Application

1. Start the backend server
```bash
cd app-backend
npm start
```

2. Start the frontend development server (in a new terminal)
```bash
# From the root directory
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
Creator-Dashboard/
├── src/                    # Frontend source files
│   ├── components/        # React components
│   ├── context/          # Context providers
│   ├── pages/            # Page components
│   ├── hooks/            # Custom hooks
│   └── styles/           # CSS and style files
├── app-backend/          # Backend source files
│   ├── controllers/      # Route controllers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   └── middleware/      # Custom middleware
└── public/              # Static files
```

## Available Scripts

- `npm start`: Start the frontend development server
- `npm build`: Build the frontend for production
- `npm test`: Run frontend tests
- `cd app-backend && npm start`: Start the backend server

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- [Create React App](https://github.com/facebook/create-react-app)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
