import React, { useState } from 'react';
import { Card } from '../components/ui/Card';

export default function Login({ onSuccess, onBack, onNavigateSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Invalid credentials');

      const data = await response.json();
      onSuccess(data.access_token);
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col justify-center max-w-md mx-auto">
      <button onClick={onBack} className="text-slate-400 font-bold mb-8 text-sm text-left">← BACK TO HOME</button>
      
      <h2 className="text-3xl font-black mb-2 text-slate-900">Welcome Back</h2>
      <p className="text-slate-500 mb-8">Enter your credentials to access your dashboard.</p>

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
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-slate-500 text-sm">Don't have an account?</p>
        <button onClick={onNavigateSignup} className="text-biotech-blue font-bold text-sm mt-1">
            Create Testing Account
        </button>
      </div>
    </div>
  );
}
