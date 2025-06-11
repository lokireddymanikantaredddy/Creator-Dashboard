export const reactLessons = [
  {
    id: 1,
    title: 'React Fundamentals',
    content: 'React is a JavaScript library for building user interfaces. It uses a component-based architecture and a virtual DOM for efficient rendering.',
    code: `// Basic React component
import React from 'react';

function Welcome({ name }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Welcome to React</p>
    </div>
  );
}

// Using the component
function App() {
  return <Welcome name="John" />;
}`,
    quiz: {
      question: 'What syntax is used for embedding JavaScript expressions in JSX?',
      options: [
        '{ }',
        '{{ }}',
        '${ }',
        '( )'
      ],
      answer: '{ }'
    }
  },
  {
    id: 2,
    title: 'State and Props',
    content: 'State is used for data that can change over time, while props are used to pass data from parent to child components.',
    code: `// Component with state
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
    quiz: {
      question: 'Which hook is used to add state to a functional component?',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      answer: 'useState'
    }
  },
  {
    id: 3,
    title: 'Lifecycle and Effects',
    content: 'Effects let you perform side effects in function components. They serve a similar purpose to lifecycle methods in class components.',
    code: `// Using effects
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data when userId changes
    fetchUser(userId).then(data => setUser(data));
    
    // Cleanup function
    return () => {
      // Clean up resources
    };
  }, [userId]);

  if (!user) return 'Loading...';
  return <div>{user.name}</div>;
}`,
    quiz: {
      question: 'When does useEffect run?',
      options: [
        'After every render',
        'Only on mount',
        'Only on unmount',
        'Before every render'
      ],
      answer: 'After every render'
    }
  },
  {
    id: 4,
    title: 'Forms and Events',
    content: 'React provides a way to handle form inputs and events in a declarative way using controlled components.',
    code: `// Controlled form component
function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
}`,
    quiz: {
      question: 'What makes a form input a controlled component?',
      options: [
        'Its value is controlled by React state',
        'It has an onSubmit handler',
        'It uses preventDefault()',
        'It has a name attribute'
      ],
      answer: 'Its value is controlled by React state'
    }
  },
  {
    id: 5,
    title: 'Context and Global State',
    content: 'Context provides a way to pass data through the component tree without having to pass props manually at every level.',
    code: `// Creating and using context
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button onClick={() => setTheme(
      theme === 'light' ? 'dark' : 'light'
    )}>
      Current theme: {theme}
    </button>
  );
}`,
    quiz: {
      question: 'Which hook is used to consume context in a functional component?',
      options: ['useContext', 'useState', 'useEffect', 'useReducer'],
      answer: 'useContext'
    }
  }
]; 