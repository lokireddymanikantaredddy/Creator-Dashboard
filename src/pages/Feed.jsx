import React, { useEffect, useState } from 'react';
import api from '../services/api';
import FeedCard from '../components/FeedCard';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import ContentFilter from '../components/ContentFilter';

export default function Feed() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sourceFilter, setSourceFilter] = useState('all');
  const { user } = useAuth();

  const fetchFeed = async (pageNum = 1, reset = false) => {
    try {
      const res = await api.get(`/feed?page=${pageNum}&source=${sourceFilter}`);
      setFeed(prev => reset ? res.data : [...prev, ...res.data]);
      setHasMore(res.data.length > 0);
    } catch (err) {
      toast.error('Failed to load feed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed(1, true);
  }, [sourceFilter]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchFeed(nextPage);
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchFeed(1, true);
    toast.success('Feed refreshed!');
  };

  if (loading && page === 1) return <div className="p-8 text-center">Loading feed...</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 bg-white z-10 p-4 border-b">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Content Feed</h1>
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
              key={`${content.source}-${content.id}`} 
              content={content} 
              userId={user?._id}
            />
          ))}
        </div>
        
        {hasMore && (
          <div className="text-center mt-8">
            <button 
              onClick={handleLoadMore}
              className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}