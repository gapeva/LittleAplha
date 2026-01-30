import { useState, useEffect } from 'react';
import { StatusCircle } from '../components/StatusCircle';
import { Card } from '../components/ui/Card';
import { Flame, PlusCircle, LogOut } from 'lucide-react';
import { apiClient } from '../api/client';

export default function Dashboard({ onLogout }) {
  const [appState, setAppState] = useState('IDLE'); // IDLE, DISSOLVING, PROTECTED, VULNERABLE
  const [remainingTime, setRemainingTime] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const fetchStatus = async () => {
    try {
      const data = await apiClient('/status');
      setAppState(data.status);
      if (data.remaining) {
        // Formating logic could go here, for now pass raw minutes
        const minutes = Math.floor(data.remaining);
        const seconds = Math.floor((data.remaining - minutes) * 60);
        setRemainingTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      } else {
        setRemainingTime("--:--");
      }
    } catch (error) {
      console.error("Failed to fetch status", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // Poll every minute to update UI
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogDose = async () => {
    try {
      setAppState('DISSOLVING'); // Optimistic update
      await apiClient('/dose', { method: 'POST' });
      fetchStatus(); // Refresh for server calculation
    } catch (error) {
      console.error("Failed to log dose");
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="p-6 flex justify-between items-center bg-white border-b">
        <h1 className="text-xl font-bold text-biotech-blue italic">Little Alpha</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-streak/20 px-3 py-1 rounded-full">
            <Flame className="text-streak fill-streak" size={16} />
            <span className="font-bold text-sm text-slate-700">0 Day Streak</span>
          </div>
          <button onClick={onLogout} className="text-slate-400 hover:text-slate-600">
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Main Status */}
      <div className="p-6">
        <StatusCircle state={appState} remainingTime={remainingTime} />
        
        <div className="grid grid-cols-1 gap-4 mt-8">
          <button 
            onClick={handleLogDose}
            className="w-full bg-biotech-blue text-white font-bold py-4 rounded-medical shadow-lg active:scale-95 transition-transform hover:bg-biotech-dark"
          >
            Log Dose
          </button>
          
          <button className="w-full bg-white border-2 border-slate-200 text-slate-600 font-bold py-4 rounded-medical flex items-center justify-center gap-2 hover:bg-slate-50">
            <PlusCircle size={20} />
            Log Meal
          </button>
        </div>

        {/* Recent Activity Mini-List */}
        <h3 className="mt-10 font-bold text-slate-700 mb-4">Recent Status</h3>
        <Card className="p-4 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-medium text-slate-800">Current State</p>
              <p className="text-xs text-slate-400">Updated just now</p>
            </div>
            <span className="text-biotech-blue text-sm font-bold">{appState}</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
