import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

export function StreakCounter({ count }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2 bg-gradient-to-br from-amber-50 to-orange-100 px-4 py-2 rounded-full border border-orange-200 shadow-sm"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Flame className="text-orange-500 fill-orange-500" size={20} />
      </motion.div>
      <div className="flex flex-col">
        <span className="text-xs font-bold text-orange-800 uppercase tracking-tighter">Streak</span>
        <span className="text-lg font-black text-orange-950 leading-none">{count} Days</span>
      </div>
    </motion.div>
  );
}
