"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import { toast } from "sonner";

interface ExportButtonProps {
  data: any[];
  filename: string;
  sheetName?: string;
  label?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
}

export function ExportButton({ 
  data, 
  filename, 
  sheetName = "Sheet1",
  label = "Ekspor Excel",
  variant = "outline",
  className
}: ExportButtonProps) {
  
  const handleExport = () => {
    try {
      if (!data || data.length === 0) {
        toast.warning("Tidak ada data untuk diekspor");
        return;
      }

      // Convert data to a worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);
      
      // Auto-adjust column widths
      const colWidths = Object.keys(data[0] || {}).map(key => ({ wch: Math.max(key.length, 15) }));
      worksheet['!cols'] = colWidths;

      // Create a workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      
      // Trigger download
      XLSX.writeFile(workbook, `${filename}.xlsx`);
      
      toast.success("Berhasil mengekspor data ke Excel");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Gagal mengekspor data");
    }
  };

  const baseClassName = variant === 'default' 
    ? 'font-semibold' 
    : 'font-semibold text-success hover:text-success hover:bg-success/10 border-success/30';

  return (
    <Button variant={variant} onClick={handleExport} className={`${baseClassName} ${className || ''}`}>
      <Download className="w-4 h-4 mr-2" />
      {label}
    </Button>
  );
}
