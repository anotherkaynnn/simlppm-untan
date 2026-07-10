"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ProposalStatus } from "@/types";

export default function PelaporanPage() {
  const params = useParams();
  const router = useRouter();
  const [outputType, setOutputType] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Laporan akhir dan luaran berhasil diunggah.");
    router.push("/dashboard");
  };

  return (
    <div className="max-w-6xl w-full mx-auto py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="p-0 h-8 w-8">
          <ArrowLeft className="w-5 h-5 text-neutral-500" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Unggah Laporan Akhir</h1>
          <p className="text-neutral-500 mt-1">Lengkapi data laporan dan luaran untuk proposal {params.proposalId}</p>
        </div>
      </div>

      <div className="bg-primary-50 border border-primary-100 p-4 rounded-lg mb-8 flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-1">Status Saat Ini</p>
          <StatusBadge status={"SELESAI" as ProposalStatus} />
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-1">Skim</p>
          <p className="text-sm font-medium text-neutral-900">Penelitian Terapan (PT)</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-neutral-200">
        
        {/* Section 1: Laporan Akhir */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2">Dokumen Laporan Akhir</h2>
          
          <div className="p-8 border-2 border-dashed border-neutral-300 rounded-lg bg-neutral-50 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-neutral-100 transition-colors">
            <UploadCloud className="w-10 h-10 text-primary-500 mb-3" />
            <p className="text-sm font-semibold text-neutral-900">Klik untuk mengunggah atau seret file ke sini</p>
            <p className="text-xs text-neutral-500 mt-1">Format .pdf maksimal 15MB</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-900">Abstrak Laporan *</label>
            <Textarea 
              placeholder="Tuliskan abstrak atau ringkasan hasil kegiatan..."
              className="min-h-[120px]"
              required
            />
          </div>
        </section>

        {/* Section 2: Luaran */}
        <section className="space-y-6 pt-4">
          <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2">Luaran yang Dihasilkan</h2>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-900">Pilih Jenis Luaran *</label>
            <Select value={outputType} onValueChange={(val) => setOutputType(val as string)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Jenis Luaran Utama" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PUBLIKASI">Publikasi Jurnal Ilmiah</SelectItem>
                <SelectItem value="HKI">Hak Kekayaan Intelektual (HKI)</SelectItem>
                <SelectItem value="PRODUK">Produk / Purwarupa</SelectItem>
                <SelectItem value="LAINNYA">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Conditional Form HKI (UR-04) */}
          {outputType === "HKI" && (
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg space-y-4 animate-in slide-in-from-top-2">
              <h3 className="font-semibold text-neutral-900">Form HKI Terstruktur</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Jenis HKI *</label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Pilih Jenis" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PATEN">Paten</SelectItem>
                      <SelectItem value="HAK_CIPTA">Hak Cipta</SelectItem>
                      <SelectItem value="MEREK_DAGANG">Merek Dagang</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 flex items-center justify-between">
                    Nomor Permohonan / Sertifikat *
                    <span className="text-[10px] text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded">Format: REG2025...</span>
                  </label>
                  <Input placeholder="Contoh: EC00202512345" required />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-neutral-700">Judul Ciptaan / HKI *</label>
                  <Input placeholder="Tuliskan judul lengkap..." required />
                </div>
              </div>
            </div>
          )}

          {/* Conditional Form Publikasi */}
          {outputType === "PUBLIKASI" && (
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg space-y-4 animate-in slide-in-from-top-2">
              <h3 className="font-semibold text-neutral-900">Form Publikasi Ilmiah</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Judul Artikel *</label>
                  <Input placeholder="Judul artikel yang dipublikasikan" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Nama Jurnal *</label>
                    <Input placeholder="Contoh: Jurnal Edukasi" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">DOI / Tautan</label>
                    <Input placeholder="https://doi.org/..." />
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <div className="pt-6 border-t border-neutral-200 flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>Batal</Button>
          <Button type="submit">Kirim Laporan Akhir</Button>
        </div>
      </form>
    </div>
  );
}
