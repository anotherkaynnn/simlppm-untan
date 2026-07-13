"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "top-0 md:top-4 bg-white/90 backdrop-blur-xl shadow-lg shadow-neutral-200/50 py-3 md:rounded-full border border-neutral-100 max-w-[1600px] w-full mx-auto"
          : "top-0 md:top-6 bg-transparent py-5 max-w-[1600px] w-full mx-auto"
      }`}
    >
      <div className="w-full flex items-center justify-between px-4 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 relative flex items-center justify-center shrink-0">
            <Image src="/img/Lambang_Universitas_Tanjungpura.png" alt="Logo UNTAN" fill className="object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight text-neutral-900">SIMLPPM</h1>
            <p className="text-xs text-neutral-500">Universitas Tanjungpura</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-semibold text-neutral-900 hover:text-primary-600 transition-colors">
            Beranda
          </Link>
          <Link href="#modul" className="text-sm font-semibold text-neutral-600 hover:text-primary-600 transition-colors">
            Modul
          </Link>
          <Link href="#statistik" className="text-sm font-semibold text-neutral-600 hover:text-primary-600 transition-colors">
            Statistik
          </Link>
          <Link href="#informasi" className="text-sm font-semibold text-neutral-600 hover:text-primary-600 transition-colors">
            Informasi
          </Link>
          <Link href="#panduan" className="text-sm font-semibold text-neutral-600 hover:text-primary-600 transition-colors">
            Panduan
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden md:block">
            <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-full px-6 font-bold shadow-lg shadow-primary-600/25 transition-all hover:scale-105 active:scale-95">
              Masuk / Login
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-neutral-100 shadow-lg py-4 px-4 flex flex-col gap-4 rounded-b-2xl mt-2 mx-4">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-neutral-900 hover:text-primary-600">Beranda</Link>
          <Link href="#modul" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-neutral-600 hover:text-primary-600">Modul</Link>
          <Link href="#statistik" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-neutral-600 hover:text-primary-600">Statistik</Link>
          <Link href="#informasi" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-neutral-600 hover:text-primary-600">Informasi</Link>
          <Link href="#panduan" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold text-neutral-600 hover:text-primary-600">Panduan</Link>
          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="mt-2">
            <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white rounded-full font-bold">
              Masuk / Login
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
