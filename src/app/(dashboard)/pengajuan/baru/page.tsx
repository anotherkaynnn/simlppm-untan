"use client";

import { useProposalDraftStore } from "@/store/proposalDraftStore";
import { Step1InfoUmum } from "@/components/pengajuan/Step1InfoUmum";
import { Step2Anggota } from "@/components/pengajuan/Step2Anggota";
import { Step3Berkas } from "@/components/pengajuan/Step3Berkas";
import { Step4Konfirmasi } from "@/components/pengajuan/Step4Konfirmasi";
import { Check } from "lucide-react";

const STEPS = [
  "Informasi Umum",
  "Tim Pelaksana",
  "Berkas Administrasi",
  "Konfirmasi & Kirim"
];

export default function PengajuanBaruPage() {
  const { currentStep } = useProposalDraftStore();

  // Constrain visual step to max 4 just in case store has higher step from old version
  const displayStep = currentStep > 4 ? 4 : currentStep;

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Ajukan Proposal Baru</h1>
        <p className="text-neutral-500 mt-1">Lengkapi form berikut untuk mengajukan usulan penelitian atau pengabdian.</p>
      </div>

      {/* Progress Stepper (Inside Box) */}
      <div className="mb-8 p-3 md:p-4 border border-neutral-200 rounded-2xl bg-white flex items-center justify-between w-full overflow-x-auto hide-scrollbar shadow-sm">
        {STEPS.map((label, index) => {
          const stepNum = index + 1;
          const isActive = displayStep === stepNum;
          const isCompleted = displayStep > stepNum;
          const isLast = index === STEPS.length - 1;
          
          return (
            <div key={stepNum} className={`flex items-center ${isLast ? 'shrink-0' : 'flex-1'}`}>
              <div className="flex items-center gap-2 md:gap-3 shrink-0">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "border-2 border-primary-500 text-primary-700 bg-primary-50" 
                      : isCompleted
                        ? "border border-neutral-300 text-neutral-900 bg-white"
                        : "border border-neutral-200 text-neutral-400 bg-white"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 text-neutral-900" /> : stepNum}
                </div>
                <span 
                  className={`text-xs md:text-sm font-medium whitespace-nowrap hidden sm:block ${
                    isActive || isCompleted ? "text-neutral-900" : "text-neutral-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              
              {!isLast && (
                <div className={`flex-1 h-[2px] mx-3 md:mx-4 rounded-full ${isCompleted ? "bg-primary-200" : "bg-neutral-100"}`}></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Form Content Area */}
      <div className="mt-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-neutral-900">
            Langkah {displayStep}: {STEPS[displayStep - 1]}
          </h2>
        </div>
        
        <div className="min-h-[400px]">
          {displayStep === 1 && <Step1InfoUmum />}
          {displayStep === 2 && <Step2Anggota />}
          {displayStep === 3 && <Step3Berkas />}
          {displayStep === 4 && <Step4Konfirmasi />}
        </div>
      </div>
    </div>
  );
}
