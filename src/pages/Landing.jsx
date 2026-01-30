import React, { useState } from 'react';
// Remove 'Link' from the import since we are replacing it with a button
// import { Link } from 'react-router-dom'; 
import { Shield, ArrowRight, Heart, CheckCircle2, Youtube } from 'lucide-react';

// 1. ADD PROPS HERE: Accept onNavigateLogin
export default function Landing({ onNavigateLogin }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // PLACEHOLDER: Replace this with your actual YouTube Video Link later
  const YOUTUBE_VIDEO_LINK = "https://www.youtube.com/"; 

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    // Logic to send email to your backend or marketing service would go here
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center sticky top-0 bg-slate-50/90 backdrop-blur-sm z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-biotech-blue rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Shield className="text-white" size={24} />
          </div>
          <span className="font-black text-xl tracking-tighter text-slate-900 italic">Little Alpha</span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          {/* YouTube Video Link */}
          <a 
            href={YOUTUBE_VIDEO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-red-600 transition-colors group"
          >
            <Youtube size={20} className="group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline">Watch Our Story</span>
          </a>

          <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

          {/* 2. CHANGE THIS SECTION: Use button + onClick instead of Link */}
          <button 
            onClick={onNavigateLogin} 
            className="text-sm font-bold text-slate-500 hover:text-biotech-blue transition-colors"
          >
            Patient Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto px-6 pt-16 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-biotech-blue text-xs font-bold uppercase tracking-widest mb-10 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Clinical Companion App & Drug Waitlist
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
          Alpha-Gal took your spontaneity.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-biotech-blue to-indigo-600">We are taking it back.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
          The empty chair at the dinner table. The anxiety before every bite. The fear of the unknown. <br/>
          <span className="text-slate-800 font-semibold">We see you. We are you.</span> And we have you covered.
        </p>

        {/* Waitlist Call to Action */}
        <div className="flex flex-col items-center justify-center gap-4 mb-16">
          <div className="w-full max-w-lg bg-white p-2 rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-100">
            {!submitted ? (
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col md:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email to join the movement"
                  required
                  className="flex-1 p-4 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-biotech-blue focus:ring-2 focus:ring-biotech-blue/10 outline-none transition-all placeholder:text-slate-400 font-medium text-slate-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="bg-biotech-blue hover:bg-biotech-dark text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.98]">
                  Join Waitlist <ArrowRight size={18} />
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-3 bg-emerald-50 text-emerald-800 px-8 py-4 rounded-xl border border-emerald-100">
                <CheckCircle2 size={24} className="text-emerald-500" />
                <div className="text-left">
                  <span className="font-bold block">Welcome to the family.</span>
                  <span className="text-sm opacity-80">We'll notify you when the drug trial opens.</span>
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
            Join 12,000+ patients waiting for the cure
          </p>
        </div>
      </header>

      {/* The Story / Emotional Connection */}
      <section className="bg-white py-24 border-t border-slate-100 relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-biotech-blue to-transparent opacity-20"></div>
        
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center mb-10">
            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center border border-rose-100">
              <Heart className="text-rose-500 fill-rose-500" size={32} />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12 text-slate-900 tracking-tight">
            A Letter to the AGS Community
          </h2>
          
          <div className="prose prose-lg prose-slate mx-auto text-slate-600 leading-8 font-medium">
            <p className="first-letter:text-5xl first-letter:font-black first-letter:text-biotech-blue first-letter:float-left first-letter:mr-3">
              We know the feeling. The split-second panic when you feel an itch. The exhaustive interrogation of waitstaff about butter and cooking oil. The way your world shrinks, meal by meal, until safety feels like isolation.
            </p>
            <p>
              Alpha-Gal Syndrome doesn't just attack the body; it attacks our connection to others. It turns a family barbecue into a minefield. It turns a romantic dinner into a risk assessment.
            </p>
            <p>
              <strong className="text-biotech-blue">Little Alpha is our answer.</strong>
            </p>
            <p>
              We are building the world's first comprehensive companion for AGS. But we aren't stopping at an app. We are currently in the R&D phase for a groundbreaking therapeutic approach designed to neutralize the alpha-gal carbohydrate before it triggers a reaction.
            </p>
            <p>
              Until then, Little Alpha is your shield. It uses advanced pharmacokinetic modeling to visualize your safety window, turning anxiety into data-driven confidence.
            </p>
            <p className="text-xl font-bold text-slate-900 mt-8 italic text-center">
              "Reclaim the table. We'll watch the door."
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-slate-400 text-sm bg-slate-50 border-t border-slate-200">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
          <Shield size={16} />
          <span className="font-bold">Gapeva Health</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Gapeva Health. Designed with ❤️ for the Alpha-Gal Community.</p>
      </footer>
    </div>
  );
}
