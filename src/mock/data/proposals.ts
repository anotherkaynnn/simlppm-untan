import { Proposal } from "@/types";

export const mockProposals: Proposal[] = [
  {
    id: "PRP-2026-001",
    title: "Pengembangan Sistem Kecerdasan Buatan untuk Deteksi Penyakit Tanaman",
    type: "PENELITIAN",
    schemeId: "S-01",
    schemeName: "Penelitian Dasar Unggulan",
    fieldOfStudy: "Teknik Informatika",
    year: 2026,
    duration: 12,
    budget: 45000000,
    status: "DIREVIEW",
    submittedAt: "2026-05-10T08:30:00Z",
    updatedAt: "2026-05-10T08:30:00Z",
    bidangIlmu: "Saintek",
    facultyId: "FT",
    facultyName: "Fakultas Teknik",
    submitter: {
      id: "U01",
      nidn: "0011223344",
      name: "Dr. Budi Santoso, S.T., M.T.",
      facultyName: "Fakultas Teknik"
    },
    members: [
      { id: "M1", nidn: "0011223344", name: "Dr. Budi Santoso, S.T., M.T.", role: "KETUA", faculty: "Fakultas Teknik", studyProgram: "Teknik Informatika" },
      { id: "M2", nidn: "0099887766", name: "Andi Saputra, S.Kom., M.Kom.", role: "ANGGOTA_DOSEN", faculty: "Fakultas Teknik", studyProgram: "Teknik Sistem Komputer" },
      { id: "M3", name: "Siti Nurhaliza", role: "ANGGOTA_MAHASISWA", faculty: "Fakultas Teknik", studyProgram: "Teknik Informatika" }
    ],
    budgetDetails: [],
    files: [],
    outputs: [],
    statusHistory: []
  },
  {
    id: "PRP-2026-002",
    title: "Pemberdayaan UMKM Melalui Digitalisasi Pemasaran Produk Lokal",
    type: "PENGABDIAN",
    schemeId: "S-02",
    schemeName: "Pengabdian Masyarakat Kemitraan",
    fieldOfStudy: "Manajemen",
    year: 2026,
    duration: 6,
    budget: 15000000,
    status: "DRAFT",
    submittedAt: "2026-05-12T10:00:00Z",
    updatedAt: "2026-05-12T10:00:00Z",
    bidangIlmu: "Soshum",
    facultyId: "FT",
    facultyName: "Fakultas Teknik",
    submitter: {
      id: "U01",
      nidn: "0011223344",
      name: "Dr. Budi Santoso, S.T., M.T.",
      facultyName: "Fakultas Teknik"
    },
    members: [
      { id: "M1", nidn: "0011223344", name: "Dr. Budi Santoso, S.T., M.T.", role: "KETUA", faculty: "Fakultas Teknik", studyProgram: "Manajemen" },
      { id: "M4", name: "Joko Supriyanto", role: "ANGGOTA_MAHASISWA", faculty: "Fakultas Ekonomi", studyProgram: "Akuntansi" }
    ],
    budgetDetails: [],
    files: [],
    outputs: [],
    statusHistory: []
  },
  {
    id: "PRP-2026-003",
    title: "Analisis Sentimen Publik Menggunakan NLP (Natural Language Processing)",
    type: "PENELITIAN",
    schemeId: "S-03",
    schemeName: "Penelitian Dosen Pemula",
    fieldOfStudy: "Teknik Informatika",
    year: 2025,
    duration: 10,
    budget: 20000000,
    status: "SELESAI",
    submittedAt: "2025-02-15T09:00:00Z",
    updatedAt: "2025-12-20T14:00:00Z",
    bidangIlmu: "Saintek",
    facultyId: "FT",
    facultyName: "Fakultas Teknik",
    submitter: {
      id: "U01",
      nidn: "0011223344",
      name: "Dr. Budi Santoso, S.T., M.T.",
      facultyName: "Fakultas Teknik"
    },
    members: [
      { id: "M1", nidn: "0011223344", name: "Dr. Budi Santoso, S.T., M.T.", role: "KETUA", faculty: "Fakultas Teknik", studyProgram: "Teknik Informatika" }
    ],
    budgetDetails: [],
    files: [],
    outputs: [],
    statusHistory: []
  },
  {
    id: "PRP-2026-004",
    title: "Sintesis dan Karakterisasi Material Karbon Aktif dari Limbah Sawit",
    type: "PENELITIAN",
    schemeId: "S-01",
    schemeName: "Penelitian Terapan Unggulan",
    fieldOfStudy: "Kimia",
    year: 2026,
    duration: 12,
    budget: 50000000,
    status: "DIREVIEW",
    submittedAt: "2026-05-15T11:20:00Z",
    updatedAt: "2026-05-15T11:20:00Z",
    bidangIlmu: "Saintek",
    facultyId: "FMIPA",
    facultyName: "Fakultas MIPA",
    submitter: {
      id: "U02",
      nidn: "0022334455",
      name: "Prof. Dr. Andi Wijaya",
      facultyName: "Fakultas MIPA"
    },
    members: [
      { id: "M5", nidn: "0022334455", name: "Prof. Dr. Andi Wijaya", role: "KETUA", faculty: "Fakultas MIPA", studyProgram: "Kimia" },
      { id: "M6", name: "Desy Natalia", role: "ANGGOTA_MAHASISWA", faculty: "Fakultas MIPA", studyProgram: "Kimia" }
    ],
    budgetDetails: [],
    files: [],
    outputs: [],
    statusHistory: []
  }
];
