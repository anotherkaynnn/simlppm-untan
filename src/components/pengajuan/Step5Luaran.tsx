"use client";

import { useProposalDraftStore } from "@/store/proposalDraftStore";
import { Button } from "@/components/ui/button";

export function Step5Luaran() {
  const { setCurrentStep } = useProposalDraftStore();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8 space-y-6">
        <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
        <h3 className="font-semibold text-neutral-900 mb-4">Luaran yang Dijanjikan</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="w-4 h-4 text-primary-600 rounded border-neutral-300" />
            <span className="text-sm font-medium text-neutral-700">Publikasi Jurnal Ilmiah</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="w-4 h-4 text-primary-600 rounded border-neutral-300" />
            <span className="text-sm font-medium text-neutral-700">Hak Kekayaan Intelektual (HKI)</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="w-4 h-4 text-primary-600 rounded border-neutral-300" />
            <span className="text-sm font-medium text-neutral-700">Produk / Purwarupa</span>
          </label>
        </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={() => setCurrentStep(4)}>Kembali</Button>
        <Button type="button" onClick={() => setCurrentStep(6)}>Lanjut ke Konfirmasi</Button>
      </div>
    </div>
  );
}
