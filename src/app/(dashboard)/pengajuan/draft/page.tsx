"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const initialDrafts = [
  { id: "DRF-001", judul: "Pengembangan Sistem Informasi LPPM", skim: "Penelitian Terapan", tglUbah: "10 Juli 2026", progress: "Tahap 2 (Anggota)" },
  { id: "DRF-002", judul: "Pemberdayaan Masyarakat Pesisir Sungai Kapuas", skim: "Pengabdian Masyarakat", tglUbah: "5 Juli 2026", progress: "Tahap 3 (Anggaran)" },
];

export default function DraftProposalPage() {
  const [drafts, setDrafts] = useState(initialDrafts);
  const [selectedDrafts, setSelectedDrafts] = useState<typeof initialDrafts>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteSingle = (id: string) => {
    setDrafts(drafts.filter((d) => d.id !== id));
    toast.success(`Draft proposal ${id} berhasil dihapus.`);
  };

  const handleBatchDelete = () => {
    const selectedIds = selectedDrafts.map(d => d.id);
    setDrafts(drafts.filter((d) => !selectedIds.includes(d.id)));
    toast.success(`${selectedDrafts.length} draft proposal berhasil dihapus.`);
    setIsDeleteModalOpen(false);
    setSelectedDrafts([]);
  };

  const columns: ColumnDef<typeof initialDrafts[0]>[] = [
    {
      accessorKey: "judul",
      header: "Judul Proposal",
      cell: ({ row }) => (
        <div className="font-semibold text-neutral-900 min-w-[280px] max-w-[400px] whitespace-normal line-clamp-2" title={row.original.judul}>
          {row.original.judul}
        </div>
      )
    },
    {
      accessorKey: "skim",
      header: "Skim",
      cell: ({ row }) => <span className="text-neutral-600">{row.original.skim}</span>
    },
    {
      accessorKey: "tglUbah",
      header: "Terakhir Diubah",
      cell: ({ row }) => <span className="text-neutral-500">{row.original.tglUbah}</span>
    },
    {
      accessorKey: "progress",
      header: "Progress",
      cell: ({ row }) => (
        <Badge variant="outline" className="bg-warning-50 text-warning-700 border-warning-200">
          {row.original.progress}
        </Badge>
      )
    },
    {
      id: "actions",
      header: () => <div className="text-right">Aksi</div>,
      cell: ({ row }) => (
        <div className="text-right space-x-2">
          <Link href="/pengajuan/baru">
            <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white">
              Lanjutkan <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Button size="icon" variant="ghost" className="text-danger hover:text-danger-700 hover:bg-danger/10" onClick={() => handleDeleteSingle(row.original.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-[1400px] w-full mx-auto space-y-6 pb-24 relative">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Draft Proposal</h1>
        <p className="text-neutral-500">Lanjutkan pengisian form pengajuan proposal Anda yang belum selesai.</p>
      </div>

      <DataTable 
        columns={columns} 
        data={drafts} 
        searchKey="judul"
        searchPlaceholder="Cari judul draft..."
        selectable={true}
        onSelectionChange={setSelectedDrafts}
      />

      {/* Floating Action Bar */}
      {selectedDrafts.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-neutral-200 px-6 py-4 flex items-center space-x-6 z-50 animate-in slide-in-from-bottom-5">
          <div className="flex items-center space-x-2 border-r border-neutral-200 pr-6">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold">
              {selectedDrafts.length}
            </span>
            <span className="text-sm font-medium text-neutral-600">terpilih</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="destructive" onClick={() => setIsDeleteModalOpen(true)}>
              <Trash2 className="w-4 h-4 mr-2" />
              Hapus Sekaligus
            </Button>
          </div>
        </div>
      )}

      {/* Konfirmasi Hapus Massal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus {selectedDrafts.length} draft proposal ini? Data yang dihapus tidak dapat dikembalikan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleBatchDelete}>Ya, Hapus Semua</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
