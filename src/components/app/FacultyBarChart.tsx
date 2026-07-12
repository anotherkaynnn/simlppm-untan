"use client";

import { useState } from "react";

interface FacultyData {
  name: string;
  proposals: number;
  accepted: number;
}

export function FacultyBarChart({ data }: { data: FacultyData[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Cari nilai maksimum untuk skala persentase tinggi bar
  const maxVal = Math.max(...data.map(d => Math.max(d.proposals, d.accepted)), 1);

  return (
    <div className="flex items-end justify-around h-full w-full gap-2 relative pt-10 pb-6 px-4">
      {data.map((item, idx) => {
        const isHovered = hoveredIndex === idx;
        const isNotHovered = hoveredIndex !== null && hoveredIndex !== idx;

        const h1 = (item.proposals / maxVal) * 100;
        const h2 = (item.accepted / maxVal) * 100;

        return (
          <div 
            key={idx}
            className={`relative flex flex-col items-center flex-1 h-full justify-end cursor-pointer transition-opacity duration-300 ${isNotHovered ? 'opacity-50' : 'opacity-100'}`}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {isHovered && (
              <div className="absolute -top-8 bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-10 pointer-events-none">
                Penelitian: {item.proposals} | PKM: {item.accepted}
              </div>
            )}
            
            <div className="flex items-end justify-center w-full gap-1 h-full">
              {/* Bar 1 (Proposal Masuk) */}
              <div 
                className="bg-primary-300 w-full rounded-t-sm transition-all duration-500" 
                style={{ height: `${h1}%`, minHeight: '4px' }}
              ></div>
              {/* Bar 2 (Didanai) */}
              <div 
                className="bg-primary-600 w-full rounded-t-sm transition-all duration-500" 
                style={{ height: `${h2}%`, minHeight: '4px' }}
              ></div>
            </div>
            
            <div className="absolute -bottom-6 text-[10px] sm:text-xs text-neutral-500 font-medium truncate w-full text-center">
              {item.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
