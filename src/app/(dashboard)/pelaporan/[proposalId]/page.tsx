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
  const [jurnalStatus, setJurnalStatus] = useState<string>("DRAFT");
  
  // For PKM video
  const isPKM = true; // Hardcoded or check from props/data in real implementation

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

        <section className="space-y-6 pt-4 border-t border-neutral-100">
          <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2">Laporan Kemajuan & Akuntabilitas Keuangan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="text-sm font-semibold text-neutral-900 block mb-2">Dokumen Laporan Kemajuan (Opsional)</label>
              <div className="p-4 border-2 border-dashed border-neutral-300 rounded-lg bg-neutral-50 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-neutral-100 transition-colors">
                <UploadCloud className="w-8 h-8 text-primary-500 mb-2" />
                <p className="text-xs font-semibold text-neutral-900">Unggah Laporan Kemajuan</p>
                <p className="text-[10px] text-neutral-500 mt-1">Format .pdf maks 15MB</p>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-semibold text-neutral-900 block mb-2">Akuntabilitas Keuangan (Bukti Anggaran) *</label>
              <div className="p-4 border-2 border-dashed border-neutral-300 rounded-lg bg-neutral-50 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-neutral-100 transition-colors">
                <UploadCloud className="w-8 h-8 text-primary-500 mb-2" />
                <p className="text-xs font-semibold text-neutral-900">Unggah Bukti Keuangan</p>
                <p className="text-[10px] text-neutral-500 mt-1">Syarat mutlak pencairan dana (.pdf maks 15MB)</p>
              </div>
            </div>
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Status Publikasi *</label>
                    <Select value={jurnalStatus} onValueChange={(val) => setJurnalStatus(val)}>
                      <SelectTrigger><SelectValue placeholder="Pilih Status" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DRAFT">Draft</SelectItem>
                        <SelectItem value="SUBMITTED">Submitted</SelectItem>
                        <SelectItem value="ACCEPTED">Accepted</SelectItem>
                        <SelectItem value="PUBLISHED">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Conditional Form Produk */}
          {outputType === "PRODUK" && (
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg space-y-4 animate-in slide-in-from-top-2">
              <h3 className="font-semibold text-neutral-900">Form Produk / Purwarupa</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-neutral-700">Nama Produk / Purwarupa *</label>
                  <Input placeholder="Tuliskan nama produk inovasi..." required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Tingkat Kesiapterapan Teknologi (TKT) *</label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Pilih TKT" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TKT1">TKT 1-3 (Riset Dasar)</SelectItem>
                      <SelectItem value="TKT4">TKT 4-6 (Riset Terapan)</SelectItem>
                      <SelectItem value="TKT7">TKT 7-9 (Pengembangan)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Tautan Dokumentasi / Video</label>
                  <Input placeholder="https://youtube.com/..." />
                </div>
              </div>
            </div>
          )}

          {/* Conditional PKM Video (if scheme is PKM) */}
          {isPKM && (
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg space-y-4 animate-in slide-in-from-top-2 mt-4">
              <h3 className="font-semibold text-neutral-900">Dokumentasi PKM (Wajib)</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Tautan Video Kegiatan *</label>
                <Input placeholder="Masukkan link video (contoh: YouTube, Google Drive)..." required />
                <p className="text-xs text-neutral-500">Sesuai ketentuan, kegiatan PKM wajib menyertakan video dokumentasi.</p>
              </div>
            </div>
          )}

          {/* Conditional Form Lainnya */}
          {outputType === "LAINNYA" && (
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg space-y-4 animate-in slide-in-from-top-2">
              <h3 className="font-semibold text-neutral-900">Form Luaran Lainnya</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Kategori Luaran *</label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Pilih Kategori" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BUKU">Buku / Modul Ajar</SelectItem>
                      <SelectItem value="PEMBICARA">Pembicara / Keynote Speaker</SelectItem>
                      <SelectItem value="MEDIA">Media Massa</SelectItem>
                      <SelectItem value="OTHER">Lainnya...</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Tautan Akses Luaran</label>
                  <Input placeholder="https://..." />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-neutral-700">Judul / Deskripsi Singkat Luaran *</label>
                  <Input placeholder="Tuliskan deskripsi luaran..." required />
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
