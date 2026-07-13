/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { isRouteAllowed } from "@/config/roles";
import { AlertOctagon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, _hasHydrated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && _hasHydrated && !isAuthenticated) {
      router.replace("/");
    }
  }, [isMounted, _hasHydrated, isAuthenticated, router]);

  if (!isMounted || !_hasHydrated) return null; // Wait for hydration to complete
  if (!isAuthenticated) return null;

  return (
    <TooltipProvider delay={200}>
      <div className="min-h-screen bg-sidebar flex">
        {/* Sidebar (Responsive) */}
        <AppSidebar 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
          isMinimized={isSidebarMinimized}
          setIsMinimized={setIsSidebarMinimized}
        />

        {/* Main Content Wrapper */}
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 bg-bg-page">
          {/* Header (Sticky) */}
          <AppHeader onMenuClick={() => setIsSidebarOpen(true)} />

          {/* Page Content */}
          <main className="flex-1 p-4 lg:p-8">
            <div className="max-w-[1600px] mx-auto w-full">
              {!isRouteAllowed(user?.role, pathname) ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                  <div className="bg-danger-50 p-4 rounded-full mb-4">
                    <AlertOctagon className="w-12 h-12 text-danger-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-neutral-900 mb-2">Akses Ditolak (403)</h1>
                  <p className="text-neutral-600 max-w-md mb-6">
                    Maaf, Anda tidak memiliki izin untuk mengakses halaman ini dengan peran sebagai <span className="font-semibold">{user?.role}</span>.
                  </p>
                  <Link href="/dashboard">
                    <Button variant="default" className="bg-primary-600 hover:bg-primary-700">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Kembali ke Dashboard
                    </Button>
                  </Link>
                </div>
              ) : (
                children
              )}
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
