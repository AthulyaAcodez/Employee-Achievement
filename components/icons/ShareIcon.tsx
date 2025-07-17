import React from 'react';

const ShareIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M13 4.5a2.5 2.5 0 11.75.916l-3.5 2.042a2.5 2.5 0 010 3.084l3.5 2.042A2.5 2.5 0 1114.5 16a2.5 2.5 0 01-1.544-4.582l-3.5-2.042a2.502 2.502 0 010-1.752l3.5-2.042A2.5 2.5 0 0113 4.5z" />
  </svg>
);

export default ShareIcon;
