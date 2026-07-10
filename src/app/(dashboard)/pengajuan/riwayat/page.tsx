"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download, FileText, CheckCircle, Clock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

export default function RiwayatProposalPage() {
  const riwayat = [
    { 
      id: "PRP-2025-001", 
      judul: "Penerapan AI dalam Pertanian Tropis", 
      skim: "Penelitian Dasar", 
      tahun: "2025", 
      status: "Didanai", 
      dana: "Rp 15.000.000",
      abstrak: "Penelitian ini berfokus pada penggunaan machine learning untuk mendeteksi penyakit tanaman secara dini menggunakan citra satelit dan drone pada lahan gambut tropis.",
      anggota: "Dr. Budi Santoso (Ketua), Andi Setiawan (Anggota), 2 Mahasiswa",
      tglPengajuan: "12 Januari 2025"
    },
    { 
      id: "PRP-2024-102", 
      judul: "Edukasi Gizi Anak Sekolah Dasar", 
      skim: "Pengabdian Masyarakat", 
      tahun: "2024", 
      status: "Selesai", 
      dana: "Rp 10.000.000",
      abstrak: "Program penyuluhan berkelanjutan untuk meningkatkan kesadaran nutrisi pada anak usia 6-12 tahun di pinggiran kota Pontianak.",
      anggota: "Dr. Budi Santoso (Ketua), dr. Rina Amelia (Anggota)",
      tglPengajuan: "05 Maret 2024"
    },
    { 
      id: "PRP-2024-055", 
      judul: "Pengujian Material Tahan Gempa", 
      skim: "Penelitian Terapan", 
      tahun: "2024", 
      status: "Ditolak", 
      dana: "-",
      abstrak: "Pengembangan beton ringan menggunakan campuran limbah kelapa sawit untuk konstruksi bangunan tahan gempa tingkat rendah.",
      anggota: "Dr. Budi Santoso (Ketua)",
      tglPengajuan: "10 April 2024"
    },
  ];

  const [selectedProposal, setSelectedProposal] = useState<typeof riwayat[0] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const openDetail = (proposal: typeof riwayat[0]) => {
    setSelectedProposal(proposal);
    setIsDetailOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Didanai":
        return <Badge variant="outline" className="bg-success-50 text-success-700 border-success-200">{status}</Badge>;
      case "Selesai":
        return <Badge variant="outline" className="bg-primary-50 text-primary-700 border-primary-200">{status}</Badge>;
      case "Ditolak":
        return <Badge variant="outline" className="bg-danger-50 text-danger-700 border-danger-200">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  }

  return (
    <div className="max-w-[1600px] w-full mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Riwayat Proposal Saya</h1>
        <p className="text-neutral-500">Daftar seluruh proposal P2M yang pernah Anda ajukan di periode sebelumnya.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-neutral-50">
                <TableRow>
                  <TableHead>Kode Proposal</TableHead>
                  <TableHead>Judul Proposal</TableHead>
                  <TableHead>Skim</TableHead>
                  <TableHead className="text-center">Tahun</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Dana Disetujui</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {riwayat.length > 0 ? (
                  riwayat.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium text-neutral-600">{item.id}</TableCell>
                      <TableCell className="font-semibold text-neutral-900 max-w-[250px] truncate" title={item.judul}>
                        {item.judul}
                      </TableCell>
                      <TableCell className="text-neutral-600">{item.skim}</TableCell>
                      <TableCell className="text-center text-neutral-500">{item.tahun}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-right font-medium text-neutral-700">{item.dana}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="icon" variant="ghost" className="text-primary-600 hover:text-primary-800" title="Lihat Detail" onClick={() => openDetail(item)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-neutral-600 hover:text-neutral-900" title="Unduh PDF" onClick={() => toast.success(`Dokumen PDF untuk ${item.id} sedang diunduh (Simulasi)`)}>
                          <Download className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-neutral-500">
                      Anda belum memiliki riwayat pengajuan proposal.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Detail Proposal</DialogTitle>
          </DialogHeader>
          
          {selectedProposal && (
            <div className="space-y-6 py-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Kode Proposal</h3>
                  <p className="text-lg font-bold text-neutral-900 mt-1">{selectedProposal.id}</p>
                </div>
                <div>
                  {getStatusBadge(selectedProposal.status)}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-500 mb-1">Judul Proposal</h3>
                  <p className="text-neutral-900 font-medium">{selectedProposal.judul}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-500 mb-1">Skim</h3>
                    <p className="text-neutral-900">{selectedProposal.skim}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-500 mb-1">Tahun Pengajuan</h3>
                    <p className="text-neutral-900">{selectedProposal.tahun}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-500 mb-1">Dana Disetujui</h3>
                    <p className="text-neutral-900 font-semibold">{selectedProposal.dana}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-500 mb-1">Tanggal Pengajuan</h3>
                    <p className="text-neutral-900">{selectedProposal.tglPengajuan}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-neutral-500 mb-1">Tim Pelaksana</h3>
                  <p className="text-neutral-900">{selectedProposal.anggota}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-neutral-500 mb-1">Abstrak Singkat</h3>
                  <p className="text-neutral-700 text-sm leading-relaxed bg-neutral-50 p-3 rounded-lg border">
                    {selectedProposal.abstrak}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
            <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Tutup</Button>
            <Button className="bg-primary-600 hover:bg-primary-700 text-white">
              <Download className="w-4 h-4 mr-2" />
              Unduh Lengkap (PDF)
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
