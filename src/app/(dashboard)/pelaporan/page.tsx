"use client";

import { useAuthStore } from "@/store/authStore";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ProposalStatus } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const MOCK_PELAPORAN = [
  {
    id: "PROP-2025-104",
    title: "Pemberdayaan Kelompok Tani Wanita Melalui Diversifikasi Produk Olahan Lidah Buaya",
    schemeName: "Program Kemitraan Masyarakat (PKM)",
    submittedAt: "2025-11-10T09:00:00Z",
    status: "Disetujui",
  },
  {
    id: "PROP-2025-105",
    title: "Pengembangan Sistem Informasi Geografis Pemetaan Lahan Gambut",
    schemeName: "Penelitian Dasar Unggulan (PDU)",
    submittedAt: "2025-11-11T09:00:00Z",
    status: "Draft",
  },
  {
    id: "PROP-2025-106",
    title: "Pelatihan Kewirausahaan Digital bagi UMKM Kerajinan Tangan",
    schemeName: "Program Kemitraan Masyarakat (PKM)",
    submittedAt: "2025-11-12T09:00:00Z",
    status: "Belum Unggah",
  }
];

export default function PelaporanIndexPage() {
  const { user } = useAuthStore();

  const columns: ColumnDef<typeof MOCK_PELAPORAN[0]>[] = [
    {
      accessorKey: "title",
      header: "Judul Usulan",
      cell: ({ row }) => {
        const title = row.getValue("title") as string;
        return (
          <div className="min-w-[120px] md:min-w-[280px] max-w-md">
            <span className="font-semibold text-neutral-900 line-clamp-none md:line-clamp-2 leading-snug">{title}</span>
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        if (status === "Belum Unggah") return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">{status}</Badge>;
        if (status === "Draft") return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">{status}</Badge>;
        if (status === "Disetujui") return <Badge variant="outline" className="bg-success-50 text-success-700 border-success-200">{status}</Badge>;
        return <StatusBadge status={status as ProposalStatus} />;
      }
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <Link href={`/pelaporan/${row.original.id}`}>
          <Button variant="default" size="sm" className="h-8 flex items-center">
            <UploadCloud className="w-4 h-4 mr-1.5" />
            Unggah Laporan
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
          <h1 className="text-2xl font-bold text-neutral-900">Pelaporan Akhir</h1>
          <p className="text-neutral-500">Unggah laporan akhir dan luaran untuk proposal yang didanai.</p>
        </div>
        <Link href="/pelaporan/hki">
          <Button variant="outline" className="bg-white">
            Kelola Luaran HKI
          </Button>
        </Link>
      </div>

      <DataTable 
        columns={columns} 
        data={MOCK_PELAPORAN} 
        searchKey="title"
        searchPlaceholder="Cari judul proposal..."
      />
    </div>
  );
}
