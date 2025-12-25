import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, CheckCircle, Trophy, MoreVertical, Clock } from 'lucide-react';

const GoalCard = ({ course }) => {
  const navigate = useNavigate();

  // Handle the click to navigate correctly using _id
  const handleContinue = () => {
    navigate(`/goals/${course._id}`);
  };

  return (
    <div 
      onClick={handleContinue}
      className="group bg-white rounded-2xl border border-slate-200 p-4 flex gap-4 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100 transition-all cursor-pointer"
    >
      {/* Thumbnail Section */}
      <div className="relative w-32 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100">
        <img 
          src={course.thumbnail || "https://via.placeholder.com/150"} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="bg-white/90 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all">
            <Play className="w-4 h-4 text-blue-600 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-blue-700 transition-colors">
              {course.title}
            </h3>
            {course.progress >= 100 && (
              <Trophy className="w-4 h-4 text-yellow-500 fill-current" />
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span className="font-medium text-slate-700">{course.instructor || "Unknown Instructor"}</span>
            <span>•</span>
            <span>{course.totalVideos || 0} Lessons</span>
          </p>
        </div>

        {/* Progress Bar Section */}
        <div className="mt-3">
          <div className="flex justify-between text-xs font-semibold mb-1.5">
            <span className="text-slate-600">
              {course.progress >= 100 ? "Completed" : `${course.progress}% Complete`}
            </span>
            <span className="text-blue-600">
              {course.completedVideos}/{course.totalVideos}
            </span>
          </div>
          
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${
                course.progress >= 100 ? 'bg-green-500' : 'bg-blue-600'
              }`}
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;