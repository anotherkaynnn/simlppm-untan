"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const dummyBidangIlmu = [
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
  const [search, setSearch] = useState("");

  const filteredData = dummyBidangIlmu.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Bidang Ilmu</h1>
        <p className="text-neutral-500">Referensi data bidang ilmu pada SIMLPPM.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
              <Input 
                placeholder="Cari bidang ilmu..." 
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
                  <TableHead>Bidang Ilmu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{item.nama}</TableCell>
                  </TableRow>
                ))}
                {filteredData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={2} className="h-24 text-center text-neutral-500">
                      Tidak ada bidang ilmu yang sesuai pencarian.
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
