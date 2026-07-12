"use client";

import { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

interface RubrikReviewProps {
  proposalId: string;
  readOnly?: boolean;
}

const KRITERIA = [
  { id: "kualitas", label: "Kualitas dan Relevansi" },
  { id: "orisinalitas", label: "Orisinalitas dan Kebaruan" },
  { id: "metodologi", label: "Metodologi" },
  { id: "kelayakan", label: "Kelayakan Biaya dan Waktu" },
  { id: "luaran", label: "Target Luaran" },
];

export function RubrikReview({ proposalId, readOnly = false }: RubrikReviewProps) {
  const { user } = useAuthStore();
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

  const totalSkor = Object.values(scores).reduce((a, b) => a + b, 0);

  const handleSave = () => {
    if (Object.keys(scores).length < KRITERIA.length) {
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
      savedAt: new Date().toISOString()
    };

    localStorage.setItem("simlppm-reviews", JSON.stringify(parsed));
    setSavedAt(parsed[proposalId].savedAt);
    toast.success("Penilaian berhasil disimpan");
  };

  return (
    <div className="space-y-6">
      <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
        <div className="bg-neutral-50 px-4 py-3 border-b border-neutral-200 flex justify-between items-center">
          <h3 className="font-semibold text-neutral-900">Rubrik Penilaian</h3>
          {savedAt && (
            <span className="text-xs text-neutral-500">
              Disimpan: {new Date(savedAt).toLocaleString("id-ID")}
            </span>
          )}
        </div>
        <div className="p-4 space-y-6">
          {KRITERIA.map((kriteria) => (
            <div key={kriteria.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-4 last:border-0 last:pb-0">
              <div className="flex-1">
                <Label className="text-base font-medium">{kriteria.label}</Label>
              </div>
              <div className="w-full md:w-auto">
                <RadioGroup 
                  className="flex gap-4" 
                  value={scores[kriteria.id]?.toString()}
                  onValueChange={(val) => setScores(prev => ({ ...prev, [kriteria.id]: parseInt(val) }))}
                  disabled={readOnly}
                >
                  {[1, 2, 3, 4, 5].map((score) => (
                    <div key={score} className="flex items-center space-x-2">
                      <RadioGroupItem value={score.toString()} id={`${kriteria.id}-${score}`} />
                      <Label htmlFor={`${kriteria.id}-${score}`} className={readOnly ? "opacity-70" : "cursor-pointer"}>{score}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          ))}
          
          <div className="flex justify-between items-center pt-4 border-t border-neutral-200">
            <span className="font-semibold text-neutral-700">Total Skor</span>
            <span className="text-2xl font-bold text-primary-600">{totalSkor} / 25</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label>Catatan Reviewer</Label>
          <Textarea 
            placeholder="Tambahkan catatan atau masukan untuk pengusul..." 
            className="min-h-[120px]"
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            disabled={readOnly}
          />
        </div>
        
        <div className="space-y-3">
          <Label>Rekomendasi</Label>
          {readOnly ? (
            <div className="pt-2">
              <Badge 
                variant={
                  rekomendasi === "Diterima" ? "success" : 
                  rekomendasi === "Revisi" ? "warning" : 
                  rekomendasi === "Ditolak" ? "destructive" : "default"
                }
              >
                {rekomendasi || "Belum ada rekomendasi"}
              </Badge>
            </div>
          ) : (
            <Select value={rekomendasi} onValueChange={setRekomendasi} disabled={readOnly}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih rekomendasi..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Diterima">Diterima</SelectItem>
                <SelectItem value="Revisi">Revisi</SelectItem>
                <SelectItem value="Ditolak">Ditolak</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {!readOnly && (
        <div className="flex justify-end pt-4">
          <Button onClick={handleSave}>Simpan Penilaian</Button>
        </div>
      )}
    </div>
  );
}
