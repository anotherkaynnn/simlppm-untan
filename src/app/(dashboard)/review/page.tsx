"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ProposalStatus } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Search, PenLine } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDebounce } from "@/hooks/useDebounce";

// Data Dummy Penugasan Review
const MOCK_ASSIGNED_REVIEWS = [
  {
    id: "PROP-2026-045",
    title: "Sintesis Material Maju untuk Sel Surya Fleksibel Berbasis Perovskite",
    submitter: "Dr. Budi Santoso",
    schemeName: "Penelitian Dasar",
    bidangIlmu: "Sains dan Teknologi",
    status: "DIREVIEW" as ProposalStatus,
  },
  {
    id: "PROP-2026-052",
    title: "Pemanfaatan Limbah Cangkang Kelapa Sawit sebagai Briket Berkualitas Tinggi",
    submitter: "Ir. Ahmad Riyadi, M.T.",
    schemeName: "Penelitian Terapan",
    bidangIlmu: "Agrokompleks",
    status: "DIREVIEW" as ProposalStatus,
  },
  {
    id: "PROP-2026-068",
    title: "Evaluasi Kebijakan Publik terhadap Pertumbuhan Ekonomi Kreatif",
    submitter: "Siti Aminah, M.M.",
    schemeName: "Penelitian Dasar",
    bidangIlmu: "Sosial dan Humaniora",
    status: "SELESAI" as ProposalStatus,
  },
];

export default function DaftarReviewPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBidang, setFilterBidang] = useState("Semua");
  const [filterSkim, setFilterSkim] = useState("Semua");
  
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredData = MOCK_ASSIGNED_REVIEWS.filter((item) => {
    const searchLower = debouncedSearch.toLowerCase();
    const matchSearch = item.title.toLowerCase().includes(searchLower) || item.submitter.toLowerCase().includes(searchLower);
    const matchBidang = filterBidang === "Semua" || item.bidangIlmu === filterBidang;
    const matchSkim = filterSkim === "Semua" || item.schemeName === filterSkim;
    
    return matchSearch && matchBidang && matchSkim;
  });

  const columns: ColumnDef<typeof MOCK_ASSIGNED_REVIEWS[0]>[] = [
    {
      accessorKey: "title",
      header: "Judul Usulan & Pengusul",
      cell: ({ row }) => {
        return (
          <div className="min-w-[280px] max-w-md">
            <span className="font-semibold text-neutral-900 whitespace-normal line-clamp-2">{row.original.title}</span>
            <span className="text-sm text-neutral-600 block mt-1">{row.original.submitter}</span>
            <span className="text-xs text-neutral-500 block">{row.original.id}</span>
          </div>
        );
      }
    },
    {
      accessorKey: "schemeName",
      header: "Kategori (Skim & Bidang)",
      cell: ({ row }) => (
        <div className="min-w-[150px]">
          <span className="text-sm font-medium text-neutral-900 block">{row.original.schemeName}</span>
          <span className="text-xs text-neutral-500 block">{row.original.bidangIlmu}</span>
        </div>
      )
    },
    {
      accessorKey: "status",
      header: "Status Review",
      cell: ({ row }) => (
        <div className="min-w-[120px]">
          <StatusBadge status={row.original.status} />
        </div>
      )
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="min-w-[120px]">
          <Link href={`/review/${row.original.id}`}>
            <Button 
              variant={row.original.status === "SELESAI" ? "outline" : "default"} 
              size="sm" 
              className={row.original.status === "SELESAI" ? "" : "bg-primary-600 hover:bg-primary-700 text-white"}
            >
              <PenLine className="w-4 h-4 mr-2" />
              {row.original.status === "SELESAI" ? "Lihat Hasil" : "Beri Penilaian"}
            </Button>
          </Link>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Daftar Review Proposal</h1>
        <p className="text-neutral-500">Tinjau dan berikan penilaian terhadap proposal yang ditugaskan kepada Anda.</p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        {/* Panel Filter */}
        <div className="p-4 border-b border-neutral-200 bg-neutral-50/50 flex flex-col xl:flex-row items-center gap-4">
          <div className="relative w-full xl:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input 
              placeholder="Cari judul proposal atau ketua pengusul..." 
              className="pl-9 bg-white" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row w-full xl:w-auto gap-4">
            <Select value={filterBidang} onValueChange={(val) => setFilterBidang(val || "Semua")}>
              <SelectTrigger className="w-full sm:w-[220px] bg-white">
                <SelectValue placeholder="Semua Bidang Ilmu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Semua">Semua Bidang Ilmu</SelectItem>
                <SelectItem value="Sains dan Teknologi">Sains dan Teknologi</SelectItem>
                <SelectItem value="Sosial dan Humaniora">Sosial dan Humaniora</SelectItem>
                <SelectItem value="Kesehatan dan Kedokteran">Kesehatan dan Kedokteran</SelectItem>
                <SelectItem value="Agrokompleks">Agrokompleks</SelectItem>
                <SelectItem value="Pendidikan">Pendidikan</SelectItem>
                <SelectItem value="Seni dan Budaya">Seni dan Budaya</SelectItem>
                <SelectItem value="Ekonomi dan Bisnis">Ekonomi dan Bisnis</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterSkim} onValueChange={(val) => setFilterSkim(val || "Semua")}>
              <SelectTrigger className="w-full sm:w-[220px] bg-white">
                <SelectValue placeholder="Semua Kompetensi/Skim" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Semua">Semua Kompetensi/Skim</SelectItem>
                <SelectItem value="Penelitian Dasar">Penelitian Dasar</SelectItem>
                <SelectItem value="Penelitian Terapan">Penelitian Terapan</SelectItem>
                <SelectItem value="Program Kemitraan Masyarakat">Program Kemitraan Masyarakat</SelectItem>
                <SelectItem value="Pengembangan Kewirausahaan">Pengembangan Kewirausahaan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabel */}
        <DataTable 
          columns={columns} 
          data={filteredData} 
          searchPlaceholder="Cari..."
        />
      </div>
    </div>
  );
}
