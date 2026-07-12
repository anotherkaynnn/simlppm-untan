"use client";

import { useState } from "react";
import { useProposalDraftStore } from "@/store/proposalDraftStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Info } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { FieldTooltip } from "@/components/ui/tooltip";
import { PersonSearch } from "@/components/app/PersonSearch";

export function Step2Anggota({ onNext }: { onNext: () => void }) {
  const { setCurrentStep } = useProposalDraftStore();
  const { user } = useAuthStore();
  
  const [dosenList, setDosenList] = useState<{ id: number; id_person: string; nidn: string; nama: string; tugas: string }[]>([]);
  const [mahasiswaList, setMahasiswaList] = useState<{ id: number; id_person: string; nim: string; nama: string; tugas: string }[]>([]);
  const [tendikList, setTendikList] = useState<{ id: number; nama: string; tugas: string }[]>([]);

  const addTendik = () => setTendikList([...tendikList, { id: Date.now(), nama: "", tugas: "" }]);

  const removeDosen = (id: number) => setDosenList(dosenList.filter(d => d.id !== id));
  const removeMahasiswa = (id: number) => setMahasiswaList(mahasiswaList.filter(m => m.id !== id));
  const removeTendik = (id: number) => setTendikList(tendikList.filter(t => t.id !== id));

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
              <h3 className="font-semibold text-neutral-900 flex items-center">Anggota Tim Dosen Internal <FieldTooltip text="Cari berdasarkan NIDN/NIM, maks 10 anggota" /></h3>
              <p className="text-xs text-neutral-500">Maksimal 10 anggota. Cari NIDN atau Nama untuk menambahkan.</p>
            </div>
            
            {dosenList.length < 10 && (
              <div className="mb-4">
                <PersonSearch 
                  type="DOSEN"
                  placeholder="Cari Dosen (NIDN / Nama)..."
                  excludeIds={dosenList.map(d => d.id_person)}
                  onSelect={(p) => setDosenList([...dosenList, { id: Date.now(), id_person: p.id, nidn: p.nidn_nim, nama: p.name, tugas: "" }])}
                />
                <div className="mt-2 flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <p><strong>Tips Testing:</strong> Coba cari &quot;Budi&quot;, &quot;Wahyu&quot;, &quot;Siti&quot;, &quot;Hendra&quot;, &quot;Eko&quot;, &quot;Joko&quot;, &quot;Susi&quot;, atau &quot;Ryan&quot;.</p>
                </div>
              </div>
            )}

            <div className="space-y-3 mb-4">
              {dosenList.map((dosen) => (
                <div key={dosen.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <Input value={dosen.nidn} readOnly className="sm:w-1/4 bg-neutral-100" />
                  <Input value={dosen.nama} readOnly className="sm:w-1/3 bg-neutral-100" />
                  <Input 
                    placeholder="Tugas / Peran" 
                    className="sm:w-1/3 bg-white" 
                    value={dosen.tugas}
                    onChange={(e) => setDosenList(dosenList.map(d => d.id === dosen.id ? { ...d, tugas: e.target.value } : d))}
                  />
                  <Button variant="ghost" size="icon" className="text-danger shrink-0 hover:bg-danger-50 hover:text-danger-700" onClick={() => removeDosen(dosen.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Anggota Mahasiswa */}
          <div>
            <div className="mb-4">
              <h3 className="font-semibold text-neutral-900">Anggota Mahasiswa</h3>
              <p className="text-xs text-neutral-500">Wajib melibatkan mahasiswa sesuai pedoman universitas. Cari berdasarkan NIM atau Nama.</p>
            </div>

            <div className="mb-4">
              <PersonSearch 
                type="MAHASISWA"
                placeholder="Cari Mahasiswa (NIM / Nama)..."
                excludeIds={mahasiswaList.map(m => m.id_person)}
                onSelect={(p) => setMahasiswaList([...mahasiswaList, { id: Date.now(), id_person: p.id, nim: p.nidn_nim, nama: p.name, tugas: "" }])}
              />
              <div className="mt-2 flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <p><strong>Tips Testing:</strong> Coba cari &quot;Ahmad&quot;, &quot;Putri&quot;, &quot;Kevin&quot;, &quot;Rizky&quot;, &quot;Anton&quot;, atau &quot;Sarah&quot;.</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              {mahasiswaList.map((mhs) => (
                <div key={mhs.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-white p-3 rounded-lg border border-neutral-200">
                  <Input value={mhs.nim} readOnly className="sm:w-1/4 w-full bg-neutral-100" />
                  <Input value={mhs.nama} readOnly className="sm:w-1/3 w-full bg-neutral-100" />
                  <Input 
                    placeholder="Tugas Khusus" 
                    className="sm:w-1/3 w-full bg-white" 
                    value={mhs.tugas}
                    onChange={(e) => setMahasiswaList(mahasiswaList.map(m => m.id === mhs.id ? { ...m, tugas: e.target.value } : m))}
                  />
                  <Button variant="ghost" size="icon" className="text-danger shrink-0 hover:bg-danger-50 hover:text-danger-700" onClick={() => removeMahasiswa(mhs.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
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
                  <Input 
                    placeholder="Nama Tendik/Laboran" 
                    className="sm:w-2/3 w-full" 
                    value={tendik.nama} 
                    onChange={(e) => setTendikList(tendikList.map(t => t.id === tendik.id ? { ...t, nama: e.target.value } : t))}
                  />
                  <Input 
                    placeholder="Tugas Khusus" 
                    className="sm:w-1/3 w-full" 
                    value={tendik.tugas} 
                    onChange={(e) => setTendikList(tendikList.map(t => t.id === tendik.id ? { ...t, tugas: e.target.value } : t))}
                  />
                  <Button variant="ghost" size="icon" className="text-danger shrink-0 hover:bg-danger-50 hover:text-danger-700" onClick={() => removeTendik(tendik.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" type="button" className="w-full border-dashed text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 border-neutral-300" onClick={addTendik}>
              + Tambah Tendik / Laboran Manual
            </Button>
          </div>

        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>Kembali</Button>
        <Button type="button" onClick={onNext} className="bg-primary-600 hover:bg-primary-700 text-white">Lanjut ke Berkas Administrasi</Button>
      </div>
    </div>
  );
}
