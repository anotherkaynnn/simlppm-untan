import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Hammer } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-neutral-200 max-w-lg w-full text-center space-y-6">
        <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-2">
          <Hammer className="w-10 h-10 text-primary-600" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">Sedang Dalam Pengembangan</h1>
          <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
            Halaman atau fitur yang Anda tuju saat ini belum tersedia, salah alamat, atau masih dalam tahap pengembangan aktif oleh tim.
          </p>
        </div>

        <div className="pt-4">
          <Link href="/dashboard">
            <Button className="bg-primary-600 hover:bg-primary-700 w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
