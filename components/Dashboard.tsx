
import React, { useRef, useState, useMemo } from 'react';
import { Achievement, User, achievementCategories, AchievementCategory } from '../types';
import { getAvatarByName } from '../App';
import AddAchievementForm from './AddAchievementForm';
import MonthlyWinners from './MonthlyWinners';
import AchievementCard from './AchievementCard';
import ChartBarIcon from './icons/ChartBarIcon';
import UserEditIcon from './icons/UserEditIcon';

interface DashboardProps {
    user: User;
    allUsers: Record<string, User>;
    totalVotesReceived: number;
    lastMonthWinners: Achievement[];
    lastMonthName: string;
    sortedActiveAchievements: Achievement[];
    votedIds: Set<number>;
    onAddAchievement: (data: any) => void;
    onUpvote: (id: number) => void;
    onSelectAchievement: (achievement: Achievement) => void;
    onOpenProfileModal: () => void;
    onRateAchievement: (achievement: Achievement) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
    user,
    allUsers,
    totalVotesReceived,
    lastMonthWinners,
    lastMonthName,
    sortedActiveAchievements,
    votedIds,
    onAddAchievement,
    onUpvote,
    onSelectAchievement,
    onOpenProfileModal,
    onRateAchievement
}) => {
    const addAchievementRef = useRef<HTMLDivElement>(null);
    const [filterCategory, setFilterCategory] = useState<AchievementCategory | 'All'>('All');

    const handleScrollToAdd = () => {
        addAchievementRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const filteredAchievements = useMemo(() => {
        if (filterCategory === 'All') {
            return sortedActiveAchievements;
        }
        return sortedActiveAchievements.filter(ach => ach.category === filterCategory);
    }, [sortedActiveAchievements, filterCategory]);

    return (
        <main className="max-w-5xl mx-auto py-8 px-4">
            {/* Welcome Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
                <div className="flex items-center">
                    <img
                        src={getAvatarByName(user.name)}
                        alt="User avatar"
                        className="w-16 h-16 rounded-full ring-2 ring-white shadow-md"
                    />
                    <div className="ml-4">
                        <h1 className="text-2xl font-bold text-slate-800">Welcome, {user.name}!</h1>
                        <p className="text-slate-500">Here's your monthly achievement overview. Role: <span className="font-semibold text-slate-600 capitalize">{user.role}</span></p>
                    </div>
                </div>
                <button
                    onClick={handleScrollToAdd}
                    className="mt-4 sm:mt-0 w-full sm:w-auto bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out shadow-sm"
                >
                    Add Achievement
                </button>
            </div>
            
            {/* Stats and Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {/* Your Stats */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center">
                    <div className="bg-green-100 p-3 rounded-full">
                        <ChartBarIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm text-slate-500 font-medium">Total Votes Received</p>
                        <p className="text-2xl font-bold text-slate-800">{totalVotesReceived}</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                     <h3 className="font-bold text-slate-800 mb-3">Quick Actions</h3>
                     <div className="flex space-x-3">
                         <button onClick={onOpenProfileModal} className="flex-1 flex items-center justify-center text-sm py-2 px-3 bg-slate-100 hover:bg-slate-200 rounded-md font-medium text-slate-700 transition">
                            <UserEditIcon className="w-4 h-4 mr-2" />
                            Edit Profile
                         </button>
                         <button onClick={handleScrollToAdd} className="flex-1 flex items-center justify-center text-sm py-2 px-3 bg-slate-100 hover:bg-slate-200 rounded-md font-medium text-slate-700 transition">
                             Add Achievement
                         </button>
                     </div>
                </div>
            </div>

            <MonthlyWinners winners={lastMonthWinners} month={lastMonthName} />

            <div ref={addAchievementRef} className="scroll-mt-20">
                <AddAchievementForm onAdd={onAddAchievement} />
            </div>

            <div className="mt-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Current Leaderboard (Last 30 Days)</h2>
                     <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value as AchievementCategory | 'All')}
                        className="bg-white border border-slate-300 rounded-md shadow-sm text-sm font-medium text-black py-2 pl-3 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="All">All Categories</option>
                        {achievementCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-4">
                    {filteredAchievements.length > 0 ? (
                        filteredAchievements.map((achievement, index) => {
                             const achievementUser = Object.values(allUsers).find(u => u.name === achievement.name);
                             return (
                                <AchievementCard
                                    key={achievement.id}
                                    rank={index + 1}
                                    achievement={achievement}
                                    isVoted={votedIds.has(achievement.id)}
                                    onUpvote={() => onUpvote(achievement.id)}
                                    onSelect={() => onSelectAchievement(achievement)}
                                    user={achievementUser || user}
                                    onRate={() => onRateAchievement(achievement)}
                                />
                            )
                        })
                    ) : (
                        <p className="text-center text-slate-500 bg-white p-6 rounded-lg">No achievements in this category for the last 30 days.</p>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
