export interface Notification {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
  roleTarget?: string;
}

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    title: "Proposal Disetujui",
    body: "Proposal penelitian Anda 'Pengembangan Sistem Cerdas' telah disetujui oleh Reviewer.",
    createdAt: "2 jam yang lalu",
    isRead: false,
  },
  {
    id: "n2",
    title: "Revisi Laporan Kemajuan",
    body: "Terdapat catatan revisi pada Laporan Kemajuan Anda. Harap segera diperbaiki.",
    createdAt: "1 hari yang lalu",
    isRead: false,
  },
  {
    id: "n3",
    title: "Pengumuman Pembukaan Hibah",
    body: "Penerimaan proposal hibah internal tahun 2026 telah dibuka.",
    createdAt: "3 hari yang lalu",
    isRead: true,
  },
  {
    id: "n4",
    title: "Dokumen Kontrak Tersedia",
    body: "Dokumen kontrak untuk usulan Anda sudah dapat diunduh di sistem.",
    createdAt: "1 minggu yang lalu",
    isRead: true,
  },
  {
    id: "n5",
    title: "Penugasan Review Baru",
    body: "Anda telah ditugaskan untuk mengevaluasi proposal 'Sintesis Material Maju...'. Harap selesaikan sebelum tenggat waktu.",
    createdAt: "Baru saja",
    isRead: false,
    roleTarget: "REVIEWER"
  },
  {
    id: "n6",
    title: "📋 Penugasan Review — 3 Proposal Baru",
    body: "Anda ditunjuk sebagai reviewer untuk 3 proposal pada periode 2026. Batas waktu penilaian: 31 Juli 2026.",
    createdAt: "Baru saja",
    isRead: false,
    roleTarget: "DOSEN_REVIEWER"
  },
  {
    id: "n7",
    title: "Pengingat: Deadline Review H-7",
    body: "Masih ada 2 proposal yang belum Anda nilai. Segera buka menu Review P2M untuk melanjutkan.",
    createdAt: "1 jam yang lalu",
    isRead: false,
    roleTarget: "DOSEN_REVIEWER"
  }
];
