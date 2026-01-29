import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic to POST to /api/login and call login(data.access_token)
    // For now, let's simulate success:
    login('mock-token');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen p-6 flex flex-col justify-center">
      <h2 className="text-3xl font-bold mb-8">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
          <input 
            type="email" 
            className="w-full p-4 rounded-medical border border-slate-200 focus:border-biotech-blue outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
          <input 
            type="password" 
            className="w-full p-4 rounded-medical border border-slate-200 focus:border-biotech-blue outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="w-full bg-biotech-blue text-white font-bold py-4 rounded-medical">
          Sign In
        </button>
      </form>
    </div>
  );
}
