export interface User {
  email: string; // Using email as a unique ID
  name: string;
  role: 'manager' | 'employee';
  badges?: BadgeType[];
}

export type BadgeType = 'FIRST_SUBMISSION' | 'TOP_VOTED_MONTHLY' | 'HUNDRED_UPVOTES';

export const achievementCategories = [
  'SEO',
  'Performance Ads',
  'Content',
  'Design / Editting',
  'Social Media',
  'Project Coordination'
] as const;

export type AchievementCategory = typeof achievementCategories[number];

export interface ManagerScore {
  campaignImpact: number;
  creativity: number;
  ownership: number;
  teamSupport: number;
}

export interface Achievement {
  id: number;
  name: string;
  avatarUrl: string;
  title: string;
  description: string;
  category: AchievementCategory;
  upvotes: number;
  date: Date;
  managerScores: Record<string, ManagerScore>; // Key is manager's email
  weightedScore?: number;
  voteScorePart?: number;
  managerScorePart?: number;
}


export type NewAchievementData = Omit<Achievement, 'id' | 'avatarUrl' | 'upvotes' | 'date' | 'name' | 'managerScores' | 'weightedScore' | 'voteScorePart' | 'managerScorePart' | 'tags'>;