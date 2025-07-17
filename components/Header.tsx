
import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  onPreviewEmail: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onPreviewEmail }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-end items-center py-3">
          <div className="flex items-center">
            <div className="text-sm text-right hidden sm:block">
              <span className="text-slate-500">Welcome, </span>
              <span className="font-bold text-slate-800">{user.name}</span>
            </div>
            <div className="ml-4 pl-4 border-l border-slate-200">
              <button
                  onClick={onPreviewEmail}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors mr-4"
                  title="Preview the monthly summary email"
                >
                  Digest
                </button>
              <button
                onClick={onLogout}
                className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
