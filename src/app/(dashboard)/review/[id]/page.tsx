"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function ReviewDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const isReadOnly = id === "PROP-2026-068";

  const [score, setScore] = useState<number | "">(isReadOnly ? 85 : "");
  const [comment, setComment] = useState(isReadOnly ? "Proposal ini disusun dengan sangat baik. Metodologi yang diajukan jelas, relevan dengan permasalahan, dan sangat aplikatif. Anggaran juga sudah sangat rasional dan wajar. Sangat direkomendasikan untuk didanai tanpa revisi mayor." : "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!score || score < 0 || score > 100) {
      toast.error("Nilai harus berada di antara 0 hingga 100.");
      return;
    }
    if (comment.length < 20) {
      toast.error("Komentar minimal 20 karakter untuk justifikasi penilaian.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulasi API call
    setTimeout(() => {
      toast.success("Penilaian berhasil disimpan!");
      setIsSubmitting(false);
      router.push("/review");
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-6rem)] -m-6 flex flex-col md:flex-row overflow-hidden bg-neutral-50">
      {/* Kolom Kiri: PDF Viewer */}
      <div className="w-full md:w-7/12 lg:w-2/3 flex flex-col border-r border-neutral-200 bg-white">
        {/* Header Kiri */}
        <div className="h-16 px-4 border-b border-neutral-200 flex items-center justify-between shrink-0 bg-white shadow-sm z-10">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.push("/review")} className="text-neutral-500 hover:text-neutral-900">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary-600" />
                <span className="font-semibold text-neutral-900 truncate max-w-[200px] sm:max-w-md">
                  Dokumen_Proposal_{id}.pdf
                </span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex" onClick={() => toast.success("Mendownload dokumen...")}>
            <Download className="w-4 h-4 mr-2" />
            Unduh PDF
          </Button>
          <Button variant="outline" size="icon" className="sm:hidden" onClick={() => toast.success("Mendownload dokumen...")}>
            <Download className="w-4 h-4" />
          </Button>
        </div>

        {/* Area PDF Mockup */}
        <div className="flex-1 bg-neutral-200/50 p-4 sm:p-8 overflow-y-auto flex items-start justify-center">
          {/* Halaman Kertas Simulasi */}
          <div className="w-full max-w-3xl bg-white min-h-[800px] shadow-lg border border-neutral-200 rounded p-8 sm:p-12 mb-8">
            <div className="space-y-6">
              <div className="text-center mb-12">
                <h1 className="text-2xl font-bold uppercase mb-4">PROPOSAL PENELITIAN</h1>
                <p className="text-lg font-semibold">{id}</p>
                <div className="h-1 w-24 bg-primary-600 mx-auto mt-6"></div>
              </div>
              
              <div className="space-y-4 text-neutral-800">
                <div className="h-4 bg-neutral-100 rounded w-full"></div>
                <div className="h-4 bg-neutral-100 rounded w-full"></div>
                <div className="h-4 bg-neutral-100 rounded w-11/12"></div>
                <div className="h-4 bg-neutral-100 rounded w-full"></div>
                <div className="h-4 bg-neutral-100 rounded w-4/5"></div>
              </div>

              <div className="mt-12 space-y-4 text-neutral-800">
                <h3 className="font-bold">BAB I PENDAHULUAN</h3>
                <div className="h-4 bg-neutral-100 rounded w-full"></div>
                <div className="h-4 bg-neutral-100 rounded w-11/12"></div>
                <div className="h-4 bg-neutral-100 rounded w-full"></div>
                <div className="h-4 bg-neutral-100 rounded w-10/12"></div>
                <div className="h-4 bg-neutral-100 rounded w-full"></div>
              </div>
              
              <div className="flex items-center justify-center h-40 text-neutral-400 mt-12 border-2 border-dashed border-neutral-200 rounded">
                Simulasi Penampil PDF. Dalam implementasi nyata, iframe PDF atau PDF.js dirender di sini.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kolom Kanan: Panel Penilaian */}
      <div className="w-full md:w-5/12 lg:w-1/3 flex flex-col bg-white overflow-y-auto">
        <div className="h-16 px-6 border-b border-neutral-200 flex items-center shrink-0 sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <h2 className="font-bold text-lg text-neutral-900">Form Penilaian</h2>
        </div>

        <div className="p-6">
          <div className="mb-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
            <h3 className="font-semibold text-primary-900 mb-2">Panduan Penilaian</h3>
            <ul className="text-sm text-primary-800 space-y-1 list-disc pl-4">
              <li>Nilai rentang 0-100</li>
              <li>Minimal nilai kelulusan adalah 70</li>
              <li>Berikan komentar konstruktif terkait metodologi dan luaran.</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-900 flex items-center justify-between">
                Skor Akhir (0-100) <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <Input 
                  type="number" 
                  min="0" 
                  max="100" 
                  placeholder="Contoh: 85" 
                  value={score}
                  onChange={(e) => setScore(e.target.value === "" ? "" : Number(e.target.value))}
                  className="pl-4 text-lg font-semibold h-12"
                  required
                  disabled={isReadOnly}
                />
              </div>
              {score !== "" && (score < 0 || score > 100) && (
                <p className="text-xs text-danger flex items-center mt-1">
                  <AlertCircle className="w-3 h-3 mr-1" /> Nilai tidak valid.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-900">
                Komentar / Catatan Review <span className="text-danger">*</span>
              </label>
              <Textarea 
                placeholder="Tuliskan justifikasi penilaian Anda di sini secara detail..." 
                className="min-h-[250px] resize-y"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                disabled={isReadOnly}
              />
              <p className="text-xs text-neutral-500 flex justify-between">
                <span>Minimal 20 karakter.</span>
                <span className={comment.length > 0 && comment.length < 20 ? "text-danger font-medium" : ""}>
                  {comment.length} karakter
                </span>
              </p>
            </div>

            <div className="pt-6 border-t border-neutral-100">
              {isReadOnly ? (
                <div className="p-4 rounded-lg bg-success/10 border border-success/20 text-center text-success flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  <p className="text-sm font-semibold">Penilaian Telah Disimpan</p>
                </div>
              ) : (
                <Button 
                  type="submit" 
                  className="w-full bg-primary-600 hover:bg-primary-700 h-12 text-base shadow-sm"
                  disabled={isSubmitting || (score !== "" && (score < 0 || score > 100))}
                >
                  {isSubmitting ? "Menyimpan..." : (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Simpan Penilaian
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
