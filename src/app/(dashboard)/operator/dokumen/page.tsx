"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Download, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockDokumen = [
  { id: 1, nama: "Pedoman Penelitian & PKM Edisi 2026", tipe: "PDF", ukuran: "2.4 MB", tanggal: "10 Jan 2026" },
  { id: 2, nama: "Template Proposal Penelitian Terapan", tipe: "Word", ukuran: "1.1 MB", tanggal: "15 Jan 2026" },
  { id: 3, nama: "SK Rektor tentang Standar Biaya Masukan", tipe: "PDF", ukuran: "5.6 MB", tanggal: "01 Feb 2026" },
];

export default function DokumenOperatorPage() {
  return (
    <div className="max-w-[1600px] w-full mx-auto space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Manajemen File (Dokumen)</h1>
          <p className="text-neutral-500">Unduh pedoman, template, dan dokumen resmi dari Administrator.</p>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input placeholder="Cari dokumen..." className="pl-9 bg-white" />
          </div>
        </div>

        <div className="overflow-x-auto min-w-0 w-full">
          <Table>
            <TableHeader className="bg-neutral-50">
              <TableRow>
                <TableHead>Nama Dokumen</TableHead>
                <TableHead className="text-center">Tanggal Unggah</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDokumen.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{doc.nama}</p>
                        <p className="text-xs text-neutral-500">{doc.tipe} • {doc.ukuran}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-neutral-500">{doc.tanggal}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="text-primary-600 border-primary-200 hover:bg-primary-50">
                      <Download className="w-4 h-4 mr-2" /> Unduh
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
