/* eslint-disable */
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { 
  LayoutDashboard, 
  FileText, 
  CheckCircle, 
  BarChart3, 
  Users, 
  Settings, 
  FileSpreadsheet, 
  LogOut,
  ChevronDown,
  ChevronUp,
  Menu,
  ChevronLeft,
  ChevronRight,
  Folder,
  ClipboardList,
  Database,
  LifeBuoy
} from "lucide-react";
import { UserRole } from "@/types";
import { useState } from "react";

// Konfigurasi Menu per Role
export type MenuItem = {
  title: string;
  href?: string;
  icon: any;
  badge?: string;  // Opsional badge label, misal "Ditunjuk"
  subItems?: { title: string; href: string }[];
};

export const MENU_CONFIG: Record<UserRole, MenuItem[]> = {
  DOSEN: [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { 
      title: "Pengajuan", 
      icon: FileText, 
      subItems: [
        { title: "Ajukan Proposal Baru", href: "/pengajuan/baru" },
        { title: "Draft Proposal", href: "/pengajuan/draft" },
        { title: "Riwayat Proposal Saya", href: "/pengajuan/riwayat" },
      ]
    },
    { title: "Monitoring", href: "/monitoring", icon: CheckCircle },
    { 
      title: "Pelaporan", 
      icon: FileSpreadsheet,
      subItems: [
        { title: "Laporan Kemajuan & Akhir", href: "/pelaporan" },
        { title: "Luaran HKI Terdaftar", href: "/pelaporan/hki" }
      ]
    },
    { 
      title: "Panduan & File", 
      icon: FileText, 
      subItems: [
        { title: "Template & Dokumen Pendukung", href: "/panduan/template" }
      ]
    },
  ],
  REVIEWER: [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Daftar Review", href: "/review", icon: FileText },
  ],
  OPERATOR_FK: [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Data Pengajuan", href: "/operator/pengajuan", icon: FileText },
    { title: "Manajemen File", href: "/operator/dokumen", icon: Folder },
    { title: "LAP Dosen", href: "/operator/laporan", icon: FileSpreadsheet },
  ],
  ADMIN_FK: [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Data Pengajuan", href: "/admin-fakultas/data-pengajuan", icon: FileText },
    { title: "Manajemen File", href: "/admin-fakultas/manajemen-file", icon: Folder },
    { 
      title: "Data Referensi", 
      icon: Settings, 
      subItems: [
        { title: "Bidang Ilmu", href: "/admin-fakultas/referensi/bidang-ilmu" },
        { title: "Program Studi", href: "/admin-fakultas/referensi/prodi" }
      ]
    },
  ],
  KETUA_LPPM: [
    { title: "Dashboard Eksekutif", href: "/dashboard", icon: LayoutDashboard },
    { title: "Statistik Institusi", href: "/statistik", icon: BarChart3 },
    { title: "Monitoring Proposal", href: "/monitoring", icon: FileText },
    { title: "Export Hub", href: "/manajemen/ekspor", icon: FileSpreadsheet },
  ],
  ADMIN_SISTEM: [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { 
      title: "Manajemen Pengguna", 
      icon: Users,
      subItems: [
        { title: "Data Dosen", href: "/konfigurasi/users?role=dosen" },
        { title: "Admin & Operator", href: "/konfigurasi/users?role=admin" },
        { title: "Penetapan Reviewer", href: "/manajemen/reviewer" }
      ]
    },
    { 
      title: "Data Referensi", 
      icon: Database,
      subItems: [
        { title: "Skim Penelitian & PKM", href: "/konfigurasi/skim" },
        { title: "Fakultas & Prodi", href: "/konfigurasi/prodi" },
        { title: "Bidang Ilmu", href: "/admin-fakultas/referensi/bidang-ilmu" }
      ]
    },
    { 
      title: "Manajemen Usulan", 
      icon: FileText,
      subItems: [
        { title: "Data Proposal", href: "/monitoring" },
        { title: "Laporan Akhir & SK", href: "/pelaporan" }
      ]
    },
    { 
      title: "Utilitas Sistem", 
      icon: Settings,
      subItems: [
        { title: "Manajemen File", href: "/panduan/template" },
        { title: "Export Hub", href: "/manajemen/ekspor" },
        { title: "Helpdesk / Tiket", href: "/helpdesk" },
        { title: "Audit Log", href: "/audit-log" }
      ]
    }
  ]
};

export function AppSidebar({ 
  isOpen, 
  setIsOpen,
  isMinimized = false,
  setIsMinimized = () => {}
}: { 
  isOpen: boolean; 
  setIsOpen: (val: boolean) => void;
  isMinimized?: boolean;
  setIsMinimized?: (val: boolean) => void;
}) {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => ({ ...prev, [title]: !prev[title] }));
  };
  
  if (!user) return null;

  const menuItems = [
    ...(MENU_CONFIG[user.role] || []),
    // Jika dosen ditunjuk sebagai reviewer, tambahkan menu Review P2M
    ...(user.role === "DOSEN" && user.isReviewer ? [
      { title: "Review P2M", href: "/review", icon: ClipboardList, badge: "Ditunjuk" } as MenuItem
    ] : [])
  ];

  return (
    <>
      {/* Overlay untuk mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-neutral-900/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen bg-sidebar z-50 flex flex-col shrink-0
        transition-all duration-300 ease-in-out border-r border-neutral-800
        ${isMinimized ? 'w-20' : 'w-64'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className={`h-16 flex items-center border-b border-neutral-800 shrink-0 relative ${isMinimized ? 'justify-center px-0' : 'justify-between px-6'}`}>
          <div className="flex items-center">
            <div className={`w-8 h-8 relative flex items-center justify-center shrink-0 ${isMinimized ? '' : 'mr-3'}`}>
              <Image src="/img/Lambang_Universitas_Tanjungpura.png" alt="Logo UNTAN" fill className="object-contain" />
            </div>
            {!isMinimized && <span className="text-white font-bold text-lg tracking-wide">SIMLPPM</span>}
          </div>
          
          {/* Toggle Button for Desktop */}
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className={`hidden lg:flex items-center justify-center w-6 h-6 rounded-md bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors ${isMinimized ? 'absolute -right-3 top-5 rounded-full border border-neutral-700 shadow-md bg-sidebar z-10' : ''}`}
          >
            {isMinimized ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 scrollbar-thin scrollbar-thumb-neutral-700">
          <div className={`mb-6 ${isMinimized ? 'text-center' : 'px-3'}`}>
            <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              {isMinimized ? "Menu" : "Menu Utama"}
            </p>
          </div>

          {menuItems.map((item) => {
            if (item.subItems) {
              const isMenuOpen = openMenus[item.title];
              const isAnySubActive = item.subItems.some(sub => pathname === sub.href || pathname.startsWith(`${sub.href}/`));
              
              return (
                <div key={item.title} className="space-y-1">
                  <button
                    onClick={() => {
                      if (isMinimized) {
                        setIsMinimized(false);
                      }
                      toggleMenu(item.title);
                    }}
                    title={isMinimized ? item.title : undefined}
                    className={`
                      w-full flex items-center justify-between py-2.5 rounded-lg text-sm font-medium transition-colors
                      ${isMinimized ? 'px-0 justify-center' : 'px-3'}
                      ${isAnySubActive 
                        ? 'text-white' 
                        : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}
                    `}
                  >
                    <div className="flex items-center">
                      <item.icon className={`w-5 h-5 ${isMinimized ? '' : 'mr-3'} ${isAnySubActive ? 'text-primary-400' : 'text-neutral-500'}`} />
                      {!isMinimized && <span>{item.title}</span>}
                    </div>
                    {!isMinimized && (
                      isMenuOpen ? <ChevronUp className="w-4 h-4 text-neutral-500" /> : <ChevronDown className="w-4 h-4 text-neutral-500" />
                    )}
                  </button>
                  
                  {isMenuOpen && !isMinimized && (
                    <div className="pl-11 space-y-1 mt-1">
                      {item.subItems.map((subItem) => {
                        const isSubActive = pathname === subItem.href || pathname.startsWith(`${subItem.href}/`);
                        return (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setIsOpen(false)}
                            className={`
                              block py-2 text-sm transition-colors rounded-lg px-3
                              ${isSubActive 
                                ? 'bg-primary-600/10 text-primary-400 font-medium' 
                                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}
                            `}
                          >
                            {subItem.title}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = item.href && (pathname === item.href || pathname.startsWith(`${item.href}/`));
            return (
              <Link 
                key={item.href || item.title} 
                href={item.href || "#"}
                onClick={() => setIsOpen(false)}
                title={isMinimized ? item.title : undefined}
                className={`
                  flex items-center py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isMinimized ? 'justify-center px-0' : 'px-3'}
                  ${isActive 
                    ? 'bg-primary-600/10 text-primary-400' 
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}
                `}
              >
                <item.icon className={`w-5 h-5 ${isMinimized ? '' : 'mr-3'} ${isActive ? 'text-primary-500' : 'text-neutral-500'}`} />
                {!isMinimized && (
                  <span className="flex-1 flex items-center gap-2">
                    {item.title}
                    {item.badge && (
                      <span className="ml-auto text-[9px] font-bold uppercase bg-warning/20 text-warning border border-warning/30 rounded px-1.5 py-0.5 leading-tight">
                        {item.badge}
                      </span>
                    )}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

      </aside>
    </>
  );
}
