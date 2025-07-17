
import React from 'react';
import { Achievement } from '../types';
import BuildingIcon from './icons/BuildingIcon';
import LikeIcon from './icons/LikeIcon';
import SocialCommentIcon from './icons/SocialCommentIcon';
import ShareIcon from './icons/ShareIcon';

interface SocialPostPreviewProps {
  winner: Achievement;
  shareText: string;
}

const SocialPostPreview: React.FC<SocialPostPreviewProps> = ({ winner, shareText }) => {
  const companyName = "Acodez Inc.";

  return (
    <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-4 w-full mx-auto">
      {/* Post Header */}
      <div className="flex items-center mb-3">
        <div className="w-12 h-12 bg-slate-200 rounded-md flex items-center justify-center flex-shrink-0">
            <BuildingIcon className="w-6 h-6 text-slate-500" />
        </div>
        <div className="ml-3">
          <p className="font-bold text-slate-800">{companyName}</p>
          <p className="text-xs text-slate-500">Promoting our amazing team</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-3 text-sm text-slate-700 whitespace-pre-wrap">{shareText}</div>

      {/* Image/Card Preview */}
      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <div className="p-6 bg-slate-50/50 text-center">
          <img 
            src={winner.avatarUrl} 
            alt={winner.name} 
            className="w-24 h-24 rounded-full mx-auto ring-4 ring-white shadow-lg" 
          />
          <h3 className="mt-4 text-2xl font-bold text-slate-900">{winner.name}</h3>
          <p className="mt-1 text-slate-700 font-medium">{winner.title}</p>
          <p className="mt-4 text-xs text-amber-600 bg-amber-100 inline-block px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            Top Performer
          </p>
        </div>
        <div className="bg-slate-100 p-3 border-t border-slate-200">
            <p className="text-xs text-slate-500 font-semibold uppercase">{companyName}</p>
            <p className="text-sm text-slate-700 font-medium">Employee Achievement Spotlight</p>
        </div>
      </div>

      {/* Mock Actions */}
      <div className="mt-3 pt-2 border-t border-slate-200 flex justify-around text-sm font-semibold text-slate-500">
        <button className="flex items-center space-x-2 hover:bg-slate-100 p-2 rounded-md w-full justify-center">
            <LikeIcon className="w-5 h-5"/> <span>Like</span>
        </button>
        <button className="flex items-center space-x-2 hover:bg-slate-100 p-2 rounded-md w-full justify-center">
            <SocialCommentIcon className="w-5 h-5"/> <span>Comment</span>
        </button>
         <button className="flex items-center space-x-2 hover:bg-slate-100 p-2 rounded-md w-full justify-center">
            <ShareIcon className="w-5 h-5"/> <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default SocialPostPreview;
