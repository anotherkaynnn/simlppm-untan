import { PanduanCard } from "@/types/landing";
import { GraduationCap, ClipboardCheck, Shield, UserCheck, UserCog } from "lucide-react";
import Link from "next/link";

const IconMap = {
  GraduationCap,
  ClipboardCheck,
  Shield,
  UserCheck,
  UserCog
};

export function PanduanGrid({ cards }: { cards: PanduanCard[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, idx) => {
        const Icon = IconMap[card.icon as keyof typeof IconMap] || GraduationCap;
        
        return (
          <div key={idx} className="bg-white rounded-[2rem] p-8 flex flex-col items-center text-center transition-all relative overflow-hidden border border-neutral-200 shadow-sm hover:shadow-lg hover:-translate-y-1">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6 mt-4 bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
              <Icon className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-neutral-900 mb-1">{card.label}</h4>
            {(card.version || card.uploadDate) && (
              <p className="mt-1 text-xs text-slate-400 mb-3">Versi {card.version} &middot; Diperbarui {card.uploadDate}</p>
            )}
            <p className="text-sm text-neutral-500 mb-8 flex-1 leading-relaxed px-2">{card.description}</p>
            <Link 
              href={card.linkUrl} 
              className="w-full py-3 rounded-full font-bold text-sm transition-all block bg-neutral-50 text-neutral-700 hover:bg-primary-600 hover:text-white border border-neutral-200 hover:border-primary-600"
            >
              {card.linkLabel}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
