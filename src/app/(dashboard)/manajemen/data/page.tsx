"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ExportButton } from "@/components/shared/ExportButton";
import Link from "next/link";

const mockFakultasData = [
  { id: 1, prodi: "Ilmu Hukum (S1)", totalDosen: 45, proposalAktif: 12, didanai: 8 },
  { id: 2, prodi: "Kenotariatan (S2)", totalDosen: 20, proposalAktif: 5, didanai: 3 },
  { id: 3, prodi: "Ilmu Hukum (S3)", totalDosen: 15, proposalAktif: 4, didanai: 2 },
];

export default function DataFakultasPage() {
  return (
    <div className="max-w-[1600px] w-full mx-auto space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Rekap Data Fakultas</h1>
          <p className="text-neutral-500">Ringkasan statistik dan rekapitulasi usulan tingkat fakultas.</p>
        </div>
        <ExportButton data={mockFakultasData} filename="Rekap_Data_Fakultas" label="Unduh Rekap Excel" />
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input placeholder="Cari program studi..." className="pl-9 bg-white" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-neutral-50">
              <TableRow>
                <TableHead>Program Studi</TableHead>
                <TableHead className="text-center">Total Dosen</TableHead>
                <TableHead className="text-center">Proposal Aktif</TableHead>
                <TableHead className="text-center">Didanai (Tahun Ini)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFakultasData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="font-medium text-neutral-900">{data.prodi}</TableCell>
                  <TableCell className="text-center">{data.totalDosen}</TableCell>
                  <TableCell className="text-center">
                    <Link href={`/verifikasi?prodi=${encodeURIComponent(data.prodi)}`}>
                      <Badge variant="outline" className="text-primary-700 bg-primary-50 border-primary-200 hover:bg-primary-100 cursor-pointer transition-colors">
                        {data.proposalAktif} Usulan
                      </Badge>
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">
                    <Link href={`/verifikasi?prodi=${encodeURIComponent(data.prodi)}&status=didanai`}>
                      <Badge className="bg-success-100 text-success-700 border-none hover:bg-success-200 cursor-pointer transition-colors">
                        {data.didanai} Didanai
                      </Badge>
                    </Link>
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
