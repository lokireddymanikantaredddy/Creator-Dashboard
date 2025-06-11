import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiEye, 
  FiClock, 
  FiBook, 
  FiVideo, 
  FiHelpCircle,
  FiExternalLink,
  FiBookmark,
  FiSearch,
  FiCode, 
  FiLayout, 
  FiDatabase, 
  FiServer, 
  FiMonitor,
  FiBox,
  FiCpu,
  FiGlobe
} from 'react-icons/fi';

export default function Content() {
  const [contents, setContents] = useState([
    {
      id: 1,
      title: 'Getting Started with React',
      type: 'Article',
      status: 'Published',
      views: 1234,
      lastModified: '2024-03-10',
    },
    // Add more mock data as needed
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newContent, setNewContent] = useState({
    title: '',
    type: 'Article',
    description: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const contentTypes = ['Article', 'Video', 'Podcast', 'Course'];

  const categories = [
    { id: 'all', name: 'All Courses', icon: FiBook },
    { id: 'frontend', name: 'Frontend', icon: FiLayout },
    { id: 'backend', name: 'Backend', icon: FiServer },
    { id: 'database', name: 'Database', icon: FiDatabase },
    { id: 'frameworks', name: 'Frameworks', icon: FiBox }
  ];

  const courses = {
    frontend: [
      {
        title: 'HTML5 Fundamentals',
        sections: [
          { name: 'Introduction to HTML', duration: '30 min' },
          { name: 'HTML Elements & Attributes', duration: '45 min' },
          { name: 'Forms & Input Types', duration: '60 min' },
          { name: 'Semantic HTML', duration: '45 min' },
          { name: 'HTML5 APIs', duration: '90 min' }
        ],
        level: 'Beginner',
        icon: FiCode
      },
      {
        title: 'CSS Mastery',
        sections: [
          { name: 'CSS Selectors & Properties', duration: '45 min' },
          { name: 'Flexbox Layout', duration: '60 min' },
          { name: 'CSS Grid System', duration: '75 min' },
          { name: 'Responsive Design', duration: '90 min' },
          { name: 'CSS Animations', duration: '60 min' }
        ],
        level: 'Intermediate',
        icon: FiLayout
      },
      {
        title: 'JavaScript Essentials',
        sections: [
          { name: 'JS Fundamentals', duration: '60 min' },
          { name: 'DOM Manipulation', duration: '75 min' },
          { name: 'ES6+ Features', duration: '90 min' },
          { name: 'Async Programming', duration: '120 min' },
          { name: 'Error Handling', duration: '45 min' }
        ],
        level: 'Intermediate',
        icon: FiCode
      }
    ],
    backend: [
      {
        title: 'Node.js Development',
        sections: [
          { name: 'Node.js Basics', duration: '60 min' },
          { name: 'Express.js Framework', duration: '90 min' },
          { name: 'RESTful APIs', duration: '120 min' },
          { name: 'Authentication & Authorization', duration: '90 min' },
          { name: 'Error Handling & Logging', duration: '60 min' }
        ],
        level: 'Advanced',
        icon: FiServer
      },
      {
        title: 'Python Backend',
        sections: [
          { name: 'Python Fundamentals', duration: '75 min' },
          { name: 'Django Framework', duration: '120 min' },
          { name: 'API Development', duration: '90 min' },
          { name: 'Database Integration', duration: '75 min' },
          { name: 'Testing & Deployment', duration: '90 min' }
        ],
        level: 'Intermediate',
        icon: FiServer
      }
    ],
    database: [
      {
        title: 'SQL Fundamentals',
        sections: [
          { name: 'Database Basics', duration: '45 min' },
          { name: 'CRUD Operations', duration: '60 min' },
          { name: 'Joins & Relations', duration: '90 min' },
          { name: 'Indexing & Optimization', duration: '75 min' },
          { name: 'Transactions & Security', duration: '60 min' }
        ],
        level: 'Beginner',
        icon: FiDatabase
      },
      {
        title: 'MongoDB NoSQL',
        sections: [
          { name: 'MongoDB Basics', duration: '60 min' },
          { name: 'CRUD with MongoDB', duration: '75 min' },
          { name: 'Aggregation Pipeline', duration: '90 min' },
          { name: 'Indexing & Performance', duration: '60 min' },
          { name: 'Security & Access Control', duration: '45 min' }
        ],
        level: 'Intermediate',
        icon: FiDatabase
      }
    ],
    frameworks: [
      {
        title: 'React.js Complete Guide',
        sections: [
          { name: 'React Fundamentals', duration: '90 min' },
          { name: 'Components & Props', duration: '75 min' },
          { name: 'State & Lifecycle', duration: '90 min' },
          { name: 'Hooks & Context', duration: '120 min' },
          { name: 'Redux State Management', duration: '90 min' }
        ],
        level: 'Advanced',
        icon: FiBox
      },
      {
        title: 'Vue.js Development',
        sections: [
          { name: 'Vue.js Basics', duration: '75 min' },
          { name: 'Components & Props', duration: '60 min' },
          { name: 'Vue Router', duration: '45 min' },
          { name: 'Vuex State Management', duration: '90 min' },
          { name: 'Testing Vue Apps', duration: '60 min' }
        ],
        level: 'Intermediate',
        icon: FiBox
      }
    ]
  };

  const filteredCourses = selectedCategory === 'all'
    ? Object.values(courses).flat()
    : courses[selectedCategory] || [];

  const searchedCourses = filteredCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Learning Content</h1>
        <p className="mt-2 text-sm text-gray-600">Browse and manage your learning materials</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === category.id
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <category.icon className="mr-2 h-4 w-4" />
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchedCourses.map((course, index) => (
          <motion.div
            key={course.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <course.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${
                  course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                  course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {course.level}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
              <div className="space-y-2">
                {course.sections.slice(0, 3).map((section, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-600">
                    <FiClock className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{section.name} - {section.duration}</span>
                  </div>
                ))}
                {course.sections.length > 3 && (
                  <div className="text-sm text-gray-500">
                    +{course.sections.length - 3} more sections
                  </div>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <FiEye className="mr-2 h-4 w-4" />
                  View Course
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content Management Section */}
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Content Management</h1>
          <button
            onClick={() => setIsCreating(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiPlus className="mr-2 h-4 w-4" />
            Create New Content
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {contents.map((content) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3 sm:mb-4">
                <h3 className="text-sm sm:text-lg font-medium text-gray-900 line-clamp-2">{content.title}</h3>
                <span className={`self-start inline-flex px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                  content.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {content.status}
                </span>
              </div>
              <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                <FiClock className="mr-1 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">Last modified: {content.lastModified}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500">
                  <FiEye className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>{content.views} views</span>
                </div>
                <div className="flex space-x-1 sm:space-x-2">
                  <button className="p-1.5 sm:p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-full">
                    <FiEdit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                  <button className="p-1.5 sm:p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-full">
                    <FiTrash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Create Content Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto"
          >
            <div className="px-4 py-4 sm:px-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Create New Content</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newContent.title}
                    onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    placeholder="Enter content title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={newContent.type}
                    onChange={(e) => setNewContent({ ...newContent, type: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  >
                    {contentTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newContent.description}
                    onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    placeholder="Enter content description"
                  />
                </div>
              </form>
            </div>
            <div className="px-4 py-4 sm:px-6 bg-gray-50 rounded-b-lg flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sm:space-x-3">
              <button
                onClick={() => setIsCreating(false)}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle content creation
                  setIsCreating(false);
                }}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 