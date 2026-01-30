import React, { useState } from 'react';
import { Shield, ArrowRight, Heart, Youtube, CheckCircle2, Users } from 'lucide-react';
import { apiClient } from '../api/client';

export default function Landing({ onNavigateLogin }) {
  // Form State
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    country: '',
    ags_status: '',
    age_range: '',
    gender: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const YOUTUBE_VIDEO_LINK = "https://www.youtube.com/"; 

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await apiClient('/waitlist', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Could not join waitlist. Please try again.');
    } finally {
      setLoading(false);
    }
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
        
        <div className="flex items-center gap-8">
          <a href={YOUTUBE_VIDEO_LINK} target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-red-600 transition-colors">
            <Youtube size={20} /> Watch Story
          </a>
          <button onClick={onNavigateLogin} className="text-sm font-bold text-slate-500 hover:text-biotech-blue transition-colors">
            Patient Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto px-6 pt-12 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-biotech-blue text-xs font-bold uppercase tracking-widest mb-10 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Clinical Companion App & Drug Waitlist
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
          Alpha-Gal took your spontaneity.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-biotech-blue to-indigo-600">We are taking it back.</span>
        </h1>
        
        <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join the movement. We are building the world's first comprehensive AGS safety companion.
        </p>

        {/* --- SUPER WAITLIST FORM --- */}
        <div className="flex flex-col items-center justify-center mb-16 w-full">
          <div className="w-full max-w-2xl bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-blue-900/5 border border-slate-100">
            {!submitted ? (
              <form onSubmit={handleWaitlistSubmit} className="space-y-4 text-left">
                <h3 className="font-black text-lg text-slate-800 mb-4">Join the Waitlist</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Full Name</label>
                    <input name="full_name" required onChange={handleInputChange} className="w-full p-3 bg-slate-50 rounded-lg border-transparent focus:bg-white focus:ring-2 focus:ring-biotech-blue/20 outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Email</label>
                    <input name="email" type="email" required onChange={handleInputChange} className="w-full p-3 bg-slate-50 rounded-lg border-transparent focus:bg-white focus:ring-2 focus:ring-biotech-blue/20 outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Country / State</label>
                    <input name="country" required onChange={handleInputChange} className="w-full p-3 bg-slate-50 rounded-lg border-transparent focus:bg-white focus:ring-2 focus:ring-biotech-blue/20 outline-none transition-all" placeholder="USA, Texas" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Your Relation to AGS</label>
                    <select name="ags_status" required onChange={handleInputChange} className="w-full p-3 bg-slate-50 rounded-lg border-transparent focus:bg-white focus:ring-2 focus:ring-biotech-blue/20 outline-none transition-all">
                      <option value="">Select Status</option>
                      <option value="patient">I have Alpha-Gal Syndrome</option>
                      <option value="relative">A family member has it</option>
                      <option value="provider">Healthcare Provider</option>
                      <option value="researcher">Researcher / Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Age Range</label>
                    <select name="age_range" required onChange={handleInputChange} className="w-full p-3 bg-slate-50 rounded-lg border-transparent focus:bg-white focus:ring-2 focus:ring-biotech-blue/20 outline-none transition-all">
                      <option value="">Select Age</option>
                      <option value="under_18">Under 18</option>
                      <option value="18_30">18 - 30</option>
                      <option value="31_50">31 - 50</option>
                      <option value="51_plus">51+</option>
                    </select>
                  </div>
                   <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Gender</label>
                    <select name="gender" required onChange={handleInputChange} className="w-full p-3 bg-slate-50 rounded-lg border-transparent focus:bg-white focus:ring-2 focus:ring-biotech-blue/20 outline-none transition-all">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Non-binary / Other</option>
                    </select>
                  </div>
                </div>

                {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

                <button type="submit" disabled={loading} className="w-full mt-4 bg-biotech-blue hover:bg-biotech-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
                  {loading ? "Joining..." : <>Join Waitlist <ArrowRight size={18} /></>}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 py-8 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100">
                <CheckCircle2 size={48} className="text-emerald-500" />
                <div className="text-center">
                  <span className="font-bold text-xl block">You're on the list!</span>
                  <span className="text-sm opacity-80">We've saved your details. Watch your inbox.</span>
                </div>
              </div>
            )}
          </div>
          <p className="text-xs text-slate-400 font-medium tracking-wide uppercase mt-4">
            <Users size={12} className="inline mr-1 mb-0.5" />
            12,400+ patients waiting
          </p>
        </div>
      </header>

      {/* Story Section */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Heart className="text-rose-500 fill-rose-500 mx-auto mb-6" size={32} />
          <h2 className="text-3xl font-black text-slate-900 mb-6">Built by Patients, For Patients.</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Little Alpha uses advanced pharmacokinetic modeling to visualize your safety window. 
            We turn anxiety into data-driven confidence.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-slate-400 text-sm bg-slate-50 border-t border-slate-200">
        <p>&copy; {new Date().getFullYear()} Gapeva Health.</p>
      </footer>
    </div>
  );
}