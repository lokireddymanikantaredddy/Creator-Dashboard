import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import { formatDistanceToNow } from 'date-fns';

const sourceIcons = {
  twitter: '🐦',
  reddit: '📌', 
  linkedin: '💼'
};

export default function FeedCard({ content, userId }) {
  const [isSaved, setIsSaved] = useState(content.isSaved || false);
  const [isReported, setIsReported] = useState(false);
  const [isLiked, setIsLiked] = useState(content.isLiked || false);
  const [likeCount, setLikeCount] = useState(content.likes || 0);

  const handleSave = async () => {
    try {
      if (isSaved) {
        await api.delete(`/feed/save/${content._id}`);
        toast.success('Removed from saved');
      } else {
        await api.post(`/feed/save/${content._id}`);
        toast.success('Saved! +5 credits');
      }
      setIsSaved(!isSaved);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to save');
    }
  };

  const handleReport = async () => {
    if (isReported) return;
    
    try {
      await api.post(`/feed/report/${content._id}`);
      setIsReported(true);
      toast.success('Content reported. Our team will review it.');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to report');
    }
  };

  const handleLike = async () => {
    try {
      if (isLiked) {
        await api.delete(`/feed/like/${content._id}`);
        setLikeCount(prev => prev - 1);
      } else {
        await api.post(`/feed/like/${content._id}`);
        setLikeCount(prev => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      toast.error('Failed to like');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(content.url || content.link);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4">
        <div className="flex items-center mb-2">
          <span className="text-xl mr-2">{sourceIcons[content.source]}</span>
          <span className="font-medium text-gray-700">
            {content.author || content.user || 'Unknown'}
          </span>
          <span className="text-gray-500 text-sm ml-auto">
            {formatDistanceToNow(new Date(content.createdAt || content.date))} ago
          </span>
        </div>
        
        {content.image && (
          <img 
            src={content.image} 
            alt={content.title}
            className="w-full h-48 object-cover mb-3 rounded"
          />
        )}
        
        <h3 className="font-bold text-lg mb-2">{content.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{content.text || content.body}</p>
        
        <div className="flex justify-between items-center border-t pt-3">
          <button 
            onClick={handleLike}
            className={`flex items-center ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
          >
            ♥ {likeCount > 0 && likeCount}
          </button>
          
          <div className="flex space-x-2">
            <button 
              onClick={handleSave}
              className={`p-2 rounded-full ${isSaved ? 'bg-yellow-100 text-yellow-600' : 'hover:bg-gray-100'}`}
              title={isSaved ? 'Unsave' : 'Save'}
            >
              {isSaved ? '★' : '☆'}
            </button>
            
            <button 
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-gray-100"
              title="Share"
            >
              ↗
            </button>
            
            {!isReported && (
              <button 
                onClick={handleReport}
                className="p-2 rounded-full hover:bg-gray-100 text-red-500"
                title="Report"
              >
                ⚠
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}