import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function LandingFooter() {
  return (
    <footer className="bg-[#0b0f19] text-neutral-400 py-16 border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 relative flex items-center justify-center shrink-0 bg-white/10 rounded-xl p-2 backdrop-blur-sm border border-white/5">
                <Image src="/img/Lambang_Universitas_Tanjungpura.png" alt="Logo UNTAN" fill className="object-contain p-1" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">SIMLPPM</h2>
            </div>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed mb-6">
              Sistem Informasi Manajemen Lembaga Penelitian dan Pengabdian kepada Masyarakat &mdash; Universitas Tanjungpura.
            </p>
            <div className="flex items-center gap-4">
              {/* Social placeholders if needed */}
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                <span className="text-white text-xs font-bold">X</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                <span className="text-white text-xs font-bold">in</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Tautan Cepat</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="/" className="text-neutral-400 hover:text-accent-400 transition-colors">Beranda</Link></li>
              <li><Link href="#modul" className="text-neutral-400 hover:text-accent-400 transition-colors">Modul Sistem</Link></li>
              <li><Link href="#statistik" className="text-neutral-400 hover:text-accent-400 transition-colors">Statistik</Link></li>
              <li><Link href="#panduan" className="text-neutral-400 hover:text-accent-400 transition-colors">Panduan & Bantuan</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Tautan Eksternal</h3>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <a href="https://untan.ac.id" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-accent-400 transition-colors">
                  Universitas Tanjungpura
                </a>
              </li>
              <li>
                <a href="https://lppm.untan.ac.id" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-accent-400 transition-colors">
                  Website LPPM
                </a>
              </li>
              <li>
                <a href="https://satu.untan.ac.id" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-accent-400 transition-colors">
                  SSO SATU UNTAN
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-medium">
          <p>&copy; {new Date().getFullYear()} LPPM Universitas Tanjungpura. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
