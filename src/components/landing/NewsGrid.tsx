"use client";

import { NewsItem } from "@/types/landing";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Newspaper } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function NewsGrid({ news }: { news: NewsItem[] }) {
  if (!news || news.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-neutral-100 p-6 md:p-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8 border-b border-neutral-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-neutral-100 p-2.5 rounded-lg border border-neutral-200">
            <Newspaper className="w-5 h-5 text-neutral-700" />
          </div>
          <h3 className="text-xl font-extrabold text-neutral-900">Artikel Berita LPPM</h3>
        </div>
        <Link href="#semua-berita" className="text-sm font-semibold text-neutral-600 hover:text-primary-600 transition-colors">
          Lihat Semua
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {news.map((item) => (
          <Link href={`#news-${item.id}`} key={item.id} className="group block">
            <div className="rounded-2xl border border-neutral-200 overflow-hidden mb-5 relative aspect-[16/10] bg-white flex items-center justify-center p-4 transition-shadow shadow-sm group-hover:shadow-md">
              <Image 
                src="/img/news_placeholder.png" 
                alt="News" 
                fill 
                className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h4 className="font-bold text-neutral-900 leading-snug mb-3 group-hover:text-primary-600 transition-colors line-clamp-3 text-sm md:text-[15px]">
              {item.title}
            </h4>
            <span className="text-xs text-neutral-500">
              {format(new Date(item.publishedAt), "dd MMMM yyyy", { locale: id })}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
