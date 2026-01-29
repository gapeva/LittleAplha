import { CheckCircle2, Utensils, AlertTriangle } from 'lucide-react';

export function AdherenceTimeline({ events }) {
  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-biotech-blue before:via-safe before:to-slate-200">
      {events.map((event, index) => (
        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
          {/* Icon */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-50 shadow shrink-0 z-10">
            {event.type === 'DOSE' && <CheckCircle2 className="text-biotech-blue" size={18} />}
            {event.type === 'MEAL' && <Utensils className="text-safe" size={18} />}
            {event.type === 'SYMPTOM' && <AlertTriangle className="text-caution" size={18} />}
          </div>
          {/* Content */}
          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-medical bg-white border border-slate-100 shadow-sm ml-4">
            <div className="flex items-center justify-between space-x-2 mb-1">
              <div className="font-bold text-slate-800">{event.title}</div>
              <time className="font-medium text-xs text-biotech-blue">{event.time}</time>
            </div>
            <div className="text-slate-500 text-sm">{event.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
