/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { downloadCsv } from "@/utils/export-csv";

interface ExportButtonProps {
  data: any[];
  filename: string;
  sheetName?: string;
  label?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
  format?: "excel" | "csv";
}

export function ExportButton({ 
  data, 
  filename, 
  sheetName = "Sheet1",
  label = "Ekspor",
  variant = "outline",
  className,
  format = "excel"
}: ExportButtonProps) {
  
  const handleExport = async () => {
    try {
      if (!data || data.length === 0) {
        toast.warning("Tidak ada data untuk diekspor");
        return;
      }

      if (format === "csv") {
        const headers = Object.keys(data[0] || {});
        const rows = data.map(item => Object.values(item));
        downloadCsv(`${filename}.csv`, headers, rows);
        toast.success("Berhasil mengekspor data ke CSV");
        return;
      }

      // Dynamically import xlsx to prevent Next.js client-side hydration crashes
      const XLSX = await import("xlsx");
      
      const worksheet = XLSX.utils.json_to_sheet(data);
      const colWidths = Object.keys(data[0] || {}).map(key => ({ wch: Math.max(key.length, 15) }));
      worksheet['!cols'] = colWidths;

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      
      XLSX.writeFile(workbook, `${filename}.xlsx`);
      toast.success("Berhasil mengekspor data ke Excel");
    } catch (error) {
      console.error("Export error:", error);
      toast.error(`Gagal mengekspor data ke ${format.toUpperCase()}`);
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
