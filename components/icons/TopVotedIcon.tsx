import React from 'react';

const TopVotedIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className} 
        viewBox="0 0 20 20" 
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M15.5 2.5a3 3 0 00-1.742-2.412A3 3 0 0010 3.433V17.25a.75.75 0 001.5 0V7.164A3 3 0 0015.5 2.5z" />
        <path d="M7.5 2.5a3 3 0 00-3 3V17.25a.75.75 0 001.5 0V5.5a3 3 0 00-3-3z" />
        <path d="M4.5 2.5a3 3 0 00-1.48.375 2.98 2.98 0 00-1.644 2.228A3.002 3.002 0 004.5 10.5V17.25a.75.75 0 001.5 0V10.5A3 3 0 004.5 2.5z" />
        <path d="M12.5 2.5a3 3 0 013 3v4.664a.75.75 0 001.5 0V5.5a3 3 0 01-3-3z" />
    </svg>
);

export default TopVotedIcon;