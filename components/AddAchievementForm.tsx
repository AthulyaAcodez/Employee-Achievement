
import React, { useState } from 'react';
import { NewAchievementData, achievementCategories, AchievementCategory } from '../types';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface AddAchievementFormProps {
    onAdd: (data: NewAchievementData) => void;
}

const AddAchievementForm: React.FC<AddAchievementFormProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<AchievementCategory>(achievementCategories[0]);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!title.trim() || !description.trim()){
            alert("Please fill out the title and description fields.");
            return;
        }

        onAdd({
            title,
            description,
            category,
        });

        // Reset form and show success message
        setTitle('');
        setDescription('');
        setCategory(achievementCategories[0]);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 4000); // Hide after 4 seconds
    };
    
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Share Your Achievement!</h2>
            
            {showSuccess && (
                <div className="flex items-center bg-green-100 text-green-800 text-sm font-semibold px-4 py-3 rounded-md mb-4 transition-opacity duration-300" role="alert">
                    <CheckCircleIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                    <span>🎉 Achievement submitted successfully! Thank you for sharing your great work.</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                    <label htmlFor="title" className="block text-sm font-medium text-slate-600 mb-1">Achievement Title</label>
                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition bg-white text-black"/>
                </div>
                 <div>
                    <label htmlFor="category" className="block text-sm font-medium text-slate-600 mb-1">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={e => setCategory(e.target.value as AchievementCategory)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition bg-white text-black"
                    >
                        {achievementCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-600 mb-1">Full Description</label>
                    <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition bg-white text-black"></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
                    Add Achievement
                </button>
            </form>
        </div>
    );
};

export default AddAchievementForm;
