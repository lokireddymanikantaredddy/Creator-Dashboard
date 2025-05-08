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
  const [isLiked, setIsLiked] = useState(content.isLiked || false);
  const [likeCount, setLikeCount] = useState(content.likes || 0);
  const [commentCount, setCommentCount] = useState(content.comments || 0);

  const handleLike = async (e) => {
    e.stopPropagation(); // Prevent triggering the card click
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

  const handleShare = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(content.url);
    toast.success('Link copied to clipboard!');
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
    // In a real app, this would open a comments section/modal
    toast('Comment feature coming soon!', { icon: '💬' });
  };

  const handleCardClick = () => {
    window.open(content.url, '_blank');
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
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
          <div className="flex space-x-4">
            <button 
              onClick={handleLike}
              className={`flex items-center ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
            >
              ♥ {likeCount > 0 && likeCount}
            </button>
            
            <button 
              onClick={handleCommentClick}
              className="flex items-center text-gray-500"
            >
              💬 {commentCount > 0 && commentCount}
            </button>
          </div>
          
          <button 
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-gray-100"
            title="Share"
          >
            ↗
          </button>
        </div>
      </div>
    </div>
  );
}