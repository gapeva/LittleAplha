import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StatusCircle } from '../components/StatusCircle';
import { Card } from '../components/ui/Card';
import { AdherenceTimeline } from '../components/AdherenceTimeline';
import { StreakCounter } from '../components/StreakCounter';
import { LogOut, Utensils, Syringe, Loader2, Shield, Info, ChevronRight, Clock } from 'lucide-react';
import { apiClient } from '../api/client';
import { useTimer } from '../hooks/useTimer';
import { useToast } from '../components/ui/Toast';

export default function Dashboard({ onLogout }) {
  const { addToast } = useToast();
  
  const [statusState, setStatusState] = useState('IDLE');
  const [statusMessage, setStatusMessage] = useState("Loading protocol...");
  const [expiryDate, setExpiryDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [streak, setStreak] = useState(0); 
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [mealModalOpen, setMealModalOpen] = useState(false);
  const [mealInput, setMealInput] = useState('');

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

      setStatusState(statusData.status);
      setStatusMessage(statusData.message);
      setStreak(statusData.streak);
      
      if (statusData.remaining > 0) {
        const now = new Date();
        const expiry = new Date(now.getTime() + statusData.remaining * 60 * 1000);
        setExpiryDate(expiry);
      } else {
        setExpiryDate(null);
      }

      const formattedEvents = historyData.map(e => {
        const timeString = e.time.endsWith('Z') ? e.time : `${e.time}Z`;
        const dateObj = new Date(timeString);
        return {
          type: e.type,
          title: e.title,
          description: e.description,
          time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      });
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

  useEffect(() => {
    loadData();
    const interval = setInterval(() => loadData(true), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogDose = async () => {
    try {
      await apiClient('/dose', { method: 'POST' });
      addToast("Dose logged successfully!", "success");
      await loadData(true);
    } catch (e) { 
      addToast(e.message || "Failed to log dose.", "error"); 
    }
  };

  const handleLogMeal = async () => {
    if (!mealInput.trim()) return;
    
    try {
      await apiClient('/meals', { 
        method: 'POST',
        body: JSON.stringify({ food_item: mealInput, risk_level: "low" })
      });
      addToast("Meal logged.", "success");
      setMealInput('');
      setMealModalOpen(false);
      await loadData(true);
    } catch (e) {
      addToast(e.message || "Could not log meal.", "error");
    }
  };

  const statusColors = {
    PROTECTED: { bg: 'from-emerald-500 to-emerald-600', light: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
    DISSOLVING: { bg: 'from-amber-500 to-orange-500', light: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
    VULNERABLE: { bg: 'from-biotech-blue to-blue-600', light: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    IDLE: { bg: 'from-slate-400 to-slate-500', light: 'bg-slate-50', text: 'text-slate-500', border: 'border-slate-200' },
  };

  const currentColors = statusColors[statusState] || statusColors.IDLE;

  if (isInitialLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-biotech-light/30 gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-biotech-blue to-blue-600 flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </motion.div>
        <p className="font-bold text-slate-500 text-sm">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 safe-zone">
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/80 border-b border-slate-100">
        <div className="max-w-lg mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-biotech-blue to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">Little Alpha</h1>
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium -mt-0.5">Protection Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <StreakCounter count={streak} />
            <button 
              onClick={onLogout} 
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 sm:px-6 py-6 pb-32">
        {/* Status Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <StatusCircle state={statusState} remainingTime={timerDisplay} />
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3 sm:gap-4 mb-6"
        >
          <button 
            onClick={handleLogDose}
            className="group relative overflow-hidden bg-gradient-to-br from-biotech-blue to-blue-600 text-white font-bold py-4 sm:py-5 px-4 rounded-2xl shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Syringe className="w-6 h-6 sm:w-7 sm:h-7 mx-auto mb-2" />
            <span className="text-sm sm:text-base block">Log Dose</span>
          </button>
          
          <button 
            onClick={() => setMealModalOpen(true)}
            className="group relative overflow-hidden bg-white border-2 border-slate-100 text-slate-700 font-bold py-4 sm:py-5 px-4 rounded-2xl hover:border-safe hover:text-safe transition-all active:scale-[0.98]"
          >
            <Utensils className="w-6 h-6 sm:w-7 sm:h-7 mx-auto mb-2 text-safe" />
            <span className="text-sm sm:text-base block">Log Meal</span>
          </button>
        </motion.div>

        {/* Status Info Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-4 sm:p-5 rounded-2xl ${currentColors.light} ${currentColors.border} border mb-8`}
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-xl bg-gradient-to-br ${currentColors.bg}`}>
              <Info className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className={`font-bold ${currentColors.text} mb-1`}>{statusMessage}</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {statusState === 'PROTECTED' 
                  ? "Your protection window is active. Safe to consume mammalian-derived foods." 
                  : statusState === 'DISSOLVING'
                  ? "Wait for full absorption before eating mammalian products."
                  : statusState === 'VULNERABLE'
                  ? "Protection window closed. Take your next dose to restart."
                  : "Take your first dose to activate protection."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Activity Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              Recent Activity
            </h3>
          </div>
          
          {events.length === 0 ? (
            <div className="card-elevated text-center py-10">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium">No activity yet</p>
              <p className="text-slate-400 text-sm">Log your first dose to get started</p>
            </div>
          ) : (
            <AdherenceTimeline events={events} />
          )}
        </motion.div>
      </main>

      {/* Meal Modal */}
      <AnimatePresence>
        {mealModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={() => setMealModalOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-md shadow-2xl"
            >
              <h3 className="text-xl font-black text-slate-900 mb-4">Log Meal</h3>
              <input 
                type="text"
                placeholder="What are you eating?"
                className="input-field mb-4"
                value={mealInput}
                onChange={(e) => setMealInput(e.target.value)}
                autoFocus
              />
              <div className="flex gap-3">
                <button 
                  onClick={() => setMealModalOpen(false)}
                  className="flex-1 btn-secondary py-3"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleLogMeal}
                  className="flex-1 btn-primary py-3 !bg-gradient-to-r !from-safe !to-emerald-600"
                >
                  Log Meal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
