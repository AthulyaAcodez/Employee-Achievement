
import React from 'react';

const ChartBarIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    viewBox="0 0 20 20" 
    fill="currentColor"
    aria-hidden="true"
    >
    <path d="M12 12.5a.5.5 0 01-.5-.5v-3a.5.5 0 011 0v3a.5.5 0 01-.5.5z" />
    <path d="M10.5 12.5a.5.5 0 01-.5-.5v-6a.5.5 0 011 0v6a.5.5 0 01-.5.5z" />
    <path d="M8.5 12.5a.5.5 0 01-.5-.5v-4a.5.5 0 011 0v4a.5.5 0 01-.5.5z" />
    <path d="M6.5 12.5a.5.5 0 01-.5-.5v-2a.5.5 0 011 0v2a.5.5 0 01-.5.5z" />
    <path d="M2 4a1 1 0 011-1h14a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM3 15h14V4H3v11z" />
  </svg>
);

export default ChartBarIcon;
