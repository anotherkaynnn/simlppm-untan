"use client";

import { useAuthStore } from "@/store/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, FileText, CheckCircle, Clock, Plus, Database, Timer, Megaphone, ArrowRight, UserPlus, Activity } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";

export default function DashboardPage() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-neutral-500">Selamat datang kembali, {user.name} ({user.role.replace('_', ' ')})</p>
        </div>
      </div>

      {/* Role-based Dashboard Views */}
      {user.role === 'DOSEN' && <DosenDashboard />}
      {user.role === 'OPERATOR_FK' && <OperatorDashboard />}
      {user.role === 'ADMIN_FK' && <AdminFkDashboard />}
      {user.role === 'KETUA_LPPM' && <KetuaLppmDashboard />}
      {user.role === 'ADMIN_SISTEM' && <AdminSistemDashboard />}
      {user.role === 'REVIEWER' && <ReviewerDashboard />}
    </div>
  );
}

// ----------------------------------------------------------------------
// Sub-components untuk masing-masing Role (bisa dipisah filenya nanti)
// ----------------------------------------------------------------------

import { mockProposals } from "@/mock/data/proposals";
import { ProposalTable } from "@/components/app/ProposalTable";

function DosenDashboard() {
  const { user } = useAuthStore();
  const myProposals = mockProposals.filter(p => p.submitter.id === user?.id);

  return (
    <>
      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-warning-100 p-2 rounded-full text-warning-700 shrink-0">
            <Timer className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-warning-800">Batas Waktu Pengusulan Proposal</h3>
            <p className="text-sm text-warning-700">Penerimaan usulan proposal pendanaan tahun 2026 akan ditutup dalam <span className="font-bold">14 Hari</span>.</p>
          </div>
        </div>
        <Link href="/pengajuan/baru" className="w-full md:w-auto shrink-0">
          <Button className="w-full bg-warning-600 hover:bg-warning-700 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Ajukan Proposal Baru
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Usulan" value="5" icon={<FileText className="w-5 h-5 text-primary-600" />} />
        <StatCard title="Sedang Direview" value="1" icon={<Clock className="w-5 h-5 text-warning" />} />
        <StatCard title="Didanai" value="3" icon={<CheckCircle className="w-5 h-5 text-success" />} />
        <StatCard title="Total Dana (Rp)" value="45 Jt" icon={<BarChart3 className="w-5 h-5 text-info" />} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Usulan Aktif</CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6 sm:pt-0">
            <ProposalTable proposals={myProposals} />
          </CardContent>
        </Card>
        <Card className="border-info-200 shadow-sm">
          <CardHeader className="bg-info-50 rounded-t-xl border-b border-info-100 pb-4">
            <CardTitle className="text-lg flex items-center gap-2 text-info-800">
              <Megaphone className="w-5 h-5" />
              Pengumuman Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              <h4 className="font-semibold text-neutral-900 mb-1">Kewajiban Anggota Tim Pelaksana</h4>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Diinformasikan kepada seluruh Dosen Peneliti dan Pengabdi, wajib menyertakan minimal 1 (satu) orang Mahasiswa dan 1 (satu) orang Tenaga Kependidikan dalam struktur Tim Pelaksana proposal P2M tahun ini.
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
                <span>Diterbitkan: Hari ini, 08:00 WIB</span>
                <Link href="#" className="text-primary-600 font-medium hover:underline flex items-center">
                  Baca Selengkapnya <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function OperatorDashboard() {
  const antrean = [
    { id: "PRP-2026-041", judul: "Pengembangan Model E-Learning Berbasis AI", pengusul: "Dr. Budi Santoso, M.T.", skim: "Penelitian Dasar", tglMasuk: "Hari ini, 09:15" },
    { id: "PRP-2026-042", judul: "Pelatihan Kewirausahaan Digital UMKM", pengusul: "Rina Amelia, S.E., M.Si.", skim: "Pengabdian Masyarakat", tglMasuk: "Hari ini, 08:30" },
    { id: "PRP-2026-039", judul: "Sintesis Material Nano untuk Baterai", pengusul: "Prof. Dr. Ir. Herman, M.Sc.", skim: "Penelitian Terapan", tglMasuk: "Kemarin, 15:40" },
    { id: "PRP-2026-038", judul: "Analisis Sentimen Publik pada Pemilu", pengusul: "Andi Setiawan, S.IP., M.A.", skim: "Penelitian Dasar", tglMasuk: "Kemarin, 14:10" },
    { id: "PRP-2026-037", judul: "Pemberdayaan Masyarakat Pesisir Sungai", pengusul: "Dr. Siti Aminah, S.P., M.P.", skim: "Pengabdian Masyarakat", tglMasuk: "Kemarin, 10:05" },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Menunggu Verifikasi" value="12" icon={<Clock className="w-5 h-5 text-warning" />} />
        <StatCard title="Selesai Diverifikasi" value="45" icon={<CheckCircle className="w-5 h-5 text-success" />} />
        <StatCard title="Ditolak" value="2" icon={<FileText className="w-5 h-5 text-danger" />} />
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
          <CardTitle className="text-lg">Antrean Proposal Masuk Terbaru</CardTitle>
          <Link href="/verifikasi">
            <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white">
              Verifikasi Proposal Masuk <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-neutral-50">
                <TableRow>
                  <TableHead>Kode</TableHead>
                  <TableHead>Judul Proposal</TableHead>
                  <TableHead>Ketua Pengusul</TableHead>
                  <TableHead>Skim</TableHead>
                  <TableHead>Waktu Masuk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {antrean.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium text-neutral-600">{row.id}</TableCell>
                    <TableCell className="font-semibold text-neutral-900 max-w-[250px] truncate" title={row.judul}>{row.judul}</TableCell>
                    <TableCell className="text-neutral-700">{row.pengusul}</TableCell>
                    <TableCell className="text-neutral-600">{row.skim}</TableCell>
                    <TableCell className="text-neutral-500 whitespace-nowrap">{row.tglMasuk}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function AdminFkDashboard() {
  const antreanPenugasan = [
    { id: "PRP-2026-050", judul: "Inovasi Pembelajaran Daring di Era Digital", pengusul: "Dr. Budi Santoso, S.T., M.T.", skim: "Penelitian Terapan" },
    { id: "PRP-2026-051", judul: "Pemberdayaan Masyarakat Nelayan Pesisir", pengusul: "Siti Aminah, S.P., M.P.", skim: "Pengabdian Masyarakat" },
    { id: "PRP-2026-052", judul: "Pengembangan Material Komposit Ramah Lingkungan", pengusul: "Prof. Dr. Ir. Herman", skim: "Penelitian Dasar" },
  ];

  const logAktivitas = [
    { text: "Prof. Anton telah selesai mengunggah nilai untuk Proposal PRP-2026-010", time: "10 menit yang lalu" },
    { text: "Dr. Rina menerima penugasan review untuk Proposal PRP-2026-025", time: "1 jam yang lalu" },
    { text: "Dr. Budi menolak penugasan review (Alasan: Conflict of Interest)", time: "3 jam yang lalu" },
    { text: "Prof. Anton mulai mereview Proposal PRP-2026-010", time: "Kemarin, 14:30 WIB" },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Dosen Aktif" value="120" icon={<FileText className="w-5 h-5 text-primary-600" />} />
        <StatCard title="Usulan Fakultas" value="34" icon={<BarChart3 className="w-5 h-5 text-info" />} />
        <StatCard title="Rasio Usulan" value="28%" icon={<CheckCircle className="w-5 h-5 text-success" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Kolom Kiri: Antrean Penugasan */}
        <div className="lg:col-span-8">
          <Card className="h-full">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-lg">Antrean Penugasan Reviewer Terbaru</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-neutral-50">
                    <TableRow>
                      <TableHead>Kode & Judul</TableHead>
                      <TableHead>Ketua Pengusul</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {antreanPenugasan.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <div className="font-medium text-neutral-900 truncate max-w-[250px] lg:max-w-[350px]" title={row.judul}>{row.judul}</div>
                          <div className="text-xs text-neutral-500 mt-1">{row.id} • {row.skim}</div>
                        </TableCell>
                        <TableCell className="text-neutral-700">{row.pengusul}</TableCell>
                        <TableCell className="text-right">
                          <Link href="/manajemen/reviewer">
                            <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white">
                              <UserPlus className="w-4 h-4 mr-2" />
                              Tugaskan Reviewer
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kolom Kanan: Log Aktivitas */}
        <div className="lg:col-span-4">
          <Card className="h-full border-info-200 shadow-sm">
            <CardHeader className="bg-info-50 rounded-t-xl border-b border-info-100 pb-4">
              <CardTitle className="text-lg flex items-center gap-2 text-info-800">
                <Activity className="w-5 h-5" />
                Log Aktivitas Review
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {logAktivitas.map((log, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="mt-1">
                      <div className="w-2 h-2 rounded-full bg-info-500 shrink-0"></div>
                      {index !== logAktivitas.length - 1 && (
                        <div className="w-0.5 h-full bg-neutral-200 ml-[3px] mt-1 shrink-0"></div>
                      )}
                    </div>
                    <div className="pb-4 flex-1">
                      <p className="text-sm text-neutral-700">{log.text}</p>
                      <span className="text-xs text-neutral-400 mt-1 block">{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

function KetuaLppmDashboard() {
  const partisipasiData = [
    { name: "Hukum", usulan: 120, didanai: 40 },
    { name: "Teknik", usulan: 250, didanai: 110 },
    { name: "Ekonomi", usulan: 180, didanai: 70 },
    { name: "Pertanian", usulan: 150, didanai: 65 },
    { name: "KIP", usulan: 200, didanai: 80 },
    { name: "ISIP", usulan: 90, didanai: 30 },
    { name: "MIPA", usulan: 85, didanai: 35 },
    { name: "Kedokteran", usulan: 110, didanai: 45 },
    { name: "Kehutanan", usulan: 70, didanai: 25 },
  ];

  const serapanData = [
    { name: "Penelitian Dasar", value: 3.5, color: "#2563eb" },
    { name: "Penelitian Terapan", value: 4.2, color: "#16a34a" },
    { name: "Pengabdian Masyarakat", value: 1.8, color: "#eab308" },
    { name: "Riset Unggulan", value: 0.5, color: "#dc2626" },
  ];

  const rekapFakultas = [
    { fakultas: "Fakultas Teknik", usulan: 250, didanai: 110, rasio: "44%", dana: "Rp 2.850.000.000" },
    { fakultas: "Fakultas Keguruan dan Ilmu Pendidikan", usulan: 200, didanai: 80, rasio: "40%", dana: "Rp 1.500.000.000" },
    { fakultas: "Fakultas Ekonomi dan Bisnis", usulan: 180, didanai: 70, rasio: "38%", dana: "Rp 1.250.000.000" },
    { fakultas: "Fakultas Pertanian", usulan: 150, didanai: 65, rasio: "43%", dana: "Rp 1.100.000.000" },
    { fakultas: "Fakultas Hukum", usulan: 120, didanai: 40, rasio: "33%", dana: "Rp 850.000.000" },
    { fakultas: "Fakultas Kedokteran", usulan: 110, didanai: 45, rasio: "40%", dana: "Rp 1.200.000.000" },
    { fakultas: "Fakultas Ilmu Sosial dan Ilmu Politik", usulan: 90, didanai: 30, rasio: "33%", dana: "Rp 450.000.000" },
    { fakultas: "Fakultas Matematika dan Ilmu Pengetahuan Alam", usulan: 85, didanai: 35, rasio: "41%", dana: "Rp 600.000.000" },
    { fakultas: "Fakultas Kehutanan", usulan: 70, didanai: 25, rasio: "35%", dana: "Rp 350.000.000" },
  ];

  const trenLuaranData = [
    { year: "2022", jurnal: 120, hki: 45, buku: 30 },
    { year: "2023", jurnal: 150, hki: 60, buku: 40 },
    { year: "2024", jurnal: 180, hki: 85, buku: 55 },
    { year: "2025", jurnal: 210, hki: 110, buku: 70 },
    { year: "2026", jurnal: 250, hki: 135, buku: 90 },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Usulan (Univ)" value="1.050" icon={<FileText className="w-5 h-5 text-primary-600" />} />
        <StatCard title="Usulan Didanai" value="420" icon={<CheckCircle className="w-5 h-5 text-success" />} />
        <StatCard title="Penyerapan Anggaran" value="85%" icon={<BarChart3 className="w-5 h-5 text-info" />} />
        <StatCard title="Reviewer Aktif" value="75" icon={<Clock className="w-5 h-5 text-warning" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        <div className="lg:col-span-7">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Partisipasi Usulan per Fakultas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={partisipasiData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <RechartsTooltip />
                    <Bar dataKey="usulan" name="Total Usulan Masuk" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="didanai" name="Didanai" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Serapan Anggaran per Skim</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={serapanData} 
                      cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value"
                      nameKey="name"
                      className="cursor-pointer outline-none"
                      onClick={(data) => {
                        toast.info(`Anggaran ${data.name}: Rp ${data.value} Miliar`);
                      }}
                    >
                      {serapanData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color} 
                          className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value) => [`Rp ${value} Miliar`, 'Serapan']} 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full flex flex-col gap-2 mt-2">
                {serapanData.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-neutral-600">{item.name}</span>
                    </div>
                    <span className="font-semibold">{item.value} M</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Tren Luaran (Publikasi, HKI, Buku)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trenLuaranData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone" dataKey="jurnal" name="Jurnal Ilmiah" stroke="#2563eb" strokeWidth={2} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="hki" name="HKI / Paten" stroke="#16a34a" strokeWidth={2} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="buku" name="Buku Referensi" stroke="#eab308" strokeWidth={2} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Rekapitulasi Usulan Tingkat Universitas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fakultas</TableHead>
                  <TableHead className="text-center">Total Usulan</TableHead>
                  <TableHead className="text-center">Didanai</TableHead>
                  <TableHead className="text-center">Rasio Kelulusan</TableHead>
                  <TableHead className="text-right">Total Serapan Dana</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rekapFakultas.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium text-neutral-900">{row.fakultas}</TableCell>
                    <TableCell className="text-center text-neutral-600">{row.usulan}</TableCell>
                    <TableCell className="text-center text-success-700 font-medium">{row.didanai}</TableCell>
                    <TableCell className="text-center text-neutral-600">{row.rasio}</TableCell>
                    <TableCell className="text-right font-semibold text-neutral-900">{row.dana}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function AdminSistemDashboard() {
  const recentLogs = [
    { time: "10:45", user: "Dosen 'ahmad'", action: "memperbarui foto profil" },
    { time: "09:30", user: "Admin FK Teknik", action: "menugaskan Reviewer Dr. Anton" },
    { time: "08:15", user: "Operator FK", action: "memverifikasi proposal PRP-2026-005" },
    { time: "Kemarin", user: "Admin Sistem", action: "menambahkan skim 'Penelitian Dasar Baru'" },
    { time: "Kemarin", user: "Ketua LPPM", action: "mengunduh laporan statistik institusi" },
  ];

  const handleBackup = () => {
    toast.info("Memulai proses pencadangan database...");
    setTimeout(() => toast.success("Database berhasil dicadangkan!"), 1500);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Pengguna" value="1.542" icon={<FileText className="w-5 h-5 text-primary-600" />} />
        <StatCard title="Skim Aktif" value="8" icon={<CheckCircle className="w-5 h-5 text-success" />} />
        <StatCard title="System Error Logs" value="0" icon={<BarChart3 className="w-5 h-5 text-info" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mt-6">
        {/* Kolom Kiri: Recent Activity Log (60%) */}
        <div className="lg:col-span-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">Waktu</TableHead>
                    <TableHead>Pengguna</TableHead>
                    <TableHead>Aktivitas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentLogs.map((log, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-neutral-500 whitespace-nowrap">{log.time}</TableCell>
                      <TableCell className="font-medium text-neutral-900">{log.user}</TableCell>
                      <TableCell className="text-neutral-600">{log.action}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Kolom Kanan: Quick Actions (40%) */}
        <div className="lg:col-span-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/konfigurasi/skim" className="block w-full">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2 text-primary-600" />
                  Tambah Skim Baru
                </Button>
              </Link>
              <Link href="/konfigurasi/prodi" className="block w-full">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2 text-primary-600" />
                  Daftarkan Program Studi Baru
                </Button>
              </Link>
              <Button onClick={handleBackup} className="w-full justify-start text-warning-700 hover:text-warning-800 hover:bg-warning-50 border-warning-200" variant="outline">
                <Database className="w-4 h-4 mr-2" />
                Backup Database
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

function ReviewerDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard title="Tugas Review Baru" value="3" icon={<Clock className="w-5 h-5 text-warning" />} />
      <StatCard title="Review Selesai" value="15" icon={<CheckCircle className="w-5 h-5 text-success" />} />
      <StatCard title="Total Nilai (Rata-rata)" value="82.5" icon={<BarChart3 className="w-5 h-5 text-info" />} />
    </div>
  );
}

// ----------------------------------------------------------------------
// Reusable StatCard Component
// ----------------------------------------------------------------------
function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-neutral-900">{value}</h3>
        </div>
        <div className="w-12 h-12 bg-neutral-50 rounded-xl flex items-center justify-center border border-neutral-100">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
