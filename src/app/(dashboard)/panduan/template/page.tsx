"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialTemplates = [
  { id: 1, title: "Buku Panduan P2M Edisi 2026", desc: "Panduan lengkap pengusulan proposal, pelaksanaan, dan pelaporan.", size: "4.2 MB", type: "PDF", version: "v2.0", updatedAt: "2026-01-15T00:00:00Z" },
  { id: 2, title: "Template Proposal Penelitian Dasar", desc: "Format penulisan proposal untuk skim Penelitian Dasar.", size: "1.5 MB", type: "DOCX", version: "v1.5", updatedAt: "2025-12-10T00:00:00Z" },
  { id: 3, title: "Template Proposal Pengabdian Masyarakat", desc: "Format penulisan proposal untuk skim Pengabdian Masyarakat.", size: "1.6 MB", type: "DOCX", version: "v1.4", updatedAt: "2025-11-20T00:00:00Z" },
  { id: 4, title: "Surat Pernyataan Ketua Peneliti", desc: "Format surat pernyataan orisinalitas dan kesanggupan.", size: "500 KB", type: "DOCX", version: "v1.1", updatedAt: "2025-10-05T00:00:00Z" },
];

export default function TemplatePanduanPage() {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "ADMIN_SISTEM" || user?.role === "ADMIN_FK";
  const [templates, setTemplates] = useState(initialTemplates);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleUpload = () => {
    if (!newTitle.trim()) {
      toast.error("Nama dokumen harus diisi.");
      return;
    }
    const newDoc = {
      id: Date.now(),
      title: newTitle,
      desc: "Dokumen baru diunggah oleh admin.",
      size: "1.0 MB",
      type: "PDF",
      version: "v1.0",
      updatedAt: new Date().toISOString()
    };
    setTemplates([newDoc, ...templates]);
    setNewTitle("");
    setIsAddModalOpen(false);
    toast.success("Dokumen berhasil diunggah!");
  };

  const handleDelete = (id: number) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast.success("Dokumen berhasil dihapus.");
  };

  return (
    <div className="max-w-[1400px] w-full mx-auto space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Manajemen File & Panduan</h1>
          <p className="text-neutral-500">Kelola dan unduh buku panduan serta format dokumen.</p>
        </div>
        
        {isAdmin && (
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger render={
              <Button className="bg-primary-600 hover:bg-primary-700">
                <Plus className="w-4 h-4 mr-2" />
                Unggah Dokumen
              </Button>
            } />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Unggah Dokumen Baru</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Nama Dokumen</Label>
                  <Input 
                    id="title"
                    placeholder="Contoh: Pedoman Penelitian 2026"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">File Dokumen</Label>
                  <Input id="file" type="file" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Batal</Button>
                <Button onClick={handleUpload}>Unggah</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((tpl) => (
          <Card key={tpl.id}>
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
              <div className="flex flex-col items-center gap-2 shrink-0">
                <Button size="icon" variant="ghost" className="text-primary-600 hover:text-primary-800 hover:bg-primary-50">
                  <Download className="w-5 h-5" />
                </Button>
                {isAdmin && (
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-danger hover:text-danger-700 hover:bg-danger/10 h-8 w-8"
                    onClick={() => handleDelete(tpl.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
