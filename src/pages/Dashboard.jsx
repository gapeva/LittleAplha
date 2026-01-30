import { useState, useEffect } from 'react';
import { StatusCircle } from '../components/StatusCircle';
import { Card } from '../components/ui/Card';
import { AdherenceTimeline } from '../components/AdherenceTimeline';
import { StreakCounter } from '../components/StreakCounter';
import { LogOut, Utensils, Syringe, Loader2 } from 'lucide-react';
import { apiClient } from '../api/client';
import { useTimer } from '../hooks/useTimer';
import { useToast } from '../components/ui/Toast';

export default function Dashboard({ onLogout }) {
  const { addToast } = useToast();
  
  // Status State
  const [statusState, setStatusState] = useState('IDLE');
  const [statusMessage, setStatusMessage] = useState("Loading protocol...");
  const [expiryDate, setExpiryDate] = useState(null);
  
  // Data State
  const [events, setEvents] = useState([]);
  const [streak, setStreak] = useState(0); 
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Timer Hook
  const { minutes, seconds, isExpired } = useTimer(expiryDate);

  const timerDisplay = expiryDate 
    ? (isExpired ? "0:00" : `${minutes}:${seconds}`) 
    : "--:--";

  const loadData = async (isBackground = false) => {
    try {
      if (!isBackground) setIsInitialLoading(true);
      
      const [statusData, historyData] = await Promise.all([
        apiClient('/status'),
        apiClient('/history')
      ]);

      // 1. Update Status & Logic
      setStatusState(statusData.status);
      setStatusMessage(statusData.message);
      setStreak(statusData.streak);
      
      // 2. Calculate Expiry Date (Client Time = Now + Remaining Minutes)
      if (statusData.remaining > 0) {
        const now = new Date();
        const expiry = new Date(now.getTime() + statusData.remaining * 60 * 1000);
        setExpiryDate(expiry);
      } else {
        setExpiryDate(null);
      }

      // 3. Update Timeline
      const formattedEvents = historyData.map(e => ({
        type: e.type,
        title: e.title,
        description: e.description,
        time: new Date(e.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));
      setEvents(formattedEvents);

    } catch (error) {
      console.error("Dashboard Sync Error:", error);
      if (error.message.includes("401") || error.message.includes("Unauthorized")) {
        onLogout();
      }
    } finally {
      setIsInitialLoading(false);
    }
  };

  // Initial Load + Polling for sync
  useEffect(() => {
    loadData(); // Initial load
    const interval = setInterval(() => loadData(true), 60000); // Background poll
    return () => clearInterval(interval);
  }, []);

  const handleLogDose = async () => {
    try {
      await apiClient('/dose', { method: 'POST' });
      addToast("Dose logged successfully!", "success");
      await loadData(true); // Refresh data immediately
    } catch (e) { 
      addToast(e.message || "Failed to log dose.", "error"); 
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
      await loadData(true);
    } catch (e) {
      addToast(e.message || "Could not log meal.", "error");
    }
  };

  if (isInitialLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-400 gap-4">
        <Loader2 className="animate-spin" size={48} />
        <p className="font-bold tracking-widest text-xs uppercase">Loading Secure Data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 pb-24">
      <header className="p-6 flex justify-between items-center bg-white border-b sticky top-0 z-20">
        <h1 className="text-xl font-black text-biotech-blue tracking-tighter italic">LITTLE ALPHA</h1>
        <div className="flex items-center gap-3">
          <StreakCounter count={streak} />
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
        {events.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-sm">No activity recorded today.</div>
        ) : (
          <AdherenceTimeline events={events} />
        )}
      </main>
    </div>
  );
}
