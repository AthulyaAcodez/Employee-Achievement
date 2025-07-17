
// In a real app, this would be in a secure, encrypted database.
// For this prototype, we'll use localStorage.
type UserRecord = { name: string; pass: string; role: 'manager' | 'employee' };

export const getUsersFromStorage = (): Record<string, UserRecord> => {
    try {
        const users = localStorage.getItem('leaderboard_users');
        return users ? JSON.parse(users) : {};
    } catch {
        return {};
    }
};

export const saveUsersToStorage = (users: Record<string, UserRecord>) => {
    localStorage.setItem('leaderboard_users', JSON.stringify(users));
};