"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore, MOCK_USERS } from "@/store/authStore";
import { UserRole } from "@/types";
import { X, Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { mockLandingData } from "@/mock/data/landing";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  username: z.string().min(1, { message: "NIP / NIDN / Username wajib diisi" }),
  password: z.string().min(1, { message: "Kata sandi wajib diisi" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isLoadingReset, setIsLoadingReset] = useState(false);
  const [isSSOLoading, setIsSSOLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const uname = data.username.toLowerCase();
        const validRoles = ["operator", "adminfk", "ketua", "admin", "reviewer", "dosen"];
        
        const hasValidRole = validRoles.some(role => uname.includes(role));

        if (!hasValidRole) {
          setError("root", {
            type: "manual",
            message: "Kredensial tidak valid. Silakan periksa kembali NIP/NIDN dan kata sandi Anda."
          });
          resolve();
          return;
        }

        let role: UserRole = "DOSEN";
        if (uname.includes("operator")) role = "OPERATOR_FK";
        else if (uname.includes("adminfk")) role = "ADMIN_FK";
        else if (uname.includes("ketua")) role = "KETUA_LPPM";
        else if (uname.includes("admin")) role = "ADMIN_SISTEM";
        else if (uname.includes("reviewer")) role = "REVIEWER";

        const user = MOCK_USERS[role];
        if (user) {
          login(user);
          toast.success(`Berhasil masuk sebagai ${user.name}`);
          router.push("/dashboard");
        }
        resolve();
      }, 1000);
    });
  };

  const handleSSOLogin = () => {
    setIsSSOLoading(true);
    setTimeout(() => {
      const user = MOCK_USERS["DOSEN"];
      login(user);
      toast.success(`Berhasil masuk via Satu Untan sebagai ${user.name}`);
      router.push("/dashboard");
    }, 1000);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingReset(true);
    setTimeout(() => {
      setIsLoadingReset(false);
      toast.success("Instruksi reset kata sandi telah dikirim ke email Anda.");
      setIsForgotPassword(false);
      setResetEmail("");
    }, 1000);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-bg-page">
      {/* Background yang meniru landing page (dibaurkan) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none filter blur-sm opacity-80">
         <div className="opacity-50"><LandingNavbar /></div>
         <HeroSection data={mockLandingData.hero} />
      </div>
      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md z-10"></div>

      {/* Modal Container */}
      <div className="relative z-20 w-full max-w-[480px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header Modal */}
        <div className="px-8 pt-8 pb-4 relative">
          <Link href="/" className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-600 transition-colors">
            <X className="w-5 h-5" />
          </Link>
          
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 relative">
              <Image src="/img/Lambang_Universitas_Tanjungpura.png" alt="Logo UNTAN" fill className="object-contain" />
            </div>
          </div>
          
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-extrabold text-neutral-900">
              {isForgotPassword ? "Lupa Kata Sandi" : "Portal Masuk Tunggal"}
            </h2>
            {!isForgotPassword && <ShieldCheck className="w-5 h-5 text-primary-600 mt-1" />}
          </div>
          <p className="text-sm text-neutral-500 leading-relaxed">
            {isForgotPassword 
              ? "Masukkan NIP/NIDN atau email Anda. Kami akan mengirimkan tautan untuk mengatur ulang kata sandi." 
              : "Akses aman layanan SIMLPPM Universitas Tanjungpura terintegrasi dengan Google Workspace."}
          </p>
        </div>

        {/* Form Body */}
        <div className="px-8 pb-8">
          {isForgotPassword ? (
            <form onSubmit={handleForgotPassword} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-700">NIP / NIDN / Email</label>
                <Input 
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Masukkan NIP atau email Anda" 
                  className="h-12 bg-white border-neutral-200 focus-visible:ring-primary-500"
                  required
                />
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-[#000080] hover:bg-[#000066] text-white font-bold text-sm tracking-wide shadow-md"
                  isLoading={isLoadingReset}
                >
                  KIRIM INSTRUKSI
                </Button>
                <Button 
                  type="button" 
                  variant="ghost"
                  className="w-full h-12 text-sm font-semibold text-neutral-500 hover:text-neutral-700"
                  onClick={() => setIsForgotPassword(false)}
                  disabled={isLoadingReset}
                >
                  Kembali ke Login
                </Button>
              </div>
            </form>
          ) : (
            <>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full h-12 text-sm font-semibold border-neutral-200 hover:bg-neutral-50 mb-6 flex items-center justify-center gap-3"
                onClick={handleSSOLogin}
                isLoading={isSSOLoading}
              >
            {/* Ikon G sederhana sebagai pengganti Google Logo murni untuk saat ini */}
            {!isSSOLoading && (
              <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            Masuk via Akun Satu Untan
          </Button>

          <div className="relative flex items-center py-2 mb-6">
            <div className="flex-grow border-t border-neutral-100"></div>
            <span className="flex-shrink-0 mx-4 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
              Atau gunakan NIP / NIDN
            </span>
            <div className="flex-grow border-t border-neutral-100"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            
            {errors.root && (
              <div className="p-3 bg-danger-50 border border-danger-200 rounded-lg text-danger-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>{errors.root.message}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-700">NIP / NIDN / Username</label>
              <Input 
                {...register("username")}
                placeholder="Masukkan NIP atau username Anda" 
                className={`h-12 bg-white focus-visible:ring-primary-500 ${errors.username ? 'border-danger-500 ring-1 ring-danger-500' : 'border-neutral-200'}`}
              />
              {errors.username && (
                <p className="text-xs text-danger-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.username.message}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-neutral-700">Kata Sandi</label>
                <button 
                  type="button" 
                  onClick={() => setIsForgotPassword(true)}
                  className="text-xs font-medium text-primary-600 hover:underline focus:outline-none"
                >
                  Lupa password?
                </button>
              </div>
              <div className="relative">
                <Input 
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan kata sandi" 
                  className={`h-12 bg-white pr-10 focus-visible:ring-primary-500 ${errors.password ? 'border-danger-500 ring-1 ring-danger-500' : 'border-neutral-200'}`}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-danger-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Hint for development */}
            <div className="text-[10px] text-neutral-400 italic">
              *Dev note: Ketik &quot;adminfk&quot;, &quot;admin&quot;, &quot;operator&quot;, &quot;ketua&quot;, &quot;dosen&quot; atau &quot;reviewer&quot; pada username untuk simulasi role login yang berbeda.
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 mt-2 bg-[#000080] hover:bg-[#000066] text-white font-bold text-sm tracking-wide shadow-md"
              isLoading={isSubmitting}
            >
              MASUK
            </Button>
          </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
