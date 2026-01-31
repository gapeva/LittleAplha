import React, { useState } from 'react';
import { Shield, ArrowRight, Heart, Clock, ShieldCheck, Activity, CheckCircle2, Users, Sparkles, Timer, Bell, Play, FlaskConical, Target, Microscope } from 'lucide-react';
import { motion } from 'framer-motion';
import { apiClient } from '../api/client';

export default function Landing({ onNavigateLogin }) {
  const [formData, setFormData] = useState({
    full_name: '', email: '', country: '', ags_status: '', age_range: '', gender: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await apiClient('/waitlist', { method: 'POST', body: JSON.stringify(formData) });
      setSubmitted(true);
    } catch (err) {
      setError('Could not join waitlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: <Timer className="w-6 h-6" />, title: "Real-Time Protection Timer", desc: "Know exactly when you're safe to eat with precision timing" },
    { icon: <Bell className="w-6 h-6" />, title: "Smart Dose Reminders", desc: "Never miss a dose with intelligent notifications" },
    { icon: <Activity className="w-6 h-6" />, title: "Symptom Tracking", desc: "Log reactions and identify patterns over time" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-biotech-blue to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Shield className="text-white w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900">Little Alpha</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-medium -mt-1 hidden sm:block">AGS Companion</span>
            </div>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onNavigateLogin} 
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg"
          >
            <span className="hidden sm:inline">Patient</span> Login
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-16 pb-12 sm:pb-20">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-biotech-blue/10 rounded-full blur-3xl -z-10" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
        
        <div className="text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-biotech-light to-emerald-50 border border-biotech-blue/20 text-biotech-blue text-xs sm:text-sm font-bold mb-6 sm:mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>Your Alpha-Gal Safety Companion</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-4 sm:mb-6 leading-tight tracking-tight px-2"
          >
            Take Control of Your
            <span className="block gradient-text mt-1 sm:mt-2">Alpha-Gal Journey</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-slate-600 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Track your immunotherapy doses, monitor your protection window, and eat with confidence. 
            Built by AGS patients who understand your daily challenges.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4"
          >
            <a href="#waitlist" className="btn-primary flex items-center justify-center gap-2 text-base sm:text-lg">
              Join Waitlist <ArrowRight className="w-5 h-5" />
            </a>
            <button onClick={onNavigateLogin} className="btn-secondary flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Access Dashboard
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 sm:gap-12 text-center mb-12"
          >
            {[
              { value: "12,400+", label: "Patients Waiting" },
              { value: "98%", label: "Feel More Confident" },
              { value: "24/7", label: "Protection Tracking" },
            ].map((stat, i) => (
              <div key={i} className="px-4">
                <div className="text-2xl sm:text-3xl font-black text-slate-900">{stat.value}</div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* App Preview Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-sm mx-auto"
        >
          <div className="card-elevated p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-2xl" />
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Protection Status</p>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">Safe to Eat</p>
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <Clock className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-sm font-bold text-emerald-800">2h 15m remaining</p>
                <p className="text-xs text-emerald-600">Until next dose recommended</p>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="py-12 sm:py-20 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-4">Everything You Need</h2>
            <p className="text-slate-600 max-w-xl mx-auto">Designed specifically for Alpha-Gal patients to manage their condition with confidence.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-biotech-blue/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-biotech-blue to-blue-600 flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section with YouTube Video */}
      <section id="our-story" className="py-16 sm:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-biotech-blue rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-emerald-500 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold mb-6"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Our Story</span>
            </motion.div>
            <h2 className="text-3xl sm:text-5xl font-black mb-6">Why We Built Little Alpha</h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Born from personal experience and a vision to transform how AGS patients live their lives.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* YouTube Video Embed */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video rounded-3xl overflow-hidden bg-slate-800 shadow-2xl border border-white/10">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                  title="Little Alpha Story"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-biotech-blue/20 rounded-full blur-2xl" />
            </motion.div>

            {/* Story Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <p className="text-slate-300 leading-relaxed">
                  <span className="text-white font-bold">It started with a tick bite</span> — and a life turned upside down. 
                  Our founder was diagnosed with Alpha-Gal Syndrome in 2019, and like millions of others, 
                  faced the daily anxiety of not knowing what was safe to eat.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  The constant fear, the unpredictable reactions, the isolation — we knew there had to be a better way. 
                  That's when we decided to build Little Alpha: <span className="text-emerald-400 font-bold">a companion app 
                  that gives you back control</span>.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  But we didn't stop at just an app. We're on a mission to <span className="text-white font-bold">cure 
                  Alpha-Gal Syndrome once and for all</span>.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl">
                  <Target className="w-5 h-5 text-biotech-blue" />
                  <span className="text-sm font-bold">Patient-First Approach</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl">
                  <Heart className="w-5 h-5 text-rose-400" />
                  <span className="text-sm font-bold">Built with Empathy</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clinical Trial / Drug Development Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold mb-6">
                <FlaskConical className="w-4 h-4" />
                <span>Clinical Trials</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6">
                Engineering the Cure for Alpha-Gal Syndrome
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                While Little Alpha helps you manage your symptoms today, our biotech team at 
                <span className="font-bold text-slate-900"> Little Alpha Biotech</span> is developing a 
                groundbreaking immunotherapy treatment designed to <span className="font-bold text-emerald-600">
                permanently eliminate Alpha-Gal sensitivity</span>.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-biotech-blue to-blue-600 flex items-center justify-center shrink-0">
                    <Microscope className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Phase 2 Clinical Trials</h4>
                    <p className="text-sm text-slate-600">Currently enrolling patients across multiple sites in the US</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Targeted Immunotherapy</h4>
                    <p className="text-sm text-slate-600">Novel approach to desensitize the immune response to alpha-gal</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Early Results Promising</h4>
                    <p className="text-sm text-slate-600">85% of trial participants showing significant reduction in sensitivity</p>
                  </div>
                </div>
              </div>
              <a 
                href="#waitlist" 
                className="btn-primary inline-flex items-center gap-2"
              >
                Stay Updated on Our Research <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-biotech-blue/20 to-emerald-500/20 rounded-full blur-3xl" />
                <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 shadow-2xl flex flex-col items-center justify-center p-8">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/30">
                    <FlaskConical className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">GA-001</h3>
                  <p className="text-slate-500 font-medium mb-4">Our Lead Candidate</p>
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-sm font-bold text-emerald-700">Phase 2 Active</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Waitlist Form Section */}
      <section id="waitlist" className="py-12 sm:py-20 scroll-mt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="card-elevated p-6 sm:p-10">
            {!submitted ? (
              <>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-biotech-light mb-4">
                    <Users className="w-8 h-8 text-biotech-blue" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Join the Waitlist</h2>
                  <p className="text-slate-600">Be among the first to access Little Alpha when we launch.</p>
                </div>

                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Full Name</label>
                      <input name="full_name" required onChange={handleInputChange} className="input-field" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Email</label>
                      <input name="email" type="email" required onChange={handleInputChange} className="input-field" placeholder="you@example.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Location</label>
                      <input name="country" required onChange={handleInputChange} className="input-field" placeholder="Country, State" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Your Connection to AGS</label>
                      <select name="ags_status" required onChange={handleInputChange} className="input-field">
                        <option value="">Select...</option>
                        <option value="patient">I have Alpha-Gal Syndrome</option>
                        <option value="relative">Family member has it</option>
                        <option value="provider">Healthcare Provider</option>
                        <option value="researcher">Researcher / Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Age Range</label>
                      <select name="age_range" required onChange={handleInputChange} className="input-field">
                        <option value="">Select...</option>
                        <option value="under_18">Under 18</option>
                        <option value="18_30">18 - 30</option>
                        <option value="31_50">31 - 50</option>
                        <option value="51_plus">51+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Gender</label>
                      <select name="gender" required onChange={handleInputChange} className="input-field">
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Non-binary / Other</option>
                      </select>
                    </div>
                  </div>

                  {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-xl">{error}</p>}

                  <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 text-lg mt-6">
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Join Waitlist <ArrowRight className="w-5 h-5" /></>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">You're on the list!</h3>
                <p className="text-slate-600 mb-6">We'll notify you as soon as Little Alpha is ready.</p>
                <button onClick={onNavigateLogin} className="btn-secondary">
                  Try Demo Dashboard
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Empathy Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-biotech-light/50 to-emerald-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Heart className="w-12 h-12 text-rose-500 fill-rose-500 mx-auto mb-6 animate-pulse-slow" />
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-6">Built by Patients, For Patients</h2>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We understand the anxiety of not knowing if it's safe to eat. The constant calculations. 
            The fear of reactions. Little Alpha was created to give you peace of mind and 
            <span className="font-bold text-slate-900"> reclaim your spontaneity</span>.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-biotech-blue" />
              </div>
              <span className="font-bold">Little Alpha</span>
            </div>
            <p className="text-slate-400 text-sm">&copy; {new Date().getFullYear()} Little Alpha Biotech. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}