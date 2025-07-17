
import React from 'react';

const UpvoteIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 5l-7 7h14l-7-7z" />
  </svg>
);

export default UpvoteIcon;
