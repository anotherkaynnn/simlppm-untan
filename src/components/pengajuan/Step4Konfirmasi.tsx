"use client";

import { useProposalDraftStore } from "@/store/proposalDraftStore";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, Users, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function Step4Konfirmasi() {
  const { setCurrentStep } = useProposalDraftStore();
  const router = useRouter();

  const handleSubmit = () => {
    toast.success("Proposal berhasil diajukan!");
    setCurrentStep(1); // Reset wizard
    router.push("/dashboard");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8 space-y-8">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 text-primary-600 mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900">Konfirmasi Pengajuan</h3>
          <p className="text-neutral-500 mt-2 max-w-lg mx-auto">
            Silakan periksa kembali ringkasan usulan Anda. Pastikan semua data dan lampiran sudah benar sebelum dikirim untuk proses verifikasi.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-xl border border-neutral-100 bg-neutral-50">
            <FileText className="w-5 h-5 text-primary-500 mt-1 shrink-0" />
            <div>
              <p className="font-semibold text-neutral-900 text-sm mb-1">Informasi Umum</p>
              <p className="text-xs text-neutral-500">Judul usulan, skema, luaran, dan substansi telah dilengkapi.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl border border-neutral-100 bg-neutral-50">
            <Users className="w-5 h-5 text-primary-500 mt-1 shrink-0" />
            <div>
              <p className="font-semibold text-neutral-900 text-sm mb-1">Tim Pelaksana</p>
              <p className="text-xs text-neutral-500">Ketua peneliti dan anggota tim (dosen/mahasiswa) telah didaftarkan.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl border border-neutral-100 bg-neutral-50">
            <UploadCloud className="w-5 h-5 text-primary-500 mt-1 shrink-0" />
            <div>
              <p className="font-semibold text-neutral-900 text-sm mb-1">Berkas Administrasi</p>
              <p className="text-xs text-neutral-500">Proposal lengkap dan hak akses file telah ditentukan.</p>
            </div>
          </div>
        </div>

        <div className="bg-warning/10 p-4 rounded-lg border border-warning/20">
          <p className="text-xs font-medium text-warning-800 text-center">
            Dengan menekan tombol "Ajukan Proposal" di bawah, Anda menyatakan bahwa seluruh data yang diisikan adalah benar dan dapat dipertanggungjawabkan.
          </p>
        </div>

      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={() => setCurrentStep(3)}>Kembali</Button>
        <Button type="button" onClick={handleSubmit} className="bg-success hover:bg-success-600 text-white">
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Ajukan Proposal
        </Button>
      </div>
    </div>
  );
}
