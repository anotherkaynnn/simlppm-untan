import { LandingPageContent } from "@/types/landing";
import { Mail, MapPin, Phone, Clock, ExternalLink } from "lucide-react";

interface LppmInfoSectionProps {
  info: LandingPageContent['lppmInfo'];
  contact: LandingPageContent['contact'];
}

export function LppmInfoSection({ info, contact }: LppmInfoSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
      {/* Kolom Kiri: Tentang LPPM */}
      <div>
        <h2 className="text-3xl font-bold text-neutral-900 mb-6">Tentang LPPM</h2>
        <p className="text-neutral-600 mb-6 leading-relaxed">
          {info.description}
        </p>
        <div className="mb-8">
          <h3 className="font-semibold text-neutral-900 mb-4">Misi Utama:</h3>
          <ul className="space-y-3">
            {info.missions.map((mission, idx) => (
              <li key={idx} className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2 mr-3 shrink-0"></div>
                <span className="text-neutral-600 text-sm leading-relaxed">{mission}</span>
              </li>
            ))}
          </ul>
        </div>
        <a 
          href={info.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 hover:underline"
        >
          Kunjungi Website Resmi LPPM
          <ExternalLink className="ml-2 w-4 h-4" />
        </a>
      </div>

      {/* Kolom Kanan: Kontak */}
      <div className="bg-white rounded-[2rem] p-10 border border-neutral-100 shadow-xl shadow-primary-500/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl opacity-50 -z-10"></div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-8">Hubungi Kami</h3>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 shrink-0 mr-5 shadow-sm border border-primary-100/50">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 mb-1">Alamat</h4>
              <p className="text-sm text-neutral-600 leading-relaxed max-w-xs">{contact.address}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 shrink-0 mr-5 shadow-sm border border-primary-100/50">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 mb-1">Email</h4>
              <a href={`mailto:${contact.email}`} className="text-sm text-primary-600 hover:underline">{contact.email}</a>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 shrink-0 mr-5 shadow-sm border border-primary-100/50">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 mb-1">Telepon</h4>
              <p className="text-sm text-neutral-600">{contact.phone}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 shrink-0 mr-5 shadow-sm border border-primary-100/50">
              <Clock className="w-5 h-5" />
            </div>
            <div className="mt-1">
              <h4 className="text-sm font-bold text-neutral-900 mb-1">Jam Operasional</h4>
              <p className="text-sm text-neutral-500 font-medium">{contact.hours}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
