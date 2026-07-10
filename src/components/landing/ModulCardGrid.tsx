import { ModulCard } from "@/types/landing";
import { FilePlus2, Eye, FileCheck, BarChart3 } from "lucide-react";

// Helper for dynamic lucide icons
const IconMap = {
  FilePlus2,
  Eye,
  FileCheck,
  BarChart3
};

export function ModulCardGrid({ cards }: { cards: ModulCard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const IconComponent = IconMap[card.icon as keyof typeof IconMap] || FilePlus2;
        
        return (
          <div 
            key={index} 
            className="group relative bg-white/60 backdrop-blur-md border border-neutral-100 rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 hover:-translate-y-2"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6 border border-primary-100/50 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-500">
              <IconComponent className="w-5 h-5" />
            </div>
            
            <h3 className="text-xl font-bold text-neutral-900 mb-3">{card.title}</h3>
            <p className="text-neutral-600 text-sm mb-6 leading-relaxed">
              {card.description}
            </p>
            
            <ul className="space-y-3">
              {card.features.map((feature, i) => (
                <li key={i} className="flex items-start text-sm text-neutral-500 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-1.5 mr-3 shrink-0"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
