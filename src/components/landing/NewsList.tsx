import { NewsItem } from "@/types/landing";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ArrowRight, Newspaper } from "lucide-react";
import Link from "next/link";

export function NewsList({ news }: { news: NewsItem[] }) {
  if (!news || news.length === 0) {
    return (
      <div className="bg-neutral-50 rounded-xl p-8 text-center border border-dashed border-neutral-200">
        <Newspaper className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
        <p className="text-neutral-500">Belum ada berita terkini.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {news.map((item) => (
        <div key={item.id} className="group bg-white border border-neutral-200 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-1 bg-accent-100 text-accent-700 text-xs font-semibold rounded-full">
                  {item.category}
                </span>
                <span className="text-xs text-neutral-500">
                  {format(new Date(item.publishedAt), "dd MMMM yyyy", { locale: id })}
                </span>
              </div>
              <h4 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                <Link href={`#news-${item.id}`} className="focus:outline-none">
                  {item.title}
                  <span className="absolute inset-0" aria-hidden="true" />
                </Link>
              </h4>
              <p className="text-sm text-neutral-600 line-clamp-2">
                {item.excerpt}
              </p>
            </div>
          </div>
        </div>
      ))}
      
      <div className="text-center pt-2">
        <Link href="#semua-berita" className="inline-flex items-center text-sm font-semibold text-primary-600 hover:text-primary-700">
          Lihat Semua Berita
          <ArrowRight className="ml-1.5 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
