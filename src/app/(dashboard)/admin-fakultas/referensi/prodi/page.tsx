"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const dummyProdi = [
  { id: 1, nama: "Pendidikan Jasmani (S1)", fakultas: "Fakultas Keguruan dan Ilmu Pendidikan (FKIP)" },
  { id: 2, nama: "Pendidikan Dokter (S1)", fakultas: "Fakultas Kedokteran" },
  { id: 3, nama: "Pusat Kajian Kepolisian", fakultas: "Lembaga Penelitian dan Pengabdian Kepada Masyarakat" },
  { id: 4, nama: "Ilmu Tanah (S-2)", fakultas: "Fakultas Pertanian" },
  { id: 5, nama: "Ners (PROFESI)", fakultas: "Fakultas Kedokteran" },
  { id: 6, nama: "Dokter (PROFESI)", fakultas: "Fakultas Kedokteran" },
  { id: 7, nama: "Apoteker (PROFESI)", fakultas: "Fakultas Kedokteran" },
  { id: 8, nama: "Ilmu Keperawatan (S1)", fakultas: "Fakultas Kedokteran" },
  { id: 9, nama: "Farmasi (S1)", fakultas: "Fakultas Kedokteran" },
  { id: 10, nama: "Kimia (S2)", fakultas: "Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA)" },
];

export default function ProgramStudiPage() {
  const [search, setSearch] = useState("");

  const filteredData = dummyProdi.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase()) || 
    item.fakultas.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Program Studi</h1>
        <p className="text-neutral-500">Referensi data program studi lintas fakultas pada SIMLPPM.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex mb-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              <Input 
                placeholder="Cari program studi atau fakultas..." 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader className="bg-neutral-50">
                <TableRow>
                  <TableHead className="w-[80px]">No.</TableHead>
                  <TableHead>Program Studi</TableHead>
                  <TableHead>Fakultas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{item.nama}</TableCell>
                    <TableCell className="text-neutral-600">{item.fakultas}</TableCell>
                  </TableRow>
                ))}
                {filteredData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center text-neutral-500">
                      Tidak ada program studi yang sesuai pencarian.
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
