import React from 'react';

const SocialCommentIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className} 
        viewBox="0 0 20 20" 
        fill="currentColor"
        aria-hidden="true"
        >
        <path fillRule="evenodd" d="M10 2c-4.418 0-8 3.134-8 7 0 2.643 1.535 4.932 3.791 6.134.25.168.39.45.39.743v.683a.75.75 0 00.75.75h.586a.75.75 0 00.707-.44l.149-.298a.75.75 0 01.7-.44h2.268a.75.75 0 01.7.44l.15.298a.75.75 0 00.707.44h.586a.75.75 0 00.75-.75v-.683c0-.293.14-.575.39-.743A7.96 7.96 0 0018 9c0-3.866-3.582-7-8-7z" clipRule="evenodd" />
    </svg>
);

export default SocialCommentIcon;
