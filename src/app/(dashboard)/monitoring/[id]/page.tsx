"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { TimelineStatus } from "@/components/shared/TimelineStatus";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProposalStatus } from "@/types";

export default function ProposalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // Mock data untuk proposal spesifik
  const proposal = {
    id: id,
    title: "Pengembangan Model Machine Learning untuk Deteksi Dini Kebakaran Hutan di Lahan Gambut Kalimantan Barat",
    schemeName: "Penelitian Terapan (PT)",
    status: "DIREVIEW" as ProposalStatus,
    submittedAt: "15 Juni 2026",
    facultyName: "Fakultas Teknik",
    fieldOfStudy: "Teknik Informatika",
    duration: 12,
    budget: 150000000,
  };

  const timelineSteps = [
    { label: "Diajukan", status: "completed" as const, date: "15 Jun 2026", actor: "Dr. Ahmad Yani" },
    { label: "Verifikasi Admin", status: "completed" as const, date: "16 Jun 2026", actor: "Operator FT" },
    { label: "Proses Review", status: "current" as const, date: "Sedang berlangsung", note: "Reviewer 1 telah memberikan penilaian." },
    { label: "Keputusan Final", status: "pending" as const },
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
            <div className="p-4 bg-neutral-50 rounded border border-neutral-200">
              <p className="text-sm text-neutral-600">Daftar anggota tim akan ditampilkan di sini.</p>
            </div>
          </TabsContent>

          <TabsContent value="berkas" className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
              <div>
                <p className="font-medium text-neutral-900">Proposal_Utama_AhmadYani.pdf</p>
                <p className="text-xs text-neutral-500">2.4 MB • Diunggah 15 Jun 2026</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" /> Unduh
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="log">
            <div className="space-y-4">
              <div className="text-sm">
                <p className="text-neutral-500">16 Jun 2026, 09:15 WIB</p>
                <p className="font-medium text-neutral-900">Operator FT mengubah status dari DIAJUKAN menjadi DIREVIEW.</p>
                <p className="text-neutral-600 italic">Catatan: Berkas administrasi lengkap. Diteruskan ke reviewer.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
