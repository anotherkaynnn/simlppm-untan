"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Search, Plus, Save, Trash2, Edit } from "lucide-react";

export default function StyleGuidePage() {
  return (
    <div className="max-w-[1200px] w-full mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Design System & Component Library</h1>
        <p className="text-neutral-500">Kumpulan komponen UI standar (Reusable Components) yang digunakan di seluruh halaman SIMLPPM.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Palet Warna (Color Palette)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-lg bg-primary-600 shadow-sm"></div>
              <div>
                <p className="font-semibold text-neutral-900">Primary 600</p>
                <p className="text-sm text-neutral-500">Warna Aksi Utama (Biru LPPM)</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-lg bg-danger-600 shadow-sm"></div>
              <div>
                <p className="font-semibold text-neutral-900">Danger 600</p>
                <p className="text-sm text-neutral-500">Warna Destruktif (Hapus/Tolak)</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-lg bg-success-600 shadow-sm"></div>
              <div>
                <p className="font-semibold text-neutral-900">Success 600</p>
                <p className="text-sm text-neutral-500">Warna Konfirmasi (Disetujui/Sukses)</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-lg bg-neutral-900 shadow-sm"></div>
              <div>
                <p className="font-semibold text-neutral-900">Neutral 900</p>
                <p className="text-sm text-neutral-500">Teks Utama & Heading</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle>Tipografi (Typography)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">Heading 1 (3xl, Bold)</h1>
              <p className="text-xs text-neutral-400 mt-1">Digunakan untuk Judul Halaman Utama</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900">Heading 2 (xl, Bold)</h2>
              <p className="text-xs text-neutral-400 mt-1">Digunakan untuk Judul Seksi/Card</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900">Heading 3 (sm, Semibold)</h3>
              <p className="text-xs text-neutral-400 mt-1">Digunakan untuk Label Field Formulir</p>
            </div>
            <div>
              <p className="text-sm text-neutral-600">Body Text (sm, Regular)</p>
              <p className="text-xs text-neutral-400 mt-1">Digunakan untuk Teks Paragraf dan Deskripsi Umum</p>
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Tombol (Buttons)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-4 items-center">
              <Button>Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="sm">Small Size</Button>
              <Button size="default">Default Size</Button>
              <Button size="lg">Large Size</Button>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <Button><Save className="w-4 h-4 mr-2" /> Dengan Ikon</Button>
              <Button variant="outline" size="icon"><Edit className="w-4 h-4" /></Button>
              <Button variant="destructive" size="icon"><Trash2 className="w-4 h-4" /></Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Elements */}
        <Card>
          <CardHeader>
            <CardTitle>Elemen Formulir (Form Fields)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-900">Field Input Biasa <span className="text-danger-500">*</span></label>
              <Input placeholder="Ketik sesuatu di sini..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-900">Input dengan Pencarian</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <Input placeholder="Cari data..." className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-900">Input Validasi Error</label>
              <Input defaultValue="Isian salah" className="border-danger-500 focus-visible:ring-danger-500" />
              <p className="text-xs text-danger-600 mt-1">Pesan error muncul di sini (Inline Validation)</p>
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Indikator Status (Badges)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <StatusBadge status="DRAFT" />
              <StatusBadge status="DIAJUKAN" />
              <StatusBadge status="DIREVIEW" />
              <StatusBadge status="REVISI" />
              <StatusBadge status="DITOLAK" />
              <StatusBadge status="SELESAI" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
