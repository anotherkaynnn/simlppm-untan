export const mockAuditLogs = [
  {
    id: "LOG-1001",
    timestamp: "2026-07-12T08:15:22Z",
    user: "Admin Sistem",
    action: "LOGIN",
    target: "Sistem SIMLPPM",
    detail: "Login berhasil dari IP 192.168.1.100"
  },
  {
    id: "LOG-1002",
    timestamp: "2026-07-12T09:30:10Z",
    user: "Dr. Budi Santoso",
    action: "CREATE",
    target: "Proposal: PRP-2026-001",
    detail: "Membuat draft proposal baru skema PDP"
  },
  {
    id: "LOG-1003",
    timestamp: "2026-07-12T10:45:00Z",
    user: "Dr. Budi Santoso",
    action: "SUBMIT",
    target: "Proposal: PRP-2026-001",
    detail: "Mengirim proposal untuk diverifikasi"
  },
  {
    id: "LOG-1004",
    timestamp: "2026-07-12T11:20:15Z",
    user: "Operator Fakultas",
    action: "VERIFY",
    target: "Proposal: PRP-2026-001",
    detail: "Memverifikasi kelengkapan administrasi proposal"
  },
  {
    id: "LOG-1005",
    timestamp: "2026-07-12T13:10:05Z",
    user: "Admin Sistem",
    action: "DELETE",
    target: "User: U-099",
    detail: "Menghapus akun pengguna tidak aktif"
  }
];
