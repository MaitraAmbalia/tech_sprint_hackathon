import React, { useState } from 'react';
import { Check, X, AlertCircle, Loader2, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuizModal = ({ isOpen, onClose, onPass, questions = [], loading }) => {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) score++;
    });

    // Pass if they get at least 1 question right (for easy testing)
    // Or change to: score === questions.length for hard mode
    const passed = score >= 1; 
    setResult(passed ? 'pass' : 'fail');

    if (passed) {
      setTimeout(() => {
        onPass();
        onClose();
        setResult(null);
        setAnswers({});
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="bg-blue-600 p-4 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5" />
            <h2 className="font-bold text-lg">Quick Quiz</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area (Scrollable) */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {loading ? (
            <div className="py-12 flex flex-col items-center text-center text-slate-500 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              <p>Asking AI to generate questions...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {questions.length === 0 ? (
                 <p className="text-center text-slate-500">No questions generated. Try again.</p>
              ) : (
                questions.map((q, idx) => (
                  <div key={idx} className="space-y-2">
                    <p className="font-semibold text-slate-800 text-sm leading-relaxed">
                      {idx + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {q.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setAnswers({...answers, [idx]: opt})}
                          disabled={result === 'pass'}
                          className={`p-2.5 rounded-lg text-left text-xs font-medium transition-all border ${
                            answers[idx] === opt 
                              ? 'bg-blue-50 border-blue-500 text-blue-700' 
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                          } ${
                            result === 'fail' && answers[idx] === opt && opt !== q.correctAnswer 
                              ? '!bg-red-50 !border-red-500 !text-red-600'
                              : ''
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer (Fixed) */}
        {!loading && (
          <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0">
            {result === 'fail' && (
              <div className="mb-3 p-2 bg-red-100 text-red-700 rounded text-xs flex items-center gap-2 justify-center font-bold">
                <AlertCircle className="w-4 h-4" /> Try Again!
              </div>
            )}
            {result === 'pass' && (
              <div className="mb-3 p-2 bg-green-100 text-green-700 rounded text-xs flex items-center gap-2 justify-center font-bold">
                <Check className="w-4 h-4" /> Correct! Unlocking...
              </div>
            )}
            
            <button 
              onClick={handleSubmit} 
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg"
            >
              Submit Answers
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default QuizModal;