"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useNotificationStore } from "@/store/notificationStore";
import { RubrikReview } from "@/components/app/RubrikReview";

export default function ReviewDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { addNotification } = useNotificationStore();

  const isReadOnly = id === "PROP-2026-068";

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
      <div className="w-full md:w-5/12 lg:w-1/2 flex flex-col bg-white overflow-y-auto border-l border-neutral-200">
        <div className="h-16 px-6 border-b border-neutral-200 flex items-center justify-between shrink-0 sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <h2 className="font-bold text-lg text-neutral-900">Penilaian Proposal</h2>
          <Badge variant="outline" className="bg-primary-50 text-primary-700 border-primary-200">PENELITIAN</Badge>
        </div>

        <div className="p-6">
          <RubrikReview proposalId={id} tipe="PENELITIAN" readOnly={isReadOnly} />
        </div>
      </div>
    </div>
  );
}
