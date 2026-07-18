/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Printer, Save } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

interface Kriteria {
  id: string;
  no: number;
  label: string;
  subKriteria: string[];
  bobot: number; // dalam persen
}

interface RubrikReviewProps {
  proposalId: string;
  tipe?: "PENELITIAN" | "PENGABDIAN";
  readOnly?: boolean;
}

// Rubrik Penelitian
const KRITERIA_PENELITIAN: Kriteria[] = [
  {
    id: "pendahuluan",
    no: 1,
    label: "PENDAHULUAN",
    subKriteria: ["Latar Belakang & Perumusan Masalah", "Urgensi dan Relevansi Penelitian"],
    bobot: 20,
  },
  {
    id: "tinjauan",
    no: 2,
    label: "TINJAUAN PUSTAKA",
    subKriteria: ["Kajian Teori yang Relevan", "State of the Art & Kebaruan"],
    bobot: 15,
  },
  {
    id: "metodologi",
    no: 3,
    label: "METODOLOGI PENELITIAN",
    subKriteria: [
      "Ketepatan Metode yang Digunakan",
      "Kesesuaian Desain Penelitian",
      "Rencana Pengolahan dan Analisis Data",
    ],
    bobot: 35,
  },
  {
    id: "rab",
    no: 4,
    label: "KEWAJARAN ANGGARAN (RAB)",
    subKriteria: ["Kewajaran Biaya Penelitian", "Kesesuaian Anggaran dengan Kegiatan"],
    bobot: 10,
  },
  {
    id: "luaran",
    no: 5,
    label: "TARGET LUARAN",
    subKriteria: ["Relevansi dan Kualitas Luaran", "Keberlanjutan Penelitian"],
    bobot: 20,
  },
];

// Rubrik Pengabdian kepada Masyarakat (PKM)
const KRITERIA_PENGABDIAN: Kriteria[] = [
  {
    id: "pendahuluan",
    no: 1,
    label: "PENDAHULUAN",
    subKriteria: ["Analisis Situasi", "Permasalahan Mitra"],
    bobot: 25,
  },
  {
    id: "solusi",
    no: 2,
    label: "SOLUSI DAN TARGET LUARAN",
    subKriteria: ["Solusi Yang Ditawarkan", "Target Luaran"],
    bobot: 25,
  },
  {
    id: "metodologi",
    no: 3,
    label: "METODOLOGI PENGABDIAN MASYARAKAT",
    subKriteria: [
      "Kesesuaian Rancangan dengan Masalah Pengabdian Masyarakat",
      "Ketepatan Instrumen Pengabdian Masyarakat",
    ],
    bobot: 25,
  },
  {
    id: "kelayakan",
    no: 4,
    label: "KELAYAKAN PENGABDIAN MASYARAKAT",
    subKriteria: [
      "Kewajaran Biaya Pengabdian Masyarakat",
      "Kewajaran Jadwal Pengabdian Masyarakat",
    ],
    bobot: 25,
  },
];

const SKOR_INDIKATOR = [
  { range: "0 – 20", label: "Buruk" },
  { range: "21 – 40", label: "Sangat Kurang" },
  { range: "41 – 59", label: "Kurang" },
  { range: "60 – 80", label: "Baik" },
  { range: "81 – 100", label: "Sangat Baik" },
];

export function RubrikReview({ proposalId, tipe = "PENELITIAN", readOnly = false }: RubrikReviewProps) {
  const { user } = useAuthStore();
  const kriteria = tipe === "PENGABDIAN" ? KRITERIA_PENGABDIAN : KRITERIA_PENELITIAN;

  const [scores, setScores] = useState<Record<string, number>>({});
  const [catatan, setCatatan] = useState("");
  const [rekomendasi, setRekomendasi] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("simlppm-reviews");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      const data = parsed[proposalId];
      if (data) {
        setScores(data.scores || {});
        setCatatan(data.catatan || "");
        setRekomendasi(data.rekomendasi || "");
        setSavedAt(data.savedAt || null);
      }
    }
  }, [proposalId]);

  const totalNilai = kriteria.reduce((sum, k) => {
    const skor = scores[k.id] || 0;
    return sum + (k.bobot / 100) * skor;
  }, 0);

  const handleScoreChange = (id: string, val: string) => {
    const num = Math.min(100, Math.max(0, parseInt(val) || 0));
    setScores((prev) => ({ ...prev, [id]: num }));
  };

  const handleSave = () => {
    const filled = kriteria.every((k) => scores[k.id] !== undefined);
    if (!filled) {
      toast.error("Harap isi semua kriteria penilaian");
      return;
    }
    if (!rekomendasi) {
      toast.error("Harap pilih rekomendasi");
      return;
    }

    const savedData = localStorage.getItem("simlppm-reviews") || "{}";
    const parsed = JSON.parse(savedData);
    parsed[proposalId] = {
      scores,
      catatan,
      rekomendasi,
      reviewerId: user?.id,
      savedAt: new Date().toISOString(),
    };

    localStorage.setItem("simlppm-reviews", JSON.stringify(parsed));
    setSavedAt(parsed[proposalId].savedAt);
    toast.success("Penilaian berhasil disimpan");
  };

  const handlePrint = () => {
    toast("Fitur cetak akan membuka dialog print browser.", { duration: 3000 });
    window.print();
  };

  return (
    <div className="space-y-4 text-sm">

      {/* Header info reviewer */}
      {user && (
        <div className="text-xs text-neutral-500 space-y-0.5">
          <p><span className="font-semibold">Nama Reviewer:</span> {user.name}</p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            {savedAt ? (
              <span className="text-success font-semibold">SUDAH DINILAI</span>
            ) : (
              <span className="text-warning font-semibold">BELUM DINILAI</span>
            )}
          </p>
          {savedAt && (
            <p><span className="font-semibold">Catatan:</span> Tersimpan {new Date(savedAt).toLocaleString("id-ID")}</p>
          )}
        </div>
      )}

      {/* Indikator Penilaian Skor */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3">
        <p className="text-xs font-semibold text-neutral-700 mb-2">Indikator Penilaian Skor</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {SKOR_INDIKATOR.map((ind) => (
            <span key={ind.range} className="text-xs text-neutral-600">
              <span className="font-semibold">{ind.range}</span> — {ind.label}
            </span>
          ))}
        </div>
      </div>

      {/* Tabel Rubrik */}
      <div className="border border-neutral-200 rounded-lg overflow-x-auto min-w-0 w-full">
        <table className="w-full text-xs min-w-[600px]">
          <thead>
            <tr className="bg-neutral-100 text-neutral-700">
              <th className="text-center py-2 px-2 font-semibold border-r border-neutral-200 w-8">NO.</th>
              <th className="text-left py-2 px-3 font-semibold border-r border-neutral-200">KRITERIA PENILAIAN</th>
              <th className="text-center py-2 px-2 font-semibold border-r border-neutral-200 w-16">BOBOT (%)</th>
              <th className="text-center py-2 px-2 font-semibold border-r border-neutral-200 w-20">SKOR (0–100)</th>
              <th className="text-center py-2 px-2 font-semibold w-20">NILAI<br /><span className="font-normal text-neutral-500">(BOBOT×SKOR)/100</span></th>
            </tr>
          </thead>
          <tbody>
            {kriteria.map((k, idx) => (
              <tr key={k.id} className={`border-t border-neutral-200 ${idx % 2 === 1 ? "bg-neutral-50/40" : "bg-white"}`}>
                <td className="text-center py-3 px-2 border-r border-neutral-200 font-medium align-top">
                  {k.no}.
                </td>
                <td className="py-3 px-3 border-r border-neutral-200 align-top">
                  <p className="font-semibold text-neutral-900 mb-1">{k.label}</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    {k.subKriteria.map((sub) => (
                      <li key={sub} className="text-neutral-600">{sub}</li>
                    ))}
                  </ul>
                </td>
                <td className="text-center py-3 px-2 border-r border-neutral-200 align-middle font-medium">
                  {k.bobot}
                </td>
                <td className="text-center py-3 px-2 border-r border-neutral-200 align-middle">
                  {readOnly ? (
                    <span className="font-semibold">{scores[k.id] ?? 0}</span>
                  ) : (
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={scores[k.id] ?? ""}
                      onChange={(e) => handleScoreChange(k.id, e.target.value)}
                      className="h-8 text-center w-16 mx-auto text-sm"
                      placeholder="0"
                    />
                  )}
                </td>
                <td className="text-center py-3 px-2 align-middle font-semibold text-primary-700">
                  {((k.bobot / 100) * (scores[k.id] || 0)).toFixed(1)}
                </td>
              </tr>
            ))}
            {/* Baris JUMLAH */}
            <tr className="border-t-2 border-neutral-300 bg-neutral-100 font-bold">
              <td colSpan={2} className="py-2.5 px-3 text-right border-r border-neutral-200">JUMLAH</td>
              <td className="text-center py-2.5 px-2 border-r border-neutral-200">100</td>
              <td className="text-center py-2.5 px-2 border-r border-neutral-200">—</td>
              <td className="text-center py-2.5 px-2 text-primary-700 text-base">
                {totalNilai.toFixed(1)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Catatan & Rekomendasi */}
      <div className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-700">Catatan / Komentar Review</label>
          <Textarea
            placeholder="Berikan catatan konstruktif terkait metodologi, luaran, dan aspek lainnya..."
            className="min-h-[80px] text-sm"
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            disabled={readOnly}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-700">Rekomendasi</label>
          {readOnly ? (
            <Badge
              variant={
                rekomendasi === "Setuju / Diterima" ? "success" :
                rekomendasi === "Revisi" ? "warning" :
                rekomendasi === "Tidak Setuju / Ditolak" ? "destructive" : "default"
              }
            >
              {rekomendasi || "Belum ada rekomendasi"}
            </Badge>
          ) : (
            <Select value={rekomendasi} onValueChange={(val) => setRekomendasi(val)} disabled={readOnly}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Pilih rekomendasi..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Setuju / Diterima">Setuju / Diterima</SelectItem>
                <SelectItem value="Revisi">Revisi Minor / Mayor</SelectItem>
                <SelectItem value="Tidak Setuju / Ditolak">Tidak Setuju / Ditolak</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {!readOnly && (
        <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
            <Printer className="w-4 h-4" />
            Cetak Review Ini
          </Button>
          <Button size="sm" onClick={handleSave} className="bg-primary-600 hover:bg-primary-700 text-white gap-2">
            <Save className="w-4 h-4" />
            Simpan Penilaian
          </Button>
        </div>
      )}
    </div>
  );
}
