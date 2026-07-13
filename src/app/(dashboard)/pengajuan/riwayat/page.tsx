"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Download, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { AdvancedExportModal } from "@/components/shared/AdvancedExportModal";
import { ProposalTable } from "@/components/app/ProposalTable";
import { mockProposals } from "@/mock/data/proposals";
import { Proposal } from "@/types";

export default function RiwayatProposalPage() {
  const router = useRouter();
  
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const openDetail = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setIsDetailOpen(true);
  };

  const handleDuplicate = (proposal: Proposal) => {
    localStorage.setItem("simlppm-clone", JSON.stringify(proposal));
    toast.success("Data proposal berhasil disalin, mengalihkan ke form pengajuan baru...");
    router.push("/pengajuan/baru");
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "DITERIMA":
      case "SELESAI":
        return <Badge variant="outline" className="bg-success-50 text-success-700 border-success-200">{status}</Badge>;
      case "DITOLAK":
        return <Badge variant="outline" className="bg-danger-50 text-danger-700 border-danger-200">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  }

  const exportColumns = [
    { key: "id", label: "ID Proposal" },
    { key: "title", label: "Judul" },
    { key: "schemeName", label: "Skim" },
    { key: "year", label: "Tahun" },
    { key: "status", label: "Status" },
    { key: "budget", label: "Dana Disetujui" }
  ];

  const renderActions = (p: Proposal) => (
    <>
      <Button size="icon" variant="ghost" className="text-primary-600 hover:text-primary-800" title="Lihat Detail" onClick={() => openDetail(p)}>
        <Eye className="w-4 h-4" />
      </Button>
      <Button size="icon" variant="ghost" className="text-neutral-600 hover:text-neutral-900" title="Unduh PDF" onClick={() => toast.success(`Dokumen PDF untuk ${p.id} sedang diunduh (Simulasi)`)}>
        <Download className="w-4 h-4" />
      </Button>
      <Button size="icon" variant="ghost" className="text-amber-600 hover:text-amber-800" title="Duplikasi Proposal" onClick={() => handleDuplicate(p)}>
        <Copy className="w-4 h-4" />
      </Button>
    </>
  );

  return (
    <div className="max-w-[1600px] w-full mx-auto space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Riwayat Proposal Saya</h1>
          <p className="text-neutral-500">Daftar seluruh proposal P2M yang pernah Anda ajukan di periode sebelumnya.</p>
        </div>
        <AdvancedExportModal 
          data={mockProposals} 
          filename="riwayat-proposal" 
          columns={exportColumns}
          triggerLabel="Ekspor"
          className="shrink-0 border-neutral-200 text-neutral-700" 
          variant="outline"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          <ProposalTable proposals={mockProposals} renderActions={renderActions} />
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
                  <p className="text-neutral-900 font-medium">{selectedProposal.title}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-500 mb-1">Skim</h3>
                    <p className="text-neutral-900">{selectedProposal.schemeName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-500 mb-1">Tahun Pengajuan</h3>
                    <p className="text-neutral-900">{selectedProposal.year}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-500 mb-1">Dana Disetujui</h3>
                    <p className="text-neutral-900 font-semibold">Rp {selectedProposal.budget.toLocaleString('id-ID')}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-500 mb-1">Tanggal Pengajuan</h3>
                    <p className="text-neutral-900">{new Date(selectedProposal.submittedAt).toLocaleDateString('id-ID')}</p>
                  </div>
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
