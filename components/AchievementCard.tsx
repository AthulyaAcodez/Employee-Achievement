import React from 'react';
import { Achievement, User, BadgeType, AchievementCategory } from '../types';
import UpvoteIcon from './icons/UpvoteIcon';
import InfoIcon from './icons/InfoIcon';
import StarIcon from './icons/StarIcon';
import FirstSubmissionIcon from './icons/FirstSubmissionIcon';
import TopVotedIcon from './icons/TopVotedIcon';
import HundredUpvotesIcon from './icons/HundredUpvotesIcon';

interface AchievementCardProps {
  rank: number;
  achievement: Achievement;
  onUpvote: () => void;
  isVoted: boolean;
  onSelect: () => void;
  user: User;
  onRate: () => void;
}

const categoryColors: Record<AchievementCategory, string> = {
    'SEO': 'bg-blue-100 text-blue-800',
    'Performance Ads': 'bg-indigo-100 text-indigo-800',
    'Content': 'bg-green-100 text-green-800',
    'Design / Editting': 'bg-purple-100 text-purple-800',
    'Social Media': 'bg-pink-100 text-pink-800',
    'Project Coordination': 'bg-sky-100 text-sky-800'
};

const badgeMap: Record<BadgeType, { icon: React.FC<{className?: string}>, title: string }> = {
    'FIRST_SUBMISSION': { icon: FirstSubmissionIcon, title: 'First Submission!' },
    'TOP_VOTED_MONTHLY': { icon: TopVotedIcon, title: 'Top Performer of the Month' },
    'HUNDRED_UPVOTES': { icon: HundredUpvotesIcon, title: '100+ Upvotes Club' },
}

const UserBadges: React.FC<{badges?: BadgeType[]}> = ({ badges }) => {
    if (!badges || badges.length === 0) return null;

    return (
        <div className="flex items-center space-x-1">
            {badges.map(badge => {
                const BadgeIcon = badgeMap[badge].icon;
                return (
                    <div key={badge} title={badgeMap[badge].title} className="tooltip-container">
                        <BadgeIcon className="w-4 h-4 text-amber-500" />
                    </div>
                )
            })}
        </div>
    )
}

const AchievementCard: React.FC<AchievementCardProps> = ({ rank, achievement, onUpvote, isVoted, onSelect, user, onRate }) => {
    
  const handleUpvoteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpvote();
  };

  const handleRateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRate();
  };

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
      }
  };
  
  const weightedScore = achievement.weightedScore ?? 0;
  const managerScore = achievement.managerScorePart ?? 0;
  
  const scoreTooltip = `Final Score: ${weightedScore.toFixed(2)}\n(Votes: ${achievement.voteScorePart?.toFixed(2)}/10 * 40%) + (Manager: ${managerScore.toFixed(2)}/10 * 60%)`;

  return (
    <div
      className="flex items-start justify-between p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200 cursor-pointer"
      onClick={onSelect}
      onKeyDown={handleCardKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${achievement.title} by ${achievement.name}`}
    >
      <div className="flex items-start flex-grow min-w-0">
        <span className="text-xl font-bold text-slate-500 mt-5 w-8 text-center flex-shrink-0">{rank}.</span>
        <img
          src={achievement.avatarUrl}
          alt={`${achievement.name}'s avatar`}
          className="w-16 h-16 rounded-lg flex-shrink-0 bg-slate-100 ml-2"
        />
        <div className="ml-4 min-w-0">
          <h3 className="text-lg font-bold text-slate-900 truncate" title={achievement.title}>{achievement.title}</h3>
          <div className="flex items-center space-x-2 mt-0.5">
            <p className="text-sm text-slate-500">by {achievement.name}</p>
            <UserBadges badges={user.badges} />
          </div>
          <p className="text-slate-600 mt-1 truncate" title={achievement.description}>{achievement.description}</p>
          <div className="flex items-center space-x-1 mt-2 text-sm text-slate-500">
             <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${categoryColors[achievement.category] || 'bg-slate-100 text-slate-800'}`}>
                {achievement.category}
             </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end ml-4 flex-shrink-0 space-y-2 w-40">
        <div className="flex items-center bg-blue-50 text-blue-800 font-bold px-3 py-1 rounded-full">
            <span>{weightedScore.toFixed(2)}</span>
            <span className="ml-1 text-xs">PTS</span>
            <div title={scoreTooltip} className="ml-1.5 cursor-help">
                <InfoIcon className="w-4 h-4 text-blue-600"/>
            </div>
        </div>
        
        <div className="w-full bg-slate-100 rounded-lg p-2 text-xs text-center space-y-1.5">
            <div className="flex justify-between items-center text-slate-600 font-medium">
                <span>Votes:</span>
                <span>{achievement.upvotes}</span>
            </div>
             <div className="flex justify-between items-center text-slate-600 font-medium">
                <span>Manager Score:</span>
                <span className="flex items-center">
                    <StarIcon className="w-3 h-3 text-amber-500 mr-0.5" />
                    {managerScore.toFixed(1)}/10
                </span>
            </div>
        </div>
        
        <div className="flex items-center space-x-2 w-full">
            {user.role === 'manager' && (
                <button
                  onClick={handleRateClick}
                  aria-label={`Rate ${achievement.title}`}
                  className="flex-1 flex items-center justify-center text-sm py-2 px-2 bg-slate-200 hover:bg-slate-300 rounded-md font-medium text-slate-700 transition"
                >
                    <StarIcon className="w-4 h-4 mr-1.5"/> Rate
                </button>
            )}
            <button
              onClick={handleUpvoteClick}
              aria-pressed={isVoted}
              aria-label={`Upvote for ${achievement.title}`}
              className={`flex-1 flex items-center justify-center text-sm py-2 px-2 rounded-md font-medium transition group ${
                isVoted 
                ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                : 'border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50 text-slate-700'
              }`}
            >
              <UpvoteIcon className={`w-4 h-4 mr-1.5 transition-colors ${isVoted ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'}`} />
              Vote
            </button>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;