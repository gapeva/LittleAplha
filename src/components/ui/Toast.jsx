import React, { useState, useEffect, createContext, useContext } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border border-white/20 backdrop-blur-md min-w-[300px] text-white
                ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'}`}
            >
              {toast.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
              <span className="text-sm font-bold flex-1">{toast.message}</span>
              <button onClick={() => removeToast(toast.id)}><X size={16} /></button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
