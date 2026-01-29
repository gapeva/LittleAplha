import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Clock, AlertCircle } from 'lucide-react';

export function StatusCircle({ state, remainingTime }) {
  // Config mapping for different states
  const configs = {
    IDLE: {
      color: "border-slate-200",
      bg: "bg-slate-50",
      icon: <Clock className="text-slate-400" size={48} />,
      label: "Ready for Dose",
      sub: "Log your next dose to start"
    },
    DISSOLVING: {
      color: "border-caution",
      bg: "bg-caution/10",
      icon: <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
              <Clock className="text-caution" size={48} />
            </motion.div>,
      label: "Wait Period",
      sub: "Dose is absorbing..."
    },
    SAFE: {
      color: "border-safe",
      bg: "bg-safe/10",
      icon: <ShieldCheck className="text-safe" size={48} />,
      label: "Safe to Eat",
      sub: "Protection Active"
    }
  };

  const current = configs[state] || configs.IDLE;

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className={`relative w-64 h-64 rounded-full border-8 ${current.color} ${current.bg} flex flex-col items-center justify-center transition-colors duration-500 shadow-inner`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={state}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center"
          >
            {current.icon}
            <span className="text-2xl font-bold mt-4 text-slate-800">{remainingTime}</span>
          </motion.div>
        </AnimatePresence>
      </div>
      <h2 className="mt-6 text-xl font-bold text-slate-800">{current.label}</h2>
      <p className="text-slate-500">{current.sub}</p>
    </div>
  );
}
