"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialMockProposals = [
  { id: "PRP-2026-009", title: "Pengembangan Sistem Cerdas Berbasis IoT", dosen: "Dr. Budi Santoso", skim: "Penelitian Terapan", reviewer: null },
  { id: "PRP-2026-010", title: "Pemberdayaan UMKM Kopi Lokal", dosen: "Siti Aminah, M.M.", skim: "Program Kemitraan Masyarakat", reviewer: "Prof. Dr. Anton" },
  { id: "PRP-2026-012", title: "Analisis Dampak Perubahan Iklim", dosen: "Dr. Lina Mardiana", skim: "Penelitian Dasar", reviewer: null },
];

export default function PenetapanReviewerPage() {
  const [proposals, setProposals] = useState(initialMockProposals);
  const [selectedReviewer, setSelectedReviewer] = useState<string>("");

  const handleAssign = (propId: string) => {
    if (!selectedReviewer) {
      toast.error("Pilih reviewer terlebih dahulu!");
      return;
    }
    
    setProposals(prev => prev.map(p => p.id === propId ? { ...p, reviewer: selectedReviewer } : p));
    toast.success(`Reviewer berhasil ditugaskan untuk ${propId}`);
    setSelectedReviewer("");
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Penetapan Reviewer</h1>
        <p className="text-neutral-500">Tugaskan reviewer ahli untuk menilai proposal usulan P2M.</p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-200 bg-neutral-50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input placeholder="Cari judul proposal atau nama dosen..." className="pl-9 bg-white" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-neutral-50">
              <TableRow>
                <TableHead>ID Usulan</TableHead>
                <TableHead>Judul Proposal</TableHead>
                <TableHead>Ketua Pengusul</TableHead>
                <TableHead>Reviewer</TableHead>
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
                    {prop.reviewer ? (
                      <Badge variant="outline" className="text-primary-700 bg-primary-50 border-primary-200">
                        {prop.reviewer} (Assigned)
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-warning-700 bg-warning-50 border-warning-200">
                        Belum Ditugaskan
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger render={
                        <Button 
                          size="sm" 
                          variant={prop.reviewer ? "outline" : "default"} 
                          onClick={() => setSelectedReviewer(prop.reviewer || "")}
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          {prop.reviewer ? "Ubah Reviewer" : "Tugaskan Reviewer"}
                        </Button>
                      } />
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Tugaskan Reviewer</DialogTitle>
                          <DialogDescription>
                            Pilih reviewer internal yang akan menilai proposal <b>{prop.id}</b>.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-neutral-700">Reviewer Internal</label>
                            <Select value={selectedReviewer} onValueChange={(val) => setSelectedReviewer(val as string)}>
                              <SelectTrigger>
                                <SelectValue placeholder="-- Pilih Reviewer --" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Prof. Dr. Anton">Prof. Dr. Anton</SelectItem>
                                <SelectItem value="Dr. Budi Santoso">Dr. Budi Santoso</SelectItem>
                                <SelectItem value="Siti Aminah, M.M.">Siti Aminah, M.M.</SelectItem>
                                <SelectItem value="Dr. Lina Mardiana">Dr. Lina Mardiana</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose render={<Button variant="outline">Batal</Button>} />
                          <DialogClose render={<Button onClick={() => handleAssign(prop.id)}>Simpan Penugasan</Button>} />
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
