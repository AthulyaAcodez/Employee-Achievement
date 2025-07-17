
import React, { useEffect, useState } from 'react';
import { User, BadgeType } from '../types';
import FirstSubmissionIcon from './icons/FirstSubmissionIcon';
import TopVotedIcon from './icons/TopVotedIcon';
import HundredUpvotesIcon from './icons/HundredUpvotesIcon';

interface ProfileEditModalProps {
  user: User;
  onClose: () => void;
  onSave: (newName: string) => void;
}

const badgeMap: Record<BadgeType, { icon: React.FC<{className?: string}>, title: string, description: string }> = {
    'FIRST_SUBMISSION': { icon: FirstSubmissionIcon, title: 'First Submission', description: 'Awarded for your first achievement post.' },
    'TOP_VOTED_MONTHLY': { icon: TopVotedIcon, title: 'Top Performer', description: 'Awarded for being a top 3 performer last month.' },
    'HUNDRED_UPVOTES': { icon: HundredUpvotesIcon, title: '100+ Upvotes Club', description: 'Awarded for receiving over 100 upvotes in total.' },
}


const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ user, onClose, onSave }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [name, setName] = useState(user.name);

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ${isShowing ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 ${isShowing ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-800">Your Profile & Badges</h2>
        </div>
        <form onSubmit={handleSave}>
            <div className="p-6 space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        required 
                        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition bg-white text-black"
                    />
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-1">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={user.email} 
                        disabled 
                        className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-slate-600 mb-2">Your Badges</h3>
                    <div className="space-y-3">
                        {user.badges && user.badges.length > 0 ? user.badges.map(badgeKey => {
                            const badge = badgeMap[badgeKey];
                            const BadgeIcon = badge.icon;
                            return (
                                <div key={badgeKey} className="flex items-center p-2 bg-slate-50 rounded-md">
                                    <BadgeIcon className="w-8 h-8 text-amber-500 flex-shrink-0"/>
                                    <div className="ml-3">
                                        <p className="font-semibold text-slate-700">{badge.title}</p>
                                        <p className="text-xs text-slate-500">{badge.description}</p>
                                    </div>
                                </div>
                            )
                        }) : (
                            <p className="text-sm text-slate-500 text-center bg-slate-50 p-4 rounded-md">No badges earned yet. Keep up the great work!</p>
                        )}
                    </div>
                </div>
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
                    Save Changes
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
