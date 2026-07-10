import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LandingPageContent } from "@/types/landing";
import { ArrowRight, LogIn } from "lucide-react";

export function HeroSection({ data }: { data: LandingPageContent['hero'] }) {
  return (
    <div className="relative overflow-hidden bg-white pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] max-w-[1600px] mx-auto overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary-200/50 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
        <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-accent-200/50 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-6xl w-full mx-auto px-4 relative z-10 text-center">

        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-neutral-900 tracking-tight leading-[1.1] mb-6">
          {data.heading} <br className="hidden md:block" />
          <span className="text-primary-600">{data.subheading}</span>
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          {data.description}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login">
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base font-bold rounded-full bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:scale-105 active:scale-95 text-white">
              <LogIn className="mr-2 h-5 w-5" />
              {data.ctaLabel}
            </Button>
          </Link>
          <Link href="#modul">
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base font-bold rounded-full border-neutral-200 hover:bg-neutral-50 text-neutral-700 hover:text-primary-600 transition-all hover:border-primary-200">
              Pelajari Lebih Lanjut
            </Button>
          </Link>
        </div>
        <p className="mt-6 text-sm font-medium text-neutral-400">{data.ctaSubtext}</p>
      </div>
    </div>
  );
}
