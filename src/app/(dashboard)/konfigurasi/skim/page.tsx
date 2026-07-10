"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialSkimData = [
  { id: "SKM-001", nama: "Penelitian Dasar (PD)", jenis: "Penelitian", status: "Aktif" },
  { id: "SKM-002", nama: "Penelitian Terapan (PT)", jenis: "Penelitian", status: "Aktif" },
  { id: "SKM-003", nama: "Program Kemitraan Masyarakat (PKM)", jenis: "Pengabdian", status: "Aktif" },
  { id: "SKM-004", nama: "Penelitian Unggulan Perguruan Tinggi", jenis: "Penelitian", status: "Non-Aktif" },
];

export default function KelolaSkimPage() {
  const [skims, setSkims] = useState(initialSkimData);
  const [newNama, setNewNama] = useState("");
  const [newJenis, setNewJenis] = useState("Penelitian");
  const [newStatus, setNewStatus] = useState("Aktif");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = (id: string) => {
    setSkims(skims.filter(s => s.id !== id));
    toast.success(`Skim ${id} berhasil dihapus!`);
  };

  const handleEdit = (id: string) => {
    toast.info(`Modal edit untuk skim ${id} dibuka (Simulasi)`);
  };

  const handleSaveAdd = () => {
    if (!newNama) {
      toast.error("Nama skim harus diisi!");
      return;
    }
    const id = `SKM-00${skims.length + 1}`;
    setSkims([...skims, { id, nama: newNama, jenis: newJenis, status: newStatus }]);
    toast.success(`Skim ${newNama} berhasil ditambahkan!`);
    setIsDialogOpen(false);
    setNewNama("");
    setNewJenis("Penelitian");
    setNewStatus("Aktif");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Kelola Skim P2M</h1>
          <p className="text-neutral-500">Manajemen jenis dan skim usulan penelitian serta pengabdian.</p>
        </div>
        <Button className="bg-primary-600 hover:bg-primary-700 text-white" onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Skim
        </Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Skim Baru</DialogTitle>
              <DialogDescription>
                Masukkan detail jenis skim atau program P2M yang baru.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Nama Skim</label>
                <Input 
                  placeholder="Contoh: Penelitian Dosen Pemula" 
                  value={newNama}
                  onChange={(e) => setNewNama(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Jenis Usulan</label>
                <Select value={newJenis} onValueChange={(val) => setNewJenis(val as string)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jenis Usulan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Penelitian">Penelitian</SelectItem>
                    <SelectItem value="Pengabdian">Pengabdian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Status Awal</label>
                <Select value={newStatus} onValueChange={(val) => setNewStatus(val as string)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aktif">Aktif</SelectItem>
                    <SelectItem value="Non-Aktif">Non-Aktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
              <Button onClick={handleSaveAdd}>Simpan Skim</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-200 bg-neutral-50 flex items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input placeholder="Cari nama skim..." className="pl-9 bg-white" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-neutral-50">
              <TableRow>
                <TableHead>ID Skim</TableHead>
                <TableHead>Nama Skim</TableHead>
                <TableHead>Jenis Usulan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skims.map((skim) => (
                <TableRow key={skim.id}>
                  <TableCell className="font-medium text-neutral-600">{skim.id}</TableCell>
                  <TableCell className="font-semibold text-neutral-900">{skim.nama}</TableCell>
                  <TableCell>{skim.jenis}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      skim.status === "Aktif" 
                        ? "text-success-700 bg-success-50 border-success-200" 
                        : "text-neutral-500 bg-neutral-100 border-neutral-300"
                    }>
                      {skim.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" className="text-primary-600 hover:text-primary-800 hover:bg-primary-50" onClick={() => handleEdit(skim.id)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-danger hover:text-danger-700 hover:bg-danger-50" onClick={() => handleDelete(skim.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
