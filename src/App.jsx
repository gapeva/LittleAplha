import { ShieldCheck, Flame, Clock } from 'lucide-react';
import { Card } from './components/ui/Card';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-biotech-blue">Little Alpha</h1>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
          <Flame className="text-streak fill-streak" size={20} />
          <span className="font-bold text-slate-700">12 Day Streak</span>
        </div>
      </header>

      <main className="max-w-md mx-auto space-y-6">
        {/* Status Card Preview */}
        <Card className="text-center border-t-4 border-t-safe">
          <div className="mx-auto w-16 h-16 bg-safe/10 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="text-safe" size={32} />
          </div>
          <h2 className="text-xl font-semibold text-slate-800">Safe to Eat</h2>
          <p className="text-slate-500 text-sm">Window closes in 2h 15m</p>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-biotech-blue text-white font-bold py-4 rounded-medical shadow-lg shadow-biotech-blue/20 flex flex-col items-center gap-2">
            <Clock size={20} />
            Log Dose
          </button>
          <button className="bg-white border-2 border-slate-200 text-slate-600 font-bold py-4 rounded-medical flex flex-col items-center gap-2">
            Add Meal
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
