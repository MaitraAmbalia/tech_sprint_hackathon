import React, { useState, useEffect } from 'react';
import { Plus, Trophy, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import GoalCard from '../components/Goalcard';
import CreateGoalModal from '../components/CreateGoalModal';
import { useAuth } from '../context/AuthContext';
import api from '../services/api'; // Use API

const Dashboard = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Real State
  const [myCourses, setMyCourses] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data on Load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [goalsRes, lbRes] = await Promise.all([
          api.get('/goals'),
          api.get('/users/leaderboard')
        ]);
        
        setMyCourses(goalsRes.data);
        setLeaderboard(lbRes.data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. Create Goal (Connected to Backend)
  const handleCreateGoal = async (newGoalData) => {
    // newGoalData = { url: "...", title: "..." }
    try {
        // Step A: Fetch Playlist details from YouTube (via our backend)
        const youtubeRes = await api.get(`/youtube/playlist?url=${newGoalData.url}`);
        const { videos, thumbnail, title, instructor } = youtubeRes.data;

        // Step B: Create Goal in Database
        const createRes = await api.post('/goals', {
            title: title || newGoalData.title,
            playlistUrl: newGoalData.url,
            thumbnail,
            instructor,
            videos
        });

        // Step C: Update UI
        setMyCourses([createRes.data, ...myCourses]);
    } catch (error) {
        alert("Failed to create goal. Check the URL!");
        console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar user={user} />

      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name} 👋</h1>
              <p className="text-slate-500">Ready to unlock new levels today?</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium shadow-md transition-all active:scale-95"
            >
              <Plus className="w-5 h-5" />
              New Goal
            </button>
          </div>

          <div className="grid gap-6">
            {myCourses.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 border-dashed">
                    <p className="text-slate-500">No courses yet. Start your first journey!</p>
                </div>
            ) : (
                myCourses.map((course) => (
                  <GoalCard key={course._id} course={course} />
                ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN (Real Leaderboard) */}
        <div className="space-y-6">
           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" /> Leaderboard
                </h3>
             </div>
             
             <div>
               {leaderboard.map((u, index) => (
                 <div key={u._id} className="flex items-center justify-between p-3 border-b border-slate-50 last:border-0 hover:bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-6 text-center font-bold text-sm text-slate-400">#{index + 1}</div>
                      <img src={u.avatar || `https://ui-avatars.com/api/?name=${u.name}`} alt={u.name} className="w-8 h-8 rounded-full bg-slate-200" />
                      <span className="text-sm font-semibold text-slate-700">{u.name}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                      {u.xp} XP
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </main>

      <CreateGoalModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreate={handleCreateGoal} 
      />
    </div>
  );
};

export default Dashboard;