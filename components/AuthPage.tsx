
import React, { useState } from 'react';
import { User } from '../types';
import { getUsersFromStorage, saveUsersToStorage } from '../utils/auth';


interface AuthPageProps {
  onLoginSuccess: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isManager, setIsManager] = useState(false);

  const allowedDomains = ['acodez.co.in', 'acodez.in'];
  const validateEmail = (email: string) => {
      const domain = email.split('@')[1];
      return allowedDomains.includes(domain);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setError('');
    setIsManager(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
        setError('Invalid email domain. Please use your @acodez.co.in or @acodez.in email.');
        return;
    }
    
    const users = getUsersFromStorage();
    const user = users[email.toLowerCase()];

    // NOTE: In a real app, passwords would be hashed and compared securely.
    if (user && user.pass === password) {
        const loggedInUser: User = { name: user.name, email: email.toLowerCase(), role: user.role };
        localStorage.setItem('leaderboard_user', JSON.stringify(loggedInUser));
        onLoginSuccess(loggedInUser);
    } else {
        setError('Invalid email or password.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
        setError('Invalid email domain. Please use your @acodez.co.in or @acodez.in email.');
        return;
    }
    if(password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
    }

    const users = getUsersFromStorage();
    const lowercasedEmail = email.toLowerCase();
    
    // For demo purposes, let's make a specific user a manager by default
    const role = isManager || lowercasedEmail === 'emily.carter@acodez.co.in' ? 'manager' : 'employee';

    if (users[lowercasedEmail]) {
        setError('An account with this email already exists.');
        return;
    }

    users[lowercasedEmail] = { name, pass: password, role };
    saveUsersToStorage(users);
    
    const newUser: User = { name, email: lowercasedEmail, role };
    localStorage.setItem('leaderboard_user', JSON.stringify(newUser));
    onLoginSuccess(newUser);
  };

  return (
    <div className="min-h-full bg-slate-50 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md">
             <header className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Employee Leaderboard</h1>
                <p className="mt-1 text-md text-slate-600">
                    {isLoginView ? 'Sign in to continue' : 'Create your account'}
                </p>
            </header>
            <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200">
                <form onSubmit={isLoginView ? handleLogin : handleRegister} className="space-y-6">
                    {!isLoginView && (
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-black"/>
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-black"/>
                    </div>
                     <div>
                        <label htmlFor="password"className="block text-sm font-medium text-slate-700">Password</label>
                        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-black"/>
                    </div>
                    
                    {!isLoginView && (
                         <div className="flex items-center">
                            <input
                                id="isManager"
                                name="isManager"
                                type="checkbox"
                                checked={isManager}
                                onChange={(e) => setIsManager(e.target.checked)}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="isManager" className="ml-2 block text-sm text-gray-900">
                                Register as a Manager
                            </label>
                        </div>
                    )}

                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
                        {isLoginView ? 'Sign In' : 'Create Account'}
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <button onClick={() => { setIsLoginView(!isLoginView); resetForm(); }} className="text-sm font-medium text-blue-600 hover:text-blue-500">
                        {isLoginView ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AuthPage;
