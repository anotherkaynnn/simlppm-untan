import { LandingPageContent } from '@/types/landing';

export const mockLandingData: LandingPageContent = {
  hero: {
    badge: "Versi 2.0 (2026)",
    heading: "Sistem Informasi Manajemen LPPM",
    subheading: "Universitas Tanjungpura",
    description: "Platform terintegrasi untuk pengelolaan proposal penelitian, pengabdian kepada masyarakat, monitoring pelaksanaan, dan pelaporan luaran.",
    ctaLabel: "Masuk via SATU UNTAN",
    ctaSubtext: "Gunakan sistem autentikasi tunggal untuk mengakses SIMLPPM Universitas Tanjungpura dengan satu Akun."
  },
  modulCards: [
    {
      title: "Pengajuan Proposal",
      icon: "FilePlus2",
      description: "Ajukan usulan proposal penelitian dan pengabdian secara online dengan form yang lebih intuitif.",
      features: ["Auto-complete Data Dosen", "Form Luaran HKI Terstruktur", "Validasi Real-time"]
    },
    {
      title: "Monitoring & Review",
      icon: "Eye",
      description: "Pantau status proposal Anda dari tahap pengajuan hingga selesai secara transparan.",
      features: ["Timeline Status Visual", "Activity Log Detail", "Akses Reviewer Khusus"]
    },
    {
      title: "Pelaporan Luaran",
      icon: "FileCheck",
      description: "Unggah laporan akhir dan catat luaran publikasi, HKI, maupun produk secara sistematis.",
      features: ["Multi-file Upload", "Manajemen HKI & Paten", "Integrasi SINTA (Soon)"]
    },
    {
      title: "Statistik & Eksekutif",
      icon: "BarChart3",
      description: "Dashboard visual analitik untuk memantau kinerja fakultas dan serapan anggaran institusi.",
      features: ["Grafik Interaktif Recharts", "Ekspor Rekap Excel", "Filter Dinamis Lintas Fakultas"]
    }
  ],
  stats: [
    { value: "1.018", label: "Dosen Aktif", detail: "Yang terdaftar di sistem" },
    { value: "9", label: "Fakultas", detail: "Di Universitas Tanjungpura" },
    { value: "99", label: "Program Studi", detail: "Tersebar di seluruh fakultas" },
    { value: "Rp 96,3M", label: "Realisasi Anggaran", detail: "Total dana terkelola (2022)" }
  ],
  dipaData: {
    year: 2026,
    title: "Sebaran Usulan DIPA",
    rows: [
      { no: 1, facultyName: "Fakultas Keguruan dan Ilmu Pendidikan (FKIP)", penelitian: 183, pkm: 86, total: 269 },
      { no: 2, facultyName: "Fakultas Teknik", penelitian: 117, pkm: 68, total: 185 },
      { no: 3, facultyName: "Fakultas Ekonomi dan Bisnis (FEB)", penelitian: 116, pkm: 32, total: 148 },
      { no: 4, facultyName: "Fakultas Ilmu Sosial dan Ilmu Politik (FISIP)", penelitian: 73, pkm: 30, total: 103 },
      { no: 5, facultyName: "Fakultas Kedokteran", penelitian: 70, pkm: 51, total: 121 },
      { no: 6, facultyName: "Fakultas Pertanian", penelitian: 67, pkm: 46, total: 113 },
      { no: 7, facultyName: "Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)", penelitian: 63, pkm: 29, total: 92 },
      { no: 8, facultyName: "Fakultas Kehutanan", penelitian: 62, pkm: 51, total: 113 },
      { no: 9, facultyName: "Fakultas Hukum", penelitian: 54, pkm: 30, total: 84 },
      { no: 10, facultyName: "Sekretariat / Rektorat", penelitian: 0, pkm: 0, total: 0 }
    ]
  },
  panduanCards: [
    {
      label: "Panduan Dosen",
      icon: "GraduationCap",
      description: "Panduan pengajuan proposal, monitoring, dan pelaporan untuk dosen pengusul",
      linkUrl: "#",
      linkLabel: "Download PDF",
      version: "2.1.0",
      uploadDate: "10 Agustus 2026"
    },
    {
      label: "Panduan Operator Fakultas",
      icon: "ClipboardCheck",
      description: "Panduan verifikasi kelengkapan administrasi dan rekap data fakultas",
      linkUrl: "#",
      linkLabel: "Download PDF",
      version: "1.0.5",
      uploadDate: "05 Agustus 2026"
    },
    {
      label: "Panduan Admin Fakultas",
      icon: "UserCog",
      description: "Panduan pengelolaan data reviewer dan monitoring proposal tingkat fakultas",
      linkUrl: "#",
      linkLabel: "Download PDF",
      version: "1.1.0",
      uploadDate: "12 Agustus 2026"
    },
    {
      label: "Data Akun SIMLPPM",
      icon: "UserCheck",
      description: "Informasi akun dan hak akses pengguna di SIMLPPM",
      linkUrl: "#",
      linkLabel: "Lihat Data",
      version: "2.0.0",
      uploadDate: "15 Juli 2026"
    }
  ],
  news: [
    {
      id: "N1",
      title: "Kinerja Unggul, Universitas Tanjungpura Berada di Klaster Mandiri Perguruan Tinggi Tahun 2026",
      excerpt: "Kinerja Unggul Universitas Tanjungpura.",
      category: "Berita Utama",
      publishedAt: "2025-11-13T08:00:00Z"
    },
    {
      id: "N2",
      title: "Perjanjian Kerjasama Akademik dan Riset antara LPPM Universitas Pattimura dengan LPPM UNTAN",
      excerpt: "Perjanjian Kerjasama Akademik dan Riset.",
      category: "Kerjasama",
      publishedAt: "2025-11-21T10:00:00Z"
    },
    {
      id: "N3",
      title: "Seleksi Substansi dan Pengukuran TKT Proposal PINOV UNTAN: Mendorong Hilirisasi Riset ke Industri",
      excerpt: "Seleksi Substansi dan Pengukuran TKT Proposal PINOV UNTAN.",
      category: "Kegiatan",
      publishedAt: "2025-08-04T09:00:00Z"
    }
  ],
  agendas: [
    {
      id: "A1",
      title: "Batas Akhir Pengunggahan Proposal Dana DIPA",
      date: "2026-08-31",
      time: "23:59 WIB"
    },
    {
      id: "A2",
      title: "Pelatihan Reviewer Internal LPPM UNTAN",
      date: "2026-09-10",
      location: "Gedung Konferensi Universitas Tanjungpura"
    }
  ],
  lppmInfo: {
    description: "Lembaga Penelitian dan Pengabdian kepada Masyarakat (LPPM) Universitas Tanjungpura bertugas mengoordinasikan, memantau, dan menilai pelaksanaan kegiatan penelitian dan pengabdian kepada masyarakat.",
    missions: [
      "Meningkatkan kualitas dan kuantitas penelitian serta pengabdian inovatif.",
      "Mendorong perolehan Hak Kekayaan Intelektual (HKI) dan publikasi ilmiah.",
      "Menjalin kerja sama riset dengan berbagai instansi di tingkat nasional dan internasional."
    ],
    websiteUrl: "https://lppm.untan.ac.id"
  },
  contact: {
    address: "Gedung LPPM Universitas Tanjungpura, Jl. Prof. Dr. H. Hadari Nawawi, Pontianak 78124, Kalimantan Barat",
    email: "lppm@untan.ac.id",
    phone: "(0561) 739630",
    hours: "Senin - Jumat, 08.00 - 16.00 WIB"
  }
};
