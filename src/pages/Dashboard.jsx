import { useState, useEffect } from 'react';
import { StatusCircle } from '../components/StatusCircle';
import { Card } from '../components/ui/Card';
import { Flame, PlusCircle, LogOut, Utensils } from 'lucide-react';
import { apiClient } from '../api/client';

export default function Dashboard({ onLogout }) {
  const [status, setStatus] = useState({
    state: 'IDLE',
    remaining: "--:--",
    message: "Ready for Dose"
  });
  const [loading, setLoading] = useState(true);
  
  const fetchStatus = async () => {
    try {
      const data = await apiClient('/status');
      setStatus({
        state: data.status,
        message: data.message,
        remaining: data.remaining > 0 ? formatTime(data.remaining) : "--:--"
      });
    } catch (error) {
      console.error("Session expired or server down");
      if (error.message.includes("401")) onLogout();
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (minutes) => {
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  const handleLogDose = async () => {
    try {
      await apiClient('/dose', { method: 'POST' });
      fetchStatus();
    } catch (e) { alert("Failed to log dose"); }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 pb-24">
      <header className="p-6 flex justify-between items-center bg-white border-b sticky top-0 z-20">
        <h1 className="text-xl font-black text-biotech-blue tracking-tighter italic">LITTLE ALPHA</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            <Flame className="text-orange-500 fill-orange-500" size={14} />
            <span className="font-bold text-xs text-orange-900">0 Days</span>
          </div>
          <button onClick={onLogout} className="text-slate-400 hover:text-slate-600 p-1"><LogOut size={20} /></button>
        </div>
      </header>

      <main className="p-6">
        <StatusCircle state={status.state} remainingTime={status.remaining} />
        
        <div className="space-y-4 mt-8">
          <button 
            onClick={handleLogDose}
            className="w-full bg-biotech-blue text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-100 active:scale-[0.98] transition-all hover:bg-biotech-dark text-lg"
          >
            Log Immunotherapy Dose
          </button>
          
          <button className="w-full bg-white border-2 border-slate-100 text-slate-600 font-bold py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
            <Utensils size={20} className="text-safe" />
            Log Safe Meal
          </button>
        </div>

        <h3 className="mt-12 font-black text-slate-400 text-xs uppercase tracking-widest mb-4">Current Safety Protocol</h3>
        <Card className="p-5 border-l-4 border-l-biotech-blue">
          <p className="font-bold text-slate-800 mb-1">{status.message}</p>
          <p className="text-sm text-slate-500 leading-relaxed">
            {status.state === 'PROTECTED' ? "Your enzymatic barrier is active. You are safe for mammalian-derived ingredients." : "Protocol standby. Ensure 30 minutes of absorption after your next dose."}
          </p>
        </Card>
      </main>
    </div>
  );
}
