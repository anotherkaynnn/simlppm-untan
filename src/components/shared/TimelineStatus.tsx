import { CheckCircle2, Circle, Clock } from "lucide-react";
import { ProposalStatus } from "@/types";

interface TimelineStep {
  label: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
  actor?: string;
  note?: string;
}

export function TimelineStatus({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="relative border-l border-neutral-200 ml-3 md:ml-0 md:border-l-0 md:flex md:items-start md:justify-between space-y-8 md:space-y-0 w-full">
      {/* Horizontal Line for Desktop */}
      <div className="hidden md:block absolute top-4 left-0 w-full h-[2px] bg-neutral-200 -z-10"></div>
      
      {steps.map((step, index) => {
        const isCompleted = step.status === 'completed';
        const isCurrent = step.status === 'current';
        
        return (
          <div key={index} className="relative pl-8 md:pl-0 md:flex-1 md:flex md:flex-col md:items-center">
            {/* Desktop Active Line */}
            {isCompleted && (
              <div className="hidden md:block absolute top-4 left-0 w-full h-[2px] bg-primary-500 -z-10"></div>
            )}
            
            {/* Icon */}
            <div className={`
              absolute left-[-5px] md:relative md:left-auto md:mb-3
              w-10 h-10 rounded-full flex items-center justify-center bg-white border-2
              ${isCompleted ? 'border-primary-500 text-primary-500' : 
                isCurrent ? 'border-warning text-warning ring-4 ring-warning/10' : 
                'border-neutral-300 text-neutral-300'}
            `}>
              {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : 
               isCurrent ? <Clock className="w-5 h-5" /> : 
               <Circle className="w-5 h-5" />}
            </div>
            
            {/* Content */}
            <div className="md:text-center mt-1 md:mt-0 max-w-[200px]">
              <h4 className={`font-semibold text-sm ${isCurrent || isCompleted ? 'text-neutral-900' : 'text-neutral-500'}`}>
                {step.label}
              </h4>
              {step.date && <p className="text-xs text-neutral-500 mt-1">{step.date}</p>}
              {step.actor && <p className="text-xs font-medium text-neutral-700 mt-0.5">{step.actor}</p>}
              {step.note && (
                <div className="mt-2 p-2 bg-neutral-50 border border-neutral-200 rounded text-xs text-neutral-600">
                  {step.note}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
