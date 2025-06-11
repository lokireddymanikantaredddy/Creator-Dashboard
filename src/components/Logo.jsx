import React from 'react';

export default function Logo({ className = "h-8 w-8" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <circle cx="20" cy="20" r="20" className="fill-indigo-600" />
      
      {/* Creator Symbol - Stylized "C" */}
      <path
        d="M28 20C28 24.4183 24.4183 28 20 28C15.5817 28 12 24.4183 12 20C12 15.5817 15.5817 12 20 12"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Dashboard Elements */}
      <rect
        x="18"
        y="16"
        width="8"
        height="2"
        rx="1"
        className="fill-white"
      />
      <rect
        x="18"
        y="20"
        width="6"
        height="2"
        rx="1"
        className="fill-white"
      />
      <rect
        x="18"
        y="24"
        width="4"
        height="2"
        rx="1"
        className="fill-white"
      />
    </svg>
  );
} 