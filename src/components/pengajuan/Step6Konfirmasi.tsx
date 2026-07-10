"use client";

import { useProposalDraftStore } from "@/store/proposalDraftStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function Step6Konfirmasi() {
  const { draft, setCurrentStep, resetDraft } = useProposalDraftStore();
  const router = useRouter();

  const handleSubmit = () => {
    // Simulasi pengiriman data
    toast.success("Proposal berhasil diajukan!");
    resetDraft();
    router.push("/monitoring");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8 space-y-6">
        <div className="p-6 bg-primary-50 rounded-lg border border-primary-100">
        <h3 className="font-semibold text-primary-900 mb-4 text-lg">Konfirmasi Pengajuan</h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-xs text-primary-600 font-semibold uppercase tracking-wider">Judul Usulan</p>
            <p className="text-sm font-medium text-neutral-900">{draft.title || <span className="text-neutral-400 italic">Belum diisi</span>}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-primary-600 font-semibold uppercase tracking-wider">Jenis</p>
              <p className="text-sm font-medium text-neutral-900">{draft.type || "-"}</p>
            </div>
            <div>
              <p className="text-xs text-primary-600 font-semibold uppercase tracking-wider">Skim</p>
              <p className="text-sm font-medium text-neutral-900">{draft.schemeId || "-"}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-primary-600 font-semibold uppercase tracking-wider">Tahun Pelaksanaan</p>
              <p className="text-sm font-medium text-neutral-900">{draft.year}</p>
            </div>
            <div>
              <p className="text-xs text-primary-600 font-semibold uppercase tracking-wider">Durasi</p>
              <p className="text-sm font-medium text-neutral-900">{draft.duration} Bulan</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white rounded border border-warning/30 flex items-start">
          <input type="checkbox" id="agree" className="mt-1 mr-3 rounded text-primary-600 border-neutral-300" />
          <label htmlFor="agree" className="text-sm text-neutral-700">
            Saya menyatakan bahwa semua data yang diisikan adalah benar dan dapat dipertanggungjawabkan. Apabila di kemudian hari ditemukan ketidaksesuaian, saya bersedia menerima sanksi sesuai ketentuan yang berlaku.
          </label>
        </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={() => setCurrentStep(5)}>Kembali</Button>
        <div className="space-x-3">
          <Button type="button" variant="outline" onClick={() => toast.success("Draft berhasil disimpan!")}>
            Simpan Draft
          </Button>
          <Button type="button" onClick={handleSubmit}>Kirim Proposal</Button>
        </div>
      </div>
    </div>
  );
}
