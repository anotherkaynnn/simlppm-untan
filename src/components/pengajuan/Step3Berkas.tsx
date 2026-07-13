"use client";

import { useRef, useState } from "react";
import { useProposalDraftStore } from "@/store/proposalDraftStore";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UploadCloud, FileText, X } from "lucide-react";
import { toast } from "sonner";
import { FieldTooltip } from "@/components/ui/tooltip";

interface Step3BerkasProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  errors: Record<string, string>;
  onNext: () => void;
}

export function Step3Berkas({ selectedFile, onFileSelect, errors, onNext }: Step3BerkasProps) {
  const { setCurrentStep, draft, setDraft } = useProposalDraftStore();
  
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    // Check file type
    if (file.type !== "application/pdf") {
      toast.error("Format file tidak didukung. Harap unggah file PDF.");
      return;
    }

    // Check file size (15MB = 15 * 1024 * 1024 bytes)
    if (file.size > 15 * 1024 * 1024) {
      toast.error("Ukuran file melebihi batas maksimal 15MB.");
      return;
    }

    onFileSelect(file);
    toast.success(`File ${file.name} berhasil dipilih.`);
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
    setDraft({ fileName: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8 space-y-8">
        
        <div>
          <h3 className="font-semibold text-neutral-900 mb-4 flex items-center">File Dokumen Proposal <FieldTooltip text="Format PDF, ukuran maks 15MB" /></h3>
          
          <div 
            className={`p-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center transition-colors cursor-pointer ${
              errors.file ? 'border-danger-500 bg-danger-50' : 
              isDragging 
                ? "border-primary-500 bg-primary-50" 
                : "border-neutral-300 bg-neutral-50 hover:bg-neutral-100"
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileInput}
              className="hidden" 
              accept=".pdf,application/pdf"
            />
            
            {selectedFile || draft.fileName ? (
              <div className="flex flex-col items-center w-full">
                <div className="flex items-center justify-between w-full max-w-md p-3 bg-white border border-neutral-200 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="p-2 bg-primary-50 text-primary-600 rounded-lg shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="text-left overflow-hidden">
                      <p className="text-sm font-semibold text-neutral-900 truncate" title={selectedFile ? selectedFile.name : draft.fileName}>
                        {selectedFile ? selectedFile.name : draft.fileName}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : "1.20 MB (Draf)"}
                      </p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={removeFile}
                    className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-neutral-500 mt-4">Klik atau seret file lain untuk mengganti</p>
              </div>
            ) : (
              <>
                <UploadCloud className={`w-10 h-10 mb-3 ${errors.file ? 'text-danger-500' : isDragging ? "text-primary-500" : "text-neutral-400"}`} />
                <p className={`text-sm font-semibold ${errors.file ? 'text-danger-700' : 'text-neutral-700'}`}>Klik atau seret file PDF ke sini</p>
                <p className={`text-xs mt-1 ${errors.file ? 'text-danger-500' : 'text-neutral-500'}`}>Maksimal ukuran file: 15MB</p>
              </>
            )}
          </div>
          {errors.file && <p className="mt-2 text-xs text-danger-600">{errors.file}</p>}
        </div>

        <div>
          <h3 className="font-semibold text-neutral-900 mb-3">Status Akses File</h3>
          <RadioGroup defaultValue="open" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3 p-4 border border-neutral-200 rounded-lg bg-white relative cursor-pointer hover:border-primary-300 transition-colors">
              <RadioGroupItem value="open" id="open" className="mt-1" />
              <div>
                <label htmlFor="open" className="text-sm font-bold text-neutral-900 cursor-pointer">Open Access</label>
                <p className="text-xs text-neutral-500 mt-1">Dokumen dapat diakses publik setelah disetujui (Default).</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 border border-neutral-200 rounded-lg bg-white relative cursor-pointer hover:border-primary-300 transition-colors">
              <RadioGroupItem value="protected" id="protected" className="mt-1" />
              <div>
                <label htmlFor="protected" className="text-sm font-bold text-neutral-900 cursor-pointer">Protected Access</label>
                <p className="text-xs text-neutral-500 mt-1">Hanya dapat diakses oleh tim peneliti, operator, dan reviewer.</p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="pt-4 border-t border-neutral-100">
          <h3 className="font-semibold text-neutral-900 mb-2">File Kontrak Kerja P2M</h3>
          <p className="text-xs text-neutral-500 mb-4">Berkas kontrak diunggah secara eksklusif oleh Admin Fakultas setelah proposal disetujui.</p>
          <div className="p-4 border border-neutral-200 bg-neutral-100 rounded-lg flex items-center">
            <span className="text-sm text-neutral-400 italic">Belum ada file kontrak yang diunggah (Read-only)</span>
          </div>
        </div>

      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={() => setCurrentStep(2)}>Kembali</Button>
        <Button type="button" onClick={onNext} className="bg-primary-600 hover:bg-primary-700 text-white">
          Selanjutnya
        </Button>
      </div>
    </div>
  );
}
