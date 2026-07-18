"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, UploadCloud, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";

const initialApprovedProposals = [
  { id: "PRP-2026-005", title: "Inovasi Pembelajaran Digital di Era Society 5.0", dosen: "Dr. Lina Mardiana", skim: "Penelitian Dasar", statusKontrak: "Belum Unggah" },
  { id: "PRP-2026-008", title: "Pengembangan Bibit Unggul Tanaman Hutan", dosen: "Ir. Gunawan, M.Sc.", skim: "Penelitian Terapan", statusKontrak: "Sudah Unggah" },
];

export default function ManajemenBerkasPage() {
  const [proposals, setProposals] = useState(initialApprovedProposals);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = (propId: string) => {
    if (!selectedFile) {
      toast.error("Pilih berkas kontrak terlebih dahulu!");
      return;
    }
    
    setProposals(prev => prev.map(p => p.id === propId ? { ...p, statusKontrak: "Sudah Unggah" } : p));
    toast.success(`Berkas kontrak untuk ${propId} berhasil diunggah.`);
    setSelectedFile(null);
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Manajemen Berkas Kontrak P2M</h1>
        <p className="text-neutral-500">Khusus Admin Fakultas. Unggah file kontrak yang telah ditandatangani untuk proposal yang didanai.</p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input placeholder="Cari NIDN / Nama Dosen / ID Proposal..." className="pl-9 bg-white" />
          </div>
        </div>

        <div className="overflow-x-auto min-w-0 w-full">
          <Table>
            <TableHeader className="bg-neutral-50">
              <TableRow>
                <TableHead>ID Usulan</TableHead>
                <TableHead>Judul Proposal</TableHead>
                <TableHead>Ketua Pengusul</TableHead>
                <TableHead>Status Kontrak</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proposals.map((prop) => (
                <TableRow key={prop.id}>
                  <TableCell className="font-medium text-neutral-600">{prop.id}</TableCell>
                  <TableCell className="font-semibold text-neutral-900 max-w-xs truncate">{prop.title}</TableCell>
                  <TableCell>{prop.dosen}</TableCell>
                  <TableCell>
                    {prop.statusKontrak === "Sudah Unggah" ? (
                      <Badge className="bg-success-100 text-success-700 border-none">
                        <CheckCircle className="w-3 h-3 mr-1" /> Sudah Unggah
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-warning-700 border-warning-200 bg-warning-50">Belum Unggah</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger render={
                        <Button size="sm" variant={prop.statusKontrak === "Sudah Unggah" ? "outline" : "default"} onClick={() => setSelectedFile(null)}>
                          <UploadCloud className="w-4 h-4 mr-2" /> 
                          {prop.statusKontrak === "Sudah Unggah" ? "Perbarui" : "Unggah Kontrak"}
                        </Button>
                      } />
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Unggah Berkas Kontrak</DialogTitle>
                          <DialogDescription>
                            Unggah berkas kontrak formal (.pdf, max 15MB) untuk proposal <b>{prop.id}</b>.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-700">Pilih Berkas Kontrak (.pdf)</label>
                            <Input 
                              type="file" 
                              accept=".pdf" 
                              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                              className="cursor-pointer"
                            />
                            {selectedFile && <p className="text-sm text-primary-600 mt-2">File terpilih: {selectedFile.name}</p>}
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose render={<Button variant="outline">Batal</Button>} />
                          <DialogClose render={<Button onClick={() => handleUpload(prop.id)}>Unggah Berkas</Button>} />
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
