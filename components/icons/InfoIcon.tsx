import React from 'react';

const InfoIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className} 
        viewBox="0 0 20 20" 
        fill="currentColor"
        aria-hidden="true"
    >
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
);

export default InfoIcon;
