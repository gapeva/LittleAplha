import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, PlayCircle, ArrowRight, Heart, CheckCircle2 } from 'lucide-react';

export default function Landing() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to marketing email service (e.g., Mailchimp/ConvertKit)
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-biotech-blue/10 rounded-xl flex items-center justify-center">
            <Shield className="text-biotech-blue" size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">Little Alpha</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#story" className="hidden md:block text-sm font-medium text-slate-500 hover:text-biotech-blue transition-colors">Our Story</a>
          <Link to="/login" className="text-sm font-bold text-slate-400 hover:text-biotech-blue transition-colors">
            Member Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-4xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Accepting Early Access
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
          Reclaim your seat <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-biotech-blue to-blue-600">at the table.</span>
        </h1>
        
        <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          Living with Alpha-Gal Syndrome isn't just about avoiding meat. It's about the anxiety of the unknown. 
          We are building the world's first clinical companion to turn that anxiety into data-driven confidence.
        </p>

        {/* Call to Action Area */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
          {!submitted ? (
            <form onSubmit={handleWaitlistSubmit} className="flex w-full max-w-md gap-2">
              <input 
                type="email" 
                placeholder="Enter your email address"
                required
                className="flex-1 p-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-biotech-blue focus:ring-4 focus:ring-biotech-blue/10 outline-none transition-all placeholder:text-slate-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="bg-biotech-blue hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
                Join Waitlist <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-3 bg-emerald-50 text-emerald-800 px-8 py-4 rounded-xl border border-emerald-100">
              <CheckCircle2 size={24} />
              <span className="font-bold">You're on the list. We'll be in touch.</span>
            </div>
          )}
        </div>

        {/* Video Placeholder */}
        <div className="flex items-center justify-center">
            {/* REPLACE WITH YOUR YOUTUBE LINK BELOW */}
            <a 
              href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-slate-500 hover:text-biotech-blue transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                <PlayCircle size={24} className="ml-1" />
              </div>
              <span className="font-semibold underline decoration-slate-300 underline-offset-4 group-hover:decoration-biotech-blue">Watch our mission video</span>
            </a>
        </div>
      </header>

      {/* The Story Section */}
      <section id="story" className="bg-slate-50 py-24 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-center mb-8">
            <Heart className="text-rose-500 fill-rose-500" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-900">Why we built Little Alpha</h2>
          <div className="prose prose-lg prose-slate mx-auto text-slate-600">
            <p>
              We know the feeling. The restaurant menu scan. The questions to the waiter. The hesitation before the first bite. 
              Alpha-Gal Syndrome steals something precious from us: <strong>spontaneity.</strong>
            </p>
            <p>
              Little Alpha isn't just a timer. It is a guardian in your pocket. Built by patients, for patients, backed by the latest immunology research regarding absorption rates and reaction windows.
            </p>
            <p>
              We are developing a sophisticated drug-delivery tracking system that visualizes your safety window in real-time, allowing you to focus on the conversation across the table, not the chemistry in your stomach.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Gapeva Health. All rights reserved.</p>
        <p className="mt-2">Designed for the AGS Community.</p>
      </footer>
    </div>
  );
}
