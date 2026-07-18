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
    <Table className="block md:table w-full">
      <TableHeader className="hidden md:table-header-group bg-neutral-50">
        <TableRow className="md:table-row">
          <TableHead className="w-[120px] hidden sm:table-cell">Kode</TableHead>
          <TableHead>Judul Usulan</TableHead>
          <TableHead className="w-[200px] hidden md:table-cell">Skim</TableHead>
          <TableHead className="w-[120px]">Status</TableHead>
          {renderActions && (
            <TableHead className="text-right w-[150px] md:sticky md:right-0 bg-neutral-50 md:shadow-[-10px_0_15px_-10px_rgba(0,0,0,0.1)] z-10">
              Aksi
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody className="block md:table-row-group">
        {proposals.map((row) => (
          <TableRow key={row.id} className="block md:table-row mb-4 md:mb-0 border md:border-b rounded-lg md:rounded-none overflow-hidden bg-white shadow-sm md:shadow-none">
            <TableCell className="px-4 py-3 md:px-2 md:py-3 font-medium text-neutral-600 block sm:hidden md:table-cell border-b md:border-b-0">
              <span className="md:hidden text-xs font-semibold text-neutral-500 uppercase block mb-1">Kode</span>
              {row.id}
            </TableCell>
            <TableCell className="px-4 py-3 md:px-2 md:py-3 min-w-0 block md:table-cell border-b md:border-b-0">
              <span className="md:hidden text-xs font-semibold text-neutral-500 uppercase block mb-1">Judul Usulan</span>
              <div className="font-semibold text-neutral-900 w-full whitespace-normal break-all line-clamp-3 md:line-clamp-2" title={row.title}>
                {row.title}
              </div>
            </TableCell>
            <TableCell className="px-4 py-3 md:px-2 md:py-3 text-neutral-600 block md:hidden lg:table-cell border-b md:border-b-0">
              <span className="md:hidden text-xs font-semibold text-neutral-500 uppercase block mb-1">Skim</span>
              {row.schemeName}
            </TableCell>
            <TableCell className="px-4 py-3 md:px-2 md:py-3 block md:table-cell border-b md:border-b-0">
              <span className="md:hidden text-xs font-semibold text-neutral-500 uppercase block mb-1">Status</span>
              <StatusBadge status={row.status} />
            </TableCell>
            {renderActions && (
              <TableCell className="px-4 py-3 md:px-2 md:py-3 flex justify-end md:table-cell space-x-2 whitespace-nowrap md:sticky md:right-0 bg-neutral-50/50 md:bg-white md:shadow-[-10px_0_15px_-10px_rgba(0,0,0,0.1)] z-10 group-hover:bg-muted/50 transition-colors">
                {renderActions(row)}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
