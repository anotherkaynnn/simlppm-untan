import { ReactNode } from "react";
import { Proposal } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/StatusBadge";
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
          <TableHead className="w-[120px] hidden sm:table-cell">Kode</TableHead>
          <TableHead>Judul Usulan</TableHead>
          <TableHead className="w-[200px] hidden md:table-cell">Skim</TableHead>
          <TableHead className="w-[120px]">Status</TableHead>
          {renderActions && (
            <TableHead className="text-right w-[150px] sticky right-0 bg-neutral-50 shadow-[-10px_0_15px_-10px_rgba(0,0,0,0.1)] z-10">
              Aksi
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {proposals.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium text-neutral-600 whitespace-nowrap hidden sm:table-cell">{row.id}</TableCell>
            <TableCell className="min-w-0">
              <div className="font-semibold text-neutral-900 max-w-md whitespace-normal break-all line-clamp-2" title={row.title}>
                {row.title}
              </div>
            </TableCell>
            <TableCell className="text-neutral-600 hidden md:table-cell">{row.schemeName}</TableCell>
            <TableCell>
              <StatusBadge status={row.status} />
            </TableCell>
            {renderActions && (
              <TableCell className="text-right space-x-2 whitespace-nowrap sticky right-0 bg-white shadow-[-10px_0_15px_-10px_rgba(0,0,0,0.1)] z-10 group-hover:bg-muted/50 transition-colors">
                {renderActions(row)}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
