"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { FileText, Settings, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const MOCK_DATA = [
  {
    id: "PROP-2026-003",
    no: 1,
    judul: "WIPO TREATY ON GRATK TANTANGAN BAGI INDONESIA DALAM MENCEGAH BIOPIRACY",
    tipe: "proposal",
    sumberDana: "MANDIRI",
    skim: "PENELITIAN DASAR MANDIRI",
    tahun: "2026",
    prodi: "Ilmu Hukum (S1)",
    verifikasi: {
      status: "SESUAI (LENGKAP)",
      catatan: "Lengkapi ttd pada lembar pengesahan; lengkapi TKT dan hasil review saat akan dijilid"
    },
    timPeneliti: [
      "DEVINA PUSPITA SARI, S.H., M.H.",
      "FATMA MUTHIA KINANTI, S.H., M.H.",
      "Amir Alfath (A101221262)",
      "Devita Velesya (A1011231134)"
    ],
    statusReviewer: {
      isAssigned: false,
      waktuUpload: "14-07-2026 20:20"
    }
  },
  {
    id: "PROP-2026-004",
    no: 2,
    judul: "Survei Evaluasi Pelayanan Akademik Pada Program Magister Ilmu Hukum Dan Magister Kenotariatan Fakultas Hukum Universitas Tanjungpura",
    tipe: "proposal",
    sumberDana: "DIPA",
    skim: "Penelitian Dasar",
    tahun: "2026",
    prodi: "Ilmu Hukum (S1)",
    verifikasi: {
      status: "BELUM DIPROSES",
      catatan: "-"
    },
    timPeneliti: [
      "Chandra Maharani, S.H., M.H.",
      "Dr. Hermansyah, S.H., M.Hum."
    ],
    statusReviewer: {
      isAssigned: false,
      waktuUpload: "-"
    }
  },
  {
    id: "PROP-2026-005",
    no: 3,
    judul: "Pemanfaatan Kecerdasan Buatan dalam Sistem Peradilan Pidana di Indonesia",
    tipe: "proposal",
    sumberDana: "HIBAH DIKTI",
    skim: "Penelitian Terapan",
    tahun: "2026",
    prodi: "Ilmu Hukum (S1)",
    verifikasi: {
      status: "PERLU REVISI",
      catatan: "Dokumen RAB belum sesuai standar DIKTI; Abstrak melebihi 500 kata."
    },
    timPeneliti: [
      "Dr. Rini Mulyani, S.H., M.H.",
      "Muhammad Tahir, S.H.,M.H"
    ],
    statusReviewer: {
      isAssigned: false,
      waktuUpload: "-"
    }
  },
  {
    id: "PROP-2026-006",
    no: 4,
    judul: "Kajian Kritis Omnibus Law Terhadap Hak Buruh Migran",
    tipe: "proposal",
    sumberDana: "MANDIRI",
    skim: "Penelitian Dasar",
    tahun: "2026",
    prodi: "Ilmu Hukum (S1)",
    verifikasi: {
      status: "DITOLAK",
      catatan: "Pengusul masih memiliki tanggungan laporan akhir tahun sebelumnya yang belum diselesaikan."
    },
    timPeneliti: [
      "Dr. Agus Riyanto, S.H., M.Hum."
    ],
    statusReviewer: {
      isAssigned: false,
      waktuUpload: "-"
    }
  },
  {
    id: "LAP-2026-001",
    no: 5,
    judul: "Laporan Akhir: Implementasi Smart City di Pontianak",
    tipe: "laporan",
    sumberDana: "DIPA",
    skim: "Penelitian Terapan",
    tahun: "2026",
    prodi: "Teknik Informatika (S1)",
    verifikasi: {
      status: "SESUAI (LENGKAP)",
      catatan: "-"
    },
    timPeneliti: [
      "Dr. Eng. Ir. Budi Santoso, M.T."
    ],
    statusReviewer: {
      isAssigned: true,
      waktuUpload: "10-06-2026 14:30"
    }
  },
  {
    id: "LAP-2025-001",
    no: 6,
    judul: "Laporan Akhir 2025: Studi Konservasi Mangrove Mempawah",
    tipe: "laporan",
    sumberDana: "HIBAH DIKTI",
    skim: "Penelitian Dasar",
    tahun: "2025",
    prodi: "Biologi (S1)",
    verifikasi: {
      status: "SESUAI (LENGKAP)",
      catatan: "-"
    },
    timPeneliti: [
      "Prof. Dr. Ir. Hj. Siti Nurbaya, M.Sc."
    ],
    statusReviewer: {
      isAssigned: true,
      waktuUpload: "20-11-2025 09:15"
    }
  },
  {
    id: "PROP-2025-009",
    no: 7,
    judul: "Pengembangan Modul Ajar Interaktif Berbasis AI (2025)",
    tipe: "proposal",
    sumberDana: "MANDIRI",
    skim: "Pengembangan Pendidikan",
    tahun: "2025",
    prodi: "Pendidikan Guru SD",
    verifikasi: {
      status: "DITOLAK",
      catatan: "Kuota pendanaan tahun 2025 sudah habis."
    },
    timPeneliti: [
      "Dr. Arif Rahman, M.Pd."
    ],
    statusReviewer: {
      isAssigned: false,
      waktuUpload: "-"
    }
  }
];

const MOCK_REVIEWERS = [
  "Dr. Sri Widiyastuti, S.H., L.LM.,M.Si (0012057201)",
  "Prof. Dr. H. Budi Santoso, S.H., M.H. (0014026802)",
  "Dr. Agus Riyanto, S.H., M.Hum. (0021097503)",
  "Dr. Rini Mulyani, S.H., M.H. (0015047804)"
];

export default function VerifikasiPage() {
  const [filterTipe, setFilterTipe] = useState<string>("proposal");
  const [filterTahun, setFilterTahun] = useState<string>("2026");
  
  const [isReviewerModalOpen, setIsReviewerModalOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<typeof MOCK_DATA[0] | null>(null);
  const [selectedNewReviewer, setSelectedNewReviewer] = useState<string>("");
  const [selectedReviewerDetail, setSelectedReviewerDetail] = useState<any | null>(null);
  
  // States for outer table actions
  const [proposalDetailModalOpen, setProposalDetailModalOpen] = useState(false);
  const [documentPreviewOpen, setDocumentPreviewOpen] = useState(false);
  const [activeOuterProposal, setActiveOuterProposal] = useState<typeof MOCK_DATA[0] | null>(null);

  // Reviewer state for the selected proposal
  const [assignedReviewers, setAssignedReviewers] = useState<any[]>([]);

  const handleOpenReviewer = (proposal: typeof MOCK_DATA[0]) => {
    setSelectedProposal(proposal);
    // Mock existing reviewer if already assigned
    if (proposal.id === "PROP-2026-003") {
      setAssignedReviewers([
        {
          no: 1,
          nama: "Dr. Sri Widiyastuti, S.H., L.LM.,M.Si",
          setuju: "BELUM DINILAI",
          catatan: "",
          nilai: 0
        }
      ]);
    } else {
      setAssignedReviewers([]);
    }
    setIsReviewerModalOpen(true);
  };

  const handleAddReviewer = () => {
    if (!selectedNewReviewer) {
      toast.error("Silakan cari dan pilih reviewer terlebih dahulu");
      return;
    }

    if (!MOCK_REVIEWERS.includes(selectedNewReviewer)) {
      toast.error("Pilihan tidak valid. Silakan pilih dari daftar yang tersedia.");
      return;
    }
    
    if (assignedReviewers.some(r => r.nama === selectedNewReviewer)) {
      toast.error("Reviewer ini sudah ada di daftar");
      return;
    }

    setAssignedReviewers([
      ...assignedReviewers,
      {
        no: assignedReviewers.length + 1,
        nama: selectedNewReviewer,
        setuju: "BELUM DINILAI",
        catatan: "",
        nilai: 0
      }
    ]);
    toast.success("Reviewer berhasil ditambahkan");
    setSelectedNewReviewer("");
  };

  const columns: ColumnDef<typeof MOCK_DATA[0]>[] = [
    {
      accessorKey: "no",
      header: () => <div className="min-w-[20px]">No.</div>,
      cell: ({ row }) => <div className="min-w-[20px] text-sm">{row.original.no}</div>
    },
    {
      accessorKey: "judul",
      header: () => <div className="min-w-[120px]">Judul</div>,
      cell: ({ row }) => (
        <div className="min-w-[120px] max-w-[250px] whitespace-normal">
          <span className="text-[11px] font-medium text-neutral-900 line-clamp-3 leading-tight">{row.original.judul}</span>
        </div>
      )
    },
    {
      accessorKey: "sumberDana",
      header: () => <div className="min-w-[60px]">Sumber Dana</div>,
      cell: ({ row }) => <div className="min-w-[60px] max-w-[90px] text-[10px] text-neutral-600 whitespace-normal">{row.original.sumberDana}</div>
    },
    {
      accessorKey: "skim",
      header: () => <div className="min-w-[80px]">Skim</div>,
      cell: ({ row }) => <div className="min-w-[80px] max-w-[120px] text-[10px] text-neutral-600 whitespace-normal block line-clamp-2">{row.original.skim}</div>
    },
    {
      accessorKey: "tahun",
      header: () => <div className="min-w-[30px]">Tahun</div>,
      cell: ({ row }) => <div className="min-w-[30px] text-[10px] text-neutral-600">{row.original.tahun}</div>
    },
    {
      accessorKey: "prodi",
      header: () => <div className="min-w-[70px]">Prodi</div>,
      cell: ({ row }) => <div className="min-w-[70px] max-w-[110px] text-[10px] text-neutral-600 whitespace-normal block line-clamp-2">{row.original.prodi}</div>
    },
    {
      id: "verifikasi",
      header: () => <div className="min-w-[100px]">Verifikasi</div>,
      cell: ({ row }) => {
        let badgeColor = "bg-teal-500";
        if (row.original.verifikasi.status === "BELUM DIPROSES") badgeColor = "bg-slate-400";
        else if (row.original.verifikasi.status === "PERLU REVISI") badgeColor = "bg-amber-500";
        else if (row.original.verifikasi.status === "DITOLAK") badgeColor = "bg-red-500";

        return (
          <div className="min-w-[100px] max-w-[150px] whitespace-normal">
            <span className={`inline-block whitespace-nowrap px-1.5 py-0.5 text-white text-[9px] font-bold rounded mb-1 ${badgeColor}`}>
              {row.original.verifikasi.status}
            </span>
            <p className="text-[10px] text-neutral-600 leading-tight line-clamp-3">
              {row.original.verifikasi.catatan}
            </p>
          </div>
        );
      }
    },
    {
      id: "timPeneliti",
      header: () => <div className="min-w-[100px]">Tim Peneliti</div>,
      cell: ({ row }) => (
        <div className="min-w-[100px] max-w-[150px] whitespace-normal">
          <ul className="text-[9px] text-neutral-600 space-y-1 list-disc pl-3">
            {row.original.timPeneliti.map((nama, idx) => (
              <li key={idx} className="line-clamp-2 leading-tight">{nama}</li>
            ))}
          </ul>
        </div>
      )
    },
    {
      id: "dokumen",
      header: () => <div className="min-w-[60px] text-center">Dokumen / Usulan</div>,
      cell: ({ row }) => (
        <div className="min-w-[60px] flex flex-col items-center justify-start gap-1 mt-0.5">
          <Button 
            variant="default"
            size="sm" 
            className="bg-sky-500 hover:bg-sky-600 text-white h-8 w-8 p-0 rounded shadow-md"
            onClick={() => {
              setActiveOuterProposal(row.original);
              setDocumentPreviewOpen(true);
            }}
          >
            <FileText className="w-4 h-4" />
          </Button>
          <span className="text-[10px] invisible">-</span>
        </div>
      )
    },
    {
      id: "statusReviewer",
      header: () => <div className="min-w-[60px] text-center">Status<br/>Reviewer</div>,
      cell: ({ row }) => (
        <div className="min-w-[60px] flex flex-col items-center justify-start gap-1 mt-0.5">
          <Button 
            variant="default"
            size="sm" 
            className="bg-sky-500 hover:bg-sky-600 text-white h-8 w-8 p-0 rounded shadow-md"
            onClick={() => handleOpenReviewer(row.original)}
          >
            <Settings className="w-4 h-4" />
          </Button>
          <span className="text-[10px] text-neutral-500 whitespace-nowrap">{row.original.statusReviewer.waktuUpload}</span>
        </div>
      )
    },
    {
      id: "detail",
      header: () => <div className="min-w-[40px] text-center">Detail</div>,
      cell: ({ row }) => (
        <div className="min-w-[40px] flex flex-col items-center justify-start gap-1 mt-0.5">
          <div className="h-8 flex items-center">
            <Button 
              variant="default" 
              size="sm"
              className="bg-sky-500 hover:bg-sky-600 text-white h-7 px-3 text-xs"
              onClick={() => {
                setActiveOuterProposal(row.original);
                setProposalDetailModalOpen(true);
              }}
            >
              Detail
            </Button>
          </div>
          <span className="text-[10px] invisible">-</span>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 relative pb-24">
      {/* Header */}
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Verifikasi Pengajuan</h1>
          <p className="text-sm text-neutral-500 mt-1">Kelola verifikasi usulan dan laporan yang masuk</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6 bg-white px-4 py-2 rounded-xl border border-neutral-200 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-neutral-600 whitespace-nowrap">Tipe</span>
              <Select value={filterTipe} onValueChange={(val) => setFilterTipe(val || "")}>
                <SelectTrigger className="w-[180px] bg-neutral-50/50">
                  <SelectValue placeholder="Pilih Tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="laporan">Laporan Akhir</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-neutral-600 whitespace-nowrap">Data Tahun</span>
              <Select value={filterTahun} onValueChange={(val) => setFilterTahun(val || "")}>
                <SelectTrigger className="w-[140px] bg-neutral-50/50">
                  <SelectValue placeholder="Pilih Tahun" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={MOCK_DATA.filter(item => item.tipe === filterTipe && item.tahun === filterTahun)} 
        searchKey="judul"
        searchPlaceholder="Search..."
        selectable={false}
      />

      {/* Reviewer Modal */}
      <Dialog open={isReviewerModalOpen} onOpenChange={setIsReviewerModalOpen}>
        <DialogContent className="w-[95vw] sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-sm font-normal text-neutral-600 uppercase pr-8 leading-snug">
              {selectedProposal?.judul}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-8">
            {/* Reviewer Table Area */}
            <div>
              <div className="flex items-end gap-3 mb-4 bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                <div className="flex-1 relative">
                  <label className="text-xs font-semibold text-neutral-700 mb-1.5 block">Cari & Pilih Reviewer (Nama / NIDN)</label>
                  <Input 
                    list="reviewers-list"
                    value={selectedNewReviewer}
                    onChange={(e) => setSelectedNewReviewer(e.target.value)}
                    placeholder="Ketik nama atau NIDN..."
                    className="h-8 text-xs bg-white w-full border-neutral-200"
                  />
                  <datalist id="reviewers-list">
                    {MOCK_REVIEWERS.map(rev => (
                      <option key={rev} value={rev} />
                    ))}
                  </datalist>
                </div>
                <Button 
                  onClick={handleAddReviewer} 
                  disabled={!selectedNewReviewer}
                  className="bg-sky-500 hover:bg-sky-600 text-white h-8 text-xs px-4 disabled:bg-neutral-300 disabled:opacity-50"
                >
                  Tambah Reviewer
                </Button>
              </div>
              
              <div className="border border-neutral-200 rounded-md overflow-hidden">
                <Table>
                  <TableHeader className="bg-neutral-50">
                    <TableRow>
                      <TableHead className="w-12 text-center text-xs">No.</TableHead>
                      <TableHead className="text-xs">Nama Reviewer</TableHead>
                      <TableHead className="text-xs">Setuju</TableHead>
                      <TableHead className="text-xs">Catatan</TableHead>
                      <TableHead className="w-16 text-center text-xs">Nilai</TableHead>
                      <TableHead className="w-20 text-center text-xs">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignedReviewers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-neutral-500 text-sm">
                          Belum ada reviewer yang ditunjuk.
                        </TableCell>
                      </TableRow>
                    ) : (
                      assignedReviewers.map((rev, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="text-center text-sm">{rev.no}</TableCell>
                          <TableCell className="text-sm font-medium">{rev.nama}</TableCell>
                          <TableCell className="text-sm text-neutral-500">{rev.setuju}</TableCell>
                          <TableCell className="text-sm">{rev.catatan}</TableCell>
                          <TableCell className="text-center text-sm">{rev.nilai}</TableCell>
                          <TableCell>
                            <div className="flex flex-row justify-center items-center gap-2">
                              <Button 
                                variant="default" 
                                size="sm"
                                className="bg-sky-500 hover:bg-sky-600 text-white h-7 px-3 text-xs"
                                onClick={() => setSelectedReviewerDetail(rev)}
                              >
                                Detail
                              </Button>
                              <Button 
                                variant="default" 
                                size="sm"
                                className="bg-red-500 hover:bg-red-600 text-white h-7 w-7 p-0"
                                onClick={() => {
                                  toast.success("Reviewer berhasil dihapus");
                                  setAssignedReviewers(assignedReviewers.filter((_, i) => i !== idx));
                                }}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-2 text-right text-sm font-medium text-neutral-700">
                Rata-rata : 0
              </div>
            </div>

            {/* Surat Tugas Area */}
            <div>
              <h3 className="font-semibold text-neutral-800 mb-4 border-b pb-2">Surat Tugas</h3>
              <div className="border border-neutral-200 rounded-md overflow-hidden">
                <Table>
                  <TableHeader className="bg-neutral-50">
                    <TableRow>
                      <TableHead className="w-12 text-center text-xs">No.</TableHead>
                      <TableHead className="text-xs">Tanggal Permintaan<br/>Surat Tugas</TableHead>
                      <TableHead className="text-xs">Kegiatan</TableHead>
                      <TableHead className="text-xs">Tempat Tujuan</TableHead>
                      <TableHead className="text-xs">Tanggal</TableHead>
                      <TableHead className="text-xs">Aksi</TableHead>
                      <TableHead className="text-xs text-center">Cetak<br/>Draft</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-sm text-neutral-500 bg-white">
                        Tidak ada data permintaan surat tugas.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

          </div>
        </DialogContent>
      </Dialog>
      {/* Reviewer Detail Modal */}
      <Dialog open={!!selectedReviewerDetail} onOpenChange={(open) => !open && setSelectedReviewerDetail(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold uppercase text-neutral-700">
              Informasi Detail Reviewer
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="bg-neutral-50 p-3 rounded border border-neutral-100">
              <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Nama Lengkap & Gelar</p>
              <p className="text-sm font-medium">{selectedReviewerDetail?.nama?.split('(')[0]?.trim() || '-'}</p>
            </div>
            <div className="bg-neutral-50 p-3 rounded border border-neutral-100">
              <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">NIDN / NIP</p>
              <p className="text-sm font-medium">{selectedReviewerDetail?.nama?.match(/\((.*?)\)/)?.[1] || '-'}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-neutral-50 p-3 rounded border border-neutral-100">
                <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Status Penilaian</p>
                <p className={`text-sm font-medium ${
                  selectedReviewerDetail?.setuju === 'DISETUJUI' ? 'text-teal-600' :
                  selectedReviewerDetail?.setuju === 'DITOLAK' ? 'text-red-600' : 'text-slate-500'
                }`}>{selectedReviewerDetail?.setuju || '-'}</p>
              </div>
              <div className="bg-neutral-50 p-3 rounded border border-neutral-100">
                <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Skor Nilai</p>
                <p className="text-sm font-medium">{selectedReviewerDetail?.nilai || '0'}</p>
              </div>
            </div>
            <div className="bg-neutral-50 p-3 rounded border border-neutral-100">
              <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Catatan Tambahan</p>
              <p className="text-xs leading-relaxed text-neutral-600">
                {selectedReviewerDetail?.catatan || 'Belum ada catatan dari reviewer.'}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Outer Proposal Detail Modal */}
      <Dialog open={proposalDetailModalOpen} onOpenChange={setProposalDetailModalOpen}>
        <DialogContent className="w-[90vw] sm:max-w-[800px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-neutral-800 border-b pb-3">
              Detail Pengajuan Proposal
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5 py-2">
            <div>
              <p className="text-xs text-neutral-500 font-bold uppercase mb-1">Judul Proposal</p>
              <p className="text-sm font-semibold text-neutral-900 leading-relaxed">{activeOuterProposal?.judul}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-neutral-50 p-3 rounded border border-neutral-100">
                <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Skim</p>
                <p className="text-xs font-semibold">{activeOuterProposal?.skim}</p>
              </div>
              <div className="bg-neutral-50 p-3 rounded border border-neutral-100">
                <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Sumber Dana</p>
                <p className="text-xs font-semibold">{activeOuterProposal?.sumberDana}</p>
              </div>
              <div className="bg-neutral-50 p-3 rounded border border-neutral-100">
                <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Tahun</p>
                <p className="text-xs font-semibold">{activeOuterProposal?.tahun}</p>
              </div>
              <div className="bg-neutral-50 p-3 rounded border border-neutral-100">
                <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Status Verifikasi</p>
                <span className={`inline-block px-2 py-1 text-white text-[10px] font-bold rounded ${
                  activeOuterProposal?.verifikasi.status === 'BELUM DIPROSES' ? 'bg-slate-400' :
                  activeOuterProposal?.verifikasi.status === 'PERLU REVISI' ? 'bg-amber-500' :
                  activeOuterProposal?.verifikasi.status === 'DITOLAK' ? 'bg-red-500' : 'bg-teal-500'
                }`}>
                  {activeOuterProposal?.verifikasi.status}
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs text-neutral-500 font-bold uppercase mb-2">Susunan Tim Peneliti</p>
              <ul className="list-disc pl-5 space-y-1 bg-sky-50/50 p-4 rounded-md border border-sky-100">
                {activeOuterProposal?.timPeneliti.map((nama, idx) => (
                  <li key={idx} className="text-sm text-neutral-700">{nama} {idx === 0 ? <span className="text-[10px] bg-sky-100 text-sky-700 px-2 py-0.5 rounded ml-2 font-semibold">Ketua</span> : ''}</li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Document Preview Modal */}
      <Dialog open={documentPreviewOpen} onOpenChange={setDocumentPreviewOpen}>
        <DialogContent className="w-[85vw] sm:max-w-[850px] h-[85vh] max-h-[85vh] overflow-hidden flex flex-col bg-neutral-100 p-0">
          
          {/* Header */}
          <DialogHeader className="bg-white p-4 border-b shrink-0 flex flex-row items-center justify-between">
            <DialogTitle className="text-sm font-semibold text-neutral-700">
              Pratinjau Dokumen Usulan: {activeOuterProposal?.judul.substring(0, 70)}...
            </DialogTitle>
          </DialogHeader>

          {/* PDF Viewer Toolbar */}
          <div className="bg-neutral-800 shrink-0 px-4 py-2 flex items-center justify-between text-neutral-300 text-xs">
            <div className="flex items-center gap-4">
              <span>Halaman 1 / 12</span>
              <div className="flex items-center gap-2 border-l border-neutral-600 pl-4">
                <button className="hover:text-white px-2 py-1 rounded bg-neutral-700">-</button>
                <span>100%</span>
                <button className="hover:text-white px-2 py-1 rounded bg-neutral-700">+</button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                className="h-7 text-xs bg-transparent border-neutral-600 text-neutral-300 hover:bg-neutral-700 hover:text-white"
                onClick={() => toast.info("Membuka dokumen di tab baru...")}
              >
                Buka Tab Baru
              </Button>
              <Button 
                variant="default"
                size="sm"
                className="h-7 text-xs bg-sky-500 hover:bg-sky-600 text-white border-none"
                onClick={() => toast.success("Dokumen berhasil diunduh!")}
              >
                Unduh PDF
              </Button>
            </div>
          </div>

          {/* PDF Viewer Body */}
          <div className="flex-1 flex justify-center p-6 bg-neutral-500 overflow-y-auto">
            {/* Mock A4 Page */}
            <div className="bg-white shadow-2xl w-full max-w-[700px] min-h-[990px] border border-neutral-300 p-12 flex flex-col items-center">
              <div className="w-full text-center mb-8 border-b-2 border-black pb-4">
                <h1 className="text-xl font-bold uppercase mb-2">Proposal Penelitian</h1>
                <h2 className="text-sm font-semibold">{activeOuterProposal?.judul}</h2>
              </div>
              <div className="w-full space-y-4">
                <div className="h-4 bg-neutral-200 rounded w-full"></div>
                <div className="h-4 bg-neutral-200 rounded w-full"></div>
                <div className="h-4 bg-neutral-200 rounded w-[90%]"></div>
                <div className="h-4 bg-neutral-200 rounded w-[95%]"></div>
                <div className="h-4 bg-neutral-200 rounded w-[80%]"></div>
                
                <div className="pt-8 h-4 bg-neutral-200 rounded w-full mt-4"></div>
                <div className="h-4 bg-neutral-200 rounded w-full"></div>
                <div className="h-4 bg-neutral-200 rounded w-[85%]"></div>
                
                <div className="pt-12 text-center text-neutral-400 mt-20">
                  <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Ini adalah simulasi tampilan pembaca dokumen PDF bawaan.</p>
                </div>
              </div>
            </div>
          </div>
          
        </DialogContent>
      </Dialog>
    </div>
  );
}
