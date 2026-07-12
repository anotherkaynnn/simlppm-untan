export interface Notification {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  isRead: boolean;
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
  }
];
