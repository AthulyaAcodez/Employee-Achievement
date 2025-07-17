
import React, { useEffect, useState } from 'react';
import { Achievement, BadgeType } from '../types';
import TrophyIcon from './icons/TrophyIcon';
import UpvoteIcon from './icons/UpvoteIcon';
import ShareIcon from './icons/ShareIcon';
import FirstSubmissionIcon from './icons/FirstSubmissionIcon';
import TopVotedIcon from './icons/TopVotedIcon';
import HundredUpvotesIcon from './icons/HundredUpvotesIcon';

interface WinnerWithBadges extends Achievement {
    badges: BadgeType[];
}

interface EmailPreviewModalProps {
  winners: WinnerWithBadges[];
  month: string;
  onClose: () => void;
  onSelectWinnerToShare: (winner: Achievement) => void;
}

const rankColors = [
    'text-amber-400', // Gold
    'text-slate-500', // Silver
    'text-amber-700'  // Bronze
];

const badgeMap: Record<BadgeType, { icon: React.FC<{className?: string}>, title: string }> = {
    'FIRST_SUBMISSION': { icon: FirstSubmissionIcon, title: 'First Submission!' },
    'TOP_VOTED_MONTHLY': { icon: TopVotedIcon, title: 'Top Performer of the Month' },
    'HUNDRED_UPVOTES': { icon: HundredUpvotesIcon, title: '100+ Upvotes Club' },
}

const WinnerRow: React.FC<{ winner: WinnerWithBadges; rank: number; onShare: () => void; }> = ({ winner, rank, onShare }) => (
    <div className="flex items-start space-x-4 p-4 border-b border-slate-200 last:border-b-0">
        <div className="text-3xl font-bold w-8 text-center" style={{ color: rankColors[rank - 1] }}>{rank}</div>
        <img src={winner.avatarUrl} alt={winner.name} className="w-16 h-16 rounded-full flex-shrink-0" />
        <div className="flex-grow min-w-0">
            <div className="flex items-center space-x-2">
                <h4 className="font-bold text-slate-800">{winner.name}</h4>
                {winner.badges && winner.badges.map(badge => {
                    const BadgeIcon = badgeMap[badge].icon;
                    return <div key={badge} title={badgeMap[badge].title}><BadgeIcon className="w-4 h-4 text-amber-500"/></div>
                })}
            </div>
            <p className="text-sm font-medium text-slate-600 truncate">{winner.title}</p>
            <p className="text-sm text-slate-500 mt-1 line-clamp-2">{winner.description}</p>
        </div>
        <div className="flex items-center space-x-4 flex-shrink-0">
            <div className="flex items-center space-x-1 font-bold text-slate-600">
                <UpvoteIcon className="w-4 h-4 text-blue-500"/>
                <span>{winner.upvotes}</span>
            </div>
            <button onClick={onShare} className="flex items-center space-x-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors" aria-label={`Share ${winner.name}'s achievement`}>
                <ShareIcon className="w-4 h-4"/>
                <span>Share</span>
            </button>
        </div>
    </div>
)

const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({ winners, month, onClose, onSelectWinnerToShare }) => {
  const [isShowing, setIsShowing] = useState(false);

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
    setTimeout(onClose, 300); // Wait for animation
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ${isShowing ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
      >
        <div
          className={`bg-slate-100 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col transform transition-all duration-300 ${isShowing ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-4 border-b border-slate-300 bg-slate-200 rounded-t-xl">
              <h2 className="font-semibold text-slate-700">Email Preview</h2>
              <p className="text-sm text-slate-500">This is what the monthly digest email will look like.</p>
          </div>

          <div className="overflow-y-auto p-6 bg-white">
              <header className="text-center border-b border-slate-200 pb-6">
                   <TrophyIcon className="w-12 h-12 text-amber-500 mx-auto" />
                  <h1 className="text-3xl font-bold text-slate-900 mt-2">Celebrating {month}'s Top Performers!</h1>
                  <p className="mt-2 text-slate-600">A huge thank you to everyone for their hard work and dedication.</p>
              </header>

              <div className="mt-6">
                  {winners.length > 0 ? (
                      <div className="border border-slate-200 rounded-lg overflow-hidden">
                          {winners.map((winner, index) => (
                              <WinnerRow key={winner.id} winner={winner} rank={index+1} onShare={() => onSelectWinnerToShare(winner)} />
                          ))}
                      </div>
                  ) : (
                      <p className="text-center text-slate-500 py-8">No winners were recorded for {month}.</p>
                  )}
              </div>

              <footer className="mt-8 text-center text-slate-500">
                  <p className="text-lg">Keep up the fantastic work, team!</p>
                  <p className="mt-2 text-sm">This is an automated message. The next digest will be sent at the end of next month.</p>
              </footer>
          </div>

          <div className="p-4 border-t border-slate-300 bg-slate-200 rounded-b-xl mt-auto">
              <div className="flex justify-between items-center">
                  <p className="text-xs text-red-600 font-semibold">NOTE: Email sending requires a backend server and is not implemented.</p>
                  <button
                      onClick={handleClose}
                      className="bg-slate-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-slate-700 transition"
                  >
                      Close Preview
                  </button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailPreviewModal;