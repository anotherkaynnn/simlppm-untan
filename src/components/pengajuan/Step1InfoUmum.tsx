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
          <label className="text-sm font-semibold text-neutral-900 flex items-center">Judul Proposal <span className="text-danger ml-1">*</span><FieldTooltip text="Tuliskan judul lengkap, minimal 10 karakter" /></label>
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
            <label className="text-sm font-semibold text-neutral-900">Tahun Pelaksanaan</label>
            <Input type="number" value={formData.year} disabled className="bg-neutral-50 text-neutral-600 font-medium" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-900 flex items-center">Sumber Dana <span className="text-danger ml-1">*</span><FieldTooltip text="Pilih sumber pendanaan utama" /></label>
            <Select 
              value={formData.fundingSource} 
              onValueChange={(val) => onChange("fundingSource", val)}
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
            <label className="text-sm font-semibold text-neutral-900">Jenis Usulan <span className="text-danger">*</span></label>
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
              disabled={!formData.type}
            >
              <SelectTrigger className={errors.schemeId ? 'border-danger-500 ring-1 ring-danger-500' : ''}>
                <SelectValue placeholder="Pilih Skim" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LPDP">LPDP</SelectItem>
                <SelectItem value="KEDAIREKA">KEDAI REKA</SelectItem>
                <SelectItem value="HILIRISET">HILIRISET</SelectItem>
                <SelectItem value="PDP">Penelitian Dosen Pemula (PDP)</SelectItem>
                <SelectItem value="PT">Penelitian Terapan (PT)</SelectItem>
                <SelectItem value="PD">Penelitian Dasar (PD)</SelectItem>
                <SelectItem value="PKM">Program Kemitraan Masyarakat (PKM)</SelectItem>
              </SelectContent>
            </Select>
            {errors.schemeId && <p className="mt-1 text-xs text-danger-600">{errors.schemeId}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-900 flex items-center">Bidang Ilmu <span className="text-danger ml-1">*</span><FieldTooltip text="Pilih rumpun ilmu sesuai klasifikasi Dikti" /></label>
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
            <label className="text-sm font-semibold text-neutral-900">Pengelola Dana (PNBP) <span className="text-danger">*</span></label>
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
            <label className="text-sm font-semibold text-neutral-900">Program Studi Pengusul</label>
            <Input value={user?.studyProgram || "Informatika (S1)"} disabled className="bg-neutral-50 text-neutral-600 font-medium" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-900 flex items-center">Total Dana Diajukan (Rp) <span className="text-danger ml-1">*</span><FieldTooltip text="Masukkan angka dalam rupiah tanpa titik" /></label>
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
