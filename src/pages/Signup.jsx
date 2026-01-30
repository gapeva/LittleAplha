import React, { useState } from 'react';
import { apiClient } from '../api/client';

export default function Signup({ onNavigateLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiClient('/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Registration failed. Email may be taken.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-medical shadow-soft text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Account Created!</h2>
          <p className="text-slate-500 mb-6">You can now sign in to your dashboard.</p>
          <button onClick={onNavigateLogin} className="w-full bg-biotech-blue text-white font-bold py-3 rounded-medical">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex flex-col justify-center max-w-md mx-auto">
      <button onClick={onNavigateLogin} className="text-slate-400 font-bold mb-8 text-sm text-left">← BACK TO LOGIN</button>
      
      <h2 className="text-3xl font-black mb-2 text-slate-900">Create Account</h2>
      <p className="text-slate-500 mb-8">Start tracking your protection window.</p>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-medical mb-6 text-sm font-medium border border-red-100">
          {error}
        </div>
      )}

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
          className="w-full bg-biotech-blue text-white font-bold py-4 rounded-medical shadow-lg disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
