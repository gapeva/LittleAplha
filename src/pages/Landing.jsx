import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-biotech-blue/10 rounded-3xl flex items-center justify-center mb-6">
        <Shield className="text-biotech-blue" size={40} />
      </div>
      <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Little Alpha</h1>
      <p className="text-slate-500 max-w-xs mb-10 text-lg">
        Master your Alpha-Gal protection window with scientific precision.
      </p>
      <div className="w-full max-w-xs space-y-4">
        <Link to="/signup" className="block w-full bg-biotech-blue text-white font-bold py-4 rounded-medical shadow-lg">
          Get Started
        </Link>
        <Link to="/login" className="block w-full text-biotech-blue font-bold py-4">
          Sign In
        </Link>
      </div>
    </div>
  );
}
