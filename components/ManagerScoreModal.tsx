import React, { useEffect, useState } from 'react';
import { Achievement, ManagerScore } from '../types';
import StarIcon from './icons/StarIcon';

interface ManagerScoreModalProps {
  achievement: Achievement;
  managerEmail: string;
  onClose: () => void;
  onSave: (achievementId: number, scores: ManagerScore) => void;
}

const scoreCriteria = [
    { id: 'campaignImpact', label: 'Client or Campaign Impact', description: 'How significantly did this impact client success, leads, or KPIs?' },
    { id: 'creativity', label: 'Creativity & Innovation', description: 'Was the approach fresh, unique, or creatively executed?' },
    { id: 'ownership', label: 'Proactiveness & Ownership', description: 'Did they show initiative and solve problems independently?' },
    { id: 'teamSupport', label: 'Collaboration & Team Support', description: 'How well did they work with and support other teams (SEO, design, etc.)?' },
] as const;


const ManagerScoreModal: React.FC<ManagerScoreModalProps> = ({ achievement, managerEmail, onClose, onSave }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [scores, setScores] = useState<ManagerScore>(() => {
    const existingScore = achievement.managerScores[managerEmail];
    return existingScore || { campaignImpact: 3, creativity: 3, ownership: 3, teamSupport: 3 };
  });

  useEffect(() => {
    setIsShowing(true);
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleClose = () => {
    setIsShowing(false);
    setTimeout(onClose, 300);
  };
  
  const handleScoreChange = (criterion: keyof ManagerScore, value: number) => {
    setScores(prev => ({...prev, [criterion]: value}));
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(achievement.id, scores);
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ${isShowing ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ${isShowing ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-800">Rate Achievement</h2>
            <p className="text-sm text-slate-500 mt-1">Score "{achievement.title}" by {achievement.name}.</p>
        </div>
        <form onSubmit={handleSave}>
            <div className="p-6 space-y-6">
                {scoreCriteria.map(criterion => (
                    <div key={criterion.id}>
                        <label className="block text-sm font-medium text-slate-700">{criterion.label}</label>
                        <p className="text-xs text-slate-500 mb-2">{criterion.description}</p>
                        <div className="flex items-center space-x-2">
                           <span className="text-xs text-slate-500">Low</span>
                            {[1,2,3,4,5].map(value => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => handleScoreChange(criterion.id, value)}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition ${scores[criterion.id] >= value ? 'text-amber-400' : 'text-slate-300 hover:text-amber-300'}`}
                                >
                                    <StarIcon className="w-6 h-6"/>
                                </button>
                            ))}
                            <span className="text-xs text-slate-500">High</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 rounded-b-xl flex justify-end space-x-3">
                <button 
                    type="button" 
                    onClick={handleClose}
                    className="py-2 px-4 bg-white border border-slate-300 rounded-md text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                    Cancel
                </button>
                 <button 
                    type="submit" 
                    className="py-2 px-4 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition"
                >
                    Save Score
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ManagerScoreModal;