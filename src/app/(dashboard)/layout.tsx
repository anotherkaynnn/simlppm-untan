"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Breadcrumb } from "@/components/app/Breadcrumb";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, _hasHydrated } = useAuthStore();
  const router = useRouter();
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
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
