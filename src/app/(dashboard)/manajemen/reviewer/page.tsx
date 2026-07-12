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

import { useDebounce } from "@/hooks/useDebounce";

const initialMockProposals = [
  { id: "PRP-2026-009", title: "Pengembangan Sistem Cerdas Berbasis IoT", dosen: "Dr. Budi Santoso", skim: "Penelitian Terapan", reviewer: null, bidangIlmu: "Saintek" },
  { id: "PRP-2026-010", title: "Pemberdayaan UMKM Kopi Lokal", dosen: "Siti Aminah, M.M.", skim: "Program Kemitraan Masyarakat", reviewer: "Prof. Dr. Anton", bidangIlmu: "Soshum" },
  { id: "PRP-2026-012", title: "Analisis Dampak Perubahan Iklim", dosen: "Dr. Lina Mardiana", skim: "Penelitian Dasar", reviewer: null, bidangIlmu: "Saintek" },
];

const REVIEWERS = [
  { id: "REV-1", name: "Prof. Dr. Anton", bidangIlmu: "Soshum" },
  { id: "REV-2", name: "Dr. Rina Puspita", bidangIlmu: "Saintek" },
  { id: "REV-3", name: "Dr. Hasanudin", bidangIlmu: "Kesehatan" },
  { id: "REV-4", name: "Prof. Maria", bidangIlmu: "Bahasa" },
];

export default function PenetapanReviewerPage() {
  const [proposals, setProposals] = useState(initialMockProposals);
  const [selectedReviewer, setSelectedReviewer] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBidang, setFilterBidang] = useState("Semua");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredProposals = proposals.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) || p.dosen.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesBidang = filterBidang === "Semua" || p.bidangIlmu === filterBidang;
    return matchesSearch && matchesBidang;
  });

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
            <Input 
              placeholder="Cari judul proposal atau nama dosen..." 
              className="pl-9 bg-white" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterBidang} onValueChange={(val) => setFilterBidang(val as string)}>
            <SelectTrigger className="w-full md:w-[200px] bg-white">
              <SelectValue placeholder="Bidang Ilmu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Semua">Semua Bidang</SelectItem>
              <SelectItem value="Saintek">Saintek</SelectItem>
              <SelectItem value="Soshum">Soshum</SelectItem>
              <SelectItem value="Kesehatan">Kesehatan</SelectItem>
              <SelectItem value="Bahasa">Bahasa</SelectItem>
            </SelectContent>
          </Select>
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
              {filteredProposals.length > 0 ? (
                filteredProposals.map((prop) => (
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
                                {REVIEWERS.map((rev) => (
                                  <SelectItem key={rev.id} value={rev.name}>
                                    <div className="flex items-center justify-between w-full pr-4 gap-4">
                                      <span>{rev.name}</span>
                                      {rev.bidangIlmu === prop.bidangIlmu && (
                                        <Badge variant="success" className="text-[10px] py-0">Sesuai Bidang</Badge>
                                      )}
                                    </div>
                                  </SelectItem>
                                ))}
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-neutral-500">
                    Tidak ada proposal yang ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
