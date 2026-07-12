"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadCloud, ShieldCheck } from "lucide-react";

const roleLabel: Record<string, string> = {
  DOSEN: "Dosen Pengusul",
  REVIEWER: "Reviewer",
  OPERATOR_FK: "Operator Fakultas",
  ADMIN_FK: "Admin Fakultas",
  KETUA_LPPM: "Ketua LPPM",
  ADMIN_SISTEM: "Administrator Sistem"
};

export default function ProfilPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  if (!user) return null;

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Fallback: check validity of the form manually
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      toast.error("Mohon periksa kembali isian formulir Anda.");
      return;
    }

    toast.success("Profil berhasil diperbarui!");
    router.push("/dashboard");
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 2MB");
        return;
      }
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Profil Mandiri Dosen</h1>
        <p className="text-neutral-500">Perbarui data akademis Anda secara berkala. Pastikan data ini sinkron sebelum mengajukan proposal.</p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <form onSubmit={handleSave} className="divide-y divide-neutral-100">
          {/* IDENTITAS TERKUNCI */}
          <div className="p-6 md:p-8 bg-neutral-50">
            <h3 className="text-sm font-bold text-primary-700 uppercase tracking-wider mb-6">Identitas Terkunci (Sinkronisasi SSO)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-600 uppercase">Nama Lengkap & Gelar</label>
                <Input defaultValue={user.name} disabled className="bg-neutral-100 text-neutral-600 font-medium border-neutral-200" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-600 uppercase">Username / ID Login</label>
                <Input defaultValue={user.nidn} disabled className="bg-neutral-100 text-neutral-600 font-medium border-neutral-200" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-600 uppercase">NIDN</label>
                  <Input defaultValue={user.nidn} disabled className="bg-neutral-100 text-neutral-600 font-medium border-neutral-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-600 uppercase">NIP</label>
                  <Input defaultValue={user.nidn} disabled className="bg-neutral-100 text-neutral-600 font-medium border-neutral-200" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-600 uppercase">Fakultas</label>
                  <Input defaultValue={user.facultyName} disabled className="bg-neutral-100 text-neutral-600 font-medium border-neutral-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-600 uppercase">Program Studi</label>
                  <Input defaultValue={user.studyProgram || "Informatika (S1)"} disabled className="bg-neutral-100 text-neutral-600 font-medium border-neutral-200" />
                </div>
              </div>
            </div>
          </div>

          {/* DATA AKADEMIK DAN KONTAK */}
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-10">
            {/* Foto Profil Area */}
            <div className="flex flex-col items-center space-y-4 w-full md:w-48 shrink-0">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg ring-1 ring-neutral-200">
                {avatarPreview ? (
                  <AvatarImage src={avatarPreview} className="object-cover" />
                ) : (
                  <AvatarFallback className="bg-primary-100 text-primary-700 text-4xl font-bold">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              
              <span className="inline-flex items-center gap-1.5 rounded-full bg-untan-100 px-3 py-1 text-xs font-semibold text-untan-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                {roleLabel[user.role] || user.role}
              </span>

              <div className="w-full relative mt-2">
                <Input type="file" accept=".jpg,.jpeg,.png" onChange={handleAvatarChange} className="hidden" id="avatar-upload" />
                <label 
                  htmlFor="avatar-upload" 
                  className="flex items-center justify-center w-full px-4 py-2 border border-neutral-300 rounded-md shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 cursor-pointer transition-colors"
                >
                  <UploadCloud className="w-4 h-4 mr-2" />
                  Ganti Foto
                </label>
              </div>
              <p className="text-[10px] text-neutral-500 text-center leading-tight">Format .jpg/.png maksimal 2MB. Diperlukan untuk sertifikat.</p>
            </div>

            {/* Form Input Area */}
            <div className="flex-1 space-y-6">
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-2">Informasi Kontak & Pribadi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-900">Email Institusi <span className="text-danger">*</span></label>
                  <Input defaultValue={user.email} type="email" pattern=".*@untan\.ac\.id" title="Gunakan email @untan.ac.id" placeholder="email@untan.ac.id" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-900">No. Telp / WhatsApp <span className="text-danger">*</span></label>
                  <Input type="tel" placeholder="081234567890" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-900">Tempat Lahir</label>
                  <Input type="text" placeholder="Pontianak" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-900">Tanggal Lahir</label>
                  <Input type="date" defaultValue="1970-01-01" />
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <label className="text-sm font-semibold text-neutral-900">Jenis Kelamin</label>
                <RadioGroup defaultValue="L" className="flex gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="L" id="L" />
                    <label htmlFor="L" className="text-sm cursor-pointer">Laki-laki</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="P" id="P" />
                    <label htmlFor="P" className="text-sm cursor-pointer">Perempuan</label>
                  </div>
                </RadioGroup>
              </div>

              <div className="w-full border-t border-neutral-100 my-6"></div>
              
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-2">Pangkat & Jabatan Akademik</h3>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-900">Golongan</label>
                  <Select defaultValue="III">
                    <SelectTrigger><SelectValue placeholder="Pilih Golongan" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="II">II</SelectItem>
                      <SelectItem value="III">III</SelectItem>
                      <SelectItem value="IV">IV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-neutral-900">Ruang</label>
                  <Select defaultValue="c">
                    <SelectTrigger><SelectValue placeholder="Pilih Ruang" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a">a</SelectItem>
                      <SelectItem value="b">b</SelectItem>
                      <SelectItem value="c">c</SelectItem>
                      <SelectItem value="d">d</SelectItem>
                      <SelectItem value="e">e</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <label className="text-sm font-semibold text-neutral-900">Jabatan Fungsional</label>
                <RadioGroup defaultValue="Lektor" className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Asisten Ahli" id="jf-1" />
                    <label htmlFor="jf-1" className="text-sm cursor-pointer">Asisten Ahli</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Lektor" id="jf-2" />
                    <label htmlFor="jf-2" className="text-sm cursor-pointer">Lektor</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Lektor Kepala" id="jf-3" />
                    <label htmlFor="jf-3" className="text-sm cursor-pointer">Lektor Kepala</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Guru Besar" id="jf-4" />
                    <label htmlFor="jf-4" className="text-sm cursor-pointer">Guru Besar</label>
                  </div>
                </RadioGroup>
              </div>

            </div>
          </div>

          {/* PREFERENSI NOTIFIKASI */}
          <div className="p-6 md:p-8 bg-white">
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-6">Preferensi Notifikasi</h3>
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium text-neutral-900">Pengingat Deadline</h4>
                  <p className="text-xs text-neutral-500 mt-1">Terima email peringatan H-7 dan H-1 sebelum penutupan proposal/laporan.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium text-neutral-900">Perubahan Status Proposal</h4>
                  <p className="text-xs text-neutral-500 mt-1">Terima email saat proposal Anda diverifikasi, direview, atau disetujui.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium text-neutral-900">Penugasan Review (Khusus Reviewer)</h4>
                  <p className="text-xs text-neutral-500 mt-1">Terima email pemberitahuan saat Anda ditugaskan untuk mereview proposal.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium text-neutral-900">Pengumuman Sistem</h4>
                  <p className="text-xs text-neutral-500 mt-1">Terima email pembaruan sistem, jadwal pembukaan skema baru, dan info LPPM.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="pt-4 border-t border-neutral-100">
                <p className="text-[11px] text-neutral-500 italic">Pengaturan ini hanya berlaku untuk notifikasi email. Notifikasi in-app selalu aktif.</p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 bg-neutral-50 flex justify-end gap-3">
            <Button type="button" variant="outline" className="border-neutral-300" onClick={() => router.back()}>Batal</Button>
            <Button type="submit" className="bg-primary-600 hover:bg-primary-700 font-semibold px-8">Simpan Perubahan</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
