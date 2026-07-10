"use client";

import { useProposalDraftStore } from "@/store/proposalDraftStore";
import { Button } from "@/components/ui/button";

export function Step4Berkas() {
  const { setCurrentStep } = useProposalDraftStore();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8 space-y-6">
        <div className="grid gap-4">
        <UploadField label="Proposal Utama (.pdf, maks 10MB) *" />
        <UploadField label="Surat Pernyataan Ketua (.pdf) *" />
        <UploadField label="CV Ketua (.pdf) *" />
        <UploadField label="Lampiran Lainnya (.pdf, opsional)" />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={() => setCurrentStep(3)}>Kembali</Button>
        <Button type="button" onClick={() => setCurrentStep(5)}>Lanjut ke Luaran</Button>
      </div>
    </div>
  );
}

function UploadField({ label }: { label: string }) {
  return (
    <div className="p-4 border border-dashed border-neutral-300 rounded-lg bg-neutral-50 flex items-center justify-between">
      <span className="text-sm font-medium text-neutral-700">{label}</span>
      <Button variant="secondary" size="sm">Pilih File</Button>
    </div>
  );
}
