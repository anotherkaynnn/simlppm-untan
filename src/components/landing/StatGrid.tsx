import { InstitutionalStat } from "@/types/landing";

export function StatGrid({ stats }: { stats: InstitutionalStat[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white/40 backdrop-blur-md rounded-[2rem] p-8 shadow-sm border border-white/60 text-center hover:scale-105 transition-transform duration-500">
          <div className="text-4xl md:text-5xl font-black text-primary-600 mb-3">{stat.value}</div>
          <div className="text-lg font-bold text-neutral-900 mb-1">{stat.label}</div>
          <div className="text-sm text-neutral-500 font-medium">{stat.detail}</div>
        </div>
      ))}
    </div>
  );
}
