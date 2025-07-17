import React, { useEffect, useState } from 'react';
import { Achievement, AchievementCategory } from '../types';

interface ModalProps {
  achievement: Achievement;
  onClose: () => void;
}

const categoryColors: Record<AchievementCategory, string> = {
    'SEO': 'bg-blue-100 text-blue-800',
    'Performance Ads': 'bg-indigo-100 text-indigo-800',
    'Content': 'bg-green-100 text-green-800',
    'Design / Editting': 'bg-purple-100 text-purple-800',
    'Social Media': 'bg-pink-100 text-pink-800',
    'Project Coordination': 'bg-sky-100 text-sky-800'
};

const Modal: React.FC<ModalProps> = ({ achievement, onClose }) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    setIsShowing(true);
    
    // Handle Escape key
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ${isShowing ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 relative transform transition-all duration-300 ${isShowing ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
          <img
            src={achievement.avatarUrl}
            alt={`${achievement.name}'s avatar`}
            className="w-20 h-20 rounded-lg flex-shrink-0"
          />
          <div className="ml-0 sm:ml-5 mt-4 sm:mt-0">
            <h2 className="text-2xl font-extrabold text-slate-900">{achievement.title}</h2>
            <p className="text-md text-slate-600 font-medium">by {achievement.name}</p>
          </div>
        </div>

        <div className="mt-6">
            <p className="text-slate-700 text-lg leading-relaxed">{achievement.description}</p>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200">
             <span className={`px-3 py-1 text-sm font-semibold rounded-full ${categoryColors[achievement.category] || 'bg-slate-100 text-slate-800'}`}>
                {achievement.category}
             </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;