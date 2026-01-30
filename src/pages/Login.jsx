import React, { useState } from 'react';
import { apiClient } from '../api/client';
import { Card } from '../components/ui/Card';

export default function Login({ onSuccess, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create form data for OAuth2 password flow
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Invalid credentials');

      const data = await response.json();
      onSuccess(data.access_token);
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col justify-center max-w-md mx-auto">
      <button onClick={onBack} className="text-slate-400 font-bold mb-8 text-sm">← BACK</button>
      
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
    </div>
  );
}
