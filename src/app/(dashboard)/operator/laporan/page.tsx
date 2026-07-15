"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

export default function LapDosenPage() {
  const [jenis, setJenis] = useState("proposal");
  const [tipe, setTipe] = useState("penelitian");
  const [sumberDana, setSumberDana] = useState("hibah_dikti");
  const [tahun, setTahun] = useState("2026");

  const handleCetak = () => {
    if (!tahun) {
      toast.error("Tahun harus diisi");
      return;
    }
    toast.success(`Berhasil mengunduh Laporan_${jenis}_${tipe}_${tahun}.xls`);
  };

  return (
    <div className="w-full space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Aktivitas P2M <span className="text-sm font-normal text-neutral-400">Halaman administrator</span></h1>
      </div>

      <div className="bg-white border border-neutral-200 shadow-sm rounded-xl overflow-hidden">
        <div className="border-b border-neutral-200 px-6 py-4">
          <h2 className="text-lg font-medium text-neutral-800">Cetak Data Penelitian/PKM</h2>
        </div>
        
        <div className="p-6 space-y-8">
          
          <div className="space-y-3 border border-neutral-200 rounded p-4 relative">
            <Label className="font-semibold text-neutral-900 text-sm absolute -top-3 left-4 bg-white px-1">Jenis</Label>
            <RadioGroup value={jenis} onValueChange={setJenis} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="proposal" id="j_proposal" />
                <Label htmlFor="j_proposal" className="font-normal uppercase text-xs">USULAN PROPOSAL</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="laporan_akhir" id="j_laporan" />
                <Label htmlFor="j_laporan" className="font-normal uppercase text-xs">LAPORAN AKHIR</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3 border border-neutral-200 rounded p-4 relative">
            <Label className="font-semibold text-neutral-900 text-sm absolute -top-3 left-4 bg-white px-1">Tipe</Label>
            <RadioGroup value={tipe} onValueChange={setTipe} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="penelitian" id="t_penelitian" />
                <Label htmlFor="t_penelitian" className="font-normal uppercase text-xs">PENELITIAN</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pkm" id="t_pkm" />
                <Label htmlFor="t_pkm" className="font-normal uppercase text-xs">PKM</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3 border border-neutral-200 rounded p-4 relative">
            <Label className="font-semibold text-neutral-900 text-sm absolute -top-3 left-4 bg-white px-1">Sumber Dana</Label>
            <RadioGroup value={sumberDana} onValueChange={setSumberDana} className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hibah_dikti" id="sd_dikti" />
                <Label htmlFor="sd_dikti" className="font-normal uppercase text-xs">HIBAH DIKTI</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dipa_untan" id="sd_dipa" />
                <Label htmlFor="sd_dipa" className="font-normal uppercase text-xs">DIPA UNTAN</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="kerja_sama" id="sd_ks" />
                <Label htmlFor="sd_ks" className="font-normal uppercase text-xs">KERJA SAMA</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mandiri" id="sd_mandiri" />
                <Label htmlFor="sd_mandiri" className="font-normal uppercase text-xs">MANDIRI</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="batch" id="sd_batch" />
                <Label htmlFor="sd_batch" className="font-normal uppercase text-xs">BATCH</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lain_lain" id="sd_lain" />
                <Label htmlFor="sd_lain" className="font-normal uppercase text-xs">LAIN-LAIN</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3 border border-neutral-200 rounded p-4 relative">
            <Label className="font-semibold text-neutral-900 text-sm absolute -top-3 left-4 bg-white px-1">Tahun</Label>
            <Input 
              type="number" 
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              className="max-w-[200px]"
            />
          </div>

          <div>
            <Button onClick={handleCetak} className="bg-sky-500 hover:bg-sky-600 text-white font-medium px-8">
              Cetak
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
