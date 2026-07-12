import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

export default function TemplatePanduanPage() {
  const templates = [
    { title: "Buku Panduan P2M Edisi 2026", desc: "Panduan lengkap pengusulan proposal, pelaksanaan, dan pelaporan.", size: "4.2 MB", type: "PDF", version: "v2.0", updatedAt: "2026-01-15T00:00:00Z" },
    { title: "Template Proposal Penelitian Dasar", desc: "Format penulisan proposal untuk skim Penelitian Dasar.", size: "1.5 MB", type: "DOCX", version: "v1.5", updatedAt: "2025-12-10T00:00:00Z" },
    { title: "Template Proposal Pengabdian Masyarakat", desc: "Format penulisan proposal untuk skim Pengabdian Masyarakat.", size: "1.6 MB", type: "DOCX", version: "v1.4", updatedAt: "2025-11-20T00:00:00Z" },
    { title: "Surat Pernyataan Ketua Peneliti", desc: "Format surat pernyataan orisinalitas dan kesanggupan.", size: "500 KB", type: "DOCX", version: "v1.1", updatedAt: "2025-10-05T00:00:00Z" },
  ];

  return (
    <div className="max-w-[1400px] w-full mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Template & Dokumen Pendukung</h1>
        <p className="text-neutral-500">Unduh buku panduan dan format dokumen pengusulan proposal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((tpl, i) => (
          <Card key={i}>
            <CardContent className="p-4 flex items-start gap-4">
              <div className="p-3 bg-primary-50 rounded-lg text-primary-600 shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-neutral-900">{tpl.title}</h3>
                <p className="text-sm text-neutral-600 mt-1">{tpl.desc}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-neutral-500 font-medium flex-wrap">
                  <span className="bg-neutral-100 px-2 py-1 rounded">{tpl.type}</span>
                  <span>{tpl.size}</span>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                    {tpl.version} • Diperbarui: {format(new Date(tpl.updatedAt), "dd MMMM yyyy", { locale: localeId })}
                  </Badge>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="shrink-0 text-primary-600 hover:text-primary-800 hover:bg-primary-50">
                <Download className="w-5 h-5" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
