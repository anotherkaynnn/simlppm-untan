"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Eye, FileText, Inbox, Users, ChevronRight, Download, ArrowLeft } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Komponen EmptyState
function EmptyState({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-neutral-50/50 rounded-lg border border-dashed border-neutral-200">
      <div className="bg-neutral-100 p-3 rounded-full mb-4">
        <Icon className="w-8 h-8 text-neutral-400" />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-1">{title}</h3>
      <p className="text-sm text-neutral-500 max-w-sm">{description}</p>
    </div>
  );
}

// Dummy Data
const dummyData = [
  { 
    id: 1, 
    kategori: "penelitian",
    tipe: "proposal",
    judul: "WIPO TREATY ON GRTK TANTANGAN BAGI INDONESIA DALAM MENCEGAH BIOPIRACY", 
    sumberDana: "MANDIRI", 
    skim: "Penelitian Dasar", 
    tahun: 2026, 
    prodi: "Ilmu Hukum (S1)", 
    timPelaksana: ["Devina Puspita Sari, S.H., M.H.", "Fatma Muthia, S.H., M.H.", "Amir Alfath", "Devita Velesya"],
    statusVerifikasi: "SESUAI (SIAP DIREVIEW)", 
    statusValidasi: "SELESAI",
    catatanValidasi: "Semua berkas sesuai",
    waktuUpload: "14-07-2026 20:20",
    reviewers: [
      {
        nama: "Prof. Dr. Andi Wijaya",
        status: "SUDAH DINILAI",
        catatan: "Penelitian ini sangat bagus dan relevan dengan kondisi saat ini. Latar belakang masalah diuraikan dengan jelas, metodologi yang digunakan tepat, dan luaran yang ditargetkan sangat terukur. Sangat layak didanai.",
        skor: 85
      }
    ],
    dokumen: [
      { nama: "PROPOSAL PENELITIAN", file: "proposal.pdf" }
    ],
    suratTugas: []
  },
  { 
    id: 2, 
    kategori: "penelitian",
    tipe: "proposal",
    judul: "Survei Evaluasi Pelayanan Akademik Pada Program Magister Ilmu Hukum", 
    sumberDana: "DIPA UNTAN", 
    skim: "Penelitian Dasar", 
    tahun: 2026, 
    prodi: "Ilmu Hukum (S1)", 
    timPelaksana: ["Chandra Maharani, S.H., M.H.", "Dr. Hermansyah, S.H., M.Hum.", "Dr. Siti Rohani, S.H., M.Hum.", "Muhammad Tahir, S.H., M.H."],
    statusVerifikasi: "MENUNGGU VERIFIKASI",
    statusValidasi: "BELUM",
    catatanValidasi: "", 
    waktuUpload: "13-07-2026 19:48",
    reviewers: [],
    dokumen: [],
    suratTugas: []
  },
  { 
    id: 3, 
    kategori: "pkm",
    tipe: "proposal",
    judul: "Pemberdayaan Masyarakat Nelayan Pesisir melalui Pelatihan Hukum Nelayan", 
    sumberDana: "DIPA UNTAN", 
    skim: "Pengabdian Kemitraan", 
    tahun: 2026, 
    prodi: "Ilmu Hukum (S1)", 
    timPelaksana: ["Sy Hasyim Azizurrahman, S.H., M.Hum.", "Alfonsus Hendri Soa, S.H., M.H.", "1. Fera Triwijaya", "2. Hafizh Harizar Prasetyawan"],
    statusVerifikasi: "SESUAI (SIAP DIREVIEW)", 
    statusValidasi: "LANJUT",
    catatanValidasi: "Tunggu revisi",
    waktuUpload: "08-07-2026 22:10",
    reviewers: [
      {
        nama: "Dr. Budi Santoso, S.T., M.T.",
        status: "SUDAH DINILAI",
        catatan: "Program pemberdayaan sangat tepat sasaran. Mohon pastikan keterlibatan masyarakat lebih ditekankan pada bagian metode pelaksanaan.",
        skor: 88
      }
    ],
    dokumen: [
      { nama: "PROPOSAL PKM", file: "proposal_pkm.pdf" },
      { nama: "FILE KONTRAK", file: "kontrak.pdf" }
    ],
    suratTugas: []
  },
  { 
    id: 4, 
    kategori: "penelitian",
    tipe: "laporan",
    judul: "Laporan Kemajuan: Pengaruh Hukum Adat terhadap Sistem Peradilan Pidana di Kalimantan", 
    sumberDana: "HIBAH DIKTI", 
    skim: "Penelitian Terapan", 
    tahun: 2026, 
    prodi: "Ilmu Hukum (S1)", 
    timPelaksana: ["Prof. Dr. Ir. Herman, S.H., M.H."],
    statusVerifikasi: "SESUAI (SIAP DIREVIEW)", 
    statusValidasi: "BELUM",
    catatanValidasi: "",
    waktuUpload: "15-07-2026 09:10",
    reviewers: [],
    dokumen: [
      { nama: "LAPORAN KEMAJUAN", file: "laporan_kemajuan.pdf" }
    ],
    suratTugas: []
  },
  { 
    id: 5, 
    kategori: "penelitian",
    tipe: "proposal",
    judul: "Analisis Dampak Lingkungan Tambang Emas Tradisional di Kabupaten Landak", 
    sumberDana: "HIBAH DIKTI", 
    skim: "Penelitian Dosen Pemula", 
    tahun: 2026, 
    prodi: "Ilmu Hukum (S1)", 
    timPelaksana: ["Dr. Budi Santoso, S.H., M.H.", "Rina Melati, S.H., M.H."],
    statusVerifikasi: "MENUNGGU VERIFIKASI",
    statusValidasi: "BELUM",
    catatanVerifikasi: "",
    catatanValidasi: "",
    waktuUpload: "16-07-2026 10:15",
    reviewers: [],
    dokumen: [
      { nama: "PROPOSAL PENELITIAN", file: "proposal.pdf" },
      { nama: "RAB", file: "rab.pdf" }
    ],
    suratTugas: []
  },
  { 
    id: 6, 
    kategori: "pkm",
    tipe: "proposal",
    judul: "Sosialisasi Bahaya Narkoba bagi Remaja di Lingkungan Sekolah Menengah Atas", 
    sumberDana: "DIPA UNTAN", 
    skim: "Pengabdian Kepada Masyarakat", 
    tahun: 2026, 
    prodi: "Ilmu Hukum (S1)", 
    timPelaksana: ["Drs. Joko Susilo, M.H.", "Triana, S.H."],
    statusVerifikasi: "SESUAI (SIAP DIREVIEW)", 
    statusValidasi: "BELUM",
    catatanVerifikasi: "File presentasi sangat baik",
    catatanValidasi: "",
    waktuUpload: "17-07-2026 08:30",
    reviewers: [
      {
        nama: "Prof. Dr. Andi Wijaya",
        status: "SUDAH DINILAI",
        catatan: "Sangat relevan dengan kondisi sosial saat ini. Media sosialisasi yang disiapkan cukup menarik.",
        skor: 90
      }
    ],
    dokumen: [
      { nama: "PROPOSAL PKM", file: "proposal_pkm.pdf" }
    ],
    suratTugas: []
  },
  { 
    id: 7, 
    kategori: "penelitian",
    tipe: "laporan",
    judul: "Laporan Akhir: Perlindungan Hukum Tenaga Kerja Migran Indonesia", 
    sumberDana: "MANDIRI", 
    skim: "Penelitian Terapan", 
    tahun: 2026, 
    prodi: "Ilmu Hukum (S1)", 
    timPelaksana: ["Maya Safira, S.H., M.H."],
    statusVerifikasi: "SESUAI (SIAP DIREVIEW)", 
    statusValidasi: "SELESAI",
    catatanVerifikasi: "",
    catatanValidasi: "Laporan diterima",
    waktuUpload: "18-07-2026 14:00",
    reviewers: [
      {
        nama: "Dr. Siti Rohani, S.H., M.Hum.",
        status: "SUDAH DINILAI",
        catatan: "Laporan akhir disusun dengan sangat baik dan komprehensif. Hasil penelitian telah mencapai target luaran yang dijanjikan, termasuk publikasi artikel jurnal. Sangat memuaskan.",
        skor: 92
      }
    ],
    dokumen: [
      { nama: "LAPORAN AKHIR", file: "laporan_akhir.pdf" },
      { nama: "ARTIKEL PUBLIKASI", file: "jurnal.pdf" }
    ],
    suratTugas: []
  },
  { 
    id: 8, 
    kategori: "pkm",
    tipe: "laporan",
    judul: "Laporan Kemajuan: Peningkatan Kapasitas BUMDes melalui Legal Drafting", 
    sumberDana: "HIBAH DIKTI", 
    skim: "Program Pengembangan Desa Mitra", 
    tahun: 2026, 
    prodi: "Ilmu Hukum (S1)", 
    timPelaksana: ["Hendri, S.H., M.H.", "Sari, S.H."],
    statusVerifikasi: "TIDAK SESUAI (BELUM LENGKAP)", 
    statusValidasi: "BELUM",
    catatanVerifikasi: "Mohon lengkapi daftar hadir peserta",
    catatanValidasi: "",
    waktuUpload: "19-07-2026 11:20",
    reviewers: [],
    dokumen: [
      { nama: "LAPORAN KEMAJUAN", file: "laporan_kemajuan.pdf" }
    ],
    suratTugas: []
  },
  { 
    id: 9, 
    kategori: "penelitian",
    tipe: "proposal",
    judul: "Kedudukan Hukum Cryptocurrency dalam Sistem Keuangan Indonesia", 
    sumberDana: "DIPA UNTAN", 
    skim: "Penelitian Dasar Unggulan", 
    tahun: 2026, 
    prodi: "Ilmu Hukum (S1)", 
    timPelaksana: ["Dr. Rizal, S.H., M.H."],
    statusVerifikasi: "MENUNGGU VERIFIKASI",
    statusValidasi: "BELUM",
    catatanVerifikasi: "",
    catatanValidasi: "",
    waktuUpload: "20-07-2026 09:45",
    reviewers: [],
    dokumen: [
      { nama: "PROPOSAL PENELITIAN", file: "proposal.pdf" }
    ],
    suratTugas: []
  },
  { 
    id: 10, 
    kategori: "pkm",
    tipe: "laporan",
    judul: "Laporan Akhir: Konsultasi Bantuan Hukum Gratis untuk Masyarakat Kurang Mampu", 
    sumberDana: "MANDIRI", 
    skim: "Pengabdian Kepada Masyarakat", 
    tahun: 2026, 
    prodi: "Ilmu Hukum (S1)", 
    timPelaksana: ["Anita, S.H., M.H.", "Bagas, S.H."],
    statusVerifikasi: "SESUAI (SIAP DIREVIEW)", 
    statusValidasi: "SELESAI",
    catatanVerifikasi: "",
    catatanValidasi: "Berkas lengkap dan dinilai sangat baik",
    waktuUpload: "21-07-2026 16:30",
    reviewers: [
      {
        nama: "Dr. Siti Rohani, S.H., M.Hum.",
        status: "SUDAH DINILAI",
        catatan: "Laporan akhir PKM sangat lengkap. Output berupa panduan bantuan hukum telah direalisasikan dan sangat bermanfaat bagi masyarakat sasaran.",
        skor: 95
      }
    ],
    dokumen: [
      { nama: "LAPORAN AKHIR", file: "laporan_akhir.pdf" }
    ],
    suratTugas: []
  }
];

const renderStatusBadge = (status: string) => {
  switch (status) {
    case "SESUAI (LENGKAP)":
    case "SESUAI (SIAP DIREVIEW)":
    case "SELESAI":
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">{status}</Badge>;
    case "MENUNGGU":
    case "MENUNGGU VERIFIKASI":
    case "LANJUT":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">{status}</Badge>;
    case "BELUM":
    case "DITOLAK":
    case "TIDAK SESUAI (BELUM LENGKAP)":
    case "BELUM DINILAI":
      return <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100">{status}</Badge>;
    case "SUDAH DINILAI":
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

function ReviewerDialogContent({ item }: { item: any }) {
  const [view, setView] = useState<"list" | "detail">("list");
  const [selectedReviewer, setSelectedReviewer] = useState<any>(null);

  const openDetail = (rev: any) => {
    setSelectedReviewer(rev);
    setView("detail");
  };

  if (view === "detail" && selectedReviewer) {
    return (
      <DialogContent className="sm:max-w-3xl w-full max-h-[85vh] overflow-y-auto bg-white">
        <DialogHeader className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="sm" className="h-8 px-2 text-neutral-500 hover:text-neutral-900" onClick={() => setView("list")}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Kembali
            </Button>
          </div>
          <DialogTitle>Detail Review</DialogTitle>
        </DialogHeader>
        
        <div className="bg-white p-4 rounded-lg border mb-4 shadow-sm">
          <p className="text-xs font-semibold text-neutral-500 mb-1">Nama Reviewer</p>
          <p className="text-sm font-medium text-neutral-900 mb-4">{selectedReviewer.nama}</p>
          
          <p className="text-xs font-semibold text-neutral-500 mb-1">Status</p>
          <div className="mb-4">{renderStatusBadge(selectedReviewer.status)}</div>

          <p className="text-xs font-semibold text-neutral-500 mb-1">Catatan</p>
          <p className="text-sm text-neutral-900">{selectedReviewer.catatan || "-"}</p>
        </div>

        <div className="bg-white border rounded-lg overflow-hidden shadow-sm min-w-0 w-full">
          <Table>
            <TableHeader className="bg-neutral-50">
              <TableRow>
                <TableHead className="w-12 text-center text-xs font-bold text-neutral-900">No.</TableHead>
                <TableHead className="text-xs font-bold text-neutral-900">Kriteria Penilaian</TableHead>
                <TableHead className="text-xs font-bold text-neutral-900 text-center w-20">Bobot (%)</TableHead>
                <TableHead className="text-xs font-bold text-neutral-900 text-center w-24">Skor (0-100)</TableHead>
                <TableHead className="text-xs font-bold text-neutral-900 text-right w-32">Nilai</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-center font-medium align-top text-xs">1.</TableCell>
                <TableCell className="align-top">
                  <p className="font-semibold text-sm mb-2 text-neutral-800">PENDAHULUAN</p>
                  <ul className="list-disc pl-5 text-xs text-neutral-600 space-y-1">
                    <li>Ketajaman Perumusan Masalah</li>
                    <li>Kesesuaian Tujuan Penelitian dengan Masalah Penelitian</li>
                    <li>Manfaat Penelitian</li>
                  </ul>
                </TableCell>
                <TableCell className="text-center align-top text-sm">25</TableCell>
                <TableCell className="text-center align-top text-sm">{selectedReviewer.status === "SUDAH DINILAI" ? "80" : "0"}</TableCell>
                <TableCell className="text-right align-top text-sm">{selectedReviewer.status === "SUDAH DINILAI" ? "20" : "0"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-center font-medium align-top text-xs">2.</TableCell>
                <TableCell className="align-top">
                  <p className="font-semibold text-sm mb-2 text-neutral-800">TINJAUAN PUSTAKA</p>
                  <ul className="list-disc pl-5 text-xs text-neutral-600 space-y-1">
                    <li>Relevansi dengan Masalah Penelitian</li>
                    <li>Cara Mengutip</li>
                    <li>Kemutakhiran Sumber Pustaka</li>
                    <li>Cara Penyusunan Daftar Pustaka</li>
                  </ul>
                </TableCell>
                <TableCell className="text-center align-top text-sm">25</TableCell>
                <TableCell className="text-center align-top text-sm">{selectedReviewer.status === "SUDAH DINILAI" ? "85" : "0"}</TableCell>
                <TableCell className="text-right align-top text-sm">{selectedReviewer.status === "SUDAH DINILAI" ? "21.25" : "0"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-center font-medium align-top text-xs">3.</TableCell>
                <TableCell className="align-top">
                  <p className="font-semibold text-sm mb-2 text-neutral-800">METODOLOGI PENELITIAN</p>
                  <ul className="list-disc pl-5 text-xs text-neutral-600 space-y-1">
                    <li>Kesesuaian Rancangan dengan Masalah Penelitian</li>
                    <li>Ketepatan Instrumen Penelitian</li>
                    <li>Ketepatan Metode Analisis Data</li>
                  </ul>
                </TableCell>
                <TableCell className="text-center align-top text-sm">25</TableCell>
                <TableCell className="text-center align-top text-sm">{selectedReviewer.status === "SUDAH DINILAI" ? "90" : "0"}</TableCell>
                <TableCell className="text-right align-top text-sm">{selectedReviewer.status === "SUDAH DINILAI" ? "22.5" : "0"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-center font-medium align-top text-xs">4.</TableCell>
                <TableCell className="align-top">
                  <p className="font-semibold text-sm mb-2 text-neutral-800">KELAYAKAN PENELITIAN</p>
                  <ul className="list-disc pl-5 text-xs text-neutral-600 space-y-1">
                    <li>Kewajaran Biaya Penelitian</li>
                    <li>Kewajaran Jadwal Penelitian</li>
                  </ul>
                </TableCell>
                <TableCell className="text-center align-top text-sm">25</TableCell>
                <TableCell className="text-center align-top text-sm">{selectedReviewer.status === "SUDAH DINILAI" ? "85" : "0"}</TableCell>
                <TableCell className="text-right align-top text-sm">{selectedReviewer.status === "SUDAH DINILAI" ? "21.25" : "0"}</TableCell>
              </TableRow>
              <TableRow className="bg-neutral-50/50">
                <TableCell colSpan={2} className="font-semibold text-neutral-700">JUMLAH</TableCell>
                <TableCell className="text-center font-semibold">100</TableCell>
                <TableCell className="text-center font-semibold">{selectedReviewer.status === "SUDAH DINILAI" ? "340" : "0"}</TableCell>
                <TableCell className="text-right font-semibold text-primary-700">{selectedReviewer.status === "SUDAH DINILAI" ? "85" : "0"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <DialogFooter className="mt-2">
           <Button className="bg-primary-600 hover:bg-primary-700 w-full sm:w-auto">Cetak Review Ini</Button>
        </DialogFooter>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="sm:max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <DialogHeader className="mb-2">
        <DialogTitle className="text-lg text-neutral-700 uppercase tracking-wide leading-relaxed border-b pb-4 border-neutral-100">
          {item.judul}
        </DialogTitle>
      </DialogHeader>
      
      <div className="mt-4">
        <Table className="border mb-4 rounded-md overflow-hidden min-w-0 w-full">
          <TableHeader className="bg-neutral-50">
            <TableRow>
              <TableHead className="w-12 text-center text-xs font-bold text-neutral-900">No.</TableHead>
              <TableHead className="text-xs font-bold text-neutral-900">Nama Reviewer</TableHead>
              <TableHead className="text-xs font-bold text-neutral-900">Setuju</TableHead>
              <TableHead className="text-xs font-bold text-neutral-900">Catatan</TableHead>
              <TableHead className="text-xs font-bold text-neutral-900">Nilai</TableHead>
              <TableHead className="w-24 text-xs font-bold text-neutral-900 text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {item.reviewers.length > 0 ? (
              item.reviewers.map((rev: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell className="text-center text-sm">{idx + 1}.</TableCell>
                  <TableCell className="text-sm font-medium">{rev.nama}</TableCell>
                  <TableCell className="text-sm uppercase text-neutral-600">{rev.status}</TableCell>
                  <TableCell className="text-sm">{rev.catatan || ""}</TableCell>
                  <TableCell className="text-sm">{rev.skor}</TableCell>
                  <TableCell className="text-center">
                    <Button size="sm" className="h-8 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded shadow-sm text-xs" onClick={() => openDetail(rev)}>Detail</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <EmptyState 
                    icon={Users} 
                    title="Belum Ada Reviewer" 
                    description="Belum ada reviewer yang ditugaskan oleh operator fakultas untuk usulan ini."
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <p className="text-sm text-neutral-700 mb-6">
          Rata-rata : {item.reviewers.length > 0 ? (item.reviewers.reduce((acc: any, curr: any) => acc + curr.skor, 0) / item.reviewers.length).toFixed(0) : 0}
        </p>

        <h3 className="text-lg font-normal text-neutral-700 mb-3">Surat Tugas</h3>
        
        <Table className="border rounded-md overflow-hidden min-w-0 w-full">
          <TableHeader className="bg-neutral-50">
            <TableRow>
              <TableHead className="w-12 text-center text-xs font-bold text-neutral-900">No.</TableHead>
              <TableHead className="text-xs font-bold text-neutral-900">Tanggal Permintaan<br/>Surat Tugas</TableHead>
              <TableHead className="text-xs font-bold text-neutral-900">Kegiatan</TableHead>
              <TableHead className="text-xs font-bold text-neutral-900">Tempat Tujuan</TableHead>
              <TableHead className="text-xs font-bold text-neutral-900">Tanggal</TableHead>
              <TableHead className="text-xs font-bold text-neutral-900 text-center">Aksi</TableHead>
              <TableHead className="text-xs font-bold text-neutral-900 text-center">Cetak Draft</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {item.suratTugas && item.suratTugas.length > 0 ? (
              item.suratTugas.map((st: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell className="text-center text-sm">{idx + 1}.</TableCell>
                  <TableCell className="text-sm font-medium">{st.tanggalPermintaan}</TableCell>
                  <TableCell className="text-sm">{st.kegiatan}</TableCell>
                  <TableCell className="text-sm">{st.tempatTujuan}</TableCell>
                  <TableCell className="text-sm">{st.tanggal}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="outline" size="sm" className="h-7 text-xs">Lihat</Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant="outline" size="sm" className="h-7 text-xs text-primary-600 border-primary-200 bg-primary-50">Cetak</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-16 text-center text-sm text-neutral-500 bg-neutral-50/50">
                  Tidak ada data permintaan surat tugas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </DialogContent>
  );
}

export default function ManajemenRisetPage() {
  const [data, setData] = useState(dummyData);
  const [activeTab, setActiveTab] = useState("penelitian");
  const [activeSubTab, setActiveSubTab] = useState("proposal");
  const [activeTahun, setActiveTahun] = useState("2026");
  const [searchQuery, setSearchQuery] = useState("");
  const [sumberDanaFilter, setSumberDanaFilter] = useState("Semua");
  
  // State for Validasi Dialog
  const [selectedValidasiItem, setSelectedValidasiItem] = useState<any>(null);
  const [validasiStatus, setValidasiStatus] = useState("BELUM");
  const [validasiCatatan, setValidasiCatatan] = useState("");

  const filteredData = data.filter(item => 
    item.kategori === activeTab && 
    item.tipe === activeSubTab && 
    item.tahun.toString() === activeTahun &&
    (sumberDanaFilter === "Semua" || item.sumberDana === sumberDanaFilter) &&
    (searchQuery === "" || item.judul.toLowerCase().includes(searchQuery.toLowerCase()))
  );

// renderStatusBadge moved above

  const renderTimPelaksana = (tim: string[]) => {
    if (!tim || tim.length === 0) return <span className="text-neutral-400 italic">Belum ada tim</span>;
    
    const visibleMembers = tim.slice(0, 2);
    const hiddenMembers = tim.slice(2);

    return (
      <div className="space-y-1">
        {visibleMembers.map((member, i) => (
          <div key={i} className="text-sm">
            {i === 0 ? <span className="font-semibold text-neutral-700">Ketua: </span> : <span className="text-neutral-500">• </span>}
            {member}
          </div>
        ))}
        {hiddenMembers.length > 0 && (
          <Popover>
            <PopoverTrigger render={<Button variant="link" size="sm" className="h-auto p-0 text-primary-600 text-xs mt-1 font-medium" />}>
              + {hiddenMembers.length} Anggota Lainnya
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3" align="start">
              <h4 className="font-semibold text-sm mb-2 border-b pb-2">Anggota Tim Pelaksana</h4>
              <ul className="space-y-1 text-sm text-neutral-600 max-h-48 overflow-y-auto">
                {hiddenMembers.map((member, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 mt-1 w-1 h-1 rounded-full bg-neutral-400 shrink-0"></span>
                    <span>{member}</span>
                  </li>
                ))}
              </ul>
            </PopoverContent>
          </Popover>
        )}
      </div>
    );
  };

  const openValidasiDialog = (item: any) => {
    setSelectedValidasiItem(item);
    setValidasiStatus(item.statusValidasi);
    setValidasiCatatan(item.catatanValidasi || "");
  };

  const handleSimpanValidasi = () => {
    setData(prev => prev.map(item => {
      if (item.id === selectedValidasiItem.id) {
        return {
          ...item,
          statusValidasi: validasiStatus,
          catatanValidasi: validasiCatatan
        };
      }
      return item;
    }));
    setSelectedValidasiItem(null);
  };

  // State for Verifikasi Dialog
  const [selectedVerifikasiItem, setSelectedVerifikasiItem] = useState<any>(null);
  const [verifikasiStatus, setVerifikasiStatus] = useState("MENUNGGU");
  const [verifikasiCatatan, setVerifikasiCatatan] = useState("");

  const openVerifikasiDialog = (item: any) => {
    setSelectedVerifikasiItem(item);
    setVerifikasiStatus(item.statusVerifikasi);
    setVerifikasiCatatan(item.catatanVerifikasi || "");
  };

  const handleSimpanVerifikasi = () => {
    setData(prev => prev.map(item => {
      if (item.id === selectedVerifikasiItem.id) {
        return {
          ...item,
          statusVerifikasi: verifikasiStatus,
          catatanVerifikasi: verifikasiCatatan
        };
      }
      return item;
    }));
    setSelectedVerifikasiItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Data Pengajuan</h1>
          <p className="text-neutral-500 mt-1">Kelola dan verifikasi data pengajuan proposal serta laporan penelitian dan PKM dosen.</p>
        </div>

        <Card className="flex flex-col sm:flex-row items-center gap-6 px-4 py-2.5 shadow-sm shrink-0 rounded-2xl border-neutral-200 bg-white">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-neutral-700">Kategori</span>
            <Select value={activeTab} onValueChange={(val) => val && setActiveTab(val)}>
              <SelectTrigger className="w-[140px] sm:w-[160px] h-9 border-neutral-200 bg-white">
                <SelectValue placeholder="Pilih Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="penelitian">Penelitian</SelectItem>
                <SelectItem value="pkm">PKM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-neutral-700">Tipe</span>
            <Select value={activeSubTab} onValueChange={(val) => val && setActiveSubTab(val)}>
              <SelectTrigger className="w-[120px] sm:w-[140px] h-9 border-neutral-200 bg-neutral-50/30">
                <SelectValue placeholder="Pilih Tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="proposal">proposal</SelectItem>
                <SelectItem value="laporan">laporan akhir</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-neutral-700">Data Tahun</span>
            <Select value={activeTahun} onValueChange={(val) => val && setActiveTahun(val)}>
              <SelectTrigger className="w-[100px] h-9 border-neutral-200 bg-neutral-50/30">
                <SelectValue placeholder="Tahun" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                <Input 
                  placeholder="Cari judul, ketua pelaksana, atau prodi..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-[200px]">
                <Select value={sumberDanaFilter} onValueChange={(val) => val && setSumberDanaFilter(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sumber Dana" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Semua">Semua Dana</SelectItem>
                    <SelectItem value="HIBAH KEMENRISTEK / BRIN">HIBAH KEMENRISTEK / BRIN</SelectItem>
                    <SelectItem value="HIBAH DIKTI">HIBAH DIKTI</SelectItem>
                    <SelectItem value="DIPA UNTAN">DIPA UNTAN</SelectItem>
                    <SelectItem value="KERJA SAMA">KERJA SAMA</SelectItem>
                    <SelectItem value="MANDIRI">MANDIRI</SelectItem>
                    <SelectItem value="BATCH">BATCH</SelectItem>
                    <SelectItem value="LAIN-LAIN">LAIN-LAIN</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-4 p-4 bg-primary-50/50 border border-primary-100 rounded-md flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-600">Total Keseluruhan Dana Usulan</span>
              <span className="text-lg font-bold text-primary-700">
                Rp. {filteredData.reduce((acc, curr) => acc + (curr.id * 35000000 + 15000000), 0).toLocaleString('id-ID')}
              </span>
            </div>

            {/* Table */}
            <div className="border rounded-md overflow-hidden min-w-0 w-full">
              <Table>
                <TableHeader className="bg-neutral-50">
                  <TableRow>
                    <TableHead className="w-[50px]">No</TableHead>
                    <TableHead className="min-w-[120px] md:min-w-[300px]">Judul</TableHead>
                    <TableHead>Skim & Sumber Dana</TableHead>
                    <TableHead>Prodi</TableHead>
                    <TableHead className="w-[200px]">Tim Pelaksana</TableHead>
                    <TableHead className="min-w-[150px]">
                      {activeSubTab === "proposal" ? "Verifikasi" : "Validasi"}
                    </TableHead>
                    <TableHead className="text-right min-w-[200px]">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <TableRow key={item.id}>
                      <TableCell className="font-medium align-top">{index + 1}</TableCell>
                      <TableCell className="align-top">
                        <div className="font-medium text-neutral-900 line-clamp-none md:line-clamp-2">{item.judul}</div>
                        <div className="text-xs text-neutral-400 mt-2 flex items-center">
                           <FileText className="w-3 h-3 mr-1"/> Upload: {item.waktuUpload}
                        </div>
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="font-medium text-sm">{item.skim}</div>
                        <div className="text-sm text-neutral-500 mt-1">{item.sumberDana} ({item.tahun})</div>
                      </TableCell>
                      <TableCell className="align-top text-sm">{item.prodi}</TableCell>
                      <TableCell className="align-top">
                        {renderTimPelaksana(item.timPelaksana)}
                      </TableCell>
                      <TableCell className="align-top">
                        {activeSubTab === "proposal" ? (
                          <div className="space-y-2">
                            {renderStatusBadge(item.statusVerifikasi)}
                            <Dialog open={selectedVerifikasiItem?.id === item.id} onOpenChange={(open) => !open && setSelectedVerifikasiItem(null)}>
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="h-auto p-0 text-primary-600 text-xs block font-medium"
                                onClick={() => openVerifikasiDialog(item)}
                              >
                                Edit Verifikasi
                              </Button>
                                {selectedVerifikasiItem && (
                                  <DialogContent className="sm:max-w-2xl bg-white rounded-md">
                                    <DialogHeader className="border-b pb-3 mb-2">
                                      <DialogTitle className="text-lg font-medium text-neutral-700">Data Verifikasi</DialogTitle>
                                    </DialogHeader>
                                    <div className="py-2 space-y-5">
                                      <div className="space-y-1.5">
                                        <Label className="text-sm font-bold text-neutral-800">Judul</Label>
                                        <p className="text-sm text-neutral-600 uppercase">
                                          {selectedVerifikasiItem.judul}
                                        </p>
                                      </div>
                                      <div className="space-y-3">
                                        <Label className="text-sm font-bold text-neutral-800">Status Verifikasi</Label>
                                        <RadioGroup value={verifikasiStatus} onValueChange={setVerifikasiStatus} className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-1">
                                          <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="MENUNGGU VERIFIKASI" id="VERIF_MENUNGGU" />
                                            <Label htmlFor="VERIF_MENUNGGU" className="cursor-pointer text-sm font-normal uppercase text-neutral-700">MENUNGGU VERIFIKASI</Label>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="TIDAK SESUAI (BELUM LENGKAP)" id="VERIF_TIDAK_SESUAI" />
                                            <Label htmlFor="VERIF_TIDAK_SESUAI" className="cursor-pointer text-sm font-normal uppercase text-neutral-700">TIDAK SESUAI (BELUM LENGKAP)</Label>
                                          </div>
                                          <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="SESUAI (SIAP DIREVIEW)" id="VERIF_SESUAI" />
                                            <Label htmlFor="VERIF_SESUAI" className="cursor-pointer text-sm font-normal uppercase text-neutral-700">SESUAI (SIAP DIREVIEW)</Label>
                                          </div>
                                        </RadioGroup>
                                      </div>
                                      <div className="space-y-2">
                                        <Label htmlFor="catatanVerifikasi" className="text-sm font-bold text-neutral-800">Catatan</Label>
                                        <Textarea 
                                          id="catatanVerifikasi" 
                                          value={verifikasiCatatan}
                                          onChange={(e) => setVerifikasiCatatan(e.target.value)}
                                          placeholder="Catatan" 
                                          className="resize-y text-sm rounded border-neutral-300"
                                          rows={4}
                                        />
                                      </div>
                                    </div>
                                    <DialogFooter className="border-t pt-3 mt-2">
                                      <Button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded text-sm px-6 h-9" onClick={handleSimpanVerifikasi}>Simpan</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                )}
                              </Dialog>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {renderStatusBadge(item.statusValidasi)}
                            <Dialog open={selectedValidasiItem?.id === item.id} onOpenChange={(open) => !open && setSelectedValidasiItem(null)}>
                              <Button 
                                variant="link" 
                                size="sm" 
                                className="h-auto p-0 text-primary-600 text-xs block font-medium"
                                onClick={() => openValidasiDialog(item)}
                              >
                                Edit Validasi
                              </Button>
                              {selectedValidasiItem && (
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>Data Validasi</DialogTitle>
                                    <DialogDescription className="text-xs text-neutral-500 mt-1 line-clamp-none md:line-clamp-2">
                                      {selectedValidasiItem.judul}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4 space-y-6">
                                    <div className="space-y-3">
                                      <Label className="text-sm font-semibold">Status Validasi</Label>
                                      <RadioGroup value={validasiStatus} onValueChange={setValidasiStatus} className="flex gap-4">
                                        <div className="flex items-center space-x-2 border p-3 rounded-md flex-1 cursor-pointer hover:bg-neutral-50">
                                          <RadioGroupItem value="BELUM" id="BELUM" />
                                          <Label htmlFor="BELUM" className="cursor-pointer w-full text-xs font-semibold">BELUM</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 border p-3 rounded-md flex-1 cursor-pointer hover:bg-neutral-50">
                                          <RadioGroupItem value="LANJUT" id="LANJUT" />
                                          <Label htmlFor="LANJUT" className="cursor-pointer w-full text-xs font-semibold">LANJUT</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 border p-3 rounded-md flex-1 cursor-pointer hover:bg-neutral-50">
                                          <RadioGroupItem value="SELESAI" id="SELESAI" />
                                          <Label htmlFor="SELESAI" className="cursor-pointer w-full text-xs font-semibold">SELESAI</Label>
                                        </div>
                                      </RadioGroup>
                                    </div>
                                    <div className="space-y-3">
                                      <Label htmlFor="catatan" className="text-sm font-semibold">Catatan</Label>
                                      <Textarea 
                                        id="catatan" 
                                        value={validasiCatatan}
                                        onChange={(e) => setValidasiCatatan(e.target.value)}
                                        placeholder="Tambahkan catatan jika perlu revisi..." 
                                        className={`resize-none ${validasiCatatan === "" && validasiStatus !== "BELUM" ? "border-red-300 focus-visible:ring-red-500" : ""}`}
                                      />
                                      {validasiCatatan === "" && validasiStatus !== "BELUM" && (
                                        <p className="text-xs text-red-500">Catatan harus diisi bila status diubah.</p>
                                      )}
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setSelectedValidasiItem(null)}>Batal</Button>
                                    <Button onClick={handleSimpanValidasi} className="bg-primary-600 hover:bg-primary-700">Simpan Perubahan</Button>
                                  </DialogFooter>
                                </DialogContent>
                              )}
                            </Dialog>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="align-top">
                        <div className="flex flex-col items-end gap-2">
                          <Dialog>
                            <DialogTrigger render={<Button variant="outline" size="sm" className="w-full justify-start text-xs h-8 font-medium" />}>
                                <Eye className="w-3.5 h-3.5 mr-2 text-neutral-500" />
                                Berkas Usulan
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md w-full">
                              <DialogHeader className="mb-4">
                                <DialogTitle>Berkas Usulan</DialogTitle>
                                <DialogDescription className="line-clamp-none md:line-clamp-2 text-xs mt-1" title={item.judul}>
                                  {item.judul}
                                </DialogDescription>
                              </DialogHeader>
                              
                              {item.dokumen.length > 0 ? (
                                <div className="space-y-3">
                                  {item.dokumen.map((doc, i) => (
                                    <div key={i} className="flex items-center justify-between gap-4 p-3 border rounded-md hover:bg-neutral-50 transition-colors">
                                      <div className="flex items-center gap-3 min-w-0 flex-1">
                                        <div className="bg-primary-50 p-2 rounded text-primary-600 shrink-0">
                                          <FileText className="w-5 h-5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <p className="text-sm font-medium text-neutral-900 truncate" title={doc.nama}>{doc.nama}</p>
                                          <p className="text-xs text-neutral-500 truncate" title={doc.file}>{doc.file}</p>
                                        </div>
                                      </div>
                                      <Button size="icon" variant="ghost" className="shrink-0 h-8 w-8 text-primary-600 hover:text-primary-700 hover:bg-primary-50">
                                        <Download className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <EmptyState 
                                  icon={Inbox} 
                                  title="Berkas Belum Tersedia" 
                                  description="Pengusul belum mengunggah dokumen apapun untuk usulan ini."
                                />
                              )}
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger render={<Button variant="outline" size="sm" className="w-full justify-start text-xs h-8 font-medium" />}>
                                <Users className="w-3.5 h-3.5 mr-2 text-neutral-500" />
                                Detail Reviewer
                            </DialogTrigger>
                            <ReviewerDialogContent item={item} />
                          </Dialog>

                          <Dialog>
                            <DialogTrigger render={<Button variant="ghost" size="sm" className="w-full justify-between text-xs h-8 text-primary-600 bg-primary-50 hover:bg-primary-100 font-medium" />}>
                                Detail Lengkap
                                <ChevronRight className="w-3.5 h-3.5" />
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-3xl w-full max-h-[85vh] overflow-y-auto bg-white">
                              <DialogHeader className="mb-2">
                                <DialogTitle className="text-xl">Detail Proposal</DialogTitle>
                              </DialogHeader>
                              
                              <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-neutral-900 border-b pb-2 flex items-center gap-2">
                                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  Data proposal
                               </h3>
                                
                                <div className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-2 text-sm">
                                  <div className="font-semibold text-neutral-900 text-right">Judul</div>
                                  <div className="text-neutral-700 leading-tight">{item.judul}</div>

                                  <div className="font-semibold text-neutral-900 text-right">Total Dana</div>
                                  <div className="text-neutral-700">Rp. 5.000.000</div>

                                  <div className="font-semibold text-neutral-900 text-right">Sumber dana</div>
                                  <div className="text-neutral-700">{item.sumberDana}</div>

                                  <div className="font-semibold text-neutral-900 text-right">Tahun</div>
                                  <div className="text-neutral-700">{item.tahun}</div>

                                  <div className="font-semibold text-neutral-900 text-right">Program studi</div>
                                  <div className="text-neutral-700">{item.prodi}</div>

                                  <div className="font-semibold text-neutral-900 text-right">Skim penelitian</div>
                                  <div className="text-neutral-700">{item.skim}</div>

                                  <div className="font-semibold text-neutral-900 text-right">Bidang ilmu</div>
                                  <div className="text-neutral-700">Soshum</div>

                                  <div className="font-semibold text-neutral-900 text-right">Fakultas</div>
                                  <div className="text-neutral-700">Fakultas Hukum</div>

                                  <div className="font-semibold text-neutral-900 text-right">Ketua</div>
                                  <div className="text-neutral-700">{item.timPelaksana[0]}</div>

                                  <div className="font-semibold text-neutral-900 text-right">Anggota</div>
                                  <div className="text-neutral-700">
                                    {item.timPelaksana.slice(1).length > 0 
                                      ? item.timPelaksana.slice(1).join(" / ")
                                      : "-"}
                                  </div>
                                </div>

                                <div className="mt-6 pt-4 border-t flex flex-col gap-2 items-start">
                                  <Button size="sm" className="bg-[#10b981] hover:bg-[#059669] text-white h-9 rounded-sm">
                                    Download Proposal
                                  </Button>
                                  <span className="text-xs text-neutral-500 mt-2">
                                    File Kontrak tidak ada!
                                  </span>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-64 text-center">
                        <EmptyState 
                          icon={Search} 
                          title="Data Tidak Ditemukan" 
                          description={`Tidak ada data ${activeSubTab} ${activeTab} untuk filter yang Anda pilih.`}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-neutral-500">
                Menampilkan 1 sampai {filteredData.length} dari {filteredData.length} data
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Sebelumnya</Button>
                <Button variant="outline" size="sm" className="bg-primary-50 text-primary-600 border-primary-200 font-medium">1</Button>
                <Button variant="outline" size="sm" disabled>Selanjutnya</Button>
              </div>
            </div>

        </CardContent>
      </Card>
    </div>
  );
}
