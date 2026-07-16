import { Badge } from "@/components/ui/badge";
import { ProposalStatus } from "@/types";

export function StatusBadge({ status }: { status: ProposalStatus }) {
  let colorClass = "";
  
  switch (status) {
    case "DRAFT":
      colorClass = "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-neutral-200";
      break;
    case "DIAJUKAN":
      colorClass = "bg-info/10 text-info hover:bg-info/20 border-info/20";
      break;
    case "DIVERIFIKASI":
      colorClass = "bg-primary-100 text-primary-700 hover:bg-primary-200 border-primary-200";
      break;
    case "DIREVIEW":
      colorClass = "bg-warning/10 text-warning hover:bg-warning/20 border-warning/20";
      break;
    case "DITERIMA":
    case "SELESAI":
      colorClass = "bg-success/10 text-success hover:bg-success/20 border-success/20";
      break;
    case "DITOLAK":
      colorClass = "bg-danger/10 text-danger hover:bg-danger/20 border-danger/20";
      break;
    case "REVISI":
      colorClass = "bg-red-100 text-red-700 hover:bg-red-200 border-red-200";
      break;
    default:
      colorClass = "bg-neutral-100 text-neutral-600 border-neutral-200";
  }

  return (
    <Badge variant="outline" className={`${colorClass} font-semibold uppercase text-[10px] py-0.5 px-2`}>
      {status}
    </Badge>
  );
}
