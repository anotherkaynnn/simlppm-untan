"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Download, FileText, Printer } from "lucide-react";

// Dummy Data
const dummyDokumen = [
  { id: 1, nama: "Berita Acara Serah Terima Barang Hasil Penelitian / PKM", tanggal: "2025-06-20 13:06:11" },
  { id: 2, nama: "Form Kesediaan Mitra Untuk Penelitian Inovasi Untan", tanggal: "2023-03-06 06:49:51" },
  { id: 3, nama: "Panduan Penelitian dan PKM Batch II", tanggal: "2025-09-22 05:55:50" },
  { id: 4, nama: "PANDUAN PENELITIAN UNIVERSITAS TANJUNGPURA", tanggal: "2020-06-15 21:10:40" },
  { id: 5, nama: "Panduan Penetian Dosen Muda 2026", tanggal: "2026-04-09 03:39:21" },
];

export default function UnduhanPage() {
  const [activeTab, setActiveTab] = useState("dokumen");

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Unduhan</h1>
        <p className="text-neutral-500">Akses dokumen panduan dan unduh rekapitulasi data dosen.</p>
      </div>

      <Card className="w-full sm:w-[250px] shadow-sm mb-6">
          <CardContent className="p-1.5">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="h-9 border-0 shadow-none focus:ring-0 focus-visible:ring-0 font-medium text-neutral-700 bg-transparent">
                <SelectValue placeholder="Pilih menu..." />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectItem value="dokumen">Dokumen Panduan</SelectItem>
                <SelectItem value="rekap">Rekap Data Dosen</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
      </Card>

      {activeTab === 'dokumen' && (
        <div className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Manajemen File</CardTitle>
              <CardDescription>Dokumen panduan dan formulir yang diunggah oleh administrator.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader className="bg-neutral-50">
                    <TableRow>
                      <TableHead className="w-[50px]">No</TableHead>
                      <TableHead>Nama Berkas</TableHead>
                      <TableHead className="w-[250px]">Terakhir Di-upload</TableHead>
                      <TableHead className="text-right w-[150px]">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyDokumen.map((doc, index) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center font-medium">
                            <FileText className="w-4 h-4 mr-2 text-primary-500" />
                            {doc.nama}
                          </div>
                        </TableCell>
                        <TableCell className="text-neutral-500">{doc.tanggal}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" className="text-primary-600 border-primary-200 bg-primary-50 hover:bg-primary-100 hover:text-primary-700">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'rekap' && (
        <div className="m-0">
          <Card>
            <CardHeader>
              <CardTitle>Cetak Data Penelitian/PKM</CardTitle>
              <CardDescription>Unduh rekap data laporan dosen dalam format Excel (.xls).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold text-neutral-900 mb-3 block">Jenis Kegiatan</Label>
                  <RadioGroup defaultValue="proposal" className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center space-x-2 border p-3 rounded-md flex-1 cursor-pointer hover:bg-neutral-50">
                      <RadioGroupItem value="proposal" id="jenis-proposal" />
                      <Label htmlFor="jenis-proposal" className="cursor-pointer w-full">Proposal</Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-md flex-1 cursor-pointer hover:bg-neutral-50">
                      <RadioGroupItem value="laporan" id="jenis-laporan" />
                      <Label htmlFor="jenis-laporan" className="cursor-pointer w-full">Laporan Akhir</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base font-semibold text-neutral-900 mb-3 block">Tipe</Label>
                  <RadioGroup defaultValue="penelitian" className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center space-x-2 border p-3 rounded-md flex-1 cursor-pointer hover:bg-neutral-50">
                      <RadioGroupItem value="penelitian" id="tipe-penelitian" />
                      <Label htmlFor="tipe-penelitian" className="cursor-pointer w-full">Penelitian</Label>
                    </div>
                    <div className="flex items-center space-x-2 border p-3 rounded-md flex-1 cursor-pointer hover:bg-neutral-50">
                      <RadioGroupItem value="pkm" id="tipe-pkm" />
                      <Label htmlFor="tipe-pkm" className="cursor-pointer w-full">PKM</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base font-semibold text-neutral-900 mb-3 block">Sumber Dana</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <RadioGroup defaultValue="semua" className="contents">
                      {[
                        { id: "semua", label: "Semua" },
                        { id: "hibah-dikti", label: "Hibah Dikti" },
                        { id: "dipa", label: "DIPA UNTAN" },
                        { id: "kerjasama", label: "Kerja Sama" },
                        { id: "mandiri", label: "Mandiri" },
                        { id: "batch", label: "Batch" },
                        { id: "lain", label: "Lain-lain" },
                      ].map((item) => (
                        <div key={item.id} className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-neutral-50">
                          <RadioGroupItem value={item.id} id={`sumber-${item.id}`} />
                          <Label htmlFor={`sumber-${item.id}`} className="cursor-pointer text-sm w-full">{item.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>

                <div>
                  <Label htmlFor="tahun" className="text-base font-semibold text-neutral-900 mb-3 block">Tahun</Label>
                  <Input id="tahun" type="number" defaultValue={2026} className="max-w-[200px]" />
                </div>
              </div>

              <div className="pt-6 border-t">
                <Button className="bg-primary-600 hover:bg-primary-700 text-white min-w-[120px]">
                  <Printer className="w-4 h-4 mr-2" />
                  Cetak XLS
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
