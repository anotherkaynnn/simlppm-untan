"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuthStore } from "@/store/authStore";
import { useProposalStore } from "@/store/proposalStore";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { format, addDays, differenceInDays } from "date-fns";
import { id as localeId } from "date-fns/locale";

const STAGES = [
  { id: "DIAJUKAN", label: "Diajukan" },
  { id: "VERIFIKASI", label: "Verifikasi" },
  { id: "DIREVIEW", label: "Review" },
  { id: "KEPUTUSAN", label: "Keputusan" },
];

function ProgressIndicator({ currentStatus }: { currentStatus: string }) {
  // Tentukan stage index berdasarkan status saat ini
  let currentIndex = 0;
  if (currentStatus === "VERIFIKASI" || currentStatus === "DIVERIFIKASI") currentIndex = 1;
  else if (currentStatus === "DIREVIEW" || currentStatus === "REVISI") currentIndex = 2;
  else if (currentStatus === "DITERIMA" || currentStatus === "DITOLAK" || currentStatus === "SELESAI") currentIndex = 3;

  return (
    <div className="flex items-center w-[200px] justify-between relative mt-1">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 -z-10 -translate-y-1/2 rounded-full" />
      <div 
        className="absolute top-1/2 left-0 h-0.5 bg-primary-500 -z-10 -translate-y-1/2 rounded-full transition-all duration-500"
        style={{ width: `${(currentIndex / (STAGES.length - 1)) * 100}%` }}
      />
      {STAGES.map((stage, idx) => {
        const isCompleted = idx <= currentIndex;
        return (
          <div key={stage.id} className="relative flex flex-col items-center group">
            <div 
              className={`w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
                isCompleted ? "bg-primary-500 border-primary-500" : "bg-white border-neutral-300"
              }`}
            />
            {/* Tooltip on hover */}
            <div className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-800 text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap z-10">
              {stage.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function MonitoringAktifPage() {
  const { user } = useAuthStore();
  const { proposals } = useProposalStore();

  const getFilteredProposals = () => {
    if (!user) return [];
    if (user.role === 'DOSEN') {
      return proposals.filter(p => p.submitter.id === user.id);
    }
    if (user.role === 'ADMIN_FK' || user.role === 'OPERATOR_FK') {
      return proposals.filter(p => p.facultyName === "Fakultas Teknik" || p.facultyId === "FT");
    }
    return proposals;
  };

  const activeProposals = getFilteredProposals().filter(p => 
    ["DIAJUKAN", "VERIFIKASI", "DIVERIFIKASI", "DIREVIEW"].includes(p.status)
  );

  return (
    <div className="max-w-[1600px] w-full mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Monitoring Proposal Aktif</h1>
        <p className="text-neutral-500">Pantau proses pengajuan proposal Anda yang sedang berjalan secara real-time.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto min-w-0 w-full">
            <Table>
              <TableHeader className="bg-neutral-50">
                <TableRow>
                  <TableHead>ID / Judul Usulan</TableHead>
                  <TableHead>Pengusul</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reviewer</TableHead>
                  <TableHead>Deadline Review</TableHead>
                  <TableHead className="w-[250px]">Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeProposals.length > 0 ? (
                  activeProposals.map((proposal) => {
                    const mockDeadline = addDays(new Date(proposal.submittedAt), 14);
                    const sisa = differenceInDays(mockDeadline, new Date());
                    
                    return (
                      <TableRow key={proposal.id}>
                        <TableCell>
                          <span className="text-xs font-medium text-neutral-500 block">{proposal.id}</span>
                          <span className="font-semibold text-neutral-900 line-clamp-2 mt-0.5" title={proposal.title}>
                            {proposal.title}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm font-medium text-neutral-700">
                          {proposal.submitter.name}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={proposal.status} />
                        </TableCell>
                        <TableCell className="text-sm text-neutral-600">
                          {proposal.status === "DIREVIEW" ? "Dr. Reviewer Mock" : "-"}
                        </TableCell>
                        <TableCell className="text-sm text-neutral-600">
                          {proposal.status === "DIREVIEW" ? (
                            <div className="flex items-center gap-2">
                              <span>{format(mockDeadline, "dd MMM yyyy", { locale: localeId })}</span>
                              {sisa < 0 ? (
                                <Badge variant="destructive">Terlambat</Badge>
                              ) : sisa <= 1 ? (
                                <Badge variant="destructive">H-{sisa}</Badge>
                              ) : sisa <= 7 ? (
                                <Badge variant="warning">H-{sisa}</Badge>
                              ) : null}
                            </div>
                          ) : "-"}
                        </TableCell>
                        <TableCell>
                          <ProgressIndicator currentStatus={proposal.status} />
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-neutral-500">
                      Tidak ada proposal yang sedang aktif dalam proses pengajuan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
