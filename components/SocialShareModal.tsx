
import React, { useEffect, useState } from 'react';
import { Achievement } from '../types';
import SocialPostPreview from './SocialPostPreview';

interface SocialShareModalProps {
  winner: Achievement;
  onClose: () => void;
}

const SocialShareModal: React.FC<SocialShareModalProps> = ({ winner, onClose }) => {
    const [isShowing, setIsShowing] = useState(false);

    const initialShareText = `Congratulations to ${winner.name} for their outstanding achievement: "${winner.title}"! So proud to have them on our team. #EmployeeRecognition #AcodezLife`;
    const [shareText, setShareText] = useState(initialShareText);

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

    const shareUrl = "https://example.com/achievements/" + winner.id; // Simulated URL
    
    const socialLinks = {
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        // Instagram does not support direct web sharing with pre-filled content. This link directs the user to the platform.
        instagram: `https://www.instagram.com`, 
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    };

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-70 z-60 flex justify-center items-center p-4 transition-opacity duration-300 ${isShowing ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className={`bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[95vh] overflow-y-auto flex flex-col transform transition-all duration-300 ${isShowing ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 border-b border-slate-200">
                    <div className="flex justify-between items-start">
                        <h2 className="text-xl font-bold text-slate-800">Review & Share Post</h2>
                         <button onClick={handleClose} className="text-slate-400 hover:text-slate-600" aria-label="Close">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Preview how the achievement will look on social media and edit the content before posting.</p>
                </div>

                <div className="p-6 space-y-6 bg-slate-50 flex-grow">
                    {/* Share Card Preview */}
                    <SocialPostPreview winner={winner} shareText={shareText} />
                    
                    {/* Content Editor */}
                    <div>
                        <label htmlFor="shareText" className="block text-sm font-medium text-slate-700 mb-2">Edit Post Content</label>
                        <textarea
                            id="shareText"
                            value={shareText}
                            onChange={e => setShareText(e.target.value)}
                            rows={4}
                            className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition bg-white text-black"
                        />
                    </div>
                </div>

                <div className="p-6 border-t border-slate-200">
                    {/* Social Buttons */}
                    <p className="text-sm font-semibold text-slate-600 mb-3">Post to:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                         <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 py-2.5 px-4 rounded-md bg-sky-700 text-white font-semibold hover:bg-sky-800 transition">
                            <span>LinkedIn</span>
                        </a>
                         <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 py-2.5 px-4 rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold hover:shadow-lg transition">
                            <span>Instagram</span>
                        </a>
                         <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 py-2.5 px-4 rounded-md bg-blue-800 text-white font-semibold hover:bg-blue-900 transition">
                            <span>Facebook</span>
                        </a>
                    </div>
                     <p className="text-xs text-red-600 font-semibold text-center mt-4">NOTE: Social sharing is simulated. A backend is needed to host images and pages for real-world sharing.</p>
                </div>
            </div>
        </div>
    );
};

export default SocialShareModal;
