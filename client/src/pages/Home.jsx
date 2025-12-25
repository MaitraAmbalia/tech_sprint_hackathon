import React from 'react';
import { Link } from 'react-router-dom';
import { Play, CheckCircle, Lock, BookOpen, BarChart3, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* --- Navigation (From your Sketch) --- */}
      {/* --- Sticky Navbar --- */}
<nav className="sticky top-0 z-50 w-full bg-slate-50/80 backdrop-blur-md border-b border-slate-200/50">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    
    {/* Logo Section */}
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
      <div className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-colors">
        <Play className="w-5 h-5 text-white fill-current" />
      </div>
      <span className="text-xl font-bold tracking-tight text-slate-800">YT Focus</span>
    </div>
    
    {/* Navigation Links */}
    <div className="flex items-center gap-6">
      <Link to="/login" className="text-slate-600 hover:text-blue-600 font-medium text-sm hidden sm:block transition-colors">
        Login
      </Link>
      <Link 
        to="/signup" 
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
      >
        Sign Up Free
      </Link>
    </div>

  </div>
</nav>

      {/* --- Hero Section --- */}
      <header className="flex flex-col items-center justify-center text-center px-4 mt-16 mb-20 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
          <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
          Distraction-Free Learning
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
          Turn YouTube Playlists into <br />
          <span className="text-blue-600">Focused Learning Journeys</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Stop getting lost in recommendations. Import a playlist, lock distractions, 
          and track your progress video by video.
        </p>

        {/* CTA Buttons from Sketch */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link 
            to="/signup" 
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1"
          >
            Start Learning Now
          </Link>
          <a 
            href="#how-it-works" 
            className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-lg px-8 py-4 rounded-xl font-semibold transition-all"
          >
            How it works
          </a>
        </div>

        {/* "Trusted by" Social Proof from Sketch */}
        <div className="mt-10 flex items-center gap-4 text-slate-500 text-sm">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold`}>
                {/* Placeholder for user avatars */}
                U{i}
              </div>
            ))}
          </div>
          <p>Trusted by students from your batch</p>
        </div>
      </header>

      {/* --- How It Works Section (Icon Grid) --- */}
      <section id="how-it-works" className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">How it Works</h2>
            <p className="text-slate-500 mt-2">Master any topic in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 text-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Link className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Paste Playlist</h3>
              <p className="text-slate-600">Copy any YouTube playlist URL and paste it here. We'll extract the curriculum.</p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Focus Mode</h3>
              <p className="text-slate-600">Watch without sidebar distractions. Next videos stay locked until you finish the current one.</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Track & Quiz</h3>
              <p className="text-slate-600">Take auto-generated quizzes and earn badges as you complete your roadmap.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Features Grid (From Image 1) --- */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Everything you need to study</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Feature Card 1 */}
          <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <Lock className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Video Locking</h3>
            <p className="text-slate-600">Prevents skipping ahead. Ensures you understand the basics before moving to advanced topics.</p>
          </div>

          {/* Feature Card 2 */}
          <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <BookOpen className="w-10 h-10 text-teal-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Auto Summaries</h3>
            <p className="text-slate-600">Get AI-generated summaries and key takeaways for every video instantly.</p>
          </div>

          {/* Feature Card 3 */}
          <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <Users className="w-10 h-10 text-indigo-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Community Stats</h3>
            <p className="text-slate-600">See how many others are learning from the same playlist and compete for badges.</p>
          </div>

          {/* Feature Card 4 */}
          <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <BarChart3 className="w-10 h-10 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">Detailed Analytics</h3>
            <p className="text-slate-600">Track your daily streaks, hours watched, and total completion rates.</p>
          </div>
        </div>
      </section>

      {/* --- Simple Footer --- */}
      <footer className="bg-white border-t border-slate-200 py-10 text-center text-slate-500 text-sm">
        <p>&copy; 2025 YT Focus. Built for focused learning.</p>
      </footer>
    </div>
  );
};

export default Home;