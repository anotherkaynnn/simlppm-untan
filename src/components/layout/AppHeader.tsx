"use client";

import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/store/authStore";
import { usePathname, useRouter } from "next/navigation";
import { Bell, ChevronRight, Menu, Settings, User, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { mockNotifications } from "@/mock/data/notifications";
import { toast } from "sonner";

export function AppHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const [notifOpen, setNotifOpen] = useState(false);
  
  const [notifications, setNotifications] = useState(() => {
    return mockNotifications.filter(n => !n.roleTarget || n.roleTarget === user?.role);
  });
  
  const notifRef = useRef<HTMLDivElement>(null);

  // Trigger toast for new review assignments on mount
  useEffect(() => {
    const hasNewReviewAssignment = notifications.some(n => n.roleTarget === "REVIEWER" && !n.isRead);
    if (user?.role === "REVIEWER" && hasNewReviewAssignment) {
      // Small delay to ensure it shows up after the login toast
      const timer = setTimeout(() => {
        toast.info("Pemberitahuan Sistem", {
          description: "Anda mendapat penugasan review proposal baru.",
          duration: 6000,
        });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [user?.role, notifications]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

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
        {/* Custom Notification Dropdown */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 text-neutral-500 hover:bg-neutral-100 rounded-full transition-colors focus:outline-none"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-3 h-3 px-[2px] bg-danger text-[7px] font-bold text-white rounded-full flex items-center justify-center ring-1 ring-white leading-none">
                {unreadCount}
              </span>
            )}
          </button>
          
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-neutral-200 bg-white shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-neutral-100 flex items-center justify-between">
                <span className="font-semibold text-neutral-900">Notifikasi</span>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Tandai semua dibaca
                  </button>
                )}
              </div>
              <ul className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <li 
                      key={notif.id}
                      className={`p-4 border-b border-neutral-50 last:border-0 hover:bg-neutral-50 transition-colors cursor-pointer ${notif.isRead ? 'bg-white' : 'bg-untan-50/50'}`}
                      onClick={() => {
                        setNotifications(notifications.map(n => n.id === notif.id ? { ...n, isRead: true } : n));
                      }}
                    >
                      <h4 className={`text-sm ${notif.isRead ? 'font-medium text-neutral-700' : 'font-semibold text-neutral-900'}`}>
                        {notif.title}
                      </h4>
                      <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                        {notif.body}
                      </p>
                      <span className="text-[10px] text-neutral-400 mt-2 block">
                        {notif.createdAt}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="p-4 text-center text-sm text-neutral-500">
                    Tidak ada notifikasi.
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

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
              logout();
              router.push("/login");
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
