"use client";

import { useState } from "react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, X, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { useProposalStore } from "@/store/proposalStore";

const hkiRecords = [
  {
    id: "HKI-2026-001",
    applicationNo: "P00202601234",
    type: "PATEN",
    title: "Sistem Pengairan Otomatis Berbasis IoT untuk Lahan Gambut",
    status: "DIBERIKAN",
    date: "2026-02-15T00:00:00Z"
  },
  {
    id: "HKI-2026-002",
    applicationNo: "C00202609876",
    type: "HAK_CIPTA",
    title: "Modul Pembelajaran Interaktif Kewirausahaan Digital",
    status: "DIAJUKAN",
    date: "2026-05-10T00:00:00Z"
  }
];

export default function HkiPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [hkiType, setHkiType] = useState("PATEN");
  const { proposals } = useProposalStore();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Data Luaran HKI berhasil disimpan.");
    setIsFormOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DIBERIKAN":
        return <Badge variant="outline" className="bg-success-50 text-success-700 border-success-200">Diberikan</Badge>;
      case "DIAJUKAN":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Diajukan</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Luaran HKI Terdaftar</h1>
          <p className="text-neutral-500">Kelola daftar Hak Kekayaan Intelektual dari hasil penelitian dan pengabdian Anda.</p>
        </div>
        {!isFormOpen && (
          <Button onClick={() => setIsFormOpen(true)} className="bg-primary-600 hover:bg-primary-700">
            <Plus className="w-4 h-4 mr-2" />
            Tambah Luaran HKI
          </Button>
        )}
      </div>

      {isFormOpen && (
        <Card className="border-primary-100 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
              <h2 className="text-lg font-bold text-neutral-900">Formulir Tambah HKI</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsFormOpen(false)} className="text-neutral-400 hover:text-danger">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-900">Jenis HKI <span className="text-danger">*</span></label>
                  <select 
                    required
                    value={hkiType}
                    onChange={(e) => setHkiType(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="PATEN">Paten</option>
                    <option value="HAK_CIPTA">Hak Cipta</option>
                    <option value="MEREK_DAGANG">Merek Dagang</option>
                    <option value="DESAIN_INDUSTRI">Desain Industri</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-900">Nomor Permohonan / Sertifikat <span className="text-danger">*</span></label>
                  <Input required placeholder="Contoh: P00202612345" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-neutral-900">Judul HKI <span className="text-danger">*</span></label>
                  <Input required placeholder="Masukkan judul lengkap luaran HKI" />
                </div>

                {/* Conditional Fields based on HKI Type */}
                {hkiType === "PATEN" && (
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-neutral-900">Klaim Utama (Khusus Paten) <span className="text-danger">*</span></label>
                    <Textarea required placeholder="Deskripsikan klaim utama penemuan Anda..." className="min-h-[100px]" />
                  </div>
                )}
                
                {hkiType === "MEREK_DAGANG" && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-neutral-900">Kelas Merek <span className="text-danger">*</span></label>
                    <Input required placeholder="Contoh: Kelas 9, Kelas 41" />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-900">Status Perlindungan <span className="text-danger">*</span></label>
                  <select required className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="DIAJUKAN">Diajukan</option>
                    <option value="DIBERIKAN">Diberikan / Granted</option>
                    <option value="DITOLAK">Ditolak</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-900">Proposal Terkait <span className="text-danger">*</span></label>
                  <select required className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="">-- Pilih Proposal --</option>
                    {proposals.map(p => (
                      <option key={p.id} value={p.id}>{p.id} - {p.title.substring(0, 50)}...</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-neutral-900">Sertifikat / Dokumen Bukti (PDF) <span className="text-danger">*</span></label>
                  <div className="border-2 border-dashed border-neutral-200 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer">
                    <UploadCloud className="w-8 h-8 text-neutral-400 mb-2" />
                    <p className="text-sm font-medium text-neutral-700">Klik untuk mengunggah dokumen PDF</p>
                    <p className="text-xs text-neutral-500 mt-1">Maksimal ukuran file: 5MB</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Batal</Button>
                <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
                  <Save className="w-4 h-4 mr-2" />
                  Simpan Data HKI
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-neutral-50">
                <TableRow>
                  <TableHead>No. Permohonan</TableHead>
                  <TableHead>Jenis</TableHead>
                  <TableHead>Judul</TableHead>
                  <TableHead>Status Perlindungan</TableHead>
                  <TableHead>Tanggal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hkiRecords.map((hki) => (
                  <TableRow key={hki.id}>
                    <TableCell className="font-medium text-neutral-700">{hki.applicationNo}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-neutral-100 text-neutral-700 border-neutral-200">
                        {hki.type.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-neutral-900 min-w-[280px] max-w-sm whitespace-normal line-clamp-2" title={hki.title}>
                        {hki.title}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(hki.status)}</TableCell>
                    <TableCell className="text-sm text-neutral-600">
                      {format(new Date(hki.date), "dd MMM yyyy", { locale: localeId })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
