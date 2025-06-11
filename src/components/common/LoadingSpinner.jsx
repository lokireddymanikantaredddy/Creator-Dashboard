import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div
      role="status"
      className={`flex items-center justify-center ${className}`}
    >
      <motion.div
        className={`
          border-4 rounded-full
          border-primary-200
          border-t-primary-500
          ${sizes[size]}
        `}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
}; 