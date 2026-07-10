"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProposalDraftStore } from "@/store/proposalDraftStore";
import { ProposalType } from "@/types";
import { InlineValidation } from "@/components/shared/InlineValidation";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const step1Schema = z.object({
  title: z.string().min(10, "Judul proposal minimal 10 karakter"),
  type: z.enum(["PENELITIAN", "PENGABDIAN"], { error: "Pilih jenis usulan" }),
  fundingSource: z.string().min(1, "Pilih sumber dana"),
  schemeId: z.string().min(1, "Pilih skim usulan"),
  fieldOfStudy: z.string().min(1, "Bidang ilmu wajib diisi"),
  managementUnit: z.string().min(1, "Pengelola dana wajib diisi"),
  year: z.number().min(new Date().getFullYear(), "Tahun minimal tahun ini"),
  budget: z.number().min(1000000, "Total dana minimal 1 Juta"),
});

type Step1Values = z.infer<typeof step1Schema>;

export function Step1InfoUmum() {
  const { draft, setDraft, setCurrentStep } = useProposalDraftStore();
  const { user } = useAuthStore();
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      title: draft.title || "",
      type: (draft.type as ProposalType) || undefined,
      fundingSource: "",
      schemeId: draft.schemeId || "",
      fieldOfStudy: draft.fieldOfStudy || "",
      managementUnit: "Fakultas Hukum",
      year: 2026,
      budget: 0,
    },
  });

  const selectedType = watch("type");
  const selectedScheme = watch("schemeId");
  const selectedFunding = watch("fundingSource");
  const budgetValue = watch("budget");

  const formatRupiah = (value: number | string | undefined) => {
    if (value === undefined || value === null || value === 0) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\./g, ""); // remove dots
    const numericValue = parseInt(rawValue, 10);
    if (!isNaN(numericValue)) {
      setValue("budget", numericValue, { shouldValidate: true, shouldDirty: true });
    } else {
      setValue("budget", 0, { shouldValidate: true, shouldDirty: true });
    }
  };

  const onSubmit = (data: Step1Values) => {
    setDraft({ ...draft, ...data });
    setCurrentStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8 space-y-6">
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-900">Judul Proposal <span className="text-danger">*</span></label>
          <Textarea 
            {...register("title")} 
            placeholder="Tuliskan judul proposal secara lengkap..."
            className="min-h-[100px] border-neutral-300 focus:border-primary-500"
          />
          <InlineValidation error={errors.title?.message} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-900">Tahun Pelaksanaan</label>
            <Input type="number" {...register("year", { valueAsNumber: true })} disabled className="bg-neutral-50 text-neutral-600 font-medium" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-900">Sumber Dana <span className="text-danger">*</span></label>
            <Select 
              value={selectedFunding} 
              onValueChange={(val) => setValue("fundingSource", val as string, { shouldValidate: true })}
            >
              <SelectTrigger>
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
            <InlineValidation error={errors.fundingSource?.message} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-900">Jenis Usulan <span className="text-danger">*</span></label>
            <Select 
              value={selectedType} 
              onValueChange={(val: any) => setValue("type", val, { shouldValidate: true })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih Jenis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENELITIAN">Penelitian</SelectItem>
                <SelectItem value="PENGABDIAN">Pengabdian kepada Masyarakat</SelectItem>
              </SelectContent>
            </Select>
            <InlineValidation error={errors.type?.message} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <label className="text-sm font-semibold text-neutral-900">Skim Usulan <span className="text-danger">*</span></label>
              <div className="group relative flex items-center">
                <HelpCircle className="w-4 h-4 text-neutral-400 cursor-help hover:text-primary-600" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-neutral-900 text-white text-[11px] rounded shadow-lg z-10 text-center">
                  Skim bergantung pada jenis usulan yang dipilih (Penelitian/Pengabdian). Pastikan membaca panduan skim terbaru.
                </div>
              </div>
            </div>
            
            <Select 
              value={selectedScheme} 
              onValueChange={(val) => setValue("schemeId", val as string, { shouldValidate: true })}
              disabled={!selectedType}
            >
              <SelectTrigger>
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
            <InlineValidation error={errors.schemeId?.message} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-900">Bidang Ilmu <span className="text-danger">*</span></label>
            <Select onValueChange={(val) => setValue("fieldOfStudy", val as string, { shouldValidate: true })}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Rumpun Bidang Ilmu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Saintek">Sains dan Teknologi (Saintek)</SelectItem>
                <SelectItem value="Soshum">Sosial Humaniora (Soshum)</SelectItem>
                <SelectItem value="Kesehatan">Kesehatan & Kedokteran</SelectItem>
                <SelectItem value="Bahasa">Bahasa & Sastra</SelectItem>
              </SelectContent>
            </Select>
            <InlineValidation error={errors.fieldOfStudy?.message} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-neutral-900">Pengelola Dana (PNBP) <span className="text-danger">*</span></label>
            <Select defaultValue="Fakultas Hukum" onValueChange={(val) => setValue("managementUnit", val as string, { shouldValidate: true })}>
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
            <label className="text-sm font-semibold text-neutral-900">Total Dana Diajukan (Rp) <span className="text-danger">*</span></label>
            <Input 
              type="text" 
              value={budgetValue ? formatRupiah(budgetValue) : ""}
              onChange={handleBudgetChange}
              placeholder="15.000.000" 
            />
            <InlineValidation error={errors.budget?.message} />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" className="bg-primary-600 hover:bg-primary-700 px-8">Lanjut ke Tim Pelaksana</Button>
      </div>
    </form>
  );
}
