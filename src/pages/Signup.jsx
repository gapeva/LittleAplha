import React, { useState } from 'react';
import { Shield, ArrowLeft, Mail, Lock, UserPlus, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { apiClient } from '../api/client';
import { useToast } from '../components/ui/Toast';

export default function Signup({ onNavigateLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiClient('/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      addToast("Account created successfully!", "success");
      setTimeout(() => onNavigateLogin(), 1500);
    } catch (err) {
      addToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-6">
        <motion.button 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onNavigateLogin} 
          className="flex items-center gap-2 text-slate-500 font-semibold text-sm hover:text-biotech-blue transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 pb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md mx-auto"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl shadow-lg shadow-emerald-500/30 mb-4">
              <UserPlus className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Create Account</h1>
            <p className="text-slate-500 text-sm sm:text-base">Start your Alpha-Gal safety journey today</p>
          </div>

          {/* Form Card */}
          <div className="card-elevated p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="email" 
                    required
                    placeholder="you@example.com"
                    className="input-field pl-12"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="password" 
                    required
                    minLength={6}
                    placeholder="Min. 6 characters"
                    className="input-field pl-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-emerald-50 rounded-2xl p-4 space-y-2">
                <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3">What you'll get:</p>
                {["Real-time protection tracking", "Dose & meal logging", "Personalized insights"].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-emerald-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    {benefit}
                  </div>
                ))}
              </div>

              <button 
                disabled={loading}
                type="submit" 
                className="btn-primary w-full flex items-center justify-center gap-2 !bg-gradient-to-r !from-emerald-500 !to-emerald-600 !shadow-emerald-500/40"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Create Account
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">Already have an account?</p>
            <button 
              onClick={onNavigateLogin} 
              className="text-biotech-blue font-bold text-sm mt-1 hover:underline"
            >
              Sign In
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
