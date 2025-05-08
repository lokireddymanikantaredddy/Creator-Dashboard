import React, { useEffect, useState } from 'react';
import api from '../services/api';
import FeedCard from '../components/FeedCard';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import ContentFilter from '../components/ContentFilter';

const sampleTechFeed = [
  {
    _id: 'react-1',
    source: 'twitter',
    author: 'React Official',
    title: 'React 19 Beta Released!',
    text: 'The new React 19 beta includes server components by default, improved hydration, and a new compiler for better performance.',
    image: 'https://reactjs.org/logo-og.png',
    createdAt: new Date(Date.now() - 3600000 * 2),
    likes: 142,
    comments: 28,
    url: 'https://reactjs.org/blog/2024/05/react-19-beta'
  },
  {
    _id: 'node-1',
    source: 'reddit',
    author: 'NodeJS_Enthusiast',
    title: 'Node.js 22 is now available!',
    text: 'Node.js 22 brings WebSocket client support, improved ES modules performance, and updates to V8 JavaScript engine.',
    image: 'https://nodejs.org/static/images/logo-hexagon-card.png',
    createdAt: new Date(Date.now() - 3600000 * 5),
    likes: 87,
    comments: 15,
    url: 'https://nodejs.org/en/blog/announcements/v22-release-announce'
  },
  {
    _id: 'react-2',
    source: 'linkedin',
    author: 'JavaScript Weekly',
    title: 'React Server Components Explained',
    text: 'Deep dive into how React Server Components work and improve app performance by reducing client-side JavaScript.',
    createdAt: new Date(Date.now() - 3600000 * 10),
    likes: 215,
    comments: 42,
    url: 'https://example.com/react-server-components'
  },
  {
    _id: 'node-2',
    source: 'twitter',
    author: 'Node.js',
    title: 'Node.js Security Updates',
    text: 'New security patches released for Node.js 18 and 20. All users should update to the latest versions.',
    image: 'https://nodejs.org/static/images/security.png',
    createdAt: new Date(Date.now() - 3600000 * 24),
    likes: 156,
    comments: 23,
    url: 'https://nodejs.org/en/blog/vulnerability'
  },
  {
    _id: 'react-3',
    source: 'reddit',
    author: 'FrontendDev',
    title: 'React vs Vue in 2024',
    text: 'Comprehensive comparison of React and Vue.js in 2024: performance, ecosystem, and developer experience.',
    image: 'https://miro.medium.com/v2/resize:fit:1200/1*y6C4nSvy2Woe0m7bWEn4BA.png',
    createdAt: new Date(Date.now() - 3600000 * 36),
    likes: 287,
    comments: 64,
    url: 'https://example.com/react-vs-vue-2024'
  }
];

export default function Feed() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sourceFilter, setSourceFilter] = useState('all');
  const { user } = useAuth();

  const fetchFeed = async () => {
    try {
      // Simulate API call with timeout
      setLoading(true);
      setTimeout(() => {
        const filteredFeed = sourceFilter === 'all' 
          ? sampleTechFeed 
          : sampleTechFeed.filter(item => item.source === sourceFilter);
        
        setFeed(filteredFeed);
        setLoading(false);
      }, 500);
    } catch (err) {
      toast.error('Failed to load feed');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [sourceFilter]);

  const handleRefresh = () => {
    fetchFeed();
    toast.success('Feed refreshed!');
  };

  if (loading) return <div className="p-8 text-center">Loading tech feed...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 bg-white z-10 p-4 border-b">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tech News Feed</h1>
          <button 
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Refresh
          </button>
        </div>
        <ContentFilter 
          currentFilter={sourceFilter}
          onFilterChange={setSourceFilter}
        />
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feed.map(content => (
            <FeedCard 
              key={content._id} 
              content={content} 
              userId={user?._id}
            />
          ))}
        </div>
        
        {feed.length === 0 && (
          <div className="text-center mt-8 text-gray-500">
            No tech news found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}