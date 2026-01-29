import { useState } from 'react';
import { StatusCircle } from '../components/StatusCircle';
import { Card } from '../components/ui/Card';
import { Flame, PlusCircle } from 'lucide-react';

export default function Dashboard() {
  // Local state for MVP; Phase 5 will connect this to the Backend API
  const [appState, setAppState] = useState('IDLE'); // IDLE, DISSOLVING, SAFE
  
  const handleLogDose = () => {
    setAppState('DISSOLVING');
    // In real app: Post to /dose and refresh status
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="p-6 flex justify-between items-center bg-white border-b">
        <h1 className="text-xl font-bold text-biotech-blue italic">Little Alpha</h1>
        <div className="flex items-center gap-1 bg-streak/20 px-3 py-1 rounded-full">
          <Flame className="text-streak fill-streak" size={16} />
          <span className="font-bold text-sm text-slate-700">5 Day Streak</span>
        </div>
      </div>

      {/* Main Status */}
      <div className="p-6">
        <StatusCircle state={appState} remainingTime={appState === 'IDLE' ? "--:--" : "28:40"} />
        
        <div className="grid grid-cols-1 gap-4 mt-8">
          <button 
            onClick={handleLogDose}
            className="w-full bg-biotech-blue text-white font-bold py-4 rounded-medical shadow-lg active:scale-95 transition-transform"
          >
            Log Dose
          </button>
          
          <button className="w-full bg-white border-2 border-slate-200 text-slate-600 font-bold py-4 rounded-medical flex items-center justify-center gap-2">
            <PlusCircle size={20} />
            Log Meal
          </button>
        </div>

        {/* Recent Activity Mini-List */}
        <h3 className="mt-10 font-bold text-slate-700 mb-4">Recent Activity</h3>
        <Card className="p-4 space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-medium text-slate-800">Dose Taken</p>
              <p className="text-xs text-slate-400">Today, 8:00 AM</p>
            </div>
            <span className="text-safe text-sm font-bold">Verified</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
