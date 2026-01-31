import { motion } from 'framer-motion';
import { Syringe, Utensils, AlertTriangle } from 'lucide-react';

export function AdherenceTimeline({ events }) {
  const getEventConfig = (type) => {
    switch (type) {
      case 'DOSE':
        return { 
          icon: <Syringe className="w-4 h-4" />, 
          bg: 'bg-gradient-to-br from-biotech-blue to-blue-600',
          light: 'bg-blue-50',
          text: 'text-biotech-blue'
        };
      case 'MEAL':
        return { 
          icon: <Utensils className="w-4 h-4" />, 
          bg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
          light: 'bg-emerald-50',
          text: 'text-emerald-600'
        };
      case 'SYMPTOM':
        return { 
          icon: <AlertTriangle className="w-4 h-4" />, 
          bg: 'bg-gradient-to-br from-amber-500 to-orange-500',
          light: 'bg-amber-50',
          text: 'text-amber-600'
        };
      default:
        return { 
          icon: <Syringe className="w-4 h-4" />, 
          bg: 'bg-slate-400',
          light: 'bg-slate-50',
          text: 'text-slate-600'
        };
    }
  };

  return (
    <div className="space-y-3">
      {events.map((event, index) => {
        const config = getEventConfig(event.type);
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start gap-3 p-3 sm:p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Icon */}
            <div className={`${config.bg} w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0`}>
              {config.icon}
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <h4 className="font-bold text-slate-800 text-sm sm:text-base truncate">{event.title}</h4>
                <time className={`text-xs font-semibold ${config.text} shrink-0`}>{event.time}</time>
              </div>
              <p className="text-slate-500 text-xs sm:text-sm truncate">{event.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
