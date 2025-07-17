
import React, { useState, useMemo, useEffect } from 'react';
import { Achievement, NewAchievementData, User, ManagerScore, BadgeType } from './types';
import Modal from './components/Modal';
import AuthPage from './components/AuthPage';
import Header from './components/Header';
import EmailPreviewModal from './components/EmailPreviewModal';
import SocialShareModal from './components/SocialShareModal';
import Dashboard from './components/Dashboard';
import ProfileEditModal from './components/ProfileEditModal';
import ManagerScoreModal from './components/ManagerScoreModal';
import { getUsersFromStorage, saveUsersToStorage } from './utils/auth';


// A pool of high-quality, professional-looking avatars from Pexels.
const avatarPool = [
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&dpr=1',
    'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&dpr=1',
    'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&dpr=1',
    'https://images.pexels.com/photos/943084/pexels-photo-943084.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&dpr=1',
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&dpr=1',
    'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=160&h=160&dpr=1',
];

// Simple hash function to get a consistent avatar for a name.
export const simpleHashCode = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

export const getAvatarByName = (name: string) => avatarPool[simpleHashCode(name) % avatarPool.length];


const initialAchievements: Achievement[] = [
  {
    id: 1,
    name: 'Emily Carter',
    avatarUrl: getAvatarByName('Emily Carter'),
    title: 'Mozart AI',
    description: 'Cursor for music production. This involved creating a novel neural network architecture that can predict musical phrases and suggest completions in real-time, integrating seamlessly with popular DAWs. The project required extensive research into music theory and machine learning.',
    category: 'Content',
    upvotes: 406,
    date: new Date(new Date().setMonth(new Date().getMonth() - 1, 15)),
    managerScores: {},
  },
  {
    id: 2,
    name: 'Ben "Joker" Miller',
    avatarUrl: getAvatarByName('Ben "Joker" Miller'),
    title: 'Jokr.bar',
    description: 'A well-timed joke to stop your visitors from bouncing. We built a sophisticated algorithm that analyzes user behavior to deliver a contextually relevant joke just as they are about to leave the site, successfully reducing bounce rate by 15% in the first month.',
    category: 'Content',
    upvotes: 294,
    date: new Date(new Date().setMonth(new Date().getMonth() - 1, 10)),
    managerScores: {},
  },
  {
    id: 3,
    name: 'Aisha Khan',
    avatarUrl: getAvatarByName('Aisha Khan'),
    title: 'Brain MAX by ClickUp',
    description: 'One AI app to rule them all: Your knowledge + Talk to Text. This feature integrates cutting-edge voice recognition and knowledge base search into the core product, allowing users to conversationally query their entire workspace.',
    category: 'Project Coordination',
    upvotes: 273,
    date: new Date(new Date().setMonth(new Date().getMonth() - 1, 20)),
    managerScores: {},
  },
  {
    id: 4,
    name: 'Leo Petrov',
    avatarUrl: getAvatarByName('Leo Petrov'),
    title: 'Project Phoenix Launch',
    description: 'Successfully deployed the new platform ahead of schedule. Migrated over 10TB of data with zero downtime and coordinated across three international teams to ensure a smooth rollout.',
    category: 'Project Coordination',
    upvotes: 255,
    date: new Date(new Date().setDate(new Date().getDate() - 5)),
    managerScores: {},
  },
  {
    id: 5,
    name: 'Emily Carter',
    avatarUrl: getAvatarByName('Emily Carter'),
    title: 'Q3 Analytics Dashboard',
    description: 'Delivered a new company-wide analytics dashboard.',
    category: 'Performance Ads',
    upvotes: 150,
    date: new Date(new Date().setDate(new Date().getDate() - 2)),
    managerScores: {},
  }
];

const calculateScores = (achievements: Achievement[]): Achievement[] => {
    const maxUpvotes = Math.max(1, ...achievements.map(a => a.upvotes));

    return achievements.map(achievement => {
        // 1. Calculate Vote Score (40% weight)
        const normalizedVoteScore = (achievement.upvotes / maxUpvotes) * 10;
        const weightedVoteScore = normalizedVoteScore * 0.4;

        // 2. Calculate Manager Score (60% weight)
        const managerScoresArray = Object.values(achievement.managerScores);
        let weightedManagerScore = 0;
        let averageManagerScoreOutOf10 = 0;

        if (managerScoresArray.length > 0) {
            const totalManagerScoreSum = managerScoresArray.reduce((sum, score) => {
                return sum + score.campaignImpact + score.creativity + score.ownership + score.teamSupport;
            }, 0);
            
            const averageManagerRawScoreOutOf20 = totalManagerScoreSum / managerScoresArray.length;
            const averageManagerScoreOutOf5 = averageManagerRawScoreOutOf20 / 4;
            
            // Normalize from 1-5 scale to 0-10 scale
            averageManagerScoreOutOf10 = ((averageManagerScoreOutOf5 - 1) / 4) * 10;
            weightedManagerScore = averageManagerScoreOutOf10 * 0.6;
        }
        
        const finalScore = weightedVoteScore + weightedManagerScore;

        return {
            ...achievement,
            weightedScore: finalScore,
            voteScorePart: normalizedVoteScore,
            managerScorePart: averageManagerScoreOutOf10
        };
    });
};

const calculateAllUserBadges = (
    users: Record<string, {name: string, role: 'manager' | 'employee'}>,
    achievements: Achievement[],
    lastMonthWinners: Achievement[]
): Record<string, BadgeType[]> => {
    const userBadges: Record<string, BadgeType[]> = {};

    const lastMonthWinnerNames = new Set(lastMonthWinners.map(w => w.name));

    for (const email in users) {
        const user = users[email];
        const badges: BadgeType[] = [];

        const userAchievements = achievements.filter(a => a.name === user.name);

        // 1. First Submission Badge
        if (userAchievements.length > 0) {
            badges.push('FIRST_SUBMISSION');
        }

        // 2. 100 Upvotes Lifetime Badge
        const totalUserVotes = userAchievements.reduce((sum, ach) => sum + ach.upvotes, 0);
        if (totalUserVotes >= 100) {
            badges.push('HUNDRED_UPVOTES');
        }

        // 3. Top Voted This Month Badge
        if (lastMonthWinnerNames.has(user.name)) {
            badges.push('TOP_VOTED_MONTHLY');
        }

        userBadges[email] = badges;
    }
    return userBadges;
};


const App: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [votedIds, setVotedIds] = useState<Set<number>>(new Set());
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<Record<string, User>>({});
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [winnerToShare, setWinnerToShare] = useState<Achievement | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [achievementToRate, setAchievementToRate] = useState<Achievement | null>(null);

  useEffect(() => {
    try {
        const savedUser = localStorage.getItem('leaderboard_user');
        if (savedUser) {
            setCurrentUser(JSON.parse(savedUser));
        }
        const storedUsers = getUsersFromStorage();
        const userMap: Record<string, User> = {};
        Object.keys(storedUsers).forEach(email => {
            userMap[email] = {
                email,
                name: storedUsers[email].name,
                role: storedUsers[email].role,
                badges: []
            };
        });
        setAllUsers(userMap);

    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('leaderboard_user');
    }
  }, []);

  const scoredAchievements = useMemo(() => calculateScores(achievements), [achievements]);

  const { activeAchievements, lastMonthWinners, lastMonthName } = useMemo(() => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const active = scoredAchievements.filter(ach => new Date(ach.date) >= thirtyDaysAgo);

    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthYear = lastMonth.getFullYear();
    const lastMonthMonth = lastMonth.getMonth();
    const nameOfLastMonth = lastMonth.toLocaleString('default', { month: 'long' });

    const winners = [...scoredAchievements]
      .filter(ach => {
        const achDate = new Date(ach.date);
        return achDate.getFullYear() === lastMonthYear && achDate.getMonth() === lastMonthMonth;
      })
      .sort((a, b) => (b.weightedScore ?? 0) - (a.weightedScore ?? 0))
      .slice(0, 3);
      
    return { activeAchievements: active, lastMonthWinners: winners, lastMonthName: nameOfLastMonth };
  }, [scoredAchievements]);
  
  useEffect(() => {
      const storedUsersData = getUsersFromStorage();
      const userBadgeMap = calculateAllUserBadges(storedUsersData, achievements, lastMonthWinners);
      
      setAllUsers(prev => {
          const newAllUsers = { ...prev };
          Object.keys(newAllUsers).forEach(email => {
              newAllUsers[email].badges = userBadgeMap[email] || [];
          });
          return newAllUsers;
      });

      if (currentUser) {
          setCurrentUser(prev => prev ? {...prev, badges: userBadgeMap[currentUser.email] || []} : null);
      }

  }, [achievements, lastMonthWinners, currentUser?.email]);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    const storedUsers = getUsersFromStorage();
    const userMap: Record<string, User> = {};
    Object.keys(storedUsers).forEach(email => {
        userMap[email] = { email, name: storedUsers[email].name, role: storedUsers[email].role, badges: [] };
    });
    setAllUsers(userMap);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('leaderboard_user');
  };
  
  const handleUpdateProfile = (newName: string) => {
      if (!currentUser || !newName.trim()) return;
      
      const oldName = currentUser.name;
      const updatedUser = { ...currentUser, name: newName };
      
      setCurrentUser(updatedUser);
      localStorage.setItem('leaderboard_user', JSON.stringify(updatedUser));

      setAchievements(prev => 
          prev.map(ach => 
              ach.name === oldName ? { ...ach, name: newName, avatarUrl: getAvatarByName(newName) } : ach
          )
      );

      const users = getUsersFromStorage();
      if (users[updatedUser.email]) {
          users[updatedUser.email].name = newName;
          saveUsersToStorage(users);
          setAllUsers(prev => ({...prev, [updatedUser.email]: {...prev[updatedUser.email], name: newName}}))
      }
      
      setIsProfileModalOpen(false);
  };

  const handleAddAchievement = (data: NewAchievementData) => {
    if (!currentUser) return;
    const newAchievement: Achievement = {
      id: Date.now(),
      name: currentUser.name,
      avatarUrl: getAvatarByName(currentUser.name),
      ...data,
      upvotes: 0,
      date: new Date(),
      managerScores: {},
    };
    setAchievements(prev => [newAchievement, ...prev]);
  };
  
  const handleSaveManagerScore = (achievementId: number, scores: ManagerScore) => {
    if (!currentUser || currentUser.role !== 'manager') return;
    setAchievements(prev => prev.map(ach => {
        if (ach.id === achievementId) {
            const newManagerScores = { ...ach.managerScores, [currentUser.email]: scores };
            return { ...ach, managerScores: newManagerScores };
        }
        return ach;
    }));
    setAchievementToRate(null);
  };

  const handleUpvote = (id: number) => {
    const newVotedIds = new Set(votedIds);
    if (newVotedIds.has(id)) {
        newVotedIds.delete(id);
        setAchievements(prev =>
            prev.map(ach => (ach.id === id ? { ...ach, upvotes: ach.upvotes - 1 } : ach))
        );
    } else {
        newVotedIds.add(id);
        setAchievements(prev =>
            prev.map(ach => (ach.id === id ? { ...ach, upvotes: ach.upvotes + 1 } : ach))
        );
    }
    setVotedIds(newVotedIds);
  };

  const totalVotesReceived = useMemo(() => {
      if (!currentUser) return 0;
      return achievements
          .filter(ach => ach.name === currentUser.name)
          .reduce((sum, ach) => sum + ach.upvotes, 0);
  }, [achievements, currentUser]);

  const sortedActiveAchievements = useMemo(() => {
    return [...activeAchievements].sort((a, b) => (b.weightedScore ?? 0) - (a.weightedScore ?? 0));
  }, [activeAchievements]);

  const handleSelectWinnerToShare = (winner: Achievement) => {
    setShowEmailPreview(false);
    setWinnerToShare(winner);
  };

  const handleCloseSocialShare = () => {
    setWinnerToShare(null);
    setShowEmailPreview(true);
  };

  const winnersForPreview = useMemo(() => {
      return lastMonthWinners.map(winner => {
          const winnerUser = Object.values(allUsers).find(u => u.name === winner.name);
          return {
              ...winner,
              badges: winnerUser?.badges || []
          }
      });
  }, [lastMonthWinners, allUsers]);

  if (!currentUser) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <Header 
        user={currentUser} 
        onLogout={handleLogout} 
        onPreviewEmail={() => setShowEmailPreview(true)}
      />
      <Dashboard
          user={currentUser}
          allUsers={allUsers}
          totalVotesReceived={totalVotesReceived}
          lastMonthWinners={lastMonthWinners}
          lastMonthName={lastMonthName}
          sortedActiveAchievements={sortedActiveAchievements}
          votedIds={votedIds}
          onAddAchievement={handleAddAchievement}
          onUpvote={handleUpvote}
          onSelectAchievement={setSelectedAchievement}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
          onRateAchievement={setAchievementToRate}
      />
      
      {selectedAchievement && (
        <Modal 
            achievement={selectedAchievement}
            onClose={() => setSelectedAchievement(null)}
        />
      )}
      {showEmailPreview && (
        <EmailPreviewModal
            winners={winnersForPreview}
            month={lastMonthName}
            onClose={() => setShowEmailPreview(false)}
            onSelectWinnerToShare={handleSelectWinnerToShare}
        />
      )}
      {winnerToShare && (
        <SocialShareModal
            winner={winnerToShare}
            onClose={handleCloseSocialShare}
        />
      )}
      {isProfileModalOpen && (
        <ProfileEditModal
            user={currentUser}
            onClose={() => setIsProfileModalOpen(false)}
            onSave={handleUpdateProfile}
        />
      )}
      {achievementToRate && currentUser?.role === 'manager' && (
        <ManagerScoreModal
            achievement={achievementToRate}
            managerEmail={currentUser.email}
            onClose={() => setAchievementToRate(null)}
            onSave={handleSaveManagerScore}
        />
      )}
       <footer className="text-center py-4 mt-auto">
        <a href="https://acodez.in" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-slate-700 transition">
          🔗 Powered by Acodez IT Solutions
        </a>
      </footer>
    </div>
  );
};

export default App;
