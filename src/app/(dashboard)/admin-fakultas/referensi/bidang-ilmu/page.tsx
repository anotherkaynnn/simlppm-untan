"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const initialBidangIlmu = [
  { id: 1, nama: "Pendidikan Jasmani" },
  { id: 2, nama: "Pendidikan dan Seni Budaya" },
  { id: 3, nama: "Energi dan Energi Terbarukan" },
  { id: 4, nama: "Kemaritiman" },
  { id: 5, nama: "Kebencanaan" },
  { id: 6, nama: "Material Maju" },
  { id: 7, nama: "Pangan dan Pertanian" },
  { id: 8, nama: "Sosial Humaniora, Seni Budaya, Pendidikan Desk Study Dalam Negeri" },
  { id: 9, nama: "Transportasi" },
  { id: 10, nama: "Teknologi Informasi dan Komunikasi" },
];

export default function BidangIlmuPage() {
  const [data, setData] = useState(initialBidangIlmu);
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBidang, setNewBidang] = useState("");

  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!newBidang.trim()) {
      toast.error("Nama Bidang Ilmu tidak boleh kosong.");
      return;
    }
    const newItem = {
      id: data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1,
      nama: newBidang.trim()
    };
    setData([...data, newItem]);
    setNewBidang("");
    setIsAddModalOpen(false);
    toast.success("Bidang Ilmu baru berhasil ditambahkan!");
  };

  const handleDelete = (id: number) => {
    setData(data.filter(item => item.id !== id));
    toast.success("Bidang Ilmu berhasil dihapus.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Bidang Ilmu</h1>
          <p className="text-neutral-500">Kelola referensi data bidang ilmu pada SIMLPPM.</p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary-600 hover:bg-primary-700">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Bidang Ilmu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Bidang Ilmu Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nama-bidang">Nama Bidang Ilmu</Label>
                <Input 
                  id="nama-bidang"
                  placeholder="Contoh: Kecerdasan Buatan"
                  value={newBidang}
                  onChange={(e) => setNewBidang(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Batal</Button>
              <Button onClick={handleAdd}>Simpan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input 
                placeholder="Cari bidang ilmu..." 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="border rounded-md overflow-x-auto">
            <Table>
              <TableHeader className="bg-neutral-50">
                <TableRow>
                  <TableHead className="w-[80px]">No.</TableHead>
                  <TableHead>Bidang Ilmu</TableHead>
                  <TableHead className="text-right w-[100px]">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium text-neutral-500">{index + 1}</TableCell>
                    <TableCell className="font-medium text-neutral-900">{item.nama}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon-sm" 
                        className="text-danger hover:text-danger-700 hover:bg-danger/10"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center text-neutral-500">
                      Tidak ada bidang ilmu yang ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
