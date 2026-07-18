"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { UserPlus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";

const initialMockProposals = [
  { id: "PRP-2026-009", title: "Pengembangan Sistem Cerdas Berbasis IoT", dosen: "Dr. Budi Santoso", skim: "Penelitian Terapan", reviewer: null, bidangIlmu: "Saintek" },
  { id: "PRP-2026-010", title: "Pemberdayaan UMKM Kopi Lokal", dosen: "Siti Aminah, M.M.", skim: "Program Kemitraan Masyarakat", reviewer: "Prof. Dr. Anton", bidangIlmu: "Soshum" },
  { id: "PRP-2026-012", title: "Analisis Dampak Perubahan Iklim", dosen: "Dr. Lina Mardiana", skim: "Penelitian Dasar", reviewer: null, bidangIlmu: "Saintek" },
];

const REVIEWERS = [
  { id: "REV-1", name: "Prof. Dr. Anton", bidangIlmu: "Soshum" },
  { id: "REV-2", name: "Dr. Rina Puspita", bidangIlmu: "Saintek" },
  { id: "REV-3", name: "Dr. Hasanudin", bidangIlmu: "Kesehatan" },
  { id: "REV-4", name: "Prof. Maria", bidangIlmu: "Bahasa" },
];

export default function PenetapanReviewerPage() {
  const [proposals, setProposals] = useState(initialMockProposals);
  const [selectedProposals, setSelectedProposals] = useState<typeof initialMockProposals>([]);
  
  const [selectedReviewer, setSelectedReviewer] = useState<string>("");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [activeProposalId, setActiveProposalId] = useState<string | null>(null);

  const [filterBidang, setFilterBidang] = useState("Semua");

  const filteredProposals = proposals.filter((p) => {
    return filterBidang === "Semua" || p.bidangIlmu === filterBidang;
  });

  const handleAssignSingle = (propId: string) => {
    setActiveProposalId(propId);
    const prop = proposals.find(p => p.id === propId);
    setSelectedReviewer(prop?.reviewer || "");
    setIsAssignModalOpen(true);
  };

  const handleAssignBatch = () => {
    setActiveProposalId(null);
    setSelectedReviewer("");
    setIsAssignModalOpen(true);
  };

  const submitAssignment = () => {
    if (!selectedReviewer) {
      toast.error("Pilih reviewer terlebih dahulu!");
      return;
    }
    
    if (activeProposalId) {
      // Single assignment
      setProposals(prev => prev.map(p => p.id === activeProposalId ? { ...p, reviewer: selectedReviewer } : p));
      toast.success(`Reviewer berhasil ditugaskan untuk ${activeProposalId}`);
    } else {
      // Batch assignment
      const selectedIds = selectedProposals.map(p => p.id);
      setProposals(prev => prev.map(p => selectedIds.includes(p.id) ? { ...p, reviewer: selectedReviewer } : p));
      toast.success(`${selectedIds.length} proposal berhasil ditugaskan ke ${selectedReviewer}`);
      setSelectedProposals([]);
    }
    
    setIsAssignModalOpen(false);
  };

  const columns: ColumnDef<typeof initialMockProposals[0]>[] = [
    {
      accessorKey: "id",
      header: "ID Usulan",
      cell: ({ row }) => <span className="font-medium text-neutral-600">{row.original.id}</span>
    },
    {
      accessorKey: "title",
      header: "Judul Proposal",
      cell: ({ row }) => (
        <div className="font-semibold text-neutral-900 min-w-[120px] md:min-w-[280px] max-w-sm whitespace-normal line-clamp-none md:line-clamp-2">
          {row.original.title}
        </div>
      )
    },
    {
      accessorKey: "dosen",
      header: "Ketua Pengusul"
    },
    {
      accessorKey: "reviewer",
      header: "Reviewer",
      cell: ({ row }) => (
        row.original.reviewer ? (
          <Badge variant="outline" className="text-primary-700 bg-primary-50 border-primary-200">
            {row.original.reviewer} (Assigned)
          </Badge>
        ) : (
          <Badge variant="outline" className="text-warning-700 bg-warning-50 border-warning-200">
            Belum Ditugaskan
          </Badge>
        )
      )
    },
    {
      id: "actions",
      header: () => <div className="text-right">Aksi</div>,
      cell: ({ row }) => (
        <div className="text-right">
          <Button 
            size="sm" 
            variant={row.original.reviewer ? "outline" : "default"} 
            onClick={() => handleAssignSingle(row.original.id)}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            {row.original.reviewer ? "Ubah Reviewer" : "Tugaskan Reviewer"}
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-[1600px] w-full mx-auto space-y-6 pb-24 relative">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Penetapan Reviewer</h1>
        <p className="text-neutral-500">Tugaskan reviewer ahli untuk menilai proposal usulan P2M.</p>
      </div>

      <DataTable 
        columns={columns} 
        data={filteredProposals} 
        searchKey="title"
        searchPlaceholder="Cari judul proposal..."
        selectable={true}
        onSelectionChange={setSelectedProposals}
        toolbarElements={
          <Select value={filterBidang} onValueChange={(val) => setFilterBidang(val as string)}>
            <SelectTrigger className="w-[200px] bg-white h-10">
              <SelectValue placeholder="Bidang Ilmu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Semua">Semua Bidang</SelectItem>
              <SelectItem value="Saintek">Saintek</SelectItem>
              <SelectItem value="Soshum">Soshum</SelectItem>
              <SelectItem value="Kesehatan">Kesehatan</SelectItem>
              <SelectItem value="Bahasa">Bahasa</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      {/* Floating Action Bar (Batch Actions) */}
      {selectedProposals.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-neutral-200 px-6 py-4 flex items-center space-x-6 z-50 animate-in slide-in-from-bottom-5">
          <div className="flex items-center space-x-2 border-r border-neutral-200 pr-6">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold">
              {selectedProposals.length}
            </span>
            <span className="text-sm font-medium text-neutral-600">terpilih</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button className="bg-primary-600 hover:bg-primary-700 text-white" onClick={handleAssignBatch}>
              <UserPlus className="w-4 h-4 mr-2" />
              Tugaskan Massal
            </Button>
          </div>
        </div>
      )}

      {/* Assignment Modal (Single & Batch) */}
      <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{activeProposalId ? "Tugaskan Reviewer" : "Penugasan Massal"}</DialogTitle>
            <DialogDescription>
              {activeProposalId 
                ? `Pilih reviewer internal yang akan menilai proposal ${activeProposalId}.`
                : `Pilih reviewer internal yang akan menilai ${selectedProposals.length} proposal sekaligus.`
              }
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700">Reviewer Internal</label>
              <Select value={selectedReviewer} onValueChange={(val) => setSelectedReviewer(val as string)}>
                <SelectTrigger>
                  <SelectValue placeholder="-- Pilih Reviewer --" />
                </SelectTrigger>
                <SelectContent>
                  {REVIEWERS.map((rev) => (
                    <SelectItem key={rev.id} value={rev.name}>
                      <div className="flex items-center justify-between w-full pr-4 gap-4">
                        <span>{rev.name}</span>
                        {/* We only show "Sesuai Bidang" if it's single assignment since batch might have mixed bidang */}
                        {activeProposalId && proposals.find(p => p.id === activeProposalId)?.bidangIlmu === rev.bidangIlmu && (
                          <Badge variant="success" className="text-[10px] py-0">Sesuai Bidang</Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignModalOpen(false)}>Batal</Button>
            <Button onClick={submitAssignment}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Simpan Penugasan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
