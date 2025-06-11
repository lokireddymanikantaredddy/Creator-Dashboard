import React from 'react';
import { useLessonProgress } from '../hooks/useLessonProgress';
import { useNavigate } from 'react-router-dom';

export default function Analytics() {
  const { getAllProgress } = useLessonProgress();
  const progress = getAllProgress();
  const navigate = useNavigate();

  const totalLessonsCompleted = progress.reduce((acc, curr) => acc + curr.completed, 0);
  const totalLessons = progress.reduce((acc, curr) => acc + 5, 0);
  const totalPercentage = Math.round((totalLessonsCompleted / totalLessons) * 100);

  const getSectionColor = (percentage) => {
    if (percentage === 0) return 'gray';
    if (percentage < 40) return 'red';
    if (percentage < 80) return 'yellow';
    return 'green';
  };

  const formatSectionName = (section) => {
    const names = {
      html: 'HTML',
      css: 'CSS',
      javascript: 'JavaScript',
      react: 'React',
      node: 'Node.js',
      mongodb: 'MongoDB',
      express: 'Express.js',
      nextjs: 'Next.js',
      typescript: 'TypeScript',
      bootstrap: 'Bootstrap',
      git: 'Git'
    };
    return names[section] || section;
  };

  const handleSectionClick = (section) => {
    navigate(`/learning/${section}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Overall Progress Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Total Progress ({totalLessonsCompleted} of {totalLessons} lessons)</span>
            <span className="font-semibold">{totalPercentage}%</span>
          </div>
          <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${totalPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Section Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {progress.map(({ section, completed, percentage }) => {
          const color = getSectionColor(percentage);
          
          return (
            <button
              key={section}
              onClick={() => handleSectionClick(section)}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all text-left w-full cursor-pointer"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{formatSectionName(section)}</h3>
                <span className={`text-${color}-600 font-medium`}>
                  {percentage}%
                </span>
              </div>
              
              {/* Section Progress Bar */}
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-${color}-500 transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  {completed} of 5 lessons completed
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Learning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-3xl font-bold text-green-600">
            {progress.filter(p => p.percentage === 100).length}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Sections completed
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-3xl font-bold text-yellow-600">
            {progress.filter(p => p.percentage > 0 && p.percentage < 100).length}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Sections in progress
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-3xl font-bold text-gray-600">
            {progress.filter(p => p.percentage === 0).length}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Sections not started
          </p>
        </div>
      </div>
    </div>
  );
} 