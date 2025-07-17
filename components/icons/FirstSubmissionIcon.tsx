import React from 'react';

const FirstSubmissionIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className} 
        viewBox="0 0 20 20" 
        fill="currentColor"
        aria-hidden="true"
    >
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5.5a.75.75 0 00.22.53l2.5 2.5a.75.75 0 001.06-1.06L10.75 10.44V5z" clipRule="evenodd" />
    </svg>
);

export default FirstSubmissionIcon;