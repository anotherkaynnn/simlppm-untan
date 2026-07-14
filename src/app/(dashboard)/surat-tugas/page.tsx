"use client";

import React, { useState } from "react";
import { Plus, Edit, Trash2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Dummy data based on the screenshot
const initialData = [
  {
    id: 1,
    requestDate: "21-11-2025 03:34:00",
    activity: "Monitoring dan Evaluasi PKM Dosen",
    destination: "SMAN 1 MEMPAWAH HILIR (MEMPAWAH)",
    dateRange: "01-12-2025 - 02-12-2025",
  },
  {
    id: 2,
    requestDate: "21-11-2025 03:33:43",
    activity: "Pelaksanaan PKM Dosen",
    destination: "SMAN 1 MEMPAWAH HILIR (MEMPAWAH)",
    dateRange: "24-11-2025 - 25-11-2025",
  },
  {
    id: 3,
    requestDate: "21-11-2025 03:33:21",
    activity: "Orientasi dan Koordinasi PKM Dosen",
    destination: "SMAN 1 MEMPAWAH HILIR (MEMPAWAH)",
    dateRange: "17-11-2025 - 18-11-2025",
  },
  {
    id: 4,
    requestDate: "13-10-2025 03:06:00",
    activity: "Monitoring dan Evaluasi PKM Dosen",
    destination: "SMKN1 Entikong (Entikong)",
    dateRange: "29-10-2025 - 31-10-2025",
  },
  {
    id: 5,
    requestDate: "13-10-2025 03:05:27",
    activity: "Pelaksanaan PKM Dosen",
    destination: "SMKN 1 Entikong (Entikong)",
    dateRange: "22-10-2025 - 24-10-2025",
  },
  {
    id: 6,
    requestDate: "13-08-2025 07:14:44",
    activity: "Orientasi dan Koordinasi PKM Dosen",
    destination: "SMKN 1 ENTIKONG (ENTIKONG)",
    dateRange: "06-10-2025 - 13-10-2025",
  }
];

import { generateSuratTugas } from "@/lib/documentGenerator";

export default function SuratTugasPage() {
  const [data, setData] = useState(initialData);
  const [isGenerating, setIsGenerating] = useState<number | null>(null);
  
  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    activity: "",
    destination: "",
    dateRange: "",
  });

  const handleOpenDialog = (item?: typeof data[0]) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        activity: item.activity,
        destination: item.destination,
        dateRange: item.dateRange,
      });
    } else {
      setEditingId(null);
      setFormData({ activity: "", destination: "", dateRange: "" });
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.activity || !formData.destination || !formData.dateRange) {
      toast.error("Semua field wajib diisi!");
      return;
    }

    if (editingId) {
      // Edit mode
      setData(data.map(item => 
        item.id === editingId 
          ? { ...item, ...formData } 
          : item
      ));
    } else {
      // Add mode
      const now = new Date();
      const formattedDate = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      
      setData([{
        id: Date.now(),
        requestDate: formattedDate,
        ...formData
      }, ...data]);
    }
    setIsDialogOpen(false);
    toast.success(editingId ? "Berhasil mengupdate data!" : "Berhasil menambahkan data!");
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      setData(data.filter(item => item.id !== deleteId));
      setDeleteId(null);
      toast.success("Berhasil menghapus data surat tugas.");
    }
  };

  const handlePrint = async (item: any) => {
    setIsGenerating(item.id);
    try {
      // Data yang akan disuntikkan ke dalam template
      const templateData = {
        nomor_surat: `ST-${item.id}/UN22/2025`,
        tanggal_permintaan: item.requestDate,
        kegiatan: item.activity,
        tujuan: item.destination,
        tanggal_pelaksanaan: item.dateRange,
        nama_ketua: "Drs. Ahmad Rabiul Muzammil, M.Si.",
      };

      // URL ke template di folder public (perlu disiapkan file-nya)
      const templateUrl = "/templates/surat_tugas_template.docx";
      const outputFileName = `Surat_Tugas_${item.activity.replace(/\s+/g, "_")}.docx`;

      const result = await generateSuratTugas(templateData, templateUrl, outputFileName);
      
      if (!result.success) {
        toast.error("Gagal mencetak. Pastikan file template tersedia.");
      } else {
        toast.success("Surat tugas berhasil diunduh!");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat mencetak surat tugas.");
    } finally {
      setIsGenerating(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Permintaan Surat Tugas</h1>
          <p className="text-neutral-500 text-sm mt-1">
            Kelola permintaan dan pencetakan surat tugas untuk kegiatan penelitian dan pengabdian.
          </p>
        </div>
        <Button 
          className="bg-primary-600 hover:bg-primary-700 text-white shadow-sm gap-2"
          onClick={() => handleOpenDialog()}
        >
          <Plus className="w-4 h-4" />
          Tambah Permintaan Surat Tugas
        </Button>
      </div>

      <Card className="border-neutral-200 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-neutral-50">
                <TableRow>
                  <TableHead className="w-16 text-center">No.</TableHead>
                  <TableHead>Tanggal Permintaan Surat Tugas</TableHead>
                  <TableHead>Kegiatan</TableHead>
                  <TableHead>Tujuan</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={item.id} className="hover:bg-neutral-50/50">
                    <TableCell className="text-center font-medium">{index + 1}</TableCell>
                    <TableCell className="text-neutral-600">
                      {item.requestDate}
                    </TableCell>
                    <TableCell className="font-medium text-neutral-900">
                      {item.activity}
                    </TableCell>
                    <TableCell className="text-neutral-600">
                      {item.destination}
                    </TableCell>
                    <TableCell className="text-neutral-600 whitespace-nowrap">
                      {item.dateRange}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button 
                          size="icon" 
                          className="h-8 w-8 bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
                          title="Edit"
                          onClick={() => handleOpenDialog(item)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          className="h-8 w-8 bg-danger-500 hover:bg-danger-600 text-white shadow-sm"
                          title="Hapus"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          className="h-8 w-8 bg-info-600 hover:bg-info-700 text-white shadow-sm"
                          title="Cetak Surat Tugas"
                          onClick={() => handlePrint(item)}
                          disabled={isGenerating === item.id}
                        >
                          {isGenerating === item.id ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <Printer className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog Form */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Permintaan" : "Tambah Permintaan Baru"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="activity">Kegiatan</Label>
              <Input
                id="activity"
                value={formData.activity}
                onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                placeholder="Contoh: Pelaksanaan PKM Dosen"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Tujuan</Label>
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                placeholder="Contoh: SMAN 1 PONTIANAK"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateRange">Tanggal Pelaksanaan</Label>
              <Input
                id="dateRange"
                value={formData.dateRange}
                onChange={(e) => setFormData({ ...formData, dateRange: e.target.value })}
                placeholder="Contoh: 10-12-2025 - 12-12-2025"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
            <Button onClick={handleSave} className="bg-primary-600 hover:bg-primary-700 text-white">Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus permintaan surat tugas ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDeleteId(null)}>Batal</Button>
            <Button onClick={confirmDelete} className="bg-danger-600 hover:bg-danger-700 text-white">Hapus Data</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
