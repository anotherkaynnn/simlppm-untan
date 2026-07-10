"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ProposalStatus } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CheckCircle2, XCircle, Eye, FileText, Download, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";


const MOCK_VERIFIKASI = [
  {
    id: "PROP-2026-003",
    title: "Sintesis Material Maju untuk Sel Surya Fleksibel",
    schemeName: "Penelitian Dasar (PD)",
    submittedAt: "2026-06-16T10:00:00Z",
    status: "DIAJUKAN" as ProposalStatus,
    submitter: "Dr. Budi Santoso",
  },
  {
    id: "PROP-2026-004",
    title: "Pemanfaatan Limbah Pertanian sebagai Adsorben Logam Berat",
    schemeName: "Penelitian Terapan (PT)",
    submittedAt: "2026-06-15T14:30:00Z",
    status: "DIAJUKAN" as ProposalStatus,
    submitter: "Prof. Rina Mulyati",
  },
];

export default function VerifikasiPage() {
  const [selectedProposals, setSelectedProposals] = useState<typeof MOCK_VERIFIKASI>([]);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectNote, setRejectNote] = useState("");
  const [reviewProposal, setReviewProposal] = useState<typeof MOCK_VERIFIKASI[0] | null>(null);

  const columns: ColumnDef<typeof MOCK_VERIFIKASI[0]>[] = [
    {
      accessorKey: "title",
      header: "Judul Usulan & Pengusul",
      cell: ({ row }) => (
        <div className="max-w-md">
          <span className="font-semibold text-neutral-900 line-clamp-2">{row.original.title}</span>
          <span className="text-sm text-neutral-600 block mt-1">{row.original.submitter}</span>
          <span className="text-xs text-neutral-500 block">{row.original.id}</span>
        </div>
      )
    },
    {
      accessorKey: "schemeName",
      header: "Skim",
      cell: ({ row }) => <span className="text-sm">{row.getValue("schemeName")}</span>
    },
    {
      accessorKey: "submittedAt",
      header: "Tanggal Diajukan",
      cell: ({ row }) => (
        <span className="text-sm">
          {format(new Date(row.getValue("submittedAt") as string), "dd MMM yyyy", { locale: id })}
        </span>
      )
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status") as ProposalStatus} />
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <Button 
          variant="outline" 
          size="sm" 
          className="text-primary-600 border-primary-200 hover:bg-primary-50"
          onClick={() => setReviewProposal(row.original)}
        >
          <Eye className="w-4 h-4 mr-2" />
          Periksa
        </Button>
      )
    }
  ];

  const handleBatchVerify = () => {
    toast.success(`${selectedProposals.length} proposal berhasil diverifikasi.`);
    setSelectedProposals([]);
    // Reload data logic...
  };

  const handleBatchReject = () => {
    if (!rejectNote.trim()) {
      toast.error("Catatan penolakan wajib diisi");
      return;
    }
    toast.success(`${selectedProposals.length} proposal dikembalikan ke pengusul.`);
    setIsRejectModalOpen(false);
    setRejectNote("");
    setSelectedProposals([]);
  };

  return (
    <div className="space-y-6 relative pb-24">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Verifikasi Proposal</h1>
        <p className="text-neutral-500">Periksa dan verifikasi kelengkapan administrasi proposal masuk.</p>
      </div>

      <DataTable 
        columns={columns} 
        data={MOCK_VERIFIKASI} 
        searchKey="title"
        searchPlaceholder="Cari judul proposal..."
        selectable={true}
        onSelectionChange={setSelectedProposals}
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
            <Button variant="outline" className="text-danger hover:text-danger hover:bg-danger/10 border-danger/20" onClick={() => setIsRejectModalOpen(true)}>
              <XCircle className="w-4 h-4 mr-2" />
              Kembalikan
            </Button>
            <Button className="bg-success hover:bg-success/90 text-white" onClick={handleBatchVerify}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Verifikasi Sekaligus
            </Button>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kembalikan Proposal</DialogTitle>
            <DialogDescription>
              Anda akan mengembalikan {selectedProposals.length} proposal ke pengusul untuk direvisi.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-3">
            <label className="text-sm font-semibold text-neutral-900">Catatan Pengembalian *</label>
            <Textarea 
              placeholder="Berikan alasan atau detail kekurangan berkas..."
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
              className="min-h-[100px]"
            />
            <p className="text-xs text-neutral-500">Catatan ini akan dilihat oleh dosen pengusul.</p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectModalOpen(false)}>Batal</Button>
            <Button variant="destructive" onClick={handleBatchReject}>Kembalikan Proposal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      <Dialog open={!!reviewProposal} onOpenChange={(open) => !open && setReviewProposal(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Pemeriksaan Kelengkapan Administrasi</DialogTitle>
            <DialogDescription>
              Tinjau dokumen dan isian usulan sebelum melakukan verifikasi.
            </DialogDescription>
          </DialogHeader>
          
          {reviewProposal && (
            <div className="py-4 space-y-6">
              {/* Info Utama */}
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <h3 className="font-bold text-lg text-neutral-900 leading-snug">{reviewProposal.title}</h3>
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                  <div>
                    <span className="block text-neutral-500 mb-1">Ketua Pengusul</span>
                    <span className="font-semibold text-neutral-900">{reviewProposal.submitter}</span>
                  </div>
                  <div>
                    <span className="block text-neutral-500 mb-1">Skema Pendanaan</span>
                    <span className="font-semibold text-neutral-900">{reviewProposal.schemeName}</span>
                  </div>
                </div>
              </div>

              {/* Dokumen Lampiran */}
              <div>
                <h4 className="font-bold text-neutral-900 mb-3 flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-primary-600" />
                  Dokumen Lampiran
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-danger/10 text-danger flex items-center justify-center mr-3">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-neutral-900">Proposal Lengkap (.pdf)</p>
                        <p className="text-xs text-neutral-500">Diunggah pada {format(new Date(reviewProposal.submittedAt), "dd MMM yyyy, HH:mm", { locale: id })}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Unduh
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-danger/10 text-danger flex items-center justify-center mr-3">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-neutral-900">Lembar Pengesahan (.pdf)</p>
                        <p className="text-xs text-neutral-500">Sudah ditandatangani Dekan</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Unduh
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="border-t pt-4">
            <Button 
              variant="outline" 
              className="text-danger border-danger hover:bg-danger/10"
              onClick={() => {
                setReviewProposal(null);
                setSelectedProposals([reviewProposal!]);
                setIsRejectModalOpen(true);
              }}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Kembalikan
            </Button>
            <Button 
              className="bg-success hover:bg-success/90"
              onClick={() => {
                toast.success(`Proposal ${reviewProposal?.id} berhasil diverifikasi.`);
                setReviewProposal(null);
              }}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Verifikasi Proposal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
