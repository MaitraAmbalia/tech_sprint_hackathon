import React, { useState } from 'react';
import { X, Link as LinkIcon, Clipboard, Youtube } from 'lucide-react';
import Button from './Button';
import { motion, AnimatePresence } from 'framer-motion'; // Smooth popup animation

const CreateGoalModal = ({ isOpen, onClose, onCreate }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Failed to read clipboard', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      setError('Please enter a valid YouTube URL');
      return;
    }
    
    setError('');
    setLoading(true);
    
    // Simulate API call for now (Wait 2 seconds then close)
    // In next steps, we will connect this to the Backend
    setTimeout(() => {
      onCreate({ url, title: 'New Generated Roadmap' }); // Pass data back to parent
      setLoading(false);
      setUrl('');
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          
          {/* Backdrop Blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-lg">Start New Learning Journey</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6 bg-blue-50 text-blue-700 p-4 rounded-xl text-sm">
                <Youtube className="w-5 h-5 flex-shrink-0" />
                <p>Paste a YouTube Playlist URL. We will generate a roadmap, quizzes, and notes automatically.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Playlist URL</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <LinkIcon className="w-4 h-4" />
                    </div>
                    <input 
                      type="text" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://youtube.com/playlist?list=..."
                      className="w-full pl-10 pr-12 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-slate-700 font-medium placeholder:text-slate-400"
                      autoFocus
                    />
                    {/* Quick Paste Button inside the input */}
                    <button 
                      type="button"
                      onClick={handlePaste}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                      title="Paste from clipboard"
                    >
                      <Clipboard className="w-4 h-4" />
                    </button>
                  </div>
                  {error && <p className="text-red-500 text-xs font-medium ml-1">{error}</p>}
                </div>

                <div className="pt-2">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full"
                    isLoading={loading}
                  >
                    Generate Roadmap
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateGoalModal;