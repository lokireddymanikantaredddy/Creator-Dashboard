import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { useLessonProgress } from '../../../hooks/useLessonProgress';
import { FiMenu, FiX } from 'react-icons/fi';

export default function LearningSection({ lessons, sectionTitle }) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const { markLessonComplete, isLessonComplete, getSectionProgress } = useLessonProgress();
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentLesson = lessons[currentLessonIndex];
  const sectionId = sectionTitle.toLowerCase().replace('.', '').replace(' ', '');
  const { completed, percentage } = getSectionProgress(sectionId);

  // Close sidebar by default on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    if (currentLessonIndex < lessons.length - 1) {
      markLessonComplete(sectionId, currentLesson.id);
      setCurrentLessonIndex(currentLessonIndex + 1);
      setSelectedAnswer('');
    }
  };

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setSelectedAnswer('');
    }
  };

  const handleMarkComplete = () => {
    markLessonComplete(sectionId, currentLesson.id);
  };

  const handleLessonClick = (index) => {
    setCurrentLessonIndex(index);
    setSelectedAnswer('');
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="h-full overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">{sectionTitle}</h2>
            <button
              className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Lesson list remains the same */}
          <div className="space-y-2">
            {lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => {
                  handleLessonClick(index);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  currentLessonIndex === index
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100'
                } ${isLessonComplete(sectionId, lesson.id) ? 'text-green-600' : ''}`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs border ${
                    isLessonComplete(sectionId, lesson.id)
                      ? 'border-green-600 bg-green-600 text-white'
                      : 'border-gray-400'
                  }`}>
                    {isLessonComplete(sectionId, lesson.id) ? '✓' : index + 1}
                  </span>
                  <span className="text-sm font-medium truncate">{lesson.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile Header with Right-aligned Menu */}
        <div className="sticky top-0 z-20 bg-white border-b md:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex-1">
              <h1 className="text-lg font-semibold truncate">{currentLesson.title}</h1>
              <p className="text-sm text-gray-500">Lesson {currentLessonIndex + 1} of {lessons.length}</p>
            </div>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="ml-4 p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              aria-label="Open menu"
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Desktop Header */}
          <div className="hidden md:block">
            <div className="flex items-center justify-between">
              <h1 className="text-xl md:text-3xl font-bold">{sectionTitle} Learning Path</h1>
            </div>
          </div>
          
          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="text-sm font-medium text-gray-600 hidden md:block">
                Lesson {currentLessonIndex + 1} of {lessons.length}
              </div>
              <div className="text-sm font-medium text-gray-600">
                {completed} of {lessons.length} completed ({percentage}%)
              </div>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Content Section */}
          <h2 className="text-lg md:text-xl font-semibold md:block hidden">{currentLesson.title}</h2>
          <p className="text-sm md:text-base text-gray-700">{currentLesson.content}</p>

          {/* Code Editor */}
          <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
            <Editor
              height="200px"
              defaultLanguage="javascript"
              defaultValue={currentLesson.code}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                readOnly: false,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true
              }}
            />
          </div>

          {/* Quiz Section */}
          <div className="mt-4 space-y-3 bg-gray-50 p-4 rounded-lg">
            <p className="font-medium text-sm md:text-base">Quiz: {currentLesson.quiz.question}</p>
            <div className="space-y-2">
              {currentLesson.quiz.options.map((opt, i) => (
                <div key={i} className="relative">
                  <label className="flex items-start gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
                    <input
                      type="radio"
                      name="quiz"
                      value={opt}
                      checked={selectedAnswer === opt}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                      className="mt-1 form-radio text-blue-600"
                    />
                    <span className="text-sm md:text-base">{opt}</span>
                  </label>
                </div>
              ))}
            </div>
            {selectedAnswer && (
              <p className={`text-sm ${
                selectedAnswer === currentLesson.quiz.answer 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {selectedAnswer === currentLesson.quiz.answer 
                  ? 'Correct!' 
                  : 'Wrong answer'}
              </p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentLessonIndex === 0}
              className="flex-1 sm:flex-none px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
            >
              Previous
            </button>
            <button
              onClick={handleMarkComplete}
              className={`flex-1 sm:flex-none text-sm md:text-base px-4 py-2 text-white rounded-lg transition-colors ${
                isLessonComplete(sectionId, currentLesson.id) 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-yellow-600 hover:bg-yellow-700'
              }`}
            >
              {isLessonComplete(sectionId, currentLesson.id) ? 'Completed' : 'Mark as Complete'}
            </button>
            <button
              onClick={handleNext}
              disabled={currentLessonIndex === lessons.length - 1}
              className="flex-1 sm:flex-none px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
} 