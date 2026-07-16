"use client";

import { useAuthStore } from "@/store/authStore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, MessagesSquare } from "lucide-react";
import { Input } from "@/components/ui/input";

const mockTickets = [
  { id: "T-001", subject: "Lupa kata sandi akun dosen", user: "Dr. Anton", status: "MENUNGGU", date: "2026-07-16" },
  { id: "T-002", subject: "Error saat upload proposal format PDF", user: "Siti, M.Kom", status: "DIPROSES", date: "2026-07-15" },
  { id: "T-003", subject: "Saran: Tambahkan skim penelitian dosen muda", user: "Budi, M.T.", status: "SELESAI", date: "2026-07-10" },
];

export default function HelpdeskPage() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-[1600px] w-full mx-auto space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Helpdesk & Tiket Bantuan</h1>
          <p className="text-neutral-500">Kelola pesan, saran, dan kendala dari pengguna sistem.</p>
        </div>
        <Button className="bg-primary-600 hover:bg-primary-700">
          <MessagesSquare className="w-4 h-4 mr-2" />
          Buat Tiket Baru
        </Button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input placeholder="Cari tiket atau pengguna..." className="pl-9 bg-white" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-neutral-50">
              <TableRow>
                <TableHead>ID Tiket</TableHead>
                <TableHead>Subjek</TableHead>
                <TableHead>Pengguna</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTickets.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-sm text-neutral-500">{t.id}</TableCell>
                  <TableCell className="font-medium text-neutral-900">{t.subject}</TableCell>
                  <TableCell className="text-neutral-600">{t.user}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      t.status === "MENUNGGU" ? "text-warning-700 bg-warning-50 border-warning-200" :
                      t.status === "DIPROSES" ? "text-info-700 bg-info-50 border-info-200" :
                      "text-success-700 bg-success-50 border-success-200"
                    }>
                      {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-neutral-500">{t.date}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-primary-600">Buka</Button>
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
