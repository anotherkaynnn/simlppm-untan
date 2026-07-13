"use client";

import { useState, useEffect, useRef } from "react";
import { personDatabase, PersonRecord } from "@/mock/data/personDatabase";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface PersonSearchProps {
  onSelect: (person: PersonRecord) => void;
  excludeIds?: string[];
  placeholder?: string;
  type?: 'DOSEN' | 'MAHASISWA' | 'TENDIK';
}

export function PersonSearch({ onSelect, excludeIds = [], placeholder = "Cari NIDN / NIM / Nama...", type }: PersonSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = query.length >= 2
    ? personDatabase.filter(p => 
        !excludeIds.includes(p.id) &&
        (!type || p.type === type) &&
        (p.name.toLowerCase().includes(query.toLowerCase()) || 
         p.nidn_nim.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative">
        <Input 
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="pl-10 h-10 border-neutral-200 focus:border-primary-500 bg-white shadow-sm"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
      </div>

      {isOpen && query.length >= 2 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-48 overflow-y-auto overflow-x-hidden">
          {results.length > 0 ? (
            results.map((person) => (
              <li 
                key={person.id}
                onClick={() => {
                  onSelect(person);
                  setQuery("");
                  setIsOpen(false);
                }}
                className="px-4 py-3 hover:bg-neutral-50 cursor-pointer border-b border-neutral-100 last:border-0 transition-colors"
              >
                <p className="font-semibold text-sm text-neutral-900 truncate">{person.name}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">{person.nidn_nim}</span>
                  {person.faculty && <span className="text-[11px] text-neutral-400 truncate">{person.faculty}</span>}
                  
                  {person.isActive === false && (
                    <span className="text-[10px] font-bold text-danger-600 bg-danger-50 border border-danger-200 px-1.5 py-0.5 rounded ml-auto">
                      TIDAK AKTIF
                    </span>
                  )}
                  {person.activeProposalsCount !== undefined && person.activeProposalsCount >= 2 && (
                    <span className="text-[10px] font-bold text-warning-700 bg-warning-50 border border-warning-200 px-1.5 py-0.5 rounded ml-auto">
                      KUOTA PENUH
                    </span>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li className="px-4 py-8 text-center text-sm text-neutral-500">
              Tidak ditemukan
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
