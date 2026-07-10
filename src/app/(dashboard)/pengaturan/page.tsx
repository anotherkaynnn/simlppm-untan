"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Bell, Shield, Smartphone, Globe, Lock, Laptop } from "lucide-react";

export default function PengaturanPage() {
  const [activeTab, setActiveTab] = useState("notifikasi");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pengaturan berhasil disimpan");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "notifikasi":
        return (
          <form onSubmit={handleSave} className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-lg font-bold text-neutral-900 mb-6 border-b border-neutral-100 pb-2">Preferensi Notifikasi</h2>
            <div className="space-y-4">
              <div className="flex items-start justify-between p-4 border border-neutral-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-neutral-900 text-sm">Email Notifikasi</h3>
                  <p className="text-xs text-neutral-500 mt-1">Terima pembaruan tentang status proposal melalui email.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-start justify-between p-4 border border-neutral-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-neutral-900 text-sm">Pemberitahuan Sistem (In-App)</h3>
                  <p className="text-xs text-neutral-500 mt-1">Munculkan *pop-up* notifikasi di dalam aplikasi.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-start justify-between p-4 border border-neutral-200 rounded-lg opacity-60">
                <div>
                  <h3 className="font-semibold text-neutral-900 text-sm">Notifikasi WhatsApp</h3>
                  <p className="text-xs text-neutral-500 mt-1">Fitur ini sedang dalam pengembangan.</p>
                </div>
                <label className="relative inline-flex items-center cursor-not-allowed">
                  <input type="checkbox" value="" className="sr-only peer" disabled />
                  <div className="w-11 h-6 bg-neutral-200 rounded-full peer peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" className="bg-primary-600 hover:bg-primary-700 px-8 text-white">
                Simpan Perubahan
              </Button>
            </div>
          </form>
        );
      case "keamanan":
        return (
          <form onSubmit={handleSave} className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-lg font-bold text-neutral-900 mb-6 border-b border-neutral-100 pb-2">Keamanan & Privasi</h2>
            <div className="space-y-4">
              <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50">
                <h3 className="font-semibold text-neutral-900 text-sm flex items-center">
                  <Lock className="w-4 h-4 mr-2" /> Autentikasi Sistem SSO
                </h3>
                <p className="text-xs text-neutral-500 mt-2">
                  Kata sandi Anda dikelola oleh Sistem Single Sign-On (SSO) universitas. Untuk mengubah kata sandi, silakan kunjungi portal SSO utama.
                </p>
                <Button type="button" variant="outline" className="mt-4 bg-white">Buka Portal SSO</Button>
              </div>

              <div className="flex items-start justify-between p-4 border border-neutral-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-neutral-900 text-sm">Autentikasi Dua Faktor (2FA)</h3>
                  <p className="text-xs text-neutral-500 mt-1">Amankan akun Anda dengan verifikasi dua langkah.</p>
                </div>
                <Button type="button" variant="outline" className="bg-white">Aktifkan 2FA</Button>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button type="submit" className="bg-primary-600 hover:bg-primary-700 px-8 text-white">
                Simpan Perubahan
              </Button>
            </div>
          </form>
        );
      case "bahasa":
        return (
          <form onSubmit={handleSave} className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-lg font-bold text-neutral-900 mb-6 border-b border-neutral-100 pb-2">Bahasa & Lokalisasi</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-900">Bahasa Antarmuka</label>
                <select className="w-full p-2 border border-neutral-200 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 outline-none">
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English (US)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-900">Zona Waktu</label>
                <select className="w-full p-2 border border-neutral-200 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 outline-none">
                  <option value="WIB">Waktu Indonesia Barat (WIB)</option>
                  <option value="WITA">Waktu Indonesia Tengah (WITA)</option>
                  <option value="WIT">Waktu Indonesia Timur (WIT)</option>
                </select>
              </div>
            </div>
            <div className="pt-4 flex justify-end">
              <Button type="submit" className="bg-primary-600 hover:bg-primary-700 px-8 text-white">
                Simpan Perubahan
              </Button>
            </div>
          </form>
        );
      case "perangkat":
        return (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-lg font-bold text-neutral-900 mb-6 border-b border-neutral-100 pb-2">Perangkat Terhubung</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-primary-200 bg-primary-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Laptop className="w-6 h-6 text-primary-600" />
                  <div>
                    <h3 className="font-semibold text-neutral-900 text-sm">Windows PC - Chrome (Saat ini)</h3>
                    <p className="text-xs text-neutral-500 mt-1">Pontianak, Indonesia • Sedang Aktif</p>
                  </div>
                </div>
                <div className="text-xs font-bold text-primary-600 bg-primary-100 px-2 py-1 rounded">Aktif</div>
              </div>

              <div className="flex items-center justify-between p-4 border border-neutral-200 bg-white rounded-lg">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-6 h-6 text-neutral-400" />
                  <div>
                    <h3 className="font-semibold text-neutral-900 text-sm">iPhone 14 - Safari</h3>
                    <p className="text-xs text-neutral-500 mt-1">Pontianak, Indonesia • Terakhir aktif 2 hari lalu</p>
                  </div>
                </div>
                <Button type="button" variant="ghost" size="sm" className="text-danger hover:text-danger-700 hover:bg-danger-50">Keluar</Button>
              </div>
            </div>
            
            <div className="pt-4">
              <Button type="button" variant="outline" className="w-full text-danger border-danger hover:bg-danger hover:text-white">
                Keluar dari Semua Perangkat Lain
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto space-y-6 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Pengaturan Akun & Sistem</h1>
        <p className="text-neutral-500">Sesuaikan preferensi notifikasi, keamanan, dan tampilan antarmuka.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="md:flex min-h-[500px]">
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 bg-neutral-50 border-r border-neutral-200 p-4 space-y-1">
            <button 
              onClick={() => setActiveTab("notifikasi")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-colors ${activeTab === "notifikasi" ? "bg-primary-50 text-primary-700" : "text-neutral-600 hover:bg-neutral-100"}`}
            >
              <Bell className="w-4 h-4" /> Notifikasi
            </button>
            <button 
              onClick={() => setActiveTab("keamanan")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-colors ${activeTab === "keamanan" ? "bg-primary-50 text-primary-700" : "text-neutral-600 hover:bg-neutral-100"}`}
            >
              <Shield className="w-4 h-4" /> Keamanan & Privasi
            </button>
            <button 
              onClick={() => setActiveTab("bahasa")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-colors ${activeTab === "bahasa" ? "bg-primary-50 text-primary-700" : "text-neutral-600 hover:bg-neutral-100"}`}
            >
              <Globe className="w-4 h-4" /> Bahasa & Lokalisasi
            </button>
            <button 
              onClick={() => setActiveTab("perangkat")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-colors ${activeTab === "perangkat" ? "bg-primary-50 text-primary-700" : "text-neutral-600 hover:bg-neutral-100"}`}
            >
              <Smartphone className="w-4 h-4" /> Perangkat Terhubung
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 md:p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
