"use client";

import { useState, useEffect } from "react";
import { useProposalDraftStore } from "@/store/proposalDraftStore";
import { Step1InfoUmum } from "@/components/pengajuan/Step1InfoUmum";
import { Step2Anggota } from "@/components/pengajuan/Step2Anggota";
import { Step3Berkas } from "@/components/pengajuan/Step3Berkas";
import { Step4Konfirmasi } from "@/components/pengajuan/Step4Konfirmasi";
import { Check, CheckCircle2 } from "lucide-react";

const STEPS = [
  "Informasi Umum",
  "Tim Pelaksana",
  "Berkas Administrasi",
  "Konfirmasi & Kirim"
];

export default function PengajuanBaruPage() {
  const { currentStep, setCurrentStep } = useProposalDraftStore();

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    fundingSource: "",
    schemeId: "",
    fieldOfStudy: "",
    managementUnit: "Fakultas Hukum",
    year: new Date().getFullYear(),
    budget: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  // Load draft or clone data on mount
  useEffect(() => {
    const cloneDataStr = localStorage.getItem("simlppm-clone");
    if (cloneDataStr) {
      try {
        const proposal = JSON.parse(cloneDataStr);
        setFormData(prev => ({
          ...prev,
          title: proposal.title || prev.title,
          type: proposal.type || prev.type,
          schemeId: proposal.schemeId || prev.schemeId,
          fieldOfStudy: proposal.fieldOfStudy || prev.fieldOfStudy,
          budget: proposal.budget || prev.budget,
        }));
      } catch (e) {
        console.error("Failed to parse cloned proposal data");
      }
      localStorage.removeItem("simlppm-clone");
    } else {
      // Load draft only if not cloning
      const draftDataStr = localStorage.getItem("simlppm-draft");
      if (draftDataStr) {
        try {
          const draft = JSON.parse(draftDataStr);
          setFormData(draft);
        } catch (e) {
          console.error("Failed to parse draft data");
        }
      }
    }
  }, []);

  // Debounced Auto-save effect
  useEffect(() => {
    setIsDraftSaved(false);
    const timeoutId = setTimeout(() => {
      localStorage.setItem("simlppm-draft", JSON.stringify(formData));
      setIsDraftSaved(true);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [formData]);

  // Constrain visual step to max 4 just in case store has higher step from old version
  const displayStep = currentStep > 4 ? 4 : currentStep;

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.title || formData.title.length < 10) {
        newErrors.title = "Judul proposal minimal 10 karakter";
        isValid = false;
      }
      if (!formData.fundingSource) {
        newErrors.fundingSource = "Pilih sumber dana";
        isValid = false;
      }
      if (!formData.schemeId) {
        newErrors.schemeId = "Pilih skim usulan";
        isValid = false;
      }
      if (!formData.budget || formData.budget <= 0) {
        newErrors.budget = "Total dana harus lebih dari 0";
        isValid = false;
      }
      if (!formData.fieldOfStudy) {
        newErrors.fieldOfStudy = "Bidang ilmu wajib diisi";
        isValid = false;
      }
    } else if (step === 3) {
      if (!selectedFile) {
        newErrors.file = "File proposal wajib diunggah";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(displayStep)) {
      setCurrentStep(displayStep + 1);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Ajukan Proposal Baru</h1>
          <p className="text-neutral-500 mt-1">Lengkapi form berikut untuk mengajukan usulan penelitian atau pengabdian.</p>
        </div>
        {isDraftSaved && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-success-50 text-success-700 rounded-full text-xs font-medium border border-success-200 mt-1 sm:mt-0">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Draf tersimpan
          </div>
        )}
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
          {displayStep === 1 && (
            <Step1InfoUmum 
              formData={formData} 
              errors={errors} 
              onChange={handleChange} 
              onNext={handleNext} 
            />
          )}
          {displayStep === 2 && <Step2Anggota />}
          {displayStep === 3 && (
            <Step3Berkas 
              selectedFile={selectedFile}
              onFileSelect={(file: File | null) => {
                setSelectedFile(file);
                if (file && errors.file) {
                  setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors.file;
                    return newErrors;
                  });
                }
              }}
              errors={errors}
              onNext={handleNext}
            />
          )}
          {displayStep === 4 && <Step4Konfirmasi formData={formData} selectedFile={selectedFile} />}
        </div>
      </div>
    </div>
  );
}
