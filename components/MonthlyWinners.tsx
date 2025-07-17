import React from 'react';
import { Achievement } from '../types';
import TrophyIcon from './icons/TrophyIcon';
import UpvoteIcon from './icons/UpvoteIcon';

interface MonthlyWinnersProps {
  winners: Achievement[];
  month: string;
}

const rankColors = [
    'text-amber-400', // Gold
    'text-slate-400', // Silver
    'text-amber-600'  // Bronze
];

const rankBgColors = [
    'bg-amber-100', // Gold
    'bg-slate-200', // Silver
    'bg-amber-200'  // Bronze
]

const rankRingColors = [
    'ring-amber-400', // Gold
    'ring-slate-400', // Silver
    'ring-amber-600'  // Bronze
]

const WinnerCard: React.FC<{ winner: Achievement; rank: number }> = ({ winner, rank }) => (
    <div className={`relative flex flex-col items-center p-4 rounded-xl shadow-lg border-2 ${rank === 1 ? 'border-amber-400' : 'border-slate-200'}`}>
        <div className={`absolute -top-4 px-3 py-1 text-sm font-bold rounded-full shadow-md ${rankBgColors[rank - 1]} ${rankColors[rank - 1]}`}>
            {rank === 1 ? '1st' : rank === 2 ? '2nd' : '3rd'}
        </div>
        <img
            src={winner.avatarUrl}
            alt={`${winner.name}'s avatar`}
            className={`w-24 h-24 rounded-full mt-4 ring-4 ${rankRingColors[rank - 1]}`}
        />
        <h3 className="mt-3 text-lg font-bold text-slate-800 text-center">{winner.name}</h3>
        <p className="text-sm text-slate-500 text-center h-10" title={winner.title}>{winner.title}</p>
        <div className="mt-3 flex items-center space-x-1 font-bold text-slate-600">
            <UpvoteIcon className="w-4 h-4 text-slate-500"/>
            <span>{winner.upvotes}</span>
        </div>
    </div>
);


const MonthlyWinners: React.FC<MonthlyWinnersProps> = ({ winners, month }) => {
    if (winners.length === 0) {
        return null;
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-10">
            <div className="flex items-center mb-6">
                <TrophyIcon className="w-8 h-8 text-amber-500" />
                <h2 className="text-2xl font-bold text-slate-800 ml-3">Top Performers of {month}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {winners.map((winner, index) => (
                    <WinnerCard key={winner.id} winner={winner} rank={index + 1} />
                ))}
            </div>
        </div>
    );
};

export default MonthlyWinners;