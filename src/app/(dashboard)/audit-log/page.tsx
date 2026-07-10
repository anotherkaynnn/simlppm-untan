"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockAuditLogs = [
  { id: "LOG-1029", waktu: "2026-07-10 03:50:12", user: "Admin LPPM", aksi: "Membuat Skim Baru (SKM-005)", ip: "192.168.1.12" },
  { id: "LOG-1028", waktu: "2026-07-10 02:15:00", user: "Operator Hukum", aksi: "Verifikasi Proposal (PRP-001)", ip: "10.0.0.45" },
  { id: "LOG-1027", waktu: "2026-07-09 20:30:15", user: "Dr. Budi Santoso", aksi: "Login SSO", ip: "114.120.45.1" },
  { id: "LOG-1026", waktu: "2026-07-09 19:45:00", user: "System", aksi: "Sinkronisasi Data Dosen", ip: "localhost" },
];

export default function AuditLogPage() {
  return (
    <div className="max-w-[1600px] w-full mx-auto space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Audit Log Sistem</h1>
          <p className="text-neutral-500">Rekam jejak seluruh aktivitas pengguna dan sistem.</p>
        </div>
        <Button variant="outline" className="text-neutral-700 bg-white">
          <Download className="w-4 h-4 mr-2" />
          Ekspor CSV
        </Button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-200 bg-neutral-50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input placeholder="Cari aksi, user, atau IP..." className="pl-9 bg-white" />
          </div>
          <Button variant="outline" className="w-full md:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            Filter Rentang Waktu
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-neutral-50">
              <TableRow>
                <TableHead>Waktu</TableHead>
                <TableHead>Pengguna / Aktor</TableHead>
                <TableHead>Aktivitas</TableHead>
                <TableHead>Alamat IP</TableHead>
                <TableHead>ID Log</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAuditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-neutral-500 text-sm">{log.waktu}</TableCell>
                  <TableCell className="font-medium text-neutral-900">{log.user}</TableCell>
                  <TableCell className="text-neutral-700">{log.aksi}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-neutral-50 text-neutral-500 font-mono text-xs">
                      {log.ip}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-neutral-400 text-xs font-mono">{log.id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
