"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const mockDataDosen = [
  { id: 1, nidn: "0011223344", nama: "Dr. Budi Santoso, S.T., M.T.", prodi: "Teknik Informatika", sintaId: "SINTA-88221", status: "Aktif" },
  { id: 2, nidn: "0011223355", nama: "Siti Aminah, M.M.", prodi: "Manajemen", sintaId: "SINTA-10293", status: "Aktif" },
  { id: 3, nidn: "0011223366", nama: "Prof. Dr. Hendra", prodi: "Ilmu Hukum", sintaId: "SINTA-44312", status: "Studi Lanjut" },
];

export default function DataDosenPage() {
  return (
    <div className="max-w-[1600px] w-full mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Manajemen Data Dosen</h1>
        <p className="text-neutral-500">Daftar dosen pengusul pada fakultas beserta metrik kepakaran.</p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-200 bg-neutral-50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input placeholder="Cari nama atau NIDN dosen..." className="pl-9 bg-white" />
          </div>
          <Button variant="outline" className="w-full md:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-neutral-50">
              <TableRow>
                <TableHead>NIDN</TableHead>
                <TableHead>Nama Dosen</TableHead>
                <TableHead>Program Studi</TableHead>
                <TableHead>SINTA ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDataDosen.map((dosen) => (
                <TableRow key={dosen.id}>
                  <TableCell className="font-medium text-neutral-600">{dosen.nidn}</TableCell>
                  <TableCell className="font-semibold text-neutral-900">{dosen.nama}</TableCell>
                  <TableCell>{dosen.prodi}</TableCell>
                  <TableCell className="text-primary-600 font-mono text-sm">{dosen.sintaId}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      dosen.status === "Aktif" 
                        ? "text-success-700 bg-success-50 border-success-200" 
                        : "text-warning-700 bg-warning-50 border-warning-200"
                    }>
                      {dosen.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger render={
                        <Button size="sm" variant="ghost" className="text-primary-600 hover:text-primary-800">
                          <Eye className="w-4 h-4 mr-2" />
                          Detail
                        </Button>
                      } />
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Detail Dosen</DialogTitle>
                          <DialogDescription>
                            Informasi detail profil dan metrik dosen.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="grid grid-cols-3 items-center gap-4 border-b border-neutral-100 pb-2">
                            <span className="text-sm font-medium text-neutral-500">Nama Lengkap</span>
                            <span className="col-span-2 text-sm font-bold text-neutral-900">{dosen.nama}</span>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4 border-b border-neutral-100 pb-2">
                            <span className="text-sm font-medium text-neutral-500">NIDN</span>
                            <span className="col-span-2 text-sm text-neutral-700">{dosen.nidn}</span>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4 border-b border-neutral-100 pb-2">
                            <span className="text-sm font-medium text-neutral-500">Program Studi</span>
                            <span className="col-span-2 text-sm text-neutral-700">{dosen.prodi}</span>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4 border-b border-neutral-100 pb-2">
                            <span className="text-sm font-medium text-neutral-500">SINTA ID</span>
                            <span className="col-span-2 text-sm text-primary-600 font-mono bg-primary-50 px-2 py-1 rounded inline-flex w-max">{dosen.sintaId}</span>
                          </div>
                          <div className="grid grid-cols-3 items-center gap-4">
                            <span className="text-sm font-medium text-neutral-500">Status Aktif</span>
                            <span className="col-span-2">
                              <Badge variant="outline" className={
                                dosen.status === "Aktif" 
                                  ? "text-success-700 bg-success-50 border-success-200" 
                                  : "text-warning-700 bg-warning-50 border-warning-200"
                              }>
                                {dosen.status}
                              </Badge>
                            </span>
                          </div>
                        </div>
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
