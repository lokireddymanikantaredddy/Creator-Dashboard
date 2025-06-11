import React, { useState, useEffect } from 'react';
import { useLessonProgress } from '../hooks/useLessonProgress';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiBarChart2, FiUsers, FiThumbsUp, FiEye } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const { getAllProgress } = useLessonProgress();
  const { api } = useAuth();
  const progress = getAllProgress();
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(30); // Default to 30 days

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get(`/api/analytics/dashboard?days=${timeRange}`);
        if (response.data.success) {
          setAnalyticsData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange, api]);

  // Learning Progress Section
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

  // Content Analytics Section
  const viewsChartData = analyticsData?.viewTrends ? {
    labels: analyticsData.viewTrends.map(item => item._id),
    datasets: [{
      label: 'Views',
      data: analyticsData.viewTrends.map(item => item.count),
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      tension: 0.4
    }]
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Content Views Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Time Range Selector */}
      <div className="flex justify-end">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(Number(e.target.value))}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {/* Content Analytics Overview */}
      {!loading && analyticsData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <FiEye className="text-blue-500 text-2xl mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold">{analyticsData.overallMetrics.totalViews}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <FiThumbsUp className="text-green-500 text-2xl mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Engagements</p>
                <p className="text-2xl font-bold">{analyticsData.overallMetrics.totalEngagements}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <FiBarChart2 className="text-purple-500 text-2xl mr-3" />
              <div>
                <p className="text-sm text-gray-600">Engagement Rate</p>
                <p className="text-2xl font-bold">{analyticsData.overallMetrics.averageEngagementRate.toFixed(1)}%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <FiUsers className="text-orange-500 text-2xl mr-3" />
              <div>
                <p className="text-sm text-gray-600">Content Count</p>
                <p className="text-2xl font-bold">{analyticsData.overallMetrics.contentCount}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Views Chart */}
      {!loading && viewsChartData && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Line data={viewsChartData} options={chartOptions} />
        </div>
      )}

      {/* Top Performing Content */}
      {!loading && analyticsData && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Top Performing Content</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement Rate</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {analyticsData.overallMetrics.topPerforming.map((content, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{content.content.title}</div>
                      <div className="text-sm text-gray-500">{content.content.contentType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {content.views}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {content.engagementRate.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Learning Progress Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
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