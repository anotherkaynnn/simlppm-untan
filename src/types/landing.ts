export interface ModulCard {
  title: string;
  icon: string;        // nama ikon Lucide
  description: string;
  features: string[];
}

export interface InstitutionalStat {
  value: string;       // "1.018", "9", "99", "Rp 96,35 M"
  label: string;
  detail: string;
}

export interface DipaFacultyRow {
  no: number;
  facultyName: string;
  penelitian: number;
  pkm: number;
  total: number;
}

export interface PanduanCard {
  label: string;
  icon: string;
  description: string;
  linkUrl: string;
  linkLabel: string;
  version?: string;
  uploadDate?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;      // "Pengumuman", "Kegiatan", "Prestasi"
  thumbnailUrl?: string;
  publishedAt: string;    // ISO date
}

export interface AgendaItem {
  id: string;
  title: string;
  date: string;          // ISO date
  location?: string;
  time?: string;
}

export interface LandingPageContent {
  hero: {
    badge: string;
    heading: string;
    subheading: string;
    description: string;
    ctaLabel: string;
    ctaSubtext: string;
  };
  modulCards: ModulCard[];
  stats: InstitutionalStat[];
  dipaData: {
    year: number;
    title: string;
    rows: DipaFacultyRow[];
  };
  panduanCards: PanduanCard[];
  news: NewsItem[];
  agendas: AgendaItem[];
  lppmInfo: {
    description: string;
    missions: string[];
    websiteUrl: string;
  };
  contact: {
    address: string;
    email: string;
    phone: string;
    hours: string;
  };
}
