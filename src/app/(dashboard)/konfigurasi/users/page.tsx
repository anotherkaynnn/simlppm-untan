"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreVertical, Shield, Edit, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

const initialUsersData = [
  { id: "USR-001", nama: "Dr. Budi Santoso", email: "budi.santoso@untan.ac.id", role: "DOSEN", status: "Aktif", isReviewer: true },
  { id: "USR-004", nama: "Dr. Anton", email: "anton@untan.ac.id", role: "DOSEN", status: "Aktif", isReviewer: false },
  { id: "USR-002", nama: "Admin LPPM", email: "admin.lppm@untan.ac.id", role: "ADMIN_SISTEM", status: "Aktif", isReviewer: false },
  { id: "USR-003", nama: "Operator Hukum", email: "opr.hukum@untan.ac.id", role: "OPERATOR_FK", status: "Aktif", isReviewer: false },
];

export default function KelolaPenggunaPage() {
  const [users, setUsers] = useState(initialUsersData);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleDelete = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
    toast.success(`Pengguna dengan ID ${id} berhasil dihapus.`);
  };

  const handleEdit = (id: string) => {
    toast.info(`Modal edit untuk pengguna ${id} dibuka (Simulasi)`);
  };

  const handleSyncSSO = () => {
    setIsSyncing(true);
    toast.info("Memulai sinkronisasi SSO...");
    setTimeout(() => {
      setIsSyncing(false);
      toast.success("Sinkronisasi SSO berhasil diselesaikan!");
    }, 2000);
  };

  const handleToggleReviewer = (id: string, checked: boolean) => {
    setUsers(users.map(u => u.id === id ? { ...u, isReviewer: checked } : u));
    toast.success(`Akses Reviewer untuk ID ${id} berhasil di${checked ? 'aktifkan' : 'nonaktifkan'}.`);
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Kelola Pengguna</h1>
          <p className="text-neutral-500">Manajemen akses, role, dan akun pengguna sistem (SSO terintegrasi).</p>
        </div>
        <Button 
          className="bg-primary-600 hover:bg-primary-700 text-white" 
          onClick={handleSyncSSO}
          disabled={isSyncing}
        >
          <Shield className="w-4 h-4 mr-2" />
          {isSyncing ? "Menyinkronkan..." : "Sinkronisasi SSO"}
        </Button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-200 bg-neutral-50 flex items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <Input placeholder="Cari nama atau email pengguna..." className="pl-9 bg-white" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-neutral-50">
              <TableRow>
                <TableHead>Nama Pengguna</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Peran (Role)</TableHead>
                <TableHead>Akses Reviewer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-semibold text-neutral-900">{user.nama}</TableCell>
                  <TableCell className="text-neutral-600">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-primary-50 text-primary-700 border-primary-200">
                      {user.role.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.role === 'DOSEN' ? (
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={user.isReviewer} 
                          onCheckedChange={(checked) => handleToggleReviewer(user.id, checked)}
                        />
                        <span className="text-xs text-neutral-500">{user.isReviewer ? "Aktif" : "Nonaktif"}</span>
                      </div>
                    ) : (
                      <span className="text-neutral-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-success-700 bg-success-50 border-success-200">
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="icon-sm" variant="ghost" className="text-primary-600 hover:text-primary-800" onClick={() => handleEdit(user.id)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="icon-sm" variant="ghost" className="text-danger hover:text-danger-700 hover:bg-danger/10" onClick={() => handleDelete(user.id)}>
                      <Trash2 className="w-4 h-4" />
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
