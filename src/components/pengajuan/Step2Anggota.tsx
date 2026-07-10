"use client";

import { useState } from "react";
import { useProposalDraftStore } from "@/store/proposalDraftStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Search } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export function Step2Anggota() {
  const { setCurrentStep } = useProposalDraftStore();
  const { user } = useAuthStore();
  
  const [dosenList, setDosenList] = useState<{ id: number; nidn: string; nama: string; tugas: string }[]>([]);
  const [mahasiswaList, setMahasiswaList] = useState<{ id: number; nim: string; nama: string; tugas: string }[]>([]);
  const [tendikList, setTendikList] = useState<{ id: number; nama: string; tugas: string }[]>([]);

  const addDosen = () => setDosenList([...dosenList, { id: Date.now(), nidn: "", nama: "", tugas: "" }]);
  const addMahasiswa = () => setMahasiswaList([...mahasiswaList, { id: Date.now(), nim: "", nama: "", tugas: "" }]);
  const addTendik = () => setTendikList([...tendikList, { id: Date.now(), nama: "", tugas: "" }]);

  const removeDosen = (id: number) => setDosenList(dosenList.filter(d => d.id !== id));
  const removeMahasiswa = (id: number) => setMahasiswaList(mahasiswaList.filter(m => m.id !== id));
  const removeTendik = (id: number) => setTendikList(tendikList.filter(t => t.id !== id));

  // Simulates a smart search behavior
  const handleSmartSearch = (id: number, value: string) => {
    // In a real app, this would trigger a debounced API call
    setDosenList(dosenList.map(d => {
      if (d.id === id) {
        return { ...d, nidn: value, nama: value.length > 5 ? "Dr. Budi Santoso (Simulated)" : "" };
      }
      return d;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8 space-y-6">
        
        <div className="p-4 bg-primary-50 rounded-lg border border-primary-100 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-primary-900 mb-1">Ketua Pengusul</h3>
            <p className="text-sm text-primary-700">Auto-filled dari identitas SSO Anda.</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-neutral-900">{user?.name}</p>
            <p className="text-sm text-neutral-600">NIDN: {user?.nidn}</p>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-6 space-y-8">
          {/* Anggota Dosen */}
          <div>
            <div className="mb-4">
              <h3 className="font-semibold text-neutral-900">Anggota Tim Dosen Internal</h3>
              <p className="text-xs text-neutral-500">Maksimal 10 anggota. Ketik NIDN atau Nama untuk pencarian otomatis.</p>
            </div>
            <div className="space-y-3 mb-4">
              {dosenList.map((dosen) => (
                <div key={dosen.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <div className="relative sm:w-1/3 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <Input 
                      placeholder="Cari NIDN / Nama..." 
                      className="pl-9 bg-white" 
                      onChange={(e) => handleSmartSearch(dosen.id, e.target.value)}
                    />
                  </div>
                  <Input placeholder="Nama Dosen (Otomatis)" className="sm:w-1/3 bg-neutral-100" readOnly value={dosen.nama} />
                  <Input placeholder="Tugas / Peran" className="sm:w-1/3 bg-white" defaultValue={dosen.tugas} />
                  <Button variant="ghost" size="icon" className="text-danger shrink-0 hover:bg-danger-50 hover:text-danger-700" onClick={() => removeDosen(dosen.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            {dosenList.length < 10 && (
              <Button variant="outline" type="button" className="w-full border-dashed text-primary-600 hover:text-primary-700 hover:bg-primary-50 border-primary-200" onClick={addDosen}>
                + Tambah Anggota Dosen
              </Button>
            )}
          </div>

          {/* Anggota Mahasiswa */}
          <div>
            <div className="mb-4">
              <h3 className="font-semibold text-neutral-900">Anggota Mahasiswa</h3>
              <p className="text-xs text-neutral-500">Wajib melibatkan mahasiswa sesuai pedoman universitas.</p>
            </div>
            <div className="space-y-3 mb-4">
              {mahasiswaList.map((mhs) => (
                <div key={mhs.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-white p-3 rounded-lg border border-neutral-200">
                  <Input placeholder="NIM" className="sm:w-1/4 w-full" defaultValue={mhs.nim} />
                  <Input placeholder="Nama Mahasiswa" className="sm:w-2/4 w-full" defaultValue={mhs.nama} />
                  <Input placeholder="Tugas Khusus" className="sm:w-1/4 w-full" defaultValue={mhs.tugas} />
                  <Button variant="ghost" size="icon" className="text-danger shrink-0 hover:bg-danger-50 hover:text-danger-700" onClick={() => removeMahasiswa(mhs.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" type="button" className="w-full border-dashed" onClick={addMahasiswa}>
              + Tambah Mahasiswa
            </Button>
          </div>

          {/* Anggota Tendik */}
          <div>
            <div className="mb-4">
              <h3 className="font-semibold text-neutral-900">Tenaga Kependidikan / Laboran</h3>
              <p className="text-xs text-neutral-500">Opsional, tuliskan nama secara manual.</p>
            </div>
            <div className="space-y-3 mb-4">
              {tendikList.map((tendik) => (
                <div key={tendik.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-white p-3 rounded-lg border border-neutral-200">
                  <Input placeholder="Nama Tendik/Laboran" className="sm:w-2/3 w-full" defaultValue={tendik.nama} />
                  <Input placeholder="Tugas Khusus" className="sm:w-1/3 w-full" defaultValue={tendik.tugas} />
                  <Button variant="ghost" size="icon" className="text-danger shrink-0 hover:bg-danger-50 hover:text-danger-700" onClick={() => removeTendik(tendik.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" type="button" className="w-full border-dashed" onClick={addTendik}>
              + Tambah Tendik / Laboran
            </Button>
          </div>

        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>Kembali</Button>
        <Button type="button" onClick={() => setCurrentStep(3)} className="bg-primary-600 hover:bg-primary-700">Lanjut ke Berkas Administrasi</Button>
      </div>
    </div>
  );
}
