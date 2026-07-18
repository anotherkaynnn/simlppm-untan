"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { TimelineStatus } from "@/components/shared/TimelineStatus";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProposalStatus } from "@/types";
import { useProposalStore } from "@/store/proposalStore";
import { useAuthStore } from "@/store/authStore";
import { RubrikReview } from "@/components/app/RubrikReview";

export default function ProposalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user } = useAuthStore();
  const { proposals } = useProposalStore();

  const proposal = proposals.find(p => p.id === id);

  if (!proposal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Proposal Tidak Ditemukan</h1>
        <Button onClick={() => router.back()} variant="outline">Kembali</Button>
      </div>
    );
  }

  const timelineSteps = [
    { label: "Diajukan", status: "completed" as const, date: new Date(proposal.submittedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }), actor: proposal.submitter?.name || user?.name || "Ketua Peneliti" },
    { label: "Verifikasi Admin", status: (proposal.status === "DIAJUKAN" || proposal.status === "DRAFT") ? "pending" as const : "completed" as const, date: proposal.status !== "DIAJUKAN" && proposal.status !== "DRAFT" ? new Date(proposal.updatedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : "", actor: proposal.status !== "DIAJUKAN" && proposal.status !== "DRAFT" ? "Operator Fakultas" : "" },
    { label: "Proses Review", status: proposal.status === "DIREVIEW" ? "current" as const : (proposal.status === "DITERIMA" || proposal.status === "DITOLAK" || proposal.status === "REVISI" ? "completed" as const : "pending" as const), date: proposal.status === "DIREVIEW" ? "Sedang berlangsung" : "", note: proposal.status === "DIREVIEW" ? "Menunggu penilaian dari reviewer" : "" },
    { label: "Keputusan Final", status: (proposal.status === "DITERIMA" || proposal.status === "DITOLAK") ? "completed" as const : "pending" as const },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="p-0 h-8 w-8">
          <ArrowLeft className="w-5 h-5 text-neutral-500" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-neutral-900 flex items-center gap-3">
            Detail Usulan
            <StatusBadge status={proposal.status} />
          </h1>
          <p className="text-neutral-500 text-sm mt-0.5">{proposal.id} • {proposal.schemeName}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 md:p-8">
        <h2 className="text-lg font-bold text-neutral-900 mb-6">{proposal.title}</h2>
        
        <div className="mb-12">
          <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-6">Status Perjalanan</h3>
          <TimelineStatus steps={timelineSteps} />
        </div>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="w-full md:w-auto flex overflow-x-auto justify-start border-b border-neutral-200 rounded-none bg-transparent h-auto p-0 mb-6">
            <TabsTrigger value="info" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-500 data-[state=active]:shadow-none px-6 py-3">Informasi Umum</TabsTrigger>
            <TabsTrigger value="anggota" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-500 data-[state=active]:shadow-none px-6 py-3">Anggota Tim</TabsTrigger>
            <TabsTrigger value="penilaian" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-500 data-[state=active]:shadow-none px-6 py-3">Penilaian</TabsTrigger>
            <TabsTrigger value="berkas" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-500 data-[state=active]:shadow-none px-6 py-3">Berkas Terlampir</TabsTrigger>
            <TabsTrigger value="log" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-500 data-[state=active]:shadow-none px-6 py-3">Log Aktivitas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <div>
                <p className="text-sm text-neutral-500 mb-1">Bidang Ilmu</p>
                <p className="font-medium text-neutral-900">{proposal.fieldOfStudy}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500 mb-1">Fakultas</p>
                <p className="font-medium text-neutral-900">{proposal.facultyName}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500 mb-1">Durasi Pelaksanaan</p>
                <p className="font-medium text-neutral-900">{proposal.duration} Bulan</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500 mb-1">Rencana Anggaran (RAB)</p>
                <p className="font-medium text-neutral-900">Rp {proposal.budget.toLocaleString('id-ID')}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="anggota">
            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden min-w-0 w-full">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-neutral-500 uppercase bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-3 font-medium">Nama</th>
                    <th className="px-6 py-3 font-medium">NIDN / NIM</th>
                    <th className="px-6 py-3 font-medium">Peran</th>
                  </tr>
                </thead>
                <tbody>
                  {proposal.members && proposal.members.length > 0 ? (
                    proposal.members.map((member) => (
                      <tr key={member.id} className="bg-white border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50">
                        <td className="px-6 py-4 font-medium text-neutral-900">{member.name}</td>
                        <td className="px-6 py-4 text-neutral-600">{member.nidn || "-"}</td>
                        <td className="px-6 py-4 text-neutral-600">{member.role.replace("_", " ")}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-neutral-500">
                        Tidak ada data anggota tim
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="penilaian">
            <RubrikReview proposalId={id} readOnly={user?.role !== 'REVIEWER'} />
          </TabsContent>

          <TabsContent value="berkas" className="space-y-3">
            {proposal.files && proposal.files.length > 0 ? (
              proposal.files.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                  <div>
                    <p className="font-medium text-neutral-900">{file.fileName}</p>
                    <p className="text-xs text-neutral-500">{(file.fileSize / 1024 / 1024).toFixed(1)} MB • Diunggah {new Date(file.uploadedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" /> Unduh
                  </Button>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                <div>
                  <p className="font-medium text-neutral-900">Belum ada berkas terlampir</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="log">
            <div className="space-y-4">
              {proposal.statusHistory && proposal.statusHistory.length > 0 ? (
                proposal.statusHistory.map((log, idx) => (
                  <div key={idx} className="text-sm border-b border-neutral-100 pb-4 last:border-0 last:pb-0">
                    <p className="text-neutral-500">{new Date(log.timestamp).toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB</p>
                    <p className="font-medium text-neutral-900">{log.actorName} ({log.actorRole.replace("_", " ")}) mengubah status menjadi {log.toStatus}.</p>
                    {log.note && <p className="text-neutral-600 italic mt-1">Catatan: {log.note}</p>}
                  </div>
                ))
              ) : (
                <div className="text-sm">
                  <p className="text-neutral-500">{new Date(proposal.submittedAt).toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} WIB</p>
                  <p className="font-medium text-neutral-900">{proposal.submitter?.name || user?.name || "Peneliti"} (Ketua Peneliti) mengajukan proposal ini.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
