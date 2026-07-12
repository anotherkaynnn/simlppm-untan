"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";

const initialDrafts = [
  { id: "DRF-001", judul: "Pengembangan Sistem Informasi LPPM", skim: "Penelitian Terapan", tglUbah: "10 Juli 2026", progress: "Tahap 2 (Anggota)" },
  { id: "DRF-002", judul: "Pemberdayaan Masyarakat Pesisir Sungai Kapuas", skim: "Pengabdian Masyarakat", tglUbah: "5 Juli 2026", progress: "Tahap 3 (Anggaran)" },
];

export default function DraftProposalPage() {
  const [drafts, setDrafts] = useState(initialDrafts);

  const handleDelete = (id: string) => {
    setDrafts(drafts.filter((d) => d.id !== id));
    toast.success(`Draft proposal ${id} berhasil dihapus.`);
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Draft Proposal</h1>
        <p className="text-neutral-500">Lanjutkan pengisian form pengajuan proposal Anda yang belum selesai.</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-neutral-50">
                <TableRow>
                  <TableHead>Judul Proposal</TableHead>
                  <TableHead>Skim</TableHead>
                  <TableHead>Terakhir Diubah</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drafts.length > 0 ? (
                  drafts.map((draft) => (
                    <TableRow key={draft.id}>
                      <TableCell className="font-semibold text-neutral-900 min-w-[280px] max-w-[400px] whitespace-normal line-clamp-2" title={draft.judul}>
                        {draft.judul}
                      </TableCell>
                      <TableCell className="text-neutral-600">{draft.skim}</TableCell>
                      <TableCell className="text-neutral-500">{draft.tglUbah}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-warning-50 text-warning-700 border-warning-200">
                          {draft.progress}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Link href="/pengajuan/baru">
                          <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white">
                            Lanjutkan <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                        <Button size="icon" variant="ghost" className="text-danger hover:text-danger-700 hover:bg-danger/10" onClick={() => handleDelete(draft.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-neutral-500">
                      Tidak ada draft proposal saat ini.
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
