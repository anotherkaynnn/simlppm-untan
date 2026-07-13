"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { downloadCsv } from "@/utils/export-csv";

interface ExportColumn {
  key: string;
  label: string;
}

interface AdvancedExportModalProps {
  data: any[];
  filename: string;
  columns: ExportColumn[];
  triggerLabel?: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
  className?: string;
}

export function AdvancedExportModal({
  data,
  filename,
  columns,
  triggerLabel = "Ekspor",
  variant = "outline",
  className,
}: AdvancedExportModalProps) {
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState<"excel" | "csv">("excel");
  const [selectedColumns, setSelectedColumns] = useState<string[]>(columns.map(c => c.key));

  const handleToggleColumn = (key: string) => {
    setSelectedColumns(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleSelectAll = () => {
    if (selectedColumns.length === columns.length) {
      setSelectedColumns([]);
    } else {
      setSelectedColumns(columns.map(c => c.key));
    }
  };

  const handleExport = async () => {
    if (!data || data.length === 0) {
      toast.warning("Tidak ada data untuk diekspor");
      return;
    }
    
    if (selectedColumns.length === 0) {
      toast.warning("Pilih minimal satu kolom untuk diekspor");
      return;
    }

    try {
      const formattedData = data.map(item => {
        const newItem: any = {};
        columns.forEach(col => {
          if (selectedColumns.includes(col.key)) {
            // We use the label as the header
            // If item[col.key] is an object (like user.name), we can support simple dot notation
            // but for current mocks, mostly flat. We'll handle basic flat structures.
            
            // Allow basic nested property access if key has dot
            let value = item;
            if (col.key.includes('.')) {
              const parts = col.key.split('.');
              for (const part of parts) {
                if (value && value[part] !== undefined) {
                  value = value[part];
                } else {
                  value = "";
                  break;
                }
              }
            } else {
              value = item[col.key];
            }
            
            newItem[col.label] = value || "-";
          }
        });
        return newItem;
      });

      if (format === "csv") {
        const headers = columns.filter(c => selectedColumns.includes(c.key)).map(c => c.label);
        const rows = formattedData.map(item => Object.values(item));
        downloadCsv(`${filename}.csv`, headers, rows);
        toast.success("Berhasil mengekspor data ke CSV");
      } else {
        const XLSX = await import("xlsx");
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        
        const colWidths = Object.keys(formattedData[0] || {}).map(key => ({ wch: Math.max(key.length, 15) }));
        worksheet['!cols'] = colWidths;

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        
        XLSX.writeFile(workbook, `${filename}.xlsx`);
        toast.success("Berhasil mengekspor data ke Excel");
      }
      
      setOpen(false);
    } catch (error) {
      console.error("Export error:", error);
      toast.error(`Gagal mengekspor data ke ${format.toUpperCase()}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant={variant} className={className} />}>
        <Download className="w-4 h-4 mr-2" />
        {triggerLabel}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Opsi Ekspor Data</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Pilih Format</Label>
            <RadioGroup value={format} onValueChange={(val) => setFormat(val as "excel" | "csv")} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excel" id="excel" />
                <Label htmlFor="excel" className="cursor-pointer">Excel (.xlsx)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv" className="cursor-pointer">CSV</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-semibold">Pilih Kolom</Label>
              <Button type="button" variant="ghost" size="sm" className="h-auto py-1 px-2 text-xs" onClick={handleSelectAll}>
                {selectedColumns.length === columns.length ? "Batal Pilih Semua" : "Pilih Semua"}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto p-1">
              {columns.map(col => (
                <div key={col.key} className="flex items-center space-x-2 bg-neutral-50 p-2 rounded-md border border-neutral-100">
                  <Checkbox 
                    id={`col-${col.key}`} 
                    checked={selectedColumns.includes(col.key)}
                    onCheckedChange={() => handleToggleColumn(col.key)}
                  />
                  <Label htmlFor={`col-${col.key}`} className="flex-1 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {col.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
          <Button onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Ekspor Sekarang
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
