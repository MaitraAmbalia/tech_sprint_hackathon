import React from 'react';
import { CheckCircle, Lock, Play, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const RoadmapView = ({ videos, currentVideoId, onVideoSelect }) => {
  return (
    <div className="relative max-w-3xl mx-auto py-12 px-4">
      
      {/* The Central Line (The "Snake" Spine) */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2 rounded-full" />

      <div className="space-y-12">
        {videos.map((video, index) => {
          // Logic: Even numbers = Left side, Odd numbers = Right side
          const isLeft = index % 2 === 0;
          const isLocked = !video.watched && !video.isCurrent;
          const isCompleted = video.watched;
          const isActive = video._id === currentVideoId;

          return (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              key={video._id}
              className={`relative flex items-center md:justify-between ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* 1. The Content Card (Title & Info) */}
              <div className={`ml-12 md:ml-0 w-full md:w-[45%] p-4 rounded-2xl border transition-all cursor-pointer hover:scale-[1.02] ${
                isActive 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200' 
                  : isLocked 
                    ? 'bg-slate-50 border-slate-200 text-slate-400' 
                    : 'bg-white border-slate-200 text-slate-900 hover:border-blue-300'
              }`}
              onClick={() => !isLocked && onVideoSelect(video._id)}
              >
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-lg leading-tight">{index + 1}. {video.title}</h3>
                  {isCompleted && <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 flex-shrink-0" />}
                </div>
                <p className={`text-xs mt-2 font-medium ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                  {video.duration || "10 mins"} • {isLocked ? "Locked" : isCompleted ? "Completed" : "Up Next"}
                </p>
              </div>

              {/* 2. The Connector Node (Center Circle) */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow-md z-10 transition-colors duration-300"
                style={{ 
                  backgroundColor: isCompleted ? '#22c55e' : isActive ? '#2563eb' : '#cbd5e1' 
                }}
              >
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : isLocked ? (
                  <Lock className="w-4 h-4 text-slate-500" />
                ) : (
                  <Play className="w-4 h-4 text-white fill-current ml-0.5" />
                )}
              </div>

              {/* 3. Empty Space (To balance the flex layout on Desktop) */}
              <div className="hidden md:block w-[45%]" />
              
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapView;