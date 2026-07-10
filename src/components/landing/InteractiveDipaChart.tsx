"use client";

import { useState } from "react";
import { DipaFacultyRow } from "@/types/landing";

interface InteractiveDipaChartProps {
  data: {
    year: number;
    title: string;
    rows: DipaFacultyRow[];
  };
}

export function InteractiveDipaChart({ data }: InteractiveDipaChartProps) {
  // Hanya ambil fakultas yang memiliki data usulan
  const faculties = data.rows.filter(r => r.total > 0);
  const [activeFacultyNo, setActiveFacultyNo] = useState<number>(faculties[1]?.no || faculties[0]?.no || 1);

  const activeData = faculties.find(f => f.no === activeFacultyNo) || faculties[0];

  const total = activeData.penelitian + activeData.pkm;
  const ratioPenelitian = total > 0 ? Math.round((activeData.penelitian / total) * 100) : 0;
  const ratioPkm = total > 0 ? Math.round((activeData.pkm / total) * 100) : 0;

  // Format nama fakultas agar lebih singkat untuk tab (contoh: "Fakultas Teknik" -> "Teknik")
  const getShortName = (name: string) => {
    return name.replace("Fakultas ", "").replace(/ \(.+\)/, "");
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-neutral-100 overflow-hidden p-6 md:p-10 max-w-7xl mx-auto">
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-end gap-1.5 h-8 shrink-0">
            {/* Custom Blue Bar Chart Icon */}
            <div className="w-1.5 h-3 bg-blue-400 rounded-sm"></div>
            <div className="w-1.5 h-5 bg-blue-500 rounded-sm"></div>
            <div className="w-1.5 h-8 bg-blue-500 rounded-sm"></div>
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-neutral-900 whitespace-nowrap">{data.title} {data.year}</h3>
            <p className="text-sm text-neutral-500 whitespace-nowrap">Interaksi visual berdasarkan fakultas</p>
          </div>
        </div>

        {/* Faculty Pills */}
        <div className="flex bg-neutral-100 p-1.5 rounded-full overflow-x-auto hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {faculties.map((faculty) => (
            <button
              key={faculty.no}
              onClick={() => setActiveFacultyNo(faculty.no)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeFacultyNo === faculty.no
                  ? "bg-primary-600 text-white shadow-md shadow-primary-600/20"
                  : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/50"
              }`}
            >
              {getShortName(faculty.facultyName)}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Gray Box */}
        <div className="bg-[#E8E8E8] rounded-3xl p-8 relative">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-1.5 h-6 bg-primary-600 rounded-full"></div>
            <h4 className="font-bold text-neutral-900">{activeData.facultyName}</h4>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-neutral-300/60 pb-5">
              <span className="text-neutral-600 font-medium">Total Penelitian</span>
              <span className="text-4xl font-black text-neutral-900 tracking-tight">{activeData.penelitian}</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-neutral-600 font-medium">Total Pengabdian (PkM)</span>
              <span className="text-4xl font-black text-neutral-900 tracking-tight">{activeData.pkm}</span>
            </div>
          </div>
        </div>

        {/* Right Progress Bars */}
        <div className="space-y-10 px-2 lg:px-8">
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="font-extrabold text-sm tracking-wide text-neutral-900 uppercase">Rasio Penelitian</span>
              <span className="font-extrabold text-neutral-900">{ratioPenelitian}%</span>
            </div>
            <div className="h-3 w-full bg-neutral-300/60 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-600 rounded-full transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
                style={{ width: `${ratioPenelitian}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="font-extrabold text-sm tracking-wide text-neutral-900 uppercase">Rasio Pengabdian</span>
              <span className="font-extrabold text-neutral-900">{ratioPkm}%</span>
            </div>
            <div className="h-3 w-full bg-neutral-300/60 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-600 rounded-full transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
                style={{ width: `${ratioPkm}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
