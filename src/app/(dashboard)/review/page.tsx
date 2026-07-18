"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PenLine, Eye, Search } from "lucide-react";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";

type ReviewStatus = "BELUM_DIREVIEW" | "SETUJU" | "TIDAK_SETUJU";

interface ReviewItem {
  no: number;
  id: string;
  title: string;
  tahun: number;
  tipe: "Penelitian" | "Pengabdian";
  skim: string;
  bidangIlmu: string;
  submitter: string;
  reviewStatus: ReviewStatus;
}

const MOCK_ASSIGNED_REVIEWS: ReviewItem[] = [
  {
    no: 1,
    id: "PROP-2026-045",
    title: "Sintesis Material Maju untuk Sel Surya Fleksibel Berbasis Perovskite",
    tahun: 2026,
    tipe: "Penelitian",
    skim: "Penelitian Dasar Unggulan",
    bidangIlmu: "Sains dan Teknologi",
    submitter: "Dr. Budi Santoso, S.T., M.T.",
    reviewStatus: "BELUM_DIREVIEW",
  },
  {
    no: 2,
    id: "PROP-2026-052",
    title: "Pemanfaatan Limbah Cangkang Kelapa Sawit sebagai Briket Berkualitas Tinggi",
    tahun: 2026,
    tipe: "Penelitian",
    skim: "Penelitian Terapan",
    bidangIlmu: "Agrokompleks",
    submitter: "Ir. Ahmad Riyadi, M.T.",
    reviewStatus: "BELUM_DIREVIEW",
  },
  {
    no: 3,
    id: "PROP-2026-060",
    title: "Pengembangan Aplikasi Deteksi Dini Stunting Berbasis Machine Learning",
    tahun: 2026,
    tipe: "Penelitian",
    skim: "Penelitian Dosen Pemula",
    bidangIlmu: "Kesehatan dan Kedokteran",
    submitter: "dr. Lina Kusuma, M.Kes.",
    reviewStatus: "BELUM_DIREVIEW",
  },
  {
    no: 4,
    id: "PROP-2026-068",
    title: "Evaluasi Kebijakan Publik terhadap Pertumbuhan Ekonomi Kreatif",
    tahun: 2026,
    tipe: "Penelitian",
    skim: "Penelitian Dasar Unggulan",
    bidangIlmu: "Sosial dan Humaniora",
    submitter: "Siti Aminah, M.M.",
    reviewStatus: "SETUJU",
  },
  {
    no: 5,
    id: "PROP-2025-031",
    title: "Pemberdayaan UMKM Pesisir Melalui Digitalisasi Produk Olahan Ikan",
    tahun: 2025,
    tipe: "Pengabdian",
    skim: "Program Kemitraan Masyarakat (PKM)",
    bidangIlmu: "Sosial dan Humaniora",
    submitter: "Prof. Dr. Hendra Wijaya",
    reviewStatus: "SETUJU",
  },
  {
    no: 6,
    id: "PROP-2025-019",
    title: "Optimasi Jaringan Saraf Tiruan untuk Prediksi Cuaca Tropis",
    tahun: 2025,
    tipe: "Penelitian",
    skim: "Penelitian Dasar",
    bidangIlmu: "Sains dan Teknologi",
    submitter: "Agus Priyanto, M.Kom.",
    reviewStatus: "TIDAK_SETUJU",
  },
];

const TAB_LABELS: Record<ReviewStatus, string> = {
  BELUM_DIREVIEW: "Belum Direview",
  TIDAK_SETUJU: "Tidak Setuju",
  SETUJU: "Setuju",
};

function ReviewStatusBadge({ status }: { status: ReviewStatus }) {
  if (status === "BELUM_DIREVIEW")
    return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30 text-[10px] font-semibold">Belum Direview</Badge>;
  if (status === "SETUJU")
    return <Badge variant="outline" className="bg-success/10 text-success border-success/30 text-[10px] font-semibold">Setuju</Badge>;
  return <Badge variant="outline" className="bg-danger/10 text-danger border-danger/30 text-[10px] font-semibold">Tidak Setuju</Badge>;
}

export default function DaftarReviewPage() {
  const [activeTab, setActiveTab] = useState<ReviewStatus | "SEMUA">("SEMUA");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBidang, setFilterBidang] = useState("Semua");
  const [filterSkim, setFilterSkim] = useState("Semua");

  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredData = MOCK_ASSIGNED_REVIEWS.filter((item) => {
    const searchLower = debouncedSearch.toLowerCase();
    const matchSearch =
      item.title.toLowerCase().includes(searchLower) ||
      item.submitter.toLowerCase().includes(searchLower);
    const matchBidang = filterBidang === "Semua" || item.bidangIlmu === filterBidang;
    const matchSkim = filterSkim === "Semua" || item.skim === filterSkim;
    const matchTab = activeTab === "SEMUA" || item.reviewStatus === activeTab;
    return matchSearch && matchBidang && matchSkim && matchTab;
  }).map((item, idx) => ({ ...item, no: idx + 1 }));

  const columns: ColumnDef<ReviewItem>[] = [
    {
      accessorKey: "no",
      header: "No.",
      cell: ({ row }) => (
        <span className="text-sm text-neutral-500 font-medium">{row.index + 1}</span>
      ),
      size: 50,
    },
    {
      accessorKey: "title",
      header: "Judul",
      cell: ({ row }) => (
        <div className="min-w-[120px] md:min-w-[260px] max-w-md">
          <span className="font-semibold text-neutral-900 whitespace-normal line-clamp-none md:line-clamp-2 block">
            {row.original.title}
          </span>
          <span className="text-xs text-neutral-500 mt-0.5 block">
            {row.original.submitter} · {row.original.id}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "tahun",
      header: "Tahun",
      cell: ({ row }) => (
        <span className="text-sm text-neutral-700 font-medium">{row.original.tahun}</span>
      ),
      size: 80,
    },
    {
      accessorKey: "tipe",
      header: "Tipe",
      cell: ({ row }) => (
        <div>
          <span className="text-sm font-medium text-neutral-900 block">{row.original.tipe}</span>
          <span className="text-xs text-neutral-500">{row.original.skim}</span>
        </div>
      ),
    },
    {
      id: "reviewStatus",
      header: "Status",
      cell: ({ row }) => <ReviewStatusBadge status={row.original.reviewStatus} />,
      size: 140,
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="min-w-[130px]">
          <Link href={`/review/${row.original.id}`}>
            <Button
              variant={row.original.reviewStatus !== "BELUM_DIREVIEW" ? "outline" : "default"}
              size="sm"
              className={
                row.original.reviewStatus === "BELUM_DIREVIEW"
                  ? "bg-primary-600 hover:bg-primary-700 text-white"
                  : ""
              }
            >
              {row.original.reviewStatus === "BELUM_DIREVIEW" ? (
                <><PenLine className="w-4 h-4 mr-1.5" /> Beri Penilaian</>
              ) : (
                <><Eye className="w-4 h-4 mr-1.5" /> Lihat Hasil</>
              )}
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Daftar Review Proposal</h1>
        <p className="text-neutral-500">
          Tinjau dan berikan penilaian terhadap proposal yang ditugaskan kepada Anda.
        </p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">

        {/* Panel Filter Dropdown */}
        <div className="p-4 border-b border-neutral-200 bg-neutral-50/30 flex flex-col xl:flex-row items-center gap-4">
          <div className="relative w-full xl:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input
              placeholder="Cari judul proposal atau ketua pengusul..."
              className="pl-9 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row w-full xl:w-auto gap-4">
            {/* Dropdown Status Review (tab yang dijadikan dropdown) */}
            <Select value={activeTab} onValueChange={(val) => setActiveTab(val as ReviewStatus | "SEMUA")}>
              <SelectTrigger className="w-full sm:w-[200px] bg-white">
                <SelectValue>
                  {activeTab === "SEMUA" && "Semua Status"}
                  {activeTab === "BELUM_DIREVIEW" && "Belum Direview"}
                  {activeTab === "TIDAK_SETUJU" && "Tidak Setuju"}
                  {activeTab === "SETUJU" && "Setuju"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SEMUA">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neutral-400 inline-block" />
                    Semua Status ({MOCK_ASSIGNED_REVIEWS.length})
                  </span>
                </SelectItem>
                <SelectItem value="BELUM_DIREVIEW">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-warning inline-block" />
                    Belum Direview ({MOCK_ASSIGNED_REVIEWS.filter(i => i.reviewStatus === "BELUM_DIREVIEW").length})
                  </span>
                </SelectItem>
                <SelectItem value="TIDAK_SETUJU">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-danger inline-block" />
                    Tidak Setuju ({MOCK_ASSIGNED_REVIEWS.filter(i => i.reviewStatus === "TIDAK_SETUJU").length})
                  </span>
                </SelectItem>
                <SelectItem value="SETUJU">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success inline-block" />
                    Setuju ({MOCK_ASSIGNED_REVIEWS.filter(i => i.reviewStatus === "SETUJU").length})
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
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
                <SelectItem value="Penelitian Dasar Unggulan">Penelitian Dasar Unggulan</SelectItem>
                <SelectItem value="Penelitian Terapan">Penelitian Terapan</SelectItem>
                <SelectItem value="Penelitian Dosen Pemula">Penelitian Dosen Pemula</SelectItem>
                <SelectItem value="Program Kemitraan Masyarakat (PKM)">Program Kemitraan Masyarakat (PKM)</SelectItem>
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
