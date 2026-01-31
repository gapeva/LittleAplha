import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

export function StreakCounter({ count }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-br from-amber-50 to-orange-100 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-orange-200/50 shadow-sm cursor-default"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.15, 1],
        }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 fill-orange-500" />
      </motion.div>
      <div className="flex items-baseline gap-1">
        <span className="text-base sm:text-lg font-black text-orange-600">{count}</span>
        <span className="text-[10px] sm:text-xs font-bold text-orange-400 uppercase">days</span>
      </div>
    </motion.div>
  );
}
