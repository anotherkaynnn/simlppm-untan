import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { LandingFooter } from "@/components/layout/LandingFooter";
import { HeroSection } from "@/components/landing/HeroSection";
import { ModulCardGrid } from "@/components/landing/ModulCardGrid";
import { StatGrid } from "@/components/landing/StatGrid";
import { InteractiveDipaChart } from "@/components/landing/InteractiveDipaChart";
import { PanduanGrid } from "@/components/landing/PanduanGrid";
import { NewsGrid } from "@/components/landing/NewsGrid";
import { AgendaList } from "@/components/landing/AgendaList";
import { LppmInfoSection } from "@/components/landing/LppmInfoSection";
import { mockLandingData } from "@/mock/data/landing";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-page flex flex-col font-sans">
      <LandingNavbar />
      
      <main className="flex-1">
        <HeroSection data={mockLandingData.hero} />
        
        <section id="modul" className="py-20 bg-white">
          <div className="max-w-[1600px] w-full mx-auto px-4 lg:px-8 xl:px-12 2xl:px-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Modul SIMLPPM</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto">Sistem informasi ini terdiri dari empat modul utama yang saling terintegrasi untuk mendukung kegiatan Tridharma Perguruan Tinggi.</p>
            </div>
            <ModulCardGrid cards={mockLandingData.modulCards} />
          </div>
        </section>

        <section id="statistik" className="py-20 bg-slate-50/50 border-y border-neutral-100">
          <div className="max-w-[1600px] w-full mx-auto px-4 lg:px-8 xl:px-12 2xl:px-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Statistik Institusional</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto">Ringkasan data penelitian dan pengabdian kepada masyarakat di Universitas Tanjungpura.</p>
            </div>
            <StatGrid stats={mockLandingData.stats} />
            <div className="mt-16">
              <InteractiveDipaChart data={mockLandingData.dipaData} />
            </div>
          </div>
        </section>

        <section id="informasi" className="py-20 bg-white">
          <div className="max-w-[1600px] w-full mx-auto px-4 lg:px-8 xl:px-12 2xl:px-16">
            <NewsGrid news={mockLandingData.news} />
            
            <div className="max-w-3xl mx-auto mt-20 bg-white rounded-[2rem] p-8 md:p-12 border border-neutral-100 shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl opacity-50 -z-10"></div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-8 flex items-center justify-center relative z-10">
                <span className="w-1.5 h-6 bg-accent-500 mr-3 rounded-full"></span>
                Agenda Mendatang
              </h3>
              <div className="relative z-10">
                <AgendaList agendas={mockLandingData.agendas} />
              </div>
            </div>
          </div>
        </section>

        <section id="panduan" className="py-20 bg-slate-50/50 border-t border-neutral-100">
          <div className="max-w-[1600px] w-full mx-auto px-4 lg:px-8 xl:px-12 2xl:px-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Panduan & Bantuan</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto">Dokumen panduan penggunaan SIMLPPM berdasarkan peran.</p>
            </div>
            <PanduanGrid cards={mockLandingData.panduanCards} />
          </div>
        </section>

        <section id="kontak" className="py-20 bg-white">
          <div className="max-w-[1600px] w-full mx-auto px-4 lg:px-8 xl:px-12 2xl:px-16">
            <LppmInfoSection info={mockLandingData.lppmInfo} contact={mockLandingData.contact} />
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
