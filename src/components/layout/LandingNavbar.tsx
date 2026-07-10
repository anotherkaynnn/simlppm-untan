"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

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
          <Link href="/login">
            <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-full px-6 font-bold shadow-lg shadow-primary-600/25 transition-all hover:scale-105 active:scale-95">
              Masuk / Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
