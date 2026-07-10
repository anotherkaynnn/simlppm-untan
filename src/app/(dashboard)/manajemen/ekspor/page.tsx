"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExportButton } from "@/components/shared/ExportButton";
import { FileSpreadsheet, FileText, Users } from "lucide-react";

// Mock Data for Exports
const mockRekapProdi = [
  { "Program Studi": "Ilmu Hukum (S1)", "Total Dosen": 45, "Proposal Aktif": 12, "Usulan Didanai": 8 },
  { "Program Studi": "Kenotariatan (S2)", "Total Dosen": 20, "Proposal Aktif": 5, "Usulan Didanai": 3 },
  { "Program Studi": "Ilmu Hukum (S3)", "Total Dosen": 15, "Proposal Aktif": 4, "Usulan Didanai": 2 },
];

const mockDetailProposal = [
  { "Judul": "Menjadi Pendidik Profesional...", "Nama Pengusul": "Dr. Budi Santoso, S.T., M.T.", "Prodi": "Ilmu Hukum (S1)", "Skim": "PT", "Bidang Ilmu": "Soshum", "Total Anggaran": 15000000 },
  { "Judul": "Analisis Kebijakan Hukum Lingkungan...", "Nama Pengusul": "Siti Aminah, M.M.", "Prodi": "Kenotariatan (S2)", "Skim": "PDP", "Bidang Ilmu": "Soshum", "Total Anggaran": 10000000 },
];

const mockLaporanReviewer = [
  { "Judul Proposal": "Menjadi Pendidik Profesional...", "Reviewer Internal": "Prof. Dr. Hendra", "Status Penilaian": "Selesai" },
  { "Judul Proposal": "Analisis Kebijakan Hukum Lingkungan...", "Reviewer Internal": "Dr. Andi Setiawan", "Status Penilaian": "Menunggu" },
];

export default function ExportHubPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Export Hub</h1>
        <p className="text-neutral-500 mt-1">Pusat unduhan rekapitulasi data dan statistik operasional Fakultas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <Card className="flex flex-col h-full hover:border-primary-300 transition-colors">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 mb-4">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <CardTitle className="text-lg">Rekapitulasi Program Studi</CardTitle>
            <CardDescription className="pt-2">
              Unduh statistik ringkas jumlah dosen, proposal aktif, dan usulan didanai per prodi.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto pt-6">
            <ExportButton 
              data={mockRekapProdi} 
              filename="rekap_prodi_fhukum_2026" 
              label="Unduh Rekap (Excel)" 
              variant="default"
              className="w-full"
            />
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="flex flex-col h-full hover:border-primary-300 transition-colors">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <CardTitle className="text-lg">Laporan Detail Proposal & Anggaran</CardTitle>
            <CardDescription className="pt-2">
              Unduh data mentah seluruh proposal dosen FH (berisi Judul, Nama Pengusul, Prodi, Skim, Bidang Ilmu, dan Total Anggaran Rupiah).
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto pt-6">
            <ExportButton 
              data={mockDetailProposal} 
              filename="detail_proposal_anggaran_fhukum_2026" 
              label="Unduh Laporan (Excel)" 
              variant="default"
              className="w-full"
            />
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="flex flex-col h-full hover:border-primary-300 transition-colors">
          <CardHeader>
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 mb-4">
              <Users className="w-5 h-5" />
            </div>
            <CardTitle className="text-lg">Status Penugasan Reviewer</CardTitle>
            <CardDescription className="pt-2">
              Unduh daftar proposal beserta nama reviewer internal yang telah ditugaskan dan status penilaiannya.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto pt-6">
            <ExportButton 
              data={mockLaporanReviewer} 
              filename="laporan_reviewer_fhukum_2026" 
              label="Unduh Laporan (Excel)" 
              variant="default"
              className="w-full"
            />
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
