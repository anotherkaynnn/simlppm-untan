"use client";

import { useAuthStore } from "@/store/authStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExportButton } from "@/components/shared/ExportButton";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Building2, FileText, CheckCircle2 } from "lucide-react";

// Mock Data untuk Grafik
const PARTISIPASI_FAKULTAS = [
  { name: "Teknik", proposals: 120, accepted: 45 },
  { name: "MIPA", proposals: 98, accepted: 38 },
  { name: "Pertanian", proposals: 115, accepted: 50 },
  { name: "Ekonomi", proposals: 85, accepted: 30 },
  { name: "Kedokteran", proposals: 60, accepted: 25 },
  { name: "Hukum", proposals: 75, accepted: 20 },
  { name: "FKIP", proposals: 140, accepted: 55 },
  { name: "FISIP", proposals: 90, accepted: 28 },
  { name: "Kehutanan", proposals: 65, accepted: 22 },
];

const PARTISIPASI_JURUSAN = [
  { name: "T. Elektro", proposals: 35, accepted: 12 },
  { name: "T. Sipil", proposals: 40, accepted: 15 },
  { name: "Arsitektur", proposals: 20, accepted: 8 },
  { name: "Informatika", proposals: 25, accepted: 10 },
];

const SERAPAN_ANGGARAN = [
  { name: "Penelitian Dasar (PD)", value: 4500000000 },
  { name: "Penelitian Terapan (PT)", value: 3200000000 },
  { name: "Prog. Kemitraan (PKM)", value: 1500000000 },
  { name: "Prog. Pemberdayaan", value: 800000000 },
];

const COLORS = ['#2563eb', '#16a34a', '#eab308', '#dc2626', '#8b5cf6'];

export default function StatistikPage() {
  const { user } = useAuthStore();

  if (!user) return null;

  // Format currency untuk tooltip
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const isAdminFk = user.role === 'ADMIN_FK';

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">
            {isAdminFk ? "Statistik Fakultas Teknik" : "Statistik Institusional"}
          </h1>
          <p className="text-neutral-500">
            {isAdminFk 
              ? "Ringkasan performa penelitian dan pengabdian tingkat fakultas." 
              : "Ringkasan performa penelitian dan pengabdian Universitas Tanjungpura."}
          </p>
        </div>
        
        <ExportButton 
          data={isAdminFk ? PARTISIPASI_JURUSAN : PARTISIPASI_FAKULTAS} 
          filename={isAdminFk ? "Rekap_Fakultas_2026" : "Rekap_Partisipasi_Fakultas_2026"} 
          label="Unduh Rekap Excel"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isAdminFk ? "Total Jurusan" : "Total Fakultas"}
            </CardTitle>
            <Building2 className="h-4 w-4 text-neutral-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isAdminFk ? "4" : "9"}</div>
            <p className="text-xs text-neutral-500 mt-1">
              {isAdminFk ? "Program studi/jurusan aktif" : "Institusi terdaftar"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Proposal Masuk</CardTitle>
            <FileText className="h-4 w-4 text-primary-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isAdminFk ? "120" : "848"}</div>
            <p className="text-xs text-neutral-500 mt-1">+12% dari tahun lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proposal Didanai</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{isAdminFk ? "45" : "313"}</div>
            <p className="text-xs text-neutral-500 mt-1">Rasio penerimaan ~{isAdminFk ? "37.5%" : "36.9%"}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Bar Chart */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>{isAdminFk ? "Partisipasi per Jurusan" : "Partisipasi per Fakultas"}</CardTitle>
            <CardDescription>Perbandingan jumlah proposal masuk dan didanai per {isAdminFk ? "jurusan" : "fakultas"} (2026).</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={isAdminFk ? PARTISIPASI_JURUSAN : PARTISIPASI_FAKULTAS} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                  <Bar dataKey="proposals" name="Proposal Masuk" fill="var(--primary-300)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="accepted" name="Didanai" fill="var(--primary-600)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Donut Chart */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Serapan Anggaran per Skim</CardTitle>
            <CardDescription>Distribusi pendanaan Rp 10 Miliar berdasarkan skim.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <div className="h-[350px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SERAPAN_ANGGARAN}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {SERAPAN_ANGGARAN.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: any) => formatRupiah(value as number)}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
