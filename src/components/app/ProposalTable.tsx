import { ReactNode } from "react";
import { Proposal } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function ProposalTable({ 
  proposals,
  renderActions
}: { 
  proposals: Proposal[],
  renderActions?: (p: Proposal) => ReactNode
}) {
  if (proposals.length === 0) {
    return <div className="text-sm text-neutral-500 italic p-4">Belum ada usulan aktif.</div>;
  }

  return (
    <Table>
      <TableHeader className="bg-neutral-50">
        <TableRow>
          <TableHead className="w-[120px]">Kode</TableHead>
          <TableHead>Judul Usulan</TableHead>
          <TableHead className="w-[200px]">Skim</TableHead>
          <TableHead className="w-[120px]">Status</TableHead>
          {renderActions && <TableHead className="text-right w-[150px]">Aksi</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {proposals.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium text-neutral-600 whitespace-nowrap">{row.id}</TableCell>
            <TableCell>
              <div className="font-semibold text-neutral-900 max-w-md whitespace-normal line-clamp-2" title={row.title}>
                {row.title}
              </div>
            </TableCell>
            <TableCell className="text-neutral-600">{row.schemeName}</TableCell>
            <TableCell>
              <Badge variant={
                row.status === 'DIAJUKAN' ? 'default' :
                row.status === 'SELESAI' ? 'success' :
                row.status === 'DRAFT' ? 'secondary' : 'outline'
              }>
                {row.status}
              </Badge>
            </TableCell>
            {renderActions && (
              <TableCell className="text-right space-x-2">
                {renderActions(row)}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
