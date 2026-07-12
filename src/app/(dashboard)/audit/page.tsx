"use client";

import { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockAuditLogs } from "@/mock/data/audit";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCcw } from "lucide-react";

export default function AuditPage() {
  const [filterAction, setFilterAction] = useState<string>("semua");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  const handleReset = () => {
    setFilterAction("semua");
    setDateFrom("");
    setDateTo("");
  };

  const filteredLogs = mockAuditLogs.filter((log) => {
    // Filter action
    if (filterAction !== "semua" && log.action !== filterAction) return false;
    
    // Filter date (basic comparison using date string prefix or timestamp logic)
    const logDate = new Date(log.timestamp).toISOString().split('T')[0];
    if (dateFrom && logDate < dateFrom) return false;
    if (dateTo && logDate > dateTo) return false;

    return true;
  });

  const getActionBadge = (action: string) => {
    switch(action) {
      case "CREATE":
      case "SUBMIT":
        return <Badge variant="outline" className="bg-success-50 text-success-700 border-success-200">{action}</Badge>;
      case "DELETE":
        return <Badge variant="outline" className="bg-danger-50 text-danger-700 border-danger-200">{action}</Badge>;
      case "VERIFY":
        return <Badge variant="outline" className="bg-primary-50 text-primary-700 border-primary-200">{action}</Badge>;
      case "LOGIN":
      default:
        return <Badge variant="outline" className="bg-neutral-50 text-neutral-600 border-neutral-200">{action}</Badge>;
    }
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Audit Log Sistem</h1>
        <p className="text-neutral-500">Pantau jejak aktivitas pengguna dan sistem di SIMLPPM secara menyeluruh.</p>
      </div>

      <Card>
        <CardContent className="p-4 border-b border-neutral-100 bg-neutral-50/50">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col gap-1.5 w-full sm:w-auto">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Aksi Sistem</label>
              <select 
                value={filterAction} 
                onChange={(e) => setFilterAction(e.target.value)}
                className="px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 min-w-[150px]"
              >
                <option value="semua">Semua Aksi</option>
                <option value="LOGIN">LOGIN</option>
                <option value="CREATE">CREATE</option>
                <option value="SUBMIT">SUBMIT</option>
                <option value="VERIFY">VERIFY</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5 w-full sm:w-auto">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Dari Tanggal</label>
              <input 
                type="date" 
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full sm:w-auto">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Sampai Tanggal</label>
              <input 
                type="date" 
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="px-3 py-2 border border-neutral-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <Button variant="outline" onClick={handleReset} className="text-neutral-600 sm:ml-auto">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Reset Filter
            </Button>
          </div>
        </CardContent>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-neutral-50 border-b border-neutral-200">
                <TableRow>
                  <TableHead className="w-[180px]">Waktu</TableHead>
                  <TableHead>Pengguna</TableHead>
                  <TableHead className="w-[120px]">Aksi</TableHead>
                  <TableHead>Target Entitas</TableHead>
                  <TableHead>Detail Aktivitas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm text-neutral-600">
                        {format(new Date(log.timestamp), "dd MMM yyyy, HH:mm", { locale: id })}
                      </TableCell>
                      <TableCell className="font-medium text-neutral-900">{log.user}</TableCell>
                      <TableCell>{getActionBadge(log.action)}</TableCell>
                      <TableCell className="text-sm text-neutral-600">{log.target}</TableCell>
                      <TableCell className="text-sm text-neutral-500">{log.detail}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-neutral-500">
                      Tidak ada log audit yang cocok dengan filter yang Anda berikan.
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
