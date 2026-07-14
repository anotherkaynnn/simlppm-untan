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
  const [suratFormData, setSuratFormData] = useState({ destination: "", dateRange: "" });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleOpenSuratDialog = (proposal: Proposal) => {
    setSelectedProposalForSurat(proposal);
    setSuratFormData({ destination: "", dateRange: "" });
    setIsSuratTugasOpen(true);
  };

  const handleGenerateSuratTugas = async () => {
    if (!selectedProposalForSurat) return;
    if (!suratFormData.destination || !suratFormData.dateRange) {
      toast.error("Tujuan dan Tanggal Pelaksanaan wajib diisi!");
      return;
    }

    setIsGenerating(true);
    try {
      const templateData = {
        nomor_surat: `ST-${selectedProposalForSurat.id.slice(-4)}/UN22/2025`,
        tanggal_permintaan: format(new Date(), "dd-MM-yyyy HH:mm:ss"),
        kegiatan: selectedProposalForSurat.title,
        tujuan: suratFormData.destination,
        tanggal_pelaksanaan: suratFormData.dateRange,
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
            {isAccepted && (
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

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Monitoring Usulan</h1>
          <p className="text-neutral-500">Lacak status dan perkembangan proposal yang telah Anda ajukan.</p>
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

      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <DataTable 
          columns={columns} 
          data={proposals} 
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
              <Label>Kegiatan</Label>
              <Input
                readOnly
                className="bg-neutral-50 text-neutral-600"
                value={selectedProposalForSurat?.title || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Tujuan</Label>
              <Input
                id="destination"
                value={suratFormData.destination}
                onChange={(e) => setSuratFormData({ ...suratFormData, destination: e.target.value })}
                placeholder="Contoh: SMAN 1 PONTIANAK"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateRange">Tanggal Pelaksanaan</Label>
              <Input
                id="dateRange"
                value={suratFormData.dateRange}
                onChange={(e) => setSuratFormData({ ...suratFormData, dateRange: e.target.value })}
                placeholder="Contoh: 10-12-2025 - 12-12-2025"
              />
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
