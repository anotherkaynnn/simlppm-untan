"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { PanduanGrid } from "@/components/landing/PanduanGrid";
import { mockLandingData } from "@/mock/data/landing";

const TEMPLATES = [
  { id: 1, name: "Template Proposal Penelitian Dosen Pemula (PDP)", format: "DOCX", size: "1.2 MB" },
  { id: 2, name: "Format Laporan Akhir Pengabdian", format: "DOCX", size: "850 KB" },
  { id: 3, name: "Standar Biaya Masukan (SBM) & Format Anggaran", format: "XLSX", size: "2.1 MB" },
  { id: 4, name: "Surat Pernyataan Ketua Peneliti", format: "PDF", size: "450 KB" }
];

const FAQS = [
  {
    question: "Bagaimana cara mereset kata sandi akun SIMLPPM saya?",
    answer: "Kata sandi akun SIMLPPM terintegrasi dengan SSO Universitas. Anda dapat melakukan reset password melalui portal utama akademik atau menghubungi unit TIK Universitas."
  },
  {
    question: "Apa syarat utama mengajukan proposal skim PDP?",
    answer: "Ketua pengusul harus memiliki NIDN, jabatan fungsional maksimal Asisten Ahli, dan belum pernah menjadi ketua pada penelitian kompetitif nasional."
  },
  {
    question: "Bagaimana jika file PDF proposal saya melebihi batas 5MB?",
    answer: "Anda dapat mengompres file PDF menggunakan fitur kompresi PDF online atau built-in tool, pastikan gambar yang disisipkan sudah dioptimasi, dan kurangi resolusi scan lampiran dokumen."
  },
  {
    question: "Di mana saya bisa melihat riwayat revisi dari reviewer?",
    answer: "Riwayat revisi dan catatan dari reviewer dapat dilihat pada menu 'Monitoring Aktif'. Klik pada baris proposal Anda yang berstatus DIREVIEW atau DIKEMBALIKAN, lalu klik tombol 'Lihat Catatan Review'."
  }
];

export default function PanduanPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(prev => prev === idx ? null : idx);
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto space-y-10 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Template & Dokumen Panduan</h1>
        <p className="text-neutral-500">Akses seluruh dokumen, template, dan bantuan terkait penggunaan SIMLPPM.</p>
      </div>

      {/* SECTION 1: Guide Cards (Reusing PanduanGrid) */}
      <section>
        <h2 className="text-lg font-bold text-neutral-900 mb-4 border-b pb-2">Buku Panduan Penggunaan</h2>
        <div className="bg-neutral-50/50 p-6 -mx-6 rounded-2xl">
          <PanduanGrid cards={mockLandingData.panduanCards} />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SECTION 2: Template Downloads */}
        <section>
          <Card className="h-full border-neutral-200">
            <CardHeader className="border-b border-neutral-100 bg-neutral-50/50 pb-4">
              <CardTitle className="text-lg">Unduh Template Berkas</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-neutral-100">
                {TEMPLATES.map(doc => (
                  <li key={doc.id} className="p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-neutral-900 line-clamp-1" title={doc.name}>
                          {doc.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500">
                          <span className="font-semibold">{doc.format}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="icon" className="shrink-0 rounded-full text-primary-600 hover:text-white hover:bg-primary-600 ml-2">
                      <Download className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* SECTION 3: FAQ Accordion */}
        <section>
          <Card className="h-full border-neutral-200">
            <CardHeader className="border-b border-neutral-100 bg-neutral-50/50 pb-4">
              <CardTitle className="text-lg">Frequently Asked Questions (FAQ)</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="border border-neutral-200 rounded-lg overflow-hidden transition-all duration-300">
                      <button 
                        onClick={() => toggleFaq(idx)}
                        className={`w-full text-left px-4 py-3 flex items-center justify-between font-medium text-sm transition-colors ${
                          isOpen ? "bg-primary-50 text-primary-700" : "bg-white text-neutral-800 hover:bg-neutral-50"
                        }`}
                      >
                        <span className="pr-4">{faq.question}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 shrink-0 text-primary-500" /> : <ChevronDown className="w-4 h-4 shrink-0 text-neutral-400" />}
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="p-4 text-sm text-neutral-600 bg-white border-t border-neutral-100 leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
