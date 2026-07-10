"use client";

import { useProposalDraftStore } from "@/store/proposalDraftStore";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function Step3Anggaran() {
  const { setCurrentStep } = useProposalDraftStore();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 md:p-8 space-y-6">
        <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <h3 className="font-semibold text-neutral-900 mb-2">Rencana Anggaran Belanja (RAB)</h3>
          <p className="text-sm text-neutral-600 mb-4">Tambahkan rincian anggaran yang dibutuhkan untuk usulan Anda.</p>
          <Button variant="outline" type="button" className="border-dashed w-full">+ Tambah Baris Anggaran</Button>
        </div>

        <div className="border-t border-neutral-200 pt-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-neutral-50">
                <TableHead>Komponen</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Harga Satuan</TableHead>
                <TableHead>Kuantitas</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="text-center text-neutral-500 py-6">
                  Belum ada item anggaran.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={() => setCurrentStep(2)}>Kembali</Button>
        <Button type="button" onClick={() => setCurrentStep(4)}>Lanjut ke Berkas</Button>
      </div>
    </div>
  );
}
