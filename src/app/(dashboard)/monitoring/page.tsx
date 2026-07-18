"use client";

import { useAuthStore } from "@/store/authStore";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ProposalStatus } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Mail } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Proposal } from "@/types";
import { useProposalStore } from "@/store/proposalStore";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { generateSuratTugas } from "@/lib/documentGenerator";

export default function MonitoringPage() {
  const { user } = useAuthStore();
  const { proposals } = useProposalStore();

  const [isSuratTugasOpen, setIsSuratTugasOpen] = useState(false);
  const [selectedProposalForSurat, setSelectedProposalForSurat] = useState<Proposal | null>(null);
  const [suratFormData, setSuratFormData] = useState({ kegiatan: "", tempatTujuan: "", tanggalBerangkat: "", tanggalKembali: "" });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleOpenSuratDialog = (proposal: Proposal) => {
    setSelectedProposalForSurat(proposal);
    setSuratFormData({ kegiatan: proposal.title, tempatTujuan: "", tanggalBerangkat: "", tanggalKembali: "" });
    setIsSuratTugasOpen(true);
  };

  const handleGenerateSuratTugas = async () => {
    if (!selectedProposalForSurat) return;
    if (!suratFormData.kegiatan || !suratFormData.tempatTujuan || !suratFormData.tanggalBerangkat || !suratFormData.tanggalKembali) {
      toast.error("Semua kolom (Kegiatan, Tujuan, Tanggal) wajib diisi!");
      return;
    }

    setIsGenerating(true);
    try {
      const templateData = {
        nomor_surat: `ST-${selectedProposalForSurat.id.slice(-4)}/UN22/2025`,
        tanggal_permintaan: format(new Date(), "dd-MM-yyyy HH:mm:ss"),
        kegiatan: suratFormData.kegiatan,
        tujuan: suratFormData.tempatTujuan,
        tanggal_pelaksanaan: `${format(new Date(suratFormData.tanggalBerangkat), 'dd MMM yyyy', { locale: id })} s/d ${format(new Date(suratFormData.tanggalKembali), 'dd MMM yyyy', { locale: id })}`,
        nama_ketua: "Drs. Ahmad Rabiul Muzammil, M.Si.",
      };

      const templateUrl = "/templates/surat_tugas_template.docx";
      const outputFileName = `Surat_Tugas_${selectedProposalForSurat.id}.docx`;

      const result = await generateSuratTugas(templateData, templateUrl, outputFileName);
      
      if (!result.success) {
        toast.error("Gagal mencetak. Pastikan file template tersedia.");
      } else {
        toast.success("Surat tugas berhasil diunduh!");
        setIsSuratTugasOpen(false);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat mencetak surat tugas.");
    } finally {
      setIsGenerating(false);
    }
  };

  const columns: ColumnDef<Proposal>[] = [
    {
      accessorKey: "title",
      header: "Judul Usulan",
      cell: ({ row }) => {
        const title = row.getValue("title") as string;
        return (
          <div className="min-w-[280px] max-w-md">
            <span className="font-semibold text-neutral-900 line-clamp-2">{title}</span>
            <span className="text-xs text-neutral-500 mt-1 block">{row.original.id}</span>
          </div>
        );
      }
    },
    {
      accessorKey: "schemeName",
      header: "Skim",
      cell: ({ row }) => <span className="text-sm">{row.getValue("schemeName")}</span>
    },
    {
      accessorKey: "submittedAt",
      header: "Tanggal Diajukan",
      cell: ({ row }) => {
        const dateStr = row.getValue("submittedAt") as string;
        return (
          <span className="text-sm">
            {format(new Date(dateStr), "dd MMM yyyy", { locale: id })}
          </span>
        );
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status") as ProposalStatus} />
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => {
        const isAccepted = row.original.status === 'DITERIMA' || row.original.status === 'SELESAI';
        return (
          <div className="flex items-center gap-2">
            <Link href={`/monitoring/${row.original.id}`}>
              <Button variant="outline" size="sm" className="h-8 flex items-center text-primary-600 hover:text-primary-700">
                <Eye className="w-4 h-4 mr-1.5" />
                Detail
              </Button>
            </Link>
            {isAccepted && user?.role === 'DOSEN' && (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 flex items-center text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                onClick={() => handleOpenSuratDialog(row.original)}
              >
                <FileText className="w-4 h-4 mr-1.5" />
                Surat Tugas
              </Button>
            )}
          </div>
        );
      }
    }
  ];

  const getFilteredProposals = () => {
    if (!user) return [];
    if (user.role === 'DOSEN') {
      return proposals.filter(p => p.submitter.id === user.id);
    }
    if (user.role === 'ADMIN_FK' || user.role === 'OPERATOR_FK') {
      // Asumsikan admin/operator dummy mengelola Fakultas Teknik
      return proposals.filter(p => p.facultyName === "Fakultas Teknik" || p.facultyId === "FT");
    }
    // KETUA_LPPM, ADMIN_SISTEM, REVIEWER bisa lihat semua (lintas fakultas)
    return proposals;
  };

  const filteredProposals = getFilteredProposals();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Monitoring Usulan</h1>
          <p className="text-neutral-500">
            {user.role === 'KETUA_LPPM' ? 'Lacak status dan perkembangan seluruh proposal lintas fakultas.' : 'Lacak status dan perkembangan proposal yang telah diajukan.'}
          </p>
        </div>
        
        {user.role === 'DOSEN' && (
          <Link href="/pengajuan/baru">
            <Button className="font-semibold">
              <FileText className="w-4 h-4 mr-2" />
              Ajukan Proposal Baru
            </Button>
          </Link>
        )}
        {(user.role === 'KETUA_LPPM' || user.role === 'ADMIN_FK' || user.role === 'OPERATOR_FK') && (
          <Button 
            className="font-semibold bg-warning-600 hover:bg-warning-700 text-white"
            onClick={() => {
              toast.info("Memproses pengiriman email...");
              setTimeout(() => {
                toast.success("Berhasil! Email pengingat otomatis telah dikirim ke 12 Peneliti yang terlambat.");
              }, 1500);
            }}
          >
            <Mail className="w-4 h-4 mr-2" />
            Kirim Pengingat Keterlambatan (Email)
          </Button>
        )}
      </div>

      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden min-w-0 w-full">
        <DataTable 
          columns={columns} 
          data={filteredProposals} 
          searchKey="title"
          searchPlaceholder="Cari berdasarkan judul usulan..."
        />
      </div>

      {/* Surat Tugas Request Dialog */}
      <Dialog open={isSuratTugasOpen} onOpenChange={setIsSuratTugasOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Minta Surat Tugas</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="kegiatan">Kegiatan</Label>
              <Input
                id="kegiatan"
                value={suratFormData.kegiatan}
                onChange={(e) => setSuratFormData({ ...suratFormData, kegiatan: e.target.value })}
                placeholder="Nama kegiatan (Otomatis dari usulan)"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tempatTujuan">Tempat Tujuan</Label>
              <Input
                id="tempatTujuan"
                value={suratFormData.tempatTujuan}
                onChange={(e) => setSuratFormData({ ...suratFormData, tempatTujuan: e.target.value })}
                placeholder="Contoh: SMAN 1 PONTIANAK"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tanggalBerangkat">Tanggal Berangkat</Label>
                <Input
                  id="tanggalBerangkat"
                  type="date"
                  value={suratFormData.tanggalBerangkat}
                  onChange={(e) => setSuratFormData({ ...suratFormData, tanggalBerangkat: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tanggalKembali">Tanggal Kembali</Label>
                <Input
                  id="tanggalKembali"
                  type="date"
                  value={suratFormData.tanggalKembali}
                  onChange={(e) => setSuratFormData({ ...suratFormData, tanggalKembali: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSuratTugasOpen(false)} disabled={isGenerating}>Batal</Button>
            <Button onClick={handleGenerateSuratTugas} className="bg-primary-600 hover:bg-primary-700 text-white" disabled={isGenerating}>
              {isGenerating ? "Memproses..." : "Cetak / Unduh"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
