"use client";

import { useAuthStore } from "@/store/authStore";
import { usePathname } from "next/navigation";
import { Menu, Bell, Search, User, LogOut, Settings, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function AppHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { user } = useAuthStore();
  const pathname = usePathname();

  return (
    <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-4 lg:px-8 z-30 sticky top-0">
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-neutral-600 hover:bg-neutral-100 rounded-lg focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden md:flex items-center ml-4 text-sm text-neutral-500 font-medium">
          {(() => {
            const paths = pathname.split('/').filter(Boolean);
            if (paths.length === 0 || (paths.length === 1 && paths[0] === 'dashboard')) {
              return <span className="text-neutral-900 font-semibold">Dashboard</span>;
            }
            
            const breadcrumbMap: Record<string, string> = {
              "baru": "Ajukan Proposal Baru",
              "draft": "Draft Proposal",
              "riwayat": "Riwayat Proposal Saya",
              "template": "Template & Dokumen Pendukung",
              "data": "Rekapitulasi Fakultas",
              "dosen": "Data Dosen",
              "reviewer": "Penetapan Reviewer",
              "berkas": "Berkas Kontrak",
              "ekspor": "Export Hub",
              "skim": "Kelola Skim",
              "prodi": "Kelola Prodi",
              "users": "Kelola Pengguna",
              "review": "Daftar Review",
              "verifikasi": "Verifikasi Kelengkapan",
              "monitoring": "Monitoring",
              "pelaporan": "Pelaporan",
              "statistik": "Statistik",
              "audit-log": "Audit Log",
              "panduan": "Panduan & File"
            };
            
            return (
              <>
                <Link href="/dashboard" className="text-neutral-500 hover:text-primary-600 transition-colors">
                  Dashboard
                </Link>
                {paths.map((path, index) => {
                  if (path === 'dashboard') return null;
                  
                  const href = `/${paths.slice(0, index + 1).join('/')}`;
                  const isLast = index === paths.length - 1;
                  const label = breadcrumbMap[path] || path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');

                  return (
                    <div key={path} className="flex items-center">
                      <ChevronRight className="w-4 h-4 mx-1 text-neutral-400" />
                      {isLast ? (
                        <span className="text-neutral-900 font-semibold">{label}</span>
                      ) : (
                        <Link href={href} className="text-neutral-500 hover:text-primary-600 transition-colors">
                          {label}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </>
            );
          })()}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="relative p-2 text-neutral-500 hover:bg-neutral-100 rounded-full transition-colors focus:outline-none">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full ring-2 ring-white"></span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="px-3 py-2 text-sm font-semibold text-neutral-900">Notifikasi Terbaru</div>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                <span className="font-semibold text-sm">Status Usulan Diperbarui</span>
                <span className="text-xs text-neutral-500 mt-1">Usulan Anda "Pengembangan Model..." telah direview.</span>
                <span className="text-[10px] text-neutral-400 mt-2">10 menit yang lalu</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                <span className="font-semibold text-sm">Pengumuman LPPM</span>
                <span className="text-xs text-neutral-500 mt-1">Batas akhir unggah laporan kemajuan diperpanjang.</span>
                <span className="text-[10px] text-neutral-400 mt-2">2 hari yang lalu</span>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center text-primary-600 font-medium cursor-pointer">
              Lihat Semua Notifikasi
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 pl-4 border-l border-neutral-200 cursor-pointer hover:opacity-80 transition-opacity outline-none">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-neutral-900 leading-tight">
                {user?.name || "Pengguna"}
              </p>
              <p className="text-xs text-neutral-500">
                {user?.role.replace('_', ' ')}
              </p>
            </div>
            <Avatar className="h-9 w-9 border border-neutral-200">
              <AvatarFallback className="bg-primary-50 text-primary-700 font-bold">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-2">
            <div className="px-3 py-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-neutral-900">{user?.name}</p>
                <p className="text-xs leading-none text-neutral-500 mt-1">{user?.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <Link href="/profil">
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profil Saya</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/pengaturan">
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Pengaturan</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-danger focus:text-danger focus:bg-danger/10" onClick={() => {
              // Note: Normally we'd use logout() from useAuthStore, but AppHeader doesn't have it extracted
              window.location.href = "/login";
            }}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Keluar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
