"use client";

import { useProposalDraftStore } from "@/store/proposalDraftStore";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, Users, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Step4KonfirmasiProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  selectedFile: File | null;
  onSubmit: () => void;
}

export function Step4Konfirmasi({ formData, selectedFile, onSubmit }: Step4KonfirmasiProps) {
  const { setCurrentStep } = useProposalDraftStore();
  const router = useRouter();

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
            <div className="w-full">
              <p className="font-semibold text-neutral-900 text-sm mb-3 border-b border-neutral-200 pb-2">Informasi Umum</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                <div className="md:col-span-2"><span className="text-neutral-500">Judul Usulan:</span> <p className="font-medium text-neutral-900 mt-0.5">{formData.title || '-'}</p></div>
                <div><span className="text-neutral-500">Jenis Usulan:</span> <p className="font-medium text-neutral-900 mt-0.5">{formData.type || '-'}</p></div>
                <div><span className="text-neutral-500">Skim:</span> <p className="font-medium text-neutral-900 mt-0.5">{formData.schemeId || '-'}</p></div>
                <div><span className="text-neutral-500">Bidang Ilmu:</span> <p className="font-medium text-neutral-900 mt-0.5">{formData.fieldOfStudy || '-'}</p></div>
                <div><span className="text-neutral-500">Total Dana:</span> <p className="font-medium text-neutral-900 mt-0.5">Rp {formData.budget ? formData.budget.toLocaleString('id-ID') : '0'}</p></div>
                <div><span className="text-neutral-500">Sumber Dana:</span> <p className="font-medium text-neutral-900 mt-0.5">{formData.fundingSource || '-'}</p></div>
                <div><span className="text-neutral-500">Tahun:</span> <p className="font-medium text-neutral-900 mt-0.5">{formData.year || '-'}</p></div>
                <div className="md:col-span-2"><span className="text-neutral-500">Pengelola Dana:</span> <p className="font-medium text-neutral-900 mt-0.5">{formData.managementUnit || '-'}</p></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl border border-neutral-100 bg-neutral-50">
            <Users className="w-5 h-5 text-primary-500 mt-1 shrink-0" />
            <div className="w-full">
              <p className="font-semibold text-neutral-900 text-sm mb-3 border-b border-neutral-200 pb-2">Tim Pelaksana</p>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Ketua Peneliti</p>
                  <p className="font-medium text-neutral-900">Diambil dari Profil Anda</p>
                </div>
                
                {formData.dosenList && formData.dosenList.length > 0 && (
                  <div>
                    <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Dosen Anggota</p>
                    <ul className="list-disc list-inside space-y-1">
                      {formData.dosenList.map((d: any, i: number) => (
                        <li key={i} className="text-neutral-900">{d.nama} <span className="text-neutral-500 text-xs">({d.nidn})</span></li>
                      ))}
                    </ul>
                  </div>
                )}

                {formData.mahasiswaList && formData.mahasiswaList.length > 0 && (
                  <div>
                    <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Mahasiswa</p>
                    <ul className="list-disc list-inside space-y-1">
                      {formData.mahasiswaList.map((m: any, i: number) => (
                        <li key={i} className="text-neutral-900">{m.nama} <span className="text-neutral-500 text-xs">({m.nim})</span></li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {formData.tendikList && formData.tendikList.length > 0 && (
                  <div>
                    <p className="text-neutral-500 text-xs uppercase tracking-wider mb-1">Lainnya / Tendik</p>
                    <ul className="list-disc list-inside space-y-1">
                      {formData.tendikList.map((t: any, i: number) => (
                        <li key={i} className="text-neutral-900">{t.nama}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {(!formData.dosenList?.length && !formData.mahasiswaList?.length && !formData.tendikList?.length) && (
                  <p className="text-neutral-500 italic">Belum ada anggota tim yang ditambahkan.</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 rounded-xl border border-neutral-100 bg-neutral-50">
            <UploadCloud className="w-5 h-5 text-primary-500 mt-1 shrink-0" />
            <div className="w-full">
              <p className="font-semibold text-neutral-900 text-sm mb-3 border-b border-neutral-200 pb-2">Berkas Administrasi</p>
              <div className="flex items-center justify-between bg-white border border-neutral-200 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-danger-50 text-danger-500 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium text-neutral-900 truncate max-w-[200px] sm:max-w-[300px]">{selectedFile ? selectedFile.name : formData.fileName || 'Belum ada file'}</p>
                    <p className="text-xs text-neutral-500">{selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(2) + ' MB' : (formData.fileName ? 'File tersimpan' : '-')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-warning/10 p-4 rounded-lg border border-warning/20">
          <p className="text-xs font-medium text-warning-800 text-center">
            Dengan menekan tombol &quot;Ajukan Proposal&quot; di bawah, Anda menyatakan bahwa seluruh data yang diisikan adalah benar dan dapat dipertanggungjawabkan.
          </p>
        </div>

      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={() => setCurrentStep(3)}>Kembali</Button>
        <Button type="button" onClick={onSubmit} className="bg-success hover:bg-success-600 text-white">
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Ajukan Proposal
        </Button>
      </div>
    </div>
  );
}
