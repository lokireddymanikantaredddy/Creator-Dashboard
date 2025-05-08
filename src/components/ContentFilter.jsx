import React from 'react';

export default function ContentFilter({ currentFilter, onFilterChange }) {
  const filters = [
    { value: 'all', label: 'All Sources' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'reddit', label: 'Reddit' },
    { value: 'linkedin', label: 'LinkedIn' }
  ];

  return (
    <div className="flex space-x-2 mt-3 overflow-x-auto pb-2">
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
            currentFilter === filter.value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}