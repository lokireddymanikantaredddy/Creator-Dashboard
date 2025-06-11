import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MonacoEditor from '@monaco-editor/react';
import { courseContent } from '../data/courseContent';
import {
  FiPlay,
  FiCheck,
  FiX,
  FiChevronRight,
  FiAward,
  FiCode,
  FiBookmark
} from 'react-icons/fi';

export default function CourseContent({ technology, level }) {
  const [selectedModule, setSelectedModule] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [code, setCode] = useState('');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const content = courseContent[technology]?.[level];
  if (!content) return null;

  const currentModule = content.modules[selectedModule];
  const currentLesson = currentModule?.lessons[selectedLesson];

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const handleQuizSubmit = (lessonId, selectedAnswer) => {
    setQuizAnswers({
      ...quizAnswers,
      [lessonId]: selectedAnswer
    });
    setShowQuizResults(true);
  };

  const isAnswerCorrect = (lessonId) => {
    return quizAnswers[lessonId] === currentLesson.quiz.answer;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar - Module Navigation */}
      <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-4">
        <h3 className="text-lg font-semibold mb-4">{content.title}</h3>
        <div className="space-y-2">
          {content.modules.map((module, moduleIndex) => (
            <div key={module.id} className="space-y-2">
              <button
                onClick={() => {
                  setSelectedModule(moduleIndex);
                  setSelectedLesson(0);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedModule === moduleIndex
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-sm mr-3">
                    {moduleIndex + 1}
                  </span>
                  {module.title}
                </div>
              </button>
              {selectedModule === moduleIndex && (
                <div className="ml-9 space-y-1">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <button
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lessonIndex)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                        selectedLesson === lessonIndex
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <FiChevronRight className="mr-2" />
                        {lesson.title}
                        {quizAnswers[lesson.id] !== undefined && (
                          <span className="ml-auto">
                            {isAnswerCorrect(lesson.id) ? (
                              <FiCheck className="text-green-500" />
                            ) : (
                              <FiX className="text-red-500" />
                            )}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-3 space-y-6">
        {currentLesson && (
          <>
            {/* Lesson Content */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">{currentLesson.title}</h2>
              <div className="prose max-w-none">
                {currentLesson.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Code Editor */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Try it yourself</h3>
                <button
                  onClick={() => setCode(currentLesson.code)}
                  className="text-indigo-600 hover:text-indigo-700 text-sm"
                >
                  Reset Code
                </button>
              </div>
              <div className="h-[300px] border rounded-lg overflow-hidden">
                <MonacoEditor
                  height="100%"
                  language={technology === 'html' ? 'html' : technology === 'css' ? 'css' : 'javascript'}
                  theme="vs-dark"
                  value={code || currentLesson.code}
                  onChange={handleCodeChange}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                  }}
                />
              </div>
              <div className="mt-4 flex justify-end">
                <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <FiPlay className="mr-2" />
                  Run Code
                </button>
              </div>
            </div>

            {/* Quiz Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Knowledge Check</h3>
              <div className="space-y-4">
                <p className="font-medium">{currentLesson.quiz.question}</p>
                <div className="space-y-2">
                  {currentLesson.quiz.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizSubmit(currentLesson.id, index)}
                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                        quizAnswers[currentLesson.id] === index
                          ? isAnswerCorrect(currentLesson.id)
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-indigo-500'
                      }`}
                      disabled={showQuizResults}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {showQuizResults && quizAnswers[currentLesson.id] !== undefined && (
                  <div
                    className={`mt-4 p-4 rounded-lg ${
                      isAnswerCorrect(currentLesson.id)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {isAnswerCorrect(currentLesson.id)
                      ? 'Correct! Well done!'
                      : 'Not quite right. Try again!'}
                  </div>
                )}
              </div>
            </div>

            {/* Project Section */}
            {currentModule.project && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Module Project</h3>
                  <FiBookmark className="text-indigo-600" />
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-medium">{currentModule.project.title}</h4>
                  <p className="text-gray-600">{currentModule.project.description}</p>
                  <div className="space-y-2">
                    <h5 className="font-medium">Requirements:</h5>
                    <ul className="list-disc list-inside space-y-1">
                      {currentModule.project.requirements.map((req, index) => (
                        <li key={index} className="text-gray-600">
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <h5 className="font-medium mb-2">Starter Code:</h5>
                    <div className="h-[200px] border rounded-lg overflow-hidden">
                      <MonacoEditor
                        height="100%"
                        language={technology === 'html' ? 'html' : technology === 'css' ? 'css' : 'javascript'}
                        theme="vs-dark"
                        value={currentModule.project.starterCode}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          readOnly: true,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 