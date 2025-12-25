import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, RotateCw, Lightbulb } from 'lucide-react';

const Flashcard = ({ front, back, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-72 cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative transform-style-3d transition-all duration-500"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 backface-hidden bg-white border-2 border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:border-blue-400 transition-all group">
           <div className="absolute top-4 left-4 text-xs font-bold text-slate-400 uppercase">
             #{index + 1}
           </div>
           <div className="mb-4 bg-blue-50 p-3 rounded-full text-blue-600 group-hover:scale-110 transition-transform">
             <Zap className="w-6 h-6" />
           </div>
           <h3 className="text-xl font-bold text-slate-800 leading-snug">{front}</h3>
           <div className="absolute bottom-4 text-xs text-slate-400 flex items-center gap-1 opacity-60">
             <RotateCw className="w-3 h-3" /> Tap to reveal
           </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 backface-hidden bg-slate-900 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl border-2 border-slate-900 rotate-y-180">
           <div className="absolute top-4 left-4 text-xs font-bold text-green-400 uppercase flex items-center gap-1">
             <Lightbulb className="w-3 h-3" /> Answer
           </div>
           <p className="text-lg font-medium text-blue-50 leading-relaxed">{back}</p>
           <div className="absolute bottom-4 text-xs text-slate-500 flex items-center gap-1">
             <RotateCw className="w-3 h-3" /> Tap to flip back
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Flashcard;