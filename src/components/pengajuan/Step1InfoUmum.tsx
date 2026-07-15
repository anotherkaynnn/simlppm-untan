/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { FieldTooltip } from "@/components/ui/tooltip";

interface Step1InfoUmumProps {
  formData: any;
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
  onNext: () => void;
}

const SKIM_MAPPING: Record<string, { id: string; label: string }[]> = {
  KEMENRISTEK_BRIN: [
    { id: "LPDP", label: "LPDP" },
    { id: "KEDAIREKA", label: "KEDAI REKA" },
    { id: "HILIRISET", label: "HILIRISET" },
    { id: "PDP", label: "PDP" },
  ],
  DIKTI: [
    { id: "PKSPT", label: "Penelitian Kerja Sama Antar Perguruan Tinggi" },
    { id: "PF", label: "Penelitian Fundamental" },
    { id: "PDP_DIKTI", label: "Penelitian Dosen Pemula" },
    { id: "PDUPT", label: "Penelitian Dasar Unggulan Perguruan Tinggi" },
    { id: "PTM", label: "Penelitian Tesis Megister" },
    { id: "KATALIS", label: "Kolaborasi Penelitian Strategis (KATALIS)" },
    { id: "PTLM", label: "Penelitian Terapan Luaran Model" },
  ],
  DIPA_UNTAN: [
    { id: "PP_UNTAN", label: "Penelitian Pengembangan" },
    { id: "PT_UNTAN", label: "Penelitian Terapan" },
    { id: "PD_UNTAN", label: "Penelitian Dasar" },
    { id: "PKPT_UNTAN", label: "Penelitian Kerjasama Perguruan Tinggi" },
    { id: "INOVASI_UNTAN", label: "INOVASI UNTAN" },
    { id: "MBKM", label: "MERDEKA BELAJAR KAMPUS MERDEKA (MBKM) Penelitian" },
    { id: "PKPTLN", label: "PENELITIAN KOLABORASI PERGURUAN TINGGI LUAR NEGERI (PKPTLN)" },
    { id: "PKPTDN", label: "PENELITIAN KOLABORASI PERGURUAN TINGGI DALAM NEGERI (PKPTDN)" },
    { id: "PDM_UNTAN", label: "Penelitian Dosen Muda" },
  ],
  KERJASAMA: [
    { id: "PKALPT", label: "Penelitian Kerjasama antar Lembaga dan PT" },
    { id: "PKSP", label: "PENELITIAN KERJA SAMA SWAKELOLA PEMERINTAH" },
    { id: "PKAPT", label: "PENELITIAN KERJA SAMA ANTAR PERGURUAN TINGGI" },
    { id: "PKMLN", label: "PENELITIAN KERJA SAMA MITRA LUAR NEGERI (INTERNASIONAL)" },
    { id: "PKMS", label: "PENELITIAN KERJA SAMA MITRA SWASTA" },
  ],
  MANDIRI: [
    { id: "PDM", label: "PENELITIAN DASAR MANDIRI" },
    { id: "PTMANDIRI", label: "PENELITIAN TERAPAN MANDIRI" },
    { id: "PPM", label: "PENELITIAN PENGEMBANGAN MANDIRI" },
  ],
  BATCH: [
    { id: "DIKTI_PD", label: "Dikti - Penelitian Dasar" },
    { id: "DIKTI_PT", label: "Dikti - Penelitian Terapan" },
    { id: "PP_BATCH", label: "PENELITIAN PENGEMBANGAN" },
    { id: "LPDP_KOMERSIAL", label: "LPDP-RISPRO Komersial" },
    { id: "LPDP_INTERNASIONAL", label: "LPDP - Rispro Kolaborasi Internasional" },
    { id: "LPDP_MANDATORI", label: "LPDP - Rispro Mandatori" },
    { id: "LPDP_RIP", label: "LPDP - Riset Inovatif Produktif" },
  ],
  LAIN_LAIN: [
    { id: "PM", label: "Penelitian Mahasiswa" },
    { id: "IM", label: "Inovasi Mahasiswa" },
  ]
};

export function Step1InfoUmum({ formData, errors, onChange, onNext }: Step1InfoUmumProps) {
  const { user } = useAuthStore();
  
  const formatRupiah = (value: number | string | undefined) => {
    if (value === undefined || value === null || value === 0) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\./g, ""); // remove dots
    const numericValue = parseInt(rawValue, 10);
    if (!isNaN(numericValue)) {
      onChange("budget", numericValue);
    } else {
      onChange("budget", 0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8 space-y-6">
        
        <div className="space-y-2">
          <div className="flex items-center">
            <label className="text-sm font-semibold text-neutral-900 flex items-center">Judul Proposal <span className="text-danger ml-1">*</span><FieldTooltip text="Tuliskan judul lengkap, minimal 10 karakter" /></label>
          </div>
          <Textarea 
            value={formData.title}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="Tuliskan judul proposal secara lengkap..."
            className={`min-h-[100px] border-neutral-300 focus:border-primary-500 ${errors.title ? 'border-danger-500 ring-1 ring-danger-500' : ''}`}
          />
          {errors.title && <p className="mt-1 text-xs text-danger-600">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center">
              <label className="text-sm font-semibold text-neutral-900 flex items-center">Tahun Pelaksanaan <FieldTooltip text="Tahun pelaksanaan otomatis menyesuaikan tahun berjalan" /></label>
            </div>
            <Input type="number" value={formData.year} disabled className="bg-neutral-50 text-neutral-600 font-medium" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <label className="text-sm font-semibold text-neutral-900 flex items-center">Sumber Dana <span className="text-danger ml-1">*</span><FieldTooltip text="Pilih sumber pendanaan utama" /></label>
            </div>
            <Select 
              value={formData.fundingSource} 
              onValueChange={(val) => {
                onChange("fundingSource", val);
                onChange("schemeId", "");
              }}
            >
              <SelectTrigger className={errors.fundingSource ? 'border-danger-500 ring-1 ring-danger-500' : ''}>
                <SelectValue placeholder="Pilih Sumber Dana" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="KEMENRISTEK_BRIN">HIBAH KEMENRISTEK / BRIN</SelectItem>
                <SelectItem value="DIKTI">HIBAH DIKTI</SelectItem>
                <SelectItem value="DIPA_UNTAN">DIPA UNTAN</SelectItem>
                <SelectItem value="KERJASAMA">KERJA SAMA</SelectItem>
                <SelectItem value="MANDIRI">MANDIRI</SelectItem>
                <SelectItem value="BATCH">BATCH</SelectItem>
                <SelectItem value="LAIN_LAIN">LAIN-LAIN</SelectItem>
              </SelectContent>
            </Select>
            {errors.fundingSource && <p className="mt-1 text-xs text-danger-600">{errors.fundingSource}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <label className="text-sm font-semibold text-neutral-900 flex items-center">Deskripsi Pendanaan <span className="text-danger ml-1">*</span><FieldTooltip text="Jelaskan detail pendanaan, minimal 10 karakter" /></label>
            </div>
            <Input 
              type="text" 
              value={formData.fundingDescription || ""}
              onChange={(e) => onChange("fundingDescription", e.target.value)}
              placeholder="Contoh: Pendanaan dari Hibah DIKTI 2026..."
              className={errors.fundingDescription ? 'border-danger-500 ring-1 ring-danger-500' : ''}
            />
            {errors.fundingDescription && <p className="mt-1 text-xs text-danger-600">{errors.fundingDescription}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <label className="text-sm font-semibold text-neutral-900 flex items-center">Jenis Usulan <span className="text-danger ml-1">*</span><FieldTooltip text="Pilih antara penelitian atau pengabdian" /></label>
            </div>
            <Select 
              value={formData.type} 
              onValueChange={(val) => onChange("type", val)}
            >
              <SelectTrigger className={errors.type ? 'border-danger-500 ring-1 ring-danger-500' : ''}>
                <SelectValue placeholder="Pilih Jenis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENELITIAN">Penelitian</SelectItem>
                <SelectItem value="PENGABDIAN">Pengabdian kepada Masyarakat</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <p className="mt-1 text-xs text-danger-600">{errors.type}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <label className="text-sm font-semibold text-neutral-900 flex items-center">Skim Usulan <span className="text-danger ml-1">*</span><FieldTooltip text="Persyaratan tiap skim berbeda, lihat panduan" /></label>
            </div>
            
            <Select 
              value={formData.schemeId} 
              onValueChange={(val) => onChange("schemeId", val)}
              disabled={!formData.type || !formData.fundingSource}
            >
              <SelectTrigger className={errors.schemeId ? 'border-danger-500 ring-1 ring-danger-500' : ''}>
                <SelectValue placeholder="Pilih Skim" />
              </SelectTrigger>
              <SelectContent>
                {formData.fundingSource && SKIM_MAPPING[formData.fundingSource]?.map(skim => (
                  <SelectItem key={skim.id} value={skim.id}>{skim.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.schemeId && <p className="mt-1 text-xs text-danger-600">{errors.schemeId}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <label className="text-sm font-semibold text-neutral-900 flex items-center">Bidang Ilmu <span className="text-danger ml-1">*</span><FieldTooltip text="Pilih rumpun ilmu sesuai klasifikasi Dikti" /></label>
            </div>
            <Select 
              value={formData.fieldOfStudy}
              onValueChange={(val) => onChange("fieldOfStudy", val)}
            >
              <SelectTrigger className={errors.fieldOfStudy ? 'border-danger-500 ring-1 ring-danger-500' : ''}>
                <SelectValue placeholder="Pilih Rumpun Bidang Ilmu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Saintek">Sains dan Teknologi (Saintek)</SelectItem>
                <SelectItem value="Soshum">Sosial Humaniora (Soshum)</SelectItem>
                <SelectItem value="Kesehatan">Kesehatan & Kedokteran</SelectItem>
                <SelectItem value="Bahasa">Bahasa & Sastra</SelectItem>
              </SelectContent>
            </Select>
            {errors.fieldOfStudy && <p className="mt-1 text-xs text-danger-600">{errors.fieldOfStudy}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <label className="text-sm font-semibold text-neutral-900 flex items-center">Pengelola Dana (PNBP) <span className="text-danger ml-1">*</span><FieldTooltip text="Unit pengelola dana fakultas atau universitas" /></label>
            </div>
            <Select value={formData.managementUnit} onValueChange={(val) => onChange("managementUnit", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Pengelola" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fakultas Hukum">Fakultas Hukum</SelectItem>
                <SelectItem value="Fakultas Ekonomi dan Bisnis">Fakultas Ekonomi dan Bisnis</SelectItem>
                <SelectItem value="Fakultas Pertanian">Fakultas Pertanian</SelectItem>
                <SelectItem value="Fakultas Teknik">Fakultas Teknik</SelectItem>
                <SelectItem value="Fakultas Ilmu Sosial dan Ilmu Politik">Fakultas Ilmu Sosial dan Ilmu Politik (FISIP)</SelectItem>
                <SelectItem value="Fakultas Keguruan dan Ilmu Pendidikan">Fakultas Keguruan dan Ilmu Pendidikan (FKIP)</SelectItem>
                <SelectItem value="Fakultas Kehutanan">Fakultas Kehutanan</SelectItem>
                <SelectItem value="Fakultas Matematika dan Ilmu Pengetahuan Alam">Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)</SelectItem>
                <SelectItem value="Fakultas Kedokteran">Fakultas Kedokteran</SelectItem>
                <SelectItem value="LPPM">LPPM (Universitas)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <label className="text-sm font-semibold text-neutral-900 flex items-center">Program Studi Pengusul <FieldTooltip text="Program studi ketua peneliti (otomatis dari SSO)" /></label>
            </div>
            <Input value={user?.studyProgram || "Informatika (S1)"} disabled className="bg-neutral-50 text-neutral-600 font-medium" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <label className="text-sm font-semibold text-neutral-900 flex items-center">Total Dana Diajukan (Rp) <span className="text-danger ml-1">*</span><FieldTooltip text="Masukkan angka dalam rupiah tanpa titik" /></label>
            </div>
            <Input 
              type="text" 
              value={formData.budget ? formatRupiah(formData.budget) : ""}
              onChange={handleBudgetChange}
              placeholder="15.000.000" 
              className={errors.budget ? 'border-danger-500 ring-1 ring-danger-500' : ''}
            />
            {errors.budget && <p className="mt-1 text-xs text-danger-600">{errors.budget}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="button" onClick={onNext} className="bg-primary-600 hover:bg-primary-700 px-8">Lanjut ke Tim Pelaksana</Button>
      </div>
    </div>
  );
}
