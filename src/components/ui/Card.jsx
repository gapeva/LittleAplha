import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function Card({ className, children }) {
  return (
    <div className={twMerge(
      "bg-white border border-slate-100 rounded-medical shadow-soft p-6",
      className
    )}>
      {children}
    </div>
  );
}
