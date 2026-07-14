/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProposalDraftStore } from "@/store/proposalDraftStore";
import { useProposalStore } from "@/store/proposalStore";
import { useAuthStore } from "@/store/authStore";
import { Step1InfoUmum } from "@/components/pengajuan/Step1InfoUmum";
import { Step2Anggota } from "@/components/pengajuan/Step2Anggota";
import { Step3Berkas } from "@/components/pengajuan/Step3Berkas";
import { Step4Konfirmasi } from "@/components/pengajuan/Step4Konfirmasi";
import { Check, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useNotificationStore } from "@/store/notificationStore";

const STEPS = [
  "Informasi Umum",
  "Tim Pelaksana",
  "Berkas Administrasi",
  "Konfirmasi & Kirim"
];

export default function PengajuanBaruPage() {
  const router = useRouter();
  const { draft, setDraft, currentStep, setCurrentStep, resetDraft } = useProposalDraftStore();
  const { addNotification } = useNotificationStore();
  const { addProposal } = useProposalStore();
  const { user } = useAuthStore();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  // We show "Draf tersimpan" briefly after a change to draft
  useEffect(() => {
    setIsDraftSaved(true);
    const timeoutId = setTimeout(() => {
      setIsDraftSaved(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [draft]);

  // Constrain visual step to max 4 just in case store has higher step from old version
  const displayStep = currentStep > 4 ? 4 : currentStep;

  const handleChange = (field: string, value: any) => {
    setDraft({ [field]: value });
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
      if (!draft.title || draft.title.length < 10) {
        newErrors.title = "Judul proposal minimal 10 karakter";
        isValid = false;
      }
      if (!draft.type) {
        newErrors.type = "Pilih jenis usulan";
        isValid = false;
      }
      if (!draft.fundingSource) {
        newErrors.fundingSource = "Pilih sumber dana";
        isValid = false;
      }
      if (!draft.schemeId) {
        newErrors.schemeId = "Pilih skim usulan";
        isValid = false;
      }
      if (!draft.budget || draft.budget <= 0) {
        newErrors.budget = "Total dana harus lebih dari 0";
        isValid = false;
      }
      if (!draft.fieldOfStudy) {
        newErrors.fieldOfStudy = "Bidang ilmu wajib diisi";
        isValid = false;
      }
    } else if (step === 3) {
      if (!selectedFile && !draft.fileName) {
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

  const handleSubmit = () => {
    if (!draft.title || draft.title.length < 10) {
      toast.error("Informasi umum belum lengkap!");
      return;
    }
    if (!selectedFile && !draft.fileName) {
      toast.error("File proposal wajib diunggah!");
      return;
    }
    
    // Create new proposal to show in monitoring
    const newProposal = {
      id: `PRP-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      title: draft.title,
      type: (draft.type || "PENELITIAN") as any,
      schemeId: draft.schemeId || "S-01",
      schemeName: "Skim Terpilih", 
      fieldOfStudy: draft.fieldOfStudy || "Umum",
      year: draft.year || new Date().getFullYear(),
      duration: 12, 
      budget: draft.budget || 0,
      status: "DIAJUKAN" as any,
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      bidangIlmu: "Saintek" as any,
      facultyId: user?.facultyId || "FT",
      facultyName: user?.facultyName || "Fakultas Teknik",
      submitter: {
        id: user?.id || "U01",
        nidn: user?.nidn || "0011223344",
        name: user?.name || "Peneliti",
        facultyName: user?.facultyName || "Fakultas Teknik"
      },
      members: [],
      budgetDetails: [],
      files: [],
      outputs: [],
      statusHistory: []
    };

    addProposal(newProposal);
    toast.success("Proposal berhasil diajukan!");
    
    // Trigger real-time notifications
    addNotification({
      title: "Proposal Berhasil Diajukan",
      body: `Proposal berjudul '${draft.title}' telah berhasil dikirim ke sistem dan sedang menunggu verifikasi.`,
      roleTarget: "DOSEN"
    });
    
    addNotification({
      title: "Pengajuan Proposal Baru",
      body: `Terdapat pengajuan proposal baru dengan judul '${draft.title}' yang memerlukan verifikasi administrasi.`,
      roleTarget: "LPPM"
    });

    resetDraft(); // Hapus data form yang nyangkut
    setCurrentStep(1);
    router.push("/monitoring"); // Redirect ke monitoring
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
              formData={draft} 
              errors={errors} 
              onChange={handleChange} 
              onNext={handleNext} 
            />
          )}
          {displayStep === 2 && <Step2Anggota onNext={handleNext} />}
          {displayStep === 3 && (
            <Step3Berkas 
              selectedFile={selectedFile}
              onFileSelect={(file: File | null) => {
                setSelectedFile(file);
                if (file) {
                  setDraft({ fileName: file.name });
                }
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
          {displayStep === 4 && <Step4Konfirmasi formData={draft} selectedFile={selectedFile} onSubmit={handleSubmit} />}
        </div>
      </div>
    </div>
  );
}
