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

const initialProdi = [
  { id: "PRD-001", nama: "Ilmu Hukum", fakultas: "Fakultas Hukum", jenjang: "S1", status: "Aktif" },
  { id: "PRD-002", nama: "Kenotariatan", fakultas: "Fakultas Hukum", jenjang: "S2", status: "Aktif" },
  { id: "PRD-003", nama: "Ilmu Hukum", fakultas: "Fakultas Hukum", jenjang: "S3", status: "Aktif" },
  { id: "PRD-004", nama: "Teknik Sipil", fakultas: "Fakultas Teknik", jenjang: "S1", status: "Aktif" },
  { id: "PRD-005", nama: "Arsitektur", fakultas: "Fakultas Teknik", jenjang: "S1", status: "Non-Aktif" },
];

export default function KelolaProdiPage() {
  const [prodiList, setProdiList] = useState(initialProdi);
  const [newNama, setNewNama] = useState("");
  const [newFakultas, setNewFakultas] = useState("Fakultas Hukum");
  const [newJenjang, setNewJenjang] = useState("S1");
  const [newStatus, setNewStatus] = useState("Aktif");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDelete = (id: string) => {
    setProdiList(prodiList.filter(p => p.id !== id));
    toast.success(`Program Studi ${id} berhasil dihapus!`);
  };

  const handleEdit = (id: string) => {
    toast.info(`Modal edit untuk Prodi ${id} dibuka (Simulasi)`);
  };

  const handleSaveAdd = () => {
    if (!newNama) {
      toast.error("Nama Program Studi harus diisi!");
      return;
    }
    const id = `PRD-00${prodiList.length + 1}`;
    setProdiList([...prodiList, { id, nama: newNama, fakultas: newFakultas, jenjang: newJenjang, status: newStatus }]);
    toast.success(`Program Studi ${newNama} berhasil ditambahkan!`);
    setIsDialogOpen(false);
    setNewNama("");
    setNewFakultas("Fakultas Hukum");
    setNewJenjang("S1");
    setNewStatus("Aktif");
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Kelola Program Studi</h1>
          <p className="text-neutral-500">Manajemen data master program studi yang terdaftar di universitas.</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Prodi
        </Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tambah Program Studi</DialogTitle>
              <DialogDescription>
                Masukkan detail program studi baru.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Nama Program Studi</label>
                <Input 
                  placeholder="Contoh: Teknik Informatika" 
                  value={newNama}
                  onChange={(e) => setNewNama(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Fakultas</label>
                <Select value={newFakultas} onValueChange={(val) => setNewFakultas(val as string)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Fakultas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fakultas Hukum">Fakultas Hukum</SelectItem>
                    <SelectItem value="Fakultas Teknik">Fakultas Teknik</SelectItem>
                    <SelectItem value="Fakultas Ekonomi">Fakultas Ekonomi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Jenjang</label>
                  <Select value={newJenjang} onValueChange={(val) => setNewJenjang(val as string)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Jenjang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="S1">S1</SelectItem>
                      <SelectItem value="S2">S2</SelectItem>
                      <SelectItem value="S3">S3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Status</label>
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
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
              <Button onClick={handleSaveAdd}>Simpan Prodi</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input placeholder="Cari nama prodi atau fakultas..." className="pl-9 bg-white" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-neutral-50">
              <TableRow>
                <TableHead>ID Prodi</TableHead>
                <TableHead>Nama Program Studi</TableHead>
                <TableHead>Fakultas</TableHead>
                <TableHead>Jenjang</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prodiList.map((prodi) => (
                <TableRow key={prodi.id}>
                  <TableCell className="font-medium text-neutral-600">{prodi.id}</TableCell>
                  <TableCell className="font-semibold text-neutral-900">{prodi.nama}</TableCell>
                  <TableCell>{prodi.fakultas}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-neutral-50">{prodi.jenjang}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      prodi.status === "Aktif" 
                        ? "text-success-700 bg-success-50 border-success-200" 
                        : "text-neutral-500 bg-neutral-50 border-neutral-200"
                    }>
                      {prodi.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="icon-sm" variant="ghost" className="text-primary-600 hover:text-primary-800" onClick={() => handleEdit(prodi.id)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="icon-sm" variant="ghost" className="text-danger hover:text-danger-700 hover:bg-danger/10" onClick={() => handleDelete(prodi.id)}>
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
