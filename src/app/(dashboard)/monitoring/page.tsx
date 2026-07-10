"use client";

import { useAuthStore } from "@/store/authStore";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ProposalStatus } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { FileText, Eye } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// Mock Data untuk tabel monitoring
const MOCK_PROPOSALS = [
  {
    id: "PROP-2026-001",
    title: "Pengembangan Model Machine Learning untuk Deteksi Dini Kebakaran Hutan di Lahan Gambut Kalimantan Barat",
    schemeName: "Penelitian Terapan (PT)",
    submittedAt: "2026-06-15T08:30:00Z",
    status: "DIREVIEW" as ProposalStatus,
  },
  {
    id: "PROP-2026-002",
    title: "Sistem Informasi Geografis Pemetaan Potensi Wisata Alam Berbasis Partisipasi Masyarakat",
    schemeName: "Penelitian Dasar (PD)",
    submittedAt: "2026-05-20T14:15:00Z",
    status: "DITERIMA" as ProposalStatus,
  },
  {
    id: "PROP-2025-104",
    title: "Pemberdayaan Kelompok Tani Wanita Melalui Diversifikasi Produk Olahan Lidah Buaya",
    schemeName: "Program Kemitraan Masyarakat (PKM)",
    submittedAt: "2025-11-10T09:00:00Z",
    status: "SELESAI" as ProposalStatus,
  }
];

export default function MonitoringPage() {
  const { user } = useAuthStore();

  const columns: ColumnDef<typeof MOCK_PROPOSALS[0]>[] = [
    {
      accessorKey: "title",
      header: "Judul Usulan",
      cell: ({ row }) => {
        const title = row.getValue("title") as string;
        return (
          <div className="max-w-md">
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
      cell: ({ row }) => (
        <Link href={`/monitoring/${row.original.id}`}>
          <Button variant="outline" size="sm" className="h-8 flex items-center text-primary-600 hover:text-primary-700">
            <Eye className="w-4 h-4 mr-1.5" />
            Detail
          </Button>
        </Link>
      )
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
      </div>

      <DataTable 
        columns={columns} 
        data={MOCK_PROPOSALS} 
        searchKey="title"
        searchPlaceholder="Cari judul proposal..."
      />
    </div>
  );
}
