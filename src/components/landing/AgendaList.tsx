import { AgendaItem } from "@/types/landing";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar, Clock, MapPin } from "lucide-react";

export function AgendaList({ agendas }: { agendas: AgendaItem[] }) {
  if (!agendas || agendas.length === 0) {
    return (
      <div className="bg-neutral-50 rounded-xl p-8 text-center border border-dashed border-neutral-200">
        <Calendar className="w-8 h-8 text-neutral-500 mx-auto mb-3" />
        <p className="text-neutral-500">Belum ada agenda mendatang.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {agendas.map((item) => {
        const dateObj = new Date(item.date);
        const day = format(dateObj, "dd");
        const month = format(dateObj, "MMM", { locale: id });
        
        return (
          <div key={item.id} className="flex bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Date Block */}
            <div className="bg-primary-50 p-4 flex flex-col items-center justify-center min-w-[80px] border-r border-neutral-100">
              <span className="text-primary-700 font-bold text-2xl leading-none">{day}</span>
              <span className="text-primary-600 text-sm font-medium uppercase mt-1">{month}</span>
            </div>
            
            {/* Content */}
            <div className="p-4 flex-1">
              <h4 className="font-bold text-neutral-900 mb-2 leading-tight">
                {item.title}
              </h4>
              
              <div className="space-y-1.5 mt-3">
                {item.time && (
                  <div className="flex items-center text-xs text-neutral-500">
                    <Clock className="w-3.5 h-3.5 mr-2 text-neutral-500 shrink-0" />
                    <span>{item.time}</span>
                  </div>
                )}
                {item.location && (
                  <div className="flex items-start text-xs text-neutral-500">
                    <MapPin className="w-3.5 h-3.5 mr-2 text-neutral-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{item.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
