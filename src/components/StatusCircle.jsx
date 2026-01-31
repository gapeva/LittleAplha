import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Clock, AlertCircle, Sparkles } from 'lucide-react';

export function StatusCircle({ state, remainingTime }) {
  const configs = {
    IDLE: {
      gradient: "from-slate-100 to-slate-200",
      ring: "ring-slate-200",
      iconBg: "from-slate-400 to-slate-500",
      icon: <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />,
      label: "Ready for Dose",
      sub: "Log your next dose to start protection",
      pulse: false
    },
    DISSOLVING: {
      gradient: "from-amber-50 to-orange-50",
      ring: "ring-amber-300",
      iconBg: "from-amber-400 to-orange-500",
      icon: <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />,
      label: "Absorbing...",
      sub: "Wait before eating mammalian products",
      pulse: true
    },
    PROTECTED: {
      gradient: "from-emerald-50 to-green-50",
      ring: "ring-emerald-400",
      iconBg: "from-emerald-400 to-emerald-600",
      icon: <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-white" />,
      label: "Protected",
      sub: "You're safe to eat!",
      pulse: false
    },
    VULNERABLE: {
      gradient: "from-blue-50 to-sky-50",
      ring: "ring-biotech-blue",
      iconBg: "from-biotech-blue to-blue-600",
      icon: <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />,
      label: "Window Closed",
      sub: "Take your next dose",
      pulse: false
    }
  };

  const current = configs[state] || configs.IDLE;

  return (
    <div className="flex flex-col items-center justify-center py-6 sm:py-8">
      {/* Main Status Circle */}
      <div className="relative">
        {/* Outer glow ring */}
        {state === 'PROTECTED' && (
          <motion.div 
            className="absolute inset-0 rounded-full bg-emerald-400/20"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
        
        {/* Main circle */}
        <motion.div 
          className={`relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br ${current.gradient} 
                      ring-4 ${current.ring} flex flex-col items-center justify-center shadow-xl`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {/* Inner content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={state}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center"
            >
              {/* Icon */}
              <motion.div 
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${current.iconBg} 
                            flex items-center justify-center shadow-lg mb-3`}
                animate={current.pulse ? { scale: [1, 1.05, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                {state === 'DISSOLVING' ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  >
                    {current.icon}
                  </motion.div>
                ) : (
                  current.icon
                )}
              </motion.div>
              
              {/* Timer */}
              <span className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
                {remainingTime}
              </span>
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">
                {state === 'IDLE' ? 'No Active Dose' : 'Remaining'}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Status Label */}
      <motion.div 
        className="mt-5 sm:mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center justify-center gap-2">
          {state === 'PROTECTED' && <Sparkles className="w-5 h-5 text-emerald-500" />}
          {current.label}
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mt-1">{current.sub}</p>
      </motion.div>
    </div>
  );
}
