import { useState, useEffect } from 'react';
import { StatusCircle } from '../components/StatusCircle';
import { Card } from '../components/ui/Card';
import { AdherenceTimeline } from '../components/AdherenceTimeline';
import { StreakCounter } from '../components/StreakCounter'; // Assuming this exists or using simple UI
import { Flame, LogOut, Utensils, Syringe } from 'lucide-react';
import { apiClient } from '../api/client';
import { useTimer } from '../hooks/useTimer';
import { useToast } from '../components/ui/Toast';

export default function Dashboard({ onLogout }) {
  const { addToast } = useToast();
  
  // Status State
  const [statusState, setStatusState] = useState('IDLE');
  const [statusMessage, setStatusMessage] = useState("Ready for Dose");
  const [expiryDate, setExpiryDate] = useState(null);
  
  // Data State
  const [events, setEvents] = useState([]);
  const [streak, setStreak] = useState(0); 
  const [loading, setLoading] = useState(true);

  // Timer Hook
  const { minutes, seconds, isExpired } = useTimer(expiryDate);

  // Format Timer for Display
  const timerDisplay = expiryDate 
    ? (isExpired ? "0:00" : `${minutes}:${seconds}`) 
    : "--:--";

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Parallel Fetching
      const [statusData, historyData] = await Promise.all([
        apiClient('/status'),
        apiClient('/history')
      ]);

      // Handle Status & Timer
      setStatusState(statusData.status);
      setStatusMessage(statusData.message);
      
      // Calculate Expiry Date based on 'remaining' minutes from backend
      if (statusData.remaining > 0) {
        const now = new Date();
        const expiry = new Date(now.getTime() + statusData.remaining * 60 * 1000);
        setExpiryDate(expiry);
      } else {
        setExpiryDate(null);
      }

      // Handle Timeline
      const formattedEvents = historyData.map(e => ({
        type: e.type,
        title: e.title,
        description: e.description,
        time: new Date(e.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));
      setEvents(formattedEvents);

      // Simple streak calculation from history (or backend could provide this)
      // For now, let's look for DOSE events in history
      const doseCount = historyData.filter(e => e.type === 'DOSE').length;
      setStreak(doseCount);

    } catch (error) {
      console.error("Dashboard Sync Error:", error);
      if (error.message.includes("401")) {
        onLogout();
      } else {
        addToast("Failed to sync data. Retrying...", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000); // Poll every minute to sync drift
    return () => clearInterval(interval);
  }, []);

  const handleLogDose = async () => {
    try {
      await apiClient('/dose', { method: 'POST' });
      addToast("Dose logged successfully!", "success");
      loadData(); // Refresh immediately
    } catch (e) { 
      addToast("Failed to log dose.", "error"); 
    }
  };

  const handleLogMeal = async () => {
    const foodItem = prompt("What are you eating?");
    if (!foodItem) return;

    try {
      await apiClient('/meals', { 
        method: 'POST',
        body: JSON.stringify({
          food_item: foodItem,
          risk_level: "low"
        })
      });
      addToast("Meal logged.", "success");
      loadData();
    } catch (e) {
      addToast("Could not log meal.", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 pb-24">
      <header className="p-6 flex justify-between items-center bg-white border-b sticky top-0 z-20">
        <h1 className="text-xl font-black text-biotech-blue tracking-tighter italic">LITTLE ALPHA</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            <Flame className="text-orange-500 fill-orange-500" size={14} />
            <span className="font-bold text-xs text-orange-900">{streak} Doses</span>
          </div>
          <button onClick={onLogout} className="text-slate-400 hover:text-slate-600 p-1"><LogOut size={20} /></button>
        </div>
      </header>

      <main className="p-6">
        <StatusCircle state={statusState} remainingTime={timerDisplay} />
        
        <div className="space-y-4 mt-8">
          <button 
            onClick={handleLogDose}
            className="w-full bg-biotech-blue text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-100 active:scale-[0.98] transition-all hover:bg-biotech-dark text-lg flex items-center justify-center gap-2"
          >
            <Syringe size={24} className="text-white/80" />
            Log Immunotherapy Dose
          </button>
          
          <button 
            onClick={handleLogMeal}
            className="w-full bg-white border-2 border-slate-100 text-slate-600 font-bold py-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors active:scale-[0.98]"
          >
            <Utensils size={20} className="text-safe" />
            Log Safe Meal
          </button>
        </div>

        <h3 className="mt-12 font-black text-slate-400 text-xs uppercase tracking-widest mb-4">Current Safety Protocol</h3>
        <Card className="p-5 border-l-4 border-l-biotech-blue mb-8">
          <p className="font-bold text-slate-800 mb-1">{statusMessage}</p>
          <p className="text-sm text-slate-500 leading-relaxed">
            {statusState === 'PROTECTED' 
              ? "Your enzymatic barrier is active. You are safe for mammalian-derived ingredients." 
              : statusState === 'DISSOLVING'
              ? "Please wait for full absorption before consuming any mammalian products."
              : "Protocol standby. Ensure 30 minutes of absorption after your next dose."}
          </p>
        </Card>

        <h3 className="font-black text-slate-400 text-xs uppercase tracking-widest mb-4">Recent Activity</h3>
        {loading && events.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-sm">Syncing records...</div>
        ) : (
          <AdherenceTimeline events={events} />
        )}
      </main>
    </div>
  );
}
