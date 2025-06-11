import { useState, useEffect } from 'react';

const STORAGE_KEY = 'lessonProgress';

// Define lesson data
const LESSONS_DATA = {
  html: [
    { id: 'html1', title: 'HTML Basics' },
    { id: 'html2', title: 'HTML Elements' },
    { id: 'html3', title: 'HTML Forms' },
    { id: 'html4', title: 'HTML Semantics' },
    { id: 'html5', title: 'HTML5 Features' }
  ],
  css: [
    { id: 'css1', title: 'CSS Introduction' },
    { id: 'css2', title: 'CSS Selectors' },
    { id: 'css3', title: 'CSS Box Model' },
    { id: 'css4', title: 'CSS Flexbox' },
    { id: 'css5', title: 'CSS Grid' }
  ],
  javascript: [
    { id: 'js1', title: 'JavaScript Fundamentals' },
    { id: 'js2', title: 'Functions & Objects' },
    { id: 'js3', title: 'DOM Manipulation' },
    { id: 'js4', title: 'Events & Async' },
    { id: 'js5', title: 'Modern JavaScript' }
  ],
  react: [
    { id: 'react1', title: 'React Basics' },
    { id: 'react2', title: 'Components & Props' },
    { id: 'react3', title: 'State & Lifecycle' },
    { id: 'react4', title: 'Hooks' },
    { id: 'react5', title: 'React Router' }
  ],
  node: [
    { id: 'node1', title: 'Node.js Basics' },
    { id: 'node2', title: 'Node.js Modules' },
    { id: 'node3', title: 'File System' },
    { id: 'node4', title: 'NPM' },
    { id: 'node5', title: 'Node.js & HTTP' }
  ],
  mongodb: [
    { id: 'mongo1', title: 'MongoDB Basics' },
    { id: 'mongo2', title: 'CRUD Operations' },
    { id: 'mongo3', title: 'Queries & Filters' },
    { id: 'mongo4', title: 'Aggregation' },
    { id: 'mongo5', title: 'MongoDB Atlas' }
  ],
  express: [
    { id: 'express1', title: 'Express.js Basics' },
    { id: 'express2', title: 'Routing' },
    { id: 'express3', title: 'Middleware' },
    { id: 'express4', title: 'Error Handling' },
    { id: 'express5', title: 'Express & MongoDB' }
  ],
  nextjs: [
    { id: 'next1', title: 'Next.js Setup' },
    { id: 'next2', title: 'Pages & Routing' },
    { id: 'next3', title: 'Data Fetching' },
    { id: 'next4', title: 'API Routes' },
    { id: 'next5', title: 'Deployment' }
  ],
  typescript: [
    { id: 'ts1', title: 'TypeScript Basics' },
    { id: 'ts2', title: 'Types & Interfaces' },
    { id: 'ts3', title: 'Classes' },
    { id: 'ts4', title: 'Generics' },
    { id: 'ts5', title: 'Decorators' }
  ],
  bootstrap: [
    { id: 'bs1', title: 'Bootstrap Setup' },
    { id: 'bs2', title: 'Grid System' },
    { id: 'bs3', title: 'Components' },
    { id: 'bs4', title: 'Utilities' },
    { id: 'bs5', title: 'Customization' }
  ],
  git: [
    { id: 'git1', title: 'Git Basics' },
    { id: 'git2', title: 'Branching' },
    { id: 'git3', title: 'Remote Repositories' },
    { id: 'git4', title: 'Collaboration' },
    { id: 'git5', title: 'Git Best Practices' }
  ]
};

export function useLessonProgress() {
  const [progress, setProgress] = useState(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    return savedProgress ? JSON.parse(savedProgress) : {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markLessonComplete = (section, lessonId) => {
    setProgress(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [lessonId]: true
      }
    }));
  };

  const isLessonComplete = (section, lessonId) => {
    return progress[section]?.[lessonId] || false;
  };

  const getSectionProgress = (section) => {
    const sectionProgress = progress[section] || {};
    const completedLessons = Object.values(sectionProgress).filter(Boolean).length;
    return {
      completed: completedLessons,
      percentage: Math.round((completedLessons / 5) * 100) // Each section has 5 lessons
    };
  };

  const getAllProgress = () => {
    const sections = [
      'html', 'css', 'javascript', 'react', 'node', 'mongodb',
      'express', 'nextjs', 'typescript', 'bootstrap', 'git'
    ];

    return sections.map(section => ({
      section,
      ...getSectionProgress(section)
    }));
  };

  const getSectionLessons = (section) => {
    const sectionLessons = LESSONS_DATA[section] || [];
    return sectionLessons.map(lesson => ({
      ...lesson,
      completed: isLessonComplete(section, lesson.id)
    }));
  };

  return {
    markLessonComplete,
    isLessonComplete,
    getSectionProgress,
    getAllProgress,
    getSectionLessons
  };
} 