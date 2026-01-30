import React, { useState } from 'react';
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
      
      // Small delay to let user see success before transition
      setTimeout(() => {
        onNavigateLogin();
      }, 1500);
      
    } catch (err) {
      addToast(err.message || 'Registration failed. Email may be taken.', "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col justify-center max-w-md mx-auto">
      <button onClick={onNavigateLogin} className="text-slate-400 font-bold mb-8 text-sm text-left">← BACK TO LOGIN</button>
      
      <h2 className="text-3xl font-black mb-2 text-slate-900">Create Account</h2>
      <p className="text-slate-500 mb-8">Start tracking your protection window.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Email Address</label>
          <input 
            type="email" 
            required
            className="w-full p-4 rounded-medical border border-slate-200 focus:border-biotech-blue focus:ring-1 focus:ring-biotech-blue outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Password</label>
          <input 
            type="password" 
            required
            className="w-full p-4 rounded-medical border border-slate-200 focus:border-biotech-blue focus:ring-1 focus:ring-biotech-blue outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-biotech-blue text-white font-bold py-4 rounded-medical shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />}
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
