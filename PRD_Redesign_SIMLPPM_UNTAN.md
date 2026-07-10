# PRD: Redesign Antarmuka SIMLPPM Universitas Tanjungpura

## Single Page Application (SPA)

---

## 1. Project Overview

### 1.1 Latar Belakang

Sistem Informasi Manajemen Lembaga Penelitian dan Pengabdian kepada Masyarakat (SIMLPPM) Universitas Tanjungpura adalah sistem web yang mengelola empat modul utama: **Pengajuan Proposal**, **Monitoring**, **Pelaporan**, dan **Statistik**. Sistem diluncurkan Oktober 2019, melayani 1.018 dosen dari 99 program studi di 9 fakultas, dengan realisasi anggaran Rp 96,35 miliar (2022). Saat ini antarmuka mengalami masalah usability yang belum pernah dievaluasi secara formal, menghambat produktivitas pengguna.

### 1.2 Tujuan SPA

Membangun antarmuka web SPA baru yang menggantikan SIMLPPM lama (simlppm.untan.ac.id), dengan:

1. **Eliminasi 13 permasalahan usability** yang teridentifikasi melalui inspeksi mandiri dan wawancara 15 responden
2. **Memenuhi 13 kebutuhan pengguna** (5 Must Have, 5 Should Have, 3 Could Have) yang diformulasikan melalui analisis tematik
3. **Mendukung 5 level pengguna** dengan workspace terpisah berbasis role
4. **Mencakup 9 skenario tugas utama** yang mencerminkan alur kerja nyata

### 1.3 Ruang Lingkup

**Termasuk dalam pembangunan:**
- Landing Page publik (informasi sistem, CTA login SSO)
- Modul Pengajuan Proposal (penelitian & pengabdian)
- Modul Monitoring (status tracking & activity log)
- Modul Pelaporan (unggah laporan akhir & luaran HKI)
- Modul Statistik (rekapitulasi per fakultas & ekspor)
- Modul Dashboard (berbeda per role)
- Manajemen Konfigurasi Sistem (admin only)
- Autentikasi SSO SATU UNTAN dengan auto-detection role

**Tidak termasuk:**
- Backend/API development (gunakan mock data / JSON statis)
- Integrasi SIAKAD/BKD nyata
- Offline sync (demarkasi Won't Have)
- Integrasi API DIPA/DRTPM nasional (demarkasi Won't Have)

---

## 2. User Roles & Permissions

### 2.1 Tabel Role

| Role | Kode | Jumlah Pengguna | Workspace |
|------|------|-----------------|-----------|
| Dosen Pengusul | `DOSEN` | ~1.018 | `Workspace Dosen` |
| Reviewer Internal | `REVIEWER` | subset dosen | `Workspace Dosen` + tab Review |
| Operator Fakultas | `OPERATOR_FK` | 1 per fakultas (9 total) | `Workspace Operator` |
| Admin Fakultas (WD I) | `ADMIN_FK` | 1 per fakultas (9 total) | `Workspace Admin FK` |
| Ketua LPPM | `KETUA_LPPM` | 1 | `Workspace Ketua` |
| Administrator SIMLPPM | `ADMIN_SISTEM` | 1 | `Workspace Admin Sistem` |

### 2.2 Matriks Hak Akses per Modul

| Modul / Fitur | DOSEN | REVIEWER | OPERATOR_FK | ADMIN_FK | KETUA_LPPM | ADMIN_SISTEM |
|---------------|-------|----------|-------------|----------|------------|--------------|
| Dashboard | ✅ personal | ✅ personal | ✅ fakultas | ✅ fakultas + grafik | ✅ institusional + grafik eksekutif | ✅ sistem |
| Ajukan Proposal | ✅ | — | — | — | — | — |
| Daftar Proposal Saya | ✅ | — | — | — | — | — |
| Monitoring Proposal | ✅ milik sendiri | ✅ ditugaskan | ✅ fakultas | ✅ fakultas | ✅ semua | ✅ semua |
| Verifikasi Proposal | — | — | ✅ | — | — | — |
| Review Proposal | — | ✅ | — | — | — | — |
| Unggah Laporan | ✅ | — | — | — | — | — |
| Statistik | ✅ personal | ✅ personal | ✅ fakultas + ekspor | ✅ fakultas + ekspor | ✅ institusional | ✅ institusional |
| Manajemen Dosen | — | — | — | ✅ | — | ✅ |
| Konfigurasi Skim | — | — | — | — | — | ✅ |
| Manajemen Prodi | — | — | — | — | — | ✅ |
| Manajemen User & Role | — | — | — | — | — | ✅ |
| Ekspor Data Excel | — | — | ✅ | ✅ | ✅ | ✅ |

---

## 3. Information Architecture (Navigasi)

### 3.1 Pre-Auth Routes (Publik)

Route ini tidak memerlukan autentikasi dan menggunakan layout terpisah (tanpa sidebar).

```
/ (Landing Page)
├── Navbar (Beranda, Statistik, Kontak, Masuk via SSO)
├── Hero Section
│   └── CTA: "Masuk ke SIMLPPM" → redirect SSO
├── Empat Modul Utama (card grid)
├── Berita & Agenda LPPM
│   ├── Kolom Kiri: Artikel Berita Terkini
│   └── Kolom Kanan: Agenda Mendatang
├── Statistik Institusional (id: statistik)
│   ├── Bagian A: 4 Stat Card Ringkasan
│   └── Bagian B: Tabel DIPA per Fakultas
├── Informasi LPPM & Kontak (id: kontak)
├── Panduan & Bantuan
│   └── 4 kartu: Panduan Dosen, Operator, Admin, Data Akun
├── Alur Penggunaan [Sprint 3 — Could Have]
└── Footer
    └── Tautan cepat + eksternal + copyright LPPM
```

### 3.2 Prinsip

- **Landing Page sebagai gerbang utama**: Pengguna yang belum login melihat landing page di `/`. CTA utama mengarah ke SSO SATU UNTAN.
- **Role-Based Workspace**: Setelah login, pengguna langsung masuk ke workspace sesuai rolenya. Tidak ada dropdown pemilihan peran.
- **Modular Navigation**: Sidebar tetap (persistent sidebar) dengan menu yang berubah sesuai role.
- **Penamaan label jelas**: Menghindari istilah ambigu (misalnya "Verifikasi" yang bisa ditafsirkan final — ganti dengan "Verifikasi Kelengkapan Administrasi").

### 3.3 Struktur Navigasi per Role

#### Workspace Dosen (`DOSEN`)
```
Dashboard Dosen
├── Pengajuan
│   ├── Ajukan Proposal Baru
│   ├── Draft Proposal
│   └── Riwayat Proposal
├── Monitoring
│   ├── Proposal Aktif
│   └── Riwayat Status
├── Pelaporan
│   ├── Unggah Laporan Akhir
│   └── Luaran HKI
├── Statistik
│   └── Rekap Personal
└── Panduan
    └── Template & Panduan Pengusulan
```

#### Workspace Operator Fakultas (`OPERATOR_FK`)
```
Dashboard Operator
├── Verifikasi Proposal
│   ├── Daftar Proposal Masuk
│   └── Riwayat Verifikasi
├── Monitoring
│   └── Semua Proposal Fakultas
├── Statistik
│   └── Rekap Fakultas [Nama FK]
└── Ekspor Data
    └── Unduh Rekap Excel
```

#### Workspace Admin Fakultas (`ADMIN_FK`)
```
Dashboard Admin FK
├── Data Dosen
│   └── Daftar Dosen Fakultas
├── Rekap P2M Fakultas
│   ├── Per Skim
│   └── Per Status
├── Statistik
│   └── Rekap Fakultas [Nama FK] (dengan grafik)
├── Audit Trail
│   └── Log Perubahan Status
└── Ekspor Data
    └── Unduh Rekap Excel
```

#### Workspace Ketua LPPM (`KETUA_LPPM`)
```
Dashboard Ketua LPPM
├── Dashboard Analitik
│   ├── Serapan Anggaran per Skim
│   ├── Partisipasi per Fakultas
│   └── KPI Ringkasan
├── Monitoring
│   └── Seluruh Proposal (9 Fakultas)
├── Statistik
│   └── Rekapitulasi Institusional
└── Ekspor Data
    └── Unduh Rekap Excel
```

#### Workspace Admin Sistem (`ADMIN_SISTEM`)
```
Dashboard Admin Sistem
├── Konfigurasi
│   ├── Skim Penelitian & Pengabdian
│   ├── Program Studi
│   └── Pengelolaan User & Role
├── Monitoring
│   └── Seluruh Proposal (All Fakultas)
├── Statistik
│   └── Rekapitulasi Institusional
├── Audit Log Sistem
│   └── Seluruh Perubahan Konfigurasi
└── Ekspor Data
    └── Unduh Rekap Excel
```

---

## 4. Tech Stack

### 4.1 Rekomendasi Stack

```
Framework:     Next.js 14+ (App Router, TypeScript)
Styling:       Tailwind CSS 4
UI Components: shadcn/ui
Icons:         Lucide React
Forms:         React Hook Form + Zod validation
Charts:        Recharts
State:         Zustand (global) + React Context (auth/role)
Tables:        TanStack Table (headless, sortable, filterable)
Export:        xlsx / sheetjs (client-side Excel export)
```

### 4.2 Alasan

- **Next.js App Router**: Mendukung SPA-like navigation dengan file-based routing, SSR/SSG jika diperlukan, dan optimasi otomatis
- **Tailwind + shadcn/ui**: Utility-first styling dengan komponen yang sudah aksesibel (ARIA), konsisten, dan mudah dikustomisasi
- **TanStack Table**: Menangani fitur tabel lanjutan (sorting, filtering, pagination) tanpa scroll horizontal — **mengatasi P3 (tombol aksi tersembunyi di scroll horizontal) dan UR-02 (tabel responsif)**
- **React Hook Form + Zod**: Validasi real-time per field — **mengatasi P2 (window.alert) dan UR-05 (inline validation)**
- **Recharts**: Grafik interaktif untuk dashboard eksekutif — **memenuhi UR-07 (dashboard visual)**
- **SheetJS (xlsx)**: Ekspor Excel client-side — **memenuhi UR-06 (tombol ekspor)**

---

## 5. Authentication System

### 5.1 Alur Login — SSO SATU UNTAN (Mengatasi P1)

**Masalah lama**: Pengguna harus memilih peran manual via dropdown sebelum masukkan kredensial. Jika salah pilih role, error tidak menjelaskan penyebabnya.

**Solusi baru**: SIMLPPM baru menggunakan **SSO (Single Sign-On) SATU UNTAN** (satu.untan.ac.id). Pengguna tidak lagi login di halaman SIMLPPM secara langsung, melainkan melalui gerbang SSO institusional Universitas Tanjungpura yang dikelola oleh SEVIMA.

**Alur SSO (OAuth 2.0 / OIDC)**:

```
1. Pengguna mengakses SIMLPPM baru (misal: simlppm.untan.ac.id)
2. SPA mendeteksi belum ada session → redirect ke SSO SATU UNTAN
   URL: https://satu.untan.ac.id/gate/login?client_id=simlppm&redirect_uri=...
3. Pengguna login di halaman SSO SATU UNTAN:
   - Opsi A: Klik tombol "Masuk dengan Google" (OAuth Google)
   - Opsi B: Input email/NIM/NIP/username + Password → klik "Masuk"
4. SSO memverifikasi kredensial → redirect kembali ke SIMLPPM
   dengan authorization code di URL callback
5. SPA menukar authorization code dengan access token
   (ke SSO token endpoint)
6. SPA mengambil user profile + role dari SSO userinfo endpoint
7. SPA menyimpan session (JWT token + user data) →
   redirect ke workspace sesuai role
```

**Visual Halaman Login SSO (referensi satu.untan.ac.id/gate/login)**:
- Layout dua kolom: gambar kampus UNTAN di kiri, form login di kanan
- Logo "satu UNTAN" di atas form
- Judul: "Masuk dan Verifikasi"
- Subjudul: "Baru! Nikmati kemudahan sistem autentikasi tunggal untuk mengakses semua layanan dengan satu akun."
- Input: "Email/akun pengguna*" (placeholder: "Masukkan email/NIM/NIP/username yang terdaftar")
- Input: "Password*" (placeholder: "Masukkan password")
- Tombol: "Masuk dengan Google" (sekunder, di atas form)
- Tombol: "Masuk" (primer, biru, full-width)
- Link: "Lupa kata sandi?"
- Footer: "Powered By SEVIMA"

**Catatan penting**:
- SIMLPPM **tidak memiliki halaman login sendiri**. Halaman `/login` di SPA hanya berfungsi sebagai redirect handler.
- Seluruh autentikasi ditangani oleh SSO SATU UNTAN. SPA hanya menerima callback dan mengelola session.
- Tidak ada dropdown peran — role di-determine oleh SSO berdasarkan akun pengguna.
- Jika gagal autentikasi di sisi SSO, error ditampilkan oleh halaman SSO. Jika gagal di callback (token invalid, user belum terdaftar di SIMLPPM), tampilkan **inline error** di SPA.

### 5.2 SPA Login Callback Handler

**Route**: `/auth/callback`

Halaman ini tidak memiliki UI. Fungsinya:
1. Membaca `code` dari URL query parameter (dari SSO redirect)
2. Menukar `code` dengan access token (POST ke SSO token endpoint)
3. Mengambil user profile dari SSO userinfo endpoint
4. Mapping data SSO ke model User SIMLPPM (role, fakultas, dll.)
5. Simpan ke Zustand store + cookie
6. Redirect ke `/dashboard` (workspace sesuai role)
7. Jika error di langkah 2-4: redirect ke `/login-error` dengan pesan spesifik

### 5.3 Error Handling Authentication

```
Skenario Error                          → Penanganan di SPA
─────────────────────────────────────────────────────────
SSO login gagal                        → Ditampilkan oleh halaman SSO
Callback code expired/invalid            → /login-error: "Sesi login telah kadaluwarsa. Silakan coba lagi."
User terautentikasi SSO tapi            → /login-error: "Akun Anda belum terdaftar di SIMLPPM.
  belum punya role di SIMLPPM             Hubungi Administrator LPPM."
SSO server down                        → /login-error: "Layanan autentikasi sedang tidak tersedia.
                                        Silakan coba beberapa saat lagi."
```

### 5.4 Halaman Login Error

**Route**: `/login-error`

**Elements**:
- Ikon error (CircleX, besar, berwarna merah)
- Judul: "Gagal Masuk"
- Pesan error spesifik (dari query param `message`)
- Tombol: "Coba Lagi" → redirect ke SSO login
- Tombol: "Kembali ke Beranda" → redirect ke landing page publik
- **Tidak ada window.alert** — semua pesan error ditampilkan inline di halaman ini (P2)

### 5.5 Session & Route Guard

- Simpan SSO access token + refresh token + user role di Zustand store + httpOnly cookie
- Semua route (kecuali `/auth/*` dan `/login-error`) di-guard: jika belum ada session → redirect ke SSO login
- Jika role user tidak memiliki akses ke route tertentu → redirect ke dashboard role yang sesuai + toast peringatan
- Tombol "Keluar" di header: clear session lokal + redirect ke SSO logout endpoint (untuk global logout)
- Implementasi **silent refresh**: sebelum token expired, coba refresh secara background. Jika refresh gagal → force logout.

### 5.6 User Role Resolution

Role SIMLPPM user **tidak disimpan di SSO**. SSO hanya mengautentikasi identitas (NIM/NIP, nama, email). Role mapping dilakukan di sisi SIMLPPM:

```typescript
// Alur role resolution setelah SSO callback berhasil
async function resolveUserRole(ssoProfile: SSOUser): Promise<User> {
  // 1. Cek apakah user terdaftar di database SIMLPPM
  const simlppmUser = await getUserByNIP(ssoProfile.nip);
  if (!simlppmUser) {
    throw new AuthError('Akun belum terdaftar di SIMLPPM');
  }
  // 2. Return user dengan role dari database SIMLPPM
  return simlppmUser; // { ..., role: 'DOSEN' | 'OPERATOR_FK' | dll. }
}
```

Dalam mode **mock/development**, role di-hardcode per akun dummy (lihat Section 11.2).

---

## 6. Layout System

### 6.1 Landing Page Layout (Publik)

Layout untuk halaman `/` (landing page) — **tanpa sidebar, tanpa header dashboard**. Layout berdiri sendiri.

```
┌──────────────────────────────────────────────────────┐
│  NAVBAR (fixed top, transparan → solid on scroll)      │
│  [Logo UNTAN + "SIMLPPM"]              [Masuk via SSO]│
├──────────────────────────────────────────────────────┤
│                                                      │
│  HERO SECTION                                        │
│  ┌────────────────────────────────────────────────┐  │
│  │  LPPM / LPPM                                  │  │
│  │  "Sistem Informasi Manajemen                   │  │
│  │   Lembaga Penelitian dan                        │  │
│  │   Pengabdian kepada Masyarakat"                │  │
│  │  "Universitas Tanjungpura"                     │  │
│  │                                                 │  │
│  │  [Masuk ke SIMLPPM] (CTA primer)                │  │
│  │  "Menggunakan akun SATU UNTAN"                  │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  SECTION: 4 MODUL UTAMA                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────┐ │
│  │ Pengajuan│  │ Monitoring│  │Pelaporan │  │Stat. │ │
│  │ Proposal │  │           │  │          │  │      │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────┘ │
│                                                      │
│  SECTION: STATISTIK INSTITUSIONAL                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────┐ │
│  │ 1.018    │  │ 9        │  │ 99       │  │Rp 96 │ │
│  │ Dosen    │  │ Fakultas │  │ Prodi    │  │ Miliar│ │
│  └──────────┘  └──────────┘  └──────────┘  └──────┘ │
│                                                      │
│  SECTION: INFORMASI LPPM / LPPM                     │
│  ┌────────────────────────────────────────────────┐  │
│  │  Visi & Misi LPPM/LPPM                        │  │
│  │  Kontak, Alamat, Peta lokasi                   │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
├──────────────────────────────────────────────────────┤
│  FOOTER                                              │
│  © 2026 LPPM Universitas Tanjungpura                 │
│  [untan.ac.id]  [satu.untan.ac.id]                   │
└──────────────────────────────────────────────────────┘
```

**Navbar behavior**:
- **Default (top of page)**: background transparan, teks putih (menimpa hero berwarna gelap)
- **On scroll (>64px)**: background berubah putih solid + shadow, teks biru/gelap
- **Kanan navbar**: tombol "Masuk via SSO" (outline putih di hero, solid biru saat scroll)
- **Mobile**: hamburger menu → dropdown menu sederhana

**Section spacing**: setiap section dipisahkan dengan padding vertikal 80px–120px.

### 6.2 Struktur Layout Dashboard

```
┌──────────────────────────────────────────────────────┐
│  HEADER (fixed top)                                   │
│  [Logo SIMLPPM UNTAN]    [Notifikasi 🔔]  [Nama] [▼] │
├──────────┬───────────────────────────────────────────┤
│          │                                            │
│ SIDEBAR  │  MAIN CONTENT AREA                         │
│ (fixed   │  (scrollable)                              │
│  left,   │                                            │
│  240px   │  ┌──────────────────────────────────────┐  │
│  or      │  │  Page Header (judul halaman +       │  │
│  64px    │  │  breadcrumb)                         │  │
│  when    │  ├──────────────────────────────────────┤  │
│  collapsed)│ │                                     │  │
│          │  │  Page Content                        │  │
│  [Menu   │  │                                     │  │
│   items  │  │                                     │  │
│   per    │  │                                     │  │
│   role]  │  │                                     │  │
│          │  │                                     │  │
│          │  │                                     │  │
│          │  └──────────────────────────────────────┘  │
│          │                                            │
├──────────┴───────────────────────────────────────────┤
│  (no footer — maximalkan area konten)                │
└──────────────────────────────────────────────────────┘
```

### 6.3 Responsive Behavior

- **Desktop (≥1024px)**: Sidebar expanded (240px) + content area
- **Tablet (768–1023px)**: Sidebar collapsed (64px, icon-only) + content area
- **Mobile (<768px)**: Sidebar hidden, toggle via hamburger menu (overlay)

### 6.4 Sidebar Spesifikasi

- Logo UNTAN + teks "SIMLPPM" di bagian atas
- Menu items dengan ikon Lucide, label teks, dan badge (jika ada notif)
- Menu aktif: background highlight + left border accent
- Menu grouping dengan separator untuk modul berbeda
- Collapse/expand toggle di bottom sidebar

---

## 7. Design System / Design Tokens

### 7.1 Warna (Color Palette)

Warna institusional Universitas Tanjungpura. Gunakan skema biru-kuning yang profesional.

```css
/* Primary — Biru institusional UNTAN */
--primary-50:  #eff6ff;
--primary-100: #dbeafe;
--primary-200: #bfdbfe;
--primary-300: #93c5fd;
--primary-400: #60a5fa;
--primary-500: #2563eb;   /* warna utama */
--primary-600: #1d4ed8;
--primary-700: #1e40af;
--primary-800: #1e3a8a;
--primary-900: #172554;

/* Accent — Kuning/emas UNTAN */
--accent-400: #facc15;
--accent-500: #eab308;
--accent-600: #ca8a04;

/* Semantic */
--success:  #16a34a;  /* proposal diterima, verifikasi berhasil */
--warning:  #d97706;  /* deadline mendekat, perlu perhatian */
--danger:   #dc2626;  /* proposal ditolak, error */
--info:     #2563eb;  /* informasi netral */

/* Neutral (abu-abu) */
--neutral-50:  #f8fafc;
--neutral-100: #f1f5f9;
--neutral-200: #e2e8f0;
--neutral-300: #cbd5e1;
--neutral-400: #94a3b8;
--neutral-500: #64748b;
--neutral-600: #475569;
--neutral-700: #334155;
--neutral-800: #1e293b;
--neutral-900: #0f172a;

/* Background & Surface */
--bg-page:    #f1f5f9;  /* background utama halaman */
--bg-card:    #ffffff;  /* surface card/table */
--bg-sidebar: #0f172a;  /* sidebar gelap */
--bg-header:  #ffffff;  /* header putih dengan shadow */
```

### 7.2 Tipografi

```css
/* Font family */
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;

/* Scale */
--text-xs:   0.75rem;   /* 12px — caption, badge */
--text-sm:   0.875rem;  /* 14px — body kecil, helper text */
--text-base: 1rem;      /* 16px — body utama */
--text-lg:   1.125rem;  /* 18px — sub-heading */
--text-xl:   1.25rem;   /* 20px — heading 3 */
--text-2xl:  1.5rem;    /* 24px — heading 2 */
--text-3xl:  1.875rem;  /* 30px — heading 1, page title */

/* Weight */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 7.3 Spacing

```
4px   = spacing-1  (icon padding, inline gaps)
8px   = spacing-2  (tight element spacing)
12px  = spacing-3  (form field gaps)
16px  = spacing-4  (card internal padding, section gap)
24px  = spacing-6  (section-to-section gap)
32px  = spacing-8  (page padding)
48px  = spacing-12 (major section separator)
```

### 7.4 Border Radius

```
--radius-sm:   4px   (badges, small buttons)
--radius-md:   6px   (inputs, cards)
--radius-lg:   8px   (modals, dropdown)
--radius-xl:   12px  (large cards, hero sections)
--radius-full: 9999px (avatar, pill badges)
```

### 7.5 Shadow

```
--shadow-sm:   0 1px 2px rgba(0,0,0,0.05)
--shadow-md:   0 4px 6px -1px rgba(0,0,0,0.1)
--shadow-lg:   0 10px 15px -3px rgba(0,0,0,0.1)
```

---

## 8. Shared Components

### 8.1 DataTable (Komponen Utama — UR-02, P3)

**Spesifikasi kritis**: Tabel HARUS responsif, TIDAK BOLEH ada scroll horizontal tersembunyi.

```typescript
interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchable?: boolean;          // global search
  filterable?: boolean;          // column filters
  sortable?: boolean;            // column sorting
  selectable?: boolean;          // checkbox per row (batch actions)
  pagination?: { pageSize: number };
  onSelectionChange?: (ids: string[]) => void;  // untuk batch
  exportable?: boolean;          // tombol ekspor Excel (UR-06)
}
```

**Behavior**:
- Default: text-wrapping pada semua kolom (tidak ada teks terpotong)
- Kolom panjang (judul proposal, abstrak): truncuate setelah 2 baris + "Lihat selengkapnya"
- Kolom aksi: sticky di kolom paling kanan, tidak ikut scroll horizontal
- Jika layar < 1024px: kolom kurang penting collapse ke dalam expandable row
- Filter dan search di atas tabel (bukan di area tersembunyi)
- Jika `selectable=true`: tampilkan checkbox di kolom pertama + bar "X item dipilih" dengan aksi batch

### 8.2 StatusBadge

```typescript
type ProposalStatus =
  | 'draft'         // abu-abu
  | 'diajukan'      // biru
  | 'diverifikasi'  // kuning
  | 'direview'      // ungu
  | 'diterima'      // hijau
  | 'ditolak'       // merah
  | 'revisi'        // oranye
  | 'selesai';      // teal

interface StatusBadgeProps {
  status: ProposalStatus;
  label: string;  // override label default
}
```

### 8.3 InlineValidation (UR-05, P2)

```typescript
// Setiap form field membungkus komponen ini
<FormField>
  <FormLabel>Nomor Permohonan HKI</FormLabel>
  <Input />
  {error && <FormError message={error} />}  {/* muncul di bawah field, bukan alert */}
  <FormHelperText>Format: REG2025000001</FormHelperText>
</FormField>
```

**Rules**:
- Validasi real-time (onBlur atau onChange)
- Error message muncul inline di bawah field yang bermasalah
- Tidak pernah menggunakan `window.alert()`, `alert()`, atau modal error untuk validasi form
- Field error diberi border merah + ikon error

### 8.4 Toast / Notification (menggantikan window.alert)

```typescript
// Untuk notifikasi sukses/kesalahan sistem (bukan validasi form)
toast.success("Proposal berhasil diajukan");
toast.error("Gagal mengunggah berkas. Coba lagi.");
toast.warning("Deadline pengajuan tinggal 3 hari");
```

- Muncul di pojok kanan atas
- Auto-dismiss setelah 5 detik
- Bisa di-dismiss manual

### 8.5 TooltipHelp (UR-10)

```typescript
<TooltipHelp text="Pilih skim yang sesuai dengan tema penelitian Anda. Setiap skim memiliki batas anggaran dan jadwal yang berbeda.">
  <Info className="h-4 w-4 text-neutral-400" />
</TooltipHelp>
```

- Ikon tanda tanya kecil (ⓘ) di samping label field yang kompleks
- Hover/click → muncul tooltip dengan teks bantuan

### 8.6 TimelineStatus (UR-08)

```typescript
interface TimelineStep {
  label: string;        // "Diajukan", "Diverifikasi Operator", "Direview", "Diterima"
  status: 'completed' | 'current' | 'pending';
  date?: string;        // "12 Jun 2026"
  actor?: string;       // "Dr. Ahmad Yani, M.T."
  note?: string;        // catatan opsional
}
```

Visual: horizontal stepper/timeline dengan node berwarna. Step completed = hijau, current = biru (pulse), pending = abu-abu.

### 8.7 ConfirmDialog

```typescript
// Untuk aksi destruktif atau konfirmasi penting
<ConfirmDialog
  title="Verifikasi Proposal?"
  description="Proposal ini akan ditandai sebagai lengkap secara administrasi."
  confirmLabel="Ya, Verifikasi"
  cancelLabel="Batal"
  variant="default"  // | "danger" untuk hapus/tolak
  onConfirm={() => {}}
/>
```

### 8.8 DeadlineBanner (UR-09)

```typescript
interface DeadlineBannerProps {
  title: string;           // "Pengajuan Proposal Penelitian 2026"
  deadline: Date;
  type: 'info' | 'warning' | 'danger';  // berdasarkan sisa hari
}
```

- Tampil di bagian atas Dashboard Dosen
- Warna berubah: info (hijau, >30 hari), warning (kuning, 7-30 hari), danger (merah, <7 hari)
- Tampilkan countdown: "XX hari lagi"

### 8.9 ExportButton (UR-06)

```typescript
<ExportButton
  format="xlsx"
  filename="rekap_proposal_fakultas_teknik_2026"
  data={tableData}
  columns={exportColumns}
/>
```

### 8.10 EmptyState

```typescript
<EmptyState
  icon={FileText}
  title="Belum ada proposal"
  description="Anda belum mengajukan proposal. Klik tombol di bawah untuk memulai."
  action={<Button>Ajukan Proposal Baru</Button>}
/>
```

---

## 9. Page Specifications

### 9.0 Landing Page (Publik)

**Route**: `/`

**Layout**: `LandingLayout` (berdiri sendiri, tanpa sidebar/header dashboard — lihat Section 6.1).

**Purpose**: Halaman publik pertama yang dilihat pengguna sebelum login. Menampilkan informasi SIMLPPM, modul utama, statistik institusional, dan CTA untuk masuk via SSO SATU UNTAN.

---

#### 9.0.1 Navbar Landing

**Position**: Fixed top, z-50.

**Konteks dari sistem lama**: Navigasi sistem lama memiliki menu: Beranda, Statistik, Kontak. Menu ini diwariskan dan diperluas.

**Elements**:
- **Kiri**: Logo UNTAN (versi putih/ikon, 32x32) + teks "SIMLPPM" (font-bold, text-lg)
- **Tengah** (desktop only): Menu navigasi — "Beranda", "Statistik", "Kontak" (smooth scroll ke section di landing page)
- **Kanan**: Tombol "Masuk via SSO" (outline/ghost, berubah jadi solid saat scroll)

**Behavior on scroll** (implementasi via `useEffect` + `scroll` event listener):
- `scrollY === 0` (top): background `transparent`, teks & logo `white`, tombol outline putih
- `scrollY > 64px`: background `white` + `shadow-sm`, teks & logo `primary-800`, tombol solid `primary-500` dengan teks putih
- Transisi: `transition-all duration-300`
- Menu item aktif (berdasarkan scroll position) diberi underline `accent-500`

**Mobile (<768px)**:
- Logo tetap di kiri
- Ikon hamburger (Menu dari Lucide) di kanan, menggantikan menu navigasi + tombol
- Klik hamburger → dropdown menu overlay:
  - Link navigasi: "Beranda", "Statistik", "Kontak"
  - Divider
  - Tombol "Masuk via SSO" (penuh, solid)

---

#### 9.0.2 Hero Section

**Background**: Gradient biru institusional — `bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700`. Bisa ditambah pattern overlay semi-transparan (geometric dots/grid) untuk kedalaman visual.

**Layout**: Centered, max-width 800px, padding vertikal 120px (desktop) / 80px (mobile).

**Elements**:
- **Badge**: "LPPM" — pill kecil, background `accent-500`, teks `primary-900`, font-semibold, uppercase, letter-spacing wide
- **Heading (H1)**: "Sistem Informasi Manajemen Lembaga Penelitian dan Pengabdian kepada Masyarakat" — font-size `text-4xl` (desktop) / `text-2xl` (mobile), font-bold, teks putih, line-height 1.2
- **Subheading**: "Universitas Tanjungpura" — font-size `text-xl`, font-medium, teks `primary-200`
- **Deskripsi singkat** (opsional, 1-2 kalimat): "Mengelola siklus penelitian dan pengabdian kepada masyarakat dari pengajuan proposal hingga pelaporan luaran — dalam satu platform terintegrasi." — teks `primary-100/80`, max-width 600px
- **CTA Primer**: Tombol "Masuk ke SIMLPPM" — besar (padding-x 8, padding-y 3), background `accent-500`, teks `primary-900`, font-semibold, shadow-lg, hover:bg `accent-400`
  - `onClick` → redirect ke `/login` (yang kemudian redirect ke SSO SATU UNTAN)
- **CTA Sub-teks**: "Menggunakan akun SATU UNTAN" — teks `primary-200/70`, font-size `text-sm`, di bawah tombol CTA, ikon `ExternalLink` kecil

**Visual**: Heading + subheading + CTA di tengah, vertikal-aligned. Spacing antar elemen: 16px–24px.

---

#### 9.0.3 Section: Empat Modul Utama

**Background**: `bg-white`.

**Layout**: Section padding 80px–120px vertikal. Container max-width 1200px, centered.

**Section Header**:
- Heading: "Empat Modul Utama" — `text-3xl`, font-bold, `neutral-900`, centered
- Subheading: "Mengelola siklus penelitian dan pengabdian secara menyeluruh" — `text-base`, `neutral-500`, centered, margin-top 8px

**Card Grid**: 4 kolom (desktop), 2 kolom (tablet), 1 kolom (mobile). Gap 24px.

**Setiap card** (`ModulCard`):

```
┌───────────────────────────┐
│  [Icon]                   │  48x48, background primary-50, icon primary-500
│  Judul Modul              │  text-lg, font-semibold, neutral-900
│  Deskripsi singkat        │  text-sm, neutral-500, 2-3 baris
│  ─────────────            │  divider, neutral-100
│  Fitur utama:             │  text-xs, font-medium, neutral-600, uppercase tracking-wide
│  • Fitur 1                │  text-sm, neutral-600, bullet list
│  • Fitur 2                │
│  • Fitur 3                │
└───────────────────────────┘
```

**4 Card**:

| # | Judul | Icon (Lucide) | Deskripsi | Fitur Utama |
|---|-------|---------------|-----------|-------------|
| 1 | **Pengajuan Proposal** | `FilePlus2` | Mengajukan proposal penelitian dan pengabdian kepada masyarakat dengan form terstruktur dan validasi otomatis | • Form multi-step • Auto-complete anggota tim • Unggah berkas administrasi |
| 2 | **Monitoring** | `Activity` | Memantau status proposal secara real-time dari pengajuan hingga keputusan final | • Timeline status • Filter & pencarian • Notifikasi perubahan |
| 3 | **Pelaporan** | `FileCheck` | Mengunggah laporan akhir dan mendokumentasikan luaran penelitian | • Form HKI terstruktur • Luaran publikasi & produk • Bukti luaran |
| 4 | **Statistik** | `BarChart3` | Rekapitulasi data penelitian dan pengabdian per fakultas dengan visualisasi | • Grafik interaktif • Ekspor Excel • Rekap per skim & status |

**Card behavior**:
- Hover: `shadow-lg`, `translateY(-4px)`, transisi `duration-200`
- Border: `1px solid neutral-200`, radius `radius-xl` (12px)
- Padding: 24px (desktop) / 16px (mobile)

---

#### 9.0.3b Section: Berita & Agenda LPPM

**Background**: `bg-white`.

**Konteks dari sistem lama**: Sistem lama menampilkan dua widget di kolom kiri halaman utama: "Artikel Berita LPPM" dan "Agenda LPPM". Di sistem lama, widget ini kosong karena API tidak aktif (P4). Di sistem baru, section ini diwariskan dan akan menggunakan data dinamis dari mock/API.

**Layout**: Section padding 80px. Container max-width 1200px, centered.

**Section Header**:
- Heading: "Berita & Agenda LPPM" — `text-2xl`, font-bold, `neutral-900`, centered
- Subheading: "Informasi terkini dari Lembaga Penelitian dan Pengabdian kepada Masyarakat" — `text-sm`, `neutral-500`, centered

**Layout**: 2 kolom (desktop), stacked (mobile). Gap 32px.

---

**Kolom Kiri — Artikel Berita LPPM**:

**Heading**: "Berita Terkini" — `text-lg`, font-semibold, `neutral-800`, dengan ikon `Newspaper` (Lucide, 20px, `primary-500`)

**Daftar berita** (card list, vertikal):

```
┌─────────────────────────────────────────┐
│  [Gambar thumbnail]  Judul Berita       │
│                      Tanggal • Kategori  │
│                      Excerpt 2 baris...  │
├─────────────────────────────────────────┤
│  [Gambar thumbnail]  Judul Berita       │
│                      Tanggal • Kategori  │
│                      Excerpt 2 baris...  │
├─────────────────────────────────────────┤
│  ... (3-5 item)                         │
└─────────────────────────────────────────┘
```

**Setiap item berita**:
- Layout horizontal: thumbnail kiri (80x60, `radius-md`, object-cover), konten kanan
- **Judul**: `text-sm`, font-semibold, `neutral-800`, max 1 baris (truncuate)
- **Meta**: `text-xs`, `neutral-400` — format "12 Jun 2026 · Pengumuman"
- **Excerpt**: `text-xs`, `neutral-500`, max 2 baris
- Hover: background `neutral-50`, transisi `duration-150`
- Jika tidak ada gambar: ganti thumbnail dengan ikon `ImageOff` di background `neutral-100`

**"Lihat Semua Berita"**: Link di bawah daftar, `text-sm`, font-medium, `primary-500`, align kanan, hover:underline

**State kosong**: Jika belum ada berita → tampilkan `<EmptyState>` dengan ikon `Newspaper`, judul "Belum ada berita", deskripsi "Informasi terkini akan ditampilkan di sini."

---

**Kolom Kanan — Agenda LPPM**:

**Heading**: "Agenda Mendatang" — `text-lg`, font-semibold, `neutral-800`, dengan ikon `CalendarDays` (Lucide, 20px, `primary-500`)

**Daftar agenda** (card list, vertikal):

```
┌─────────────────────────────────────────┐
│  [Tanggal]  Judul Agenda                │
│  12 Jun     "Pengajuan Proposal         │
│  2026       Semester 2 Tahun 2026"      │
│             Lokasi: ...                 │
├─────────────────────────────────────────┤
│  [Tanggal]  Judul Agenda                │
│  20 Jul     "Workshop Penulisan         │
│  2026       Proposal Penelitian"        │
│             Lokasi: ...                 │
├─────────────────────────────────────────┤
│  ... (3-5 item)                         │
└─────────────────────────────────────────┘
```

**Setiap item agenda**:
- Layout: blok tanggal di kiri, konten di kanan
- **Blok tanggal** (left, 64x64, background `primary-50`, `radius-lg`, centered):
  - Hari: `text-2xl`, font-bold, `primary-600` (contoh: "12")
  - Bulan: `text-xs`, font-medium, `primary-400` (contoh: "Jun")
- **Konten** (right):
  - **Judul agenda**: `text-sm`, font-semibold, `neutral-800`, max 2 baris
  - **Lokasi/Waktu**: `text-xs`, `neutral-400`, ikon `MapPin` + teks (opsional)
- Divider bawah setiap item: `border-neutral-100`
- Hover: background `neutral-50`

**"Lihat Semua Agenda"**: Link di bawah daftar, `text-sm`, font-medium, `primary-500`, align kanan, hover:underline

**State kosong**: Jika belum ada agenda → tampilkan `<EmptyState>` dengan ikon `CalendarDays`, judul "Belum ada agenda", deskripsi "Jadwal kegiatan akan ditampilkan di sini."

---

**Mock data**: Disimpan di `mock/data/news.ts` dan `mock/data/agendas.ts`.

**TypeScript**:

```typescript
interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;      // "Pengumuman", "Kegiatan", "Prestasi"
  thumbnailUrl?: string;
  publishedAt: string;    // ISO date
}

interface AgendaItem {
  id: string;
  title: string;
  date: string;          // ISO date
  location?: string;
  time?: string;
}
```

---

#### 9.0.4 Section: Statistik Institusional

**Background**: `bg-neutral-50`. **id anchor**: `statistik` (target scroll dari navbar "Statistik").

**Konteks dari sistem lama**: Sistem lama menampilkan banner scrolling berisi "Data Usulan Proposal DIPA Tahun 2026" dengan rincian per fakultas (misal: FHukum: Penelitian=54, PKM=30, FE, dll.). Data ini sekarang divisualisasikan lebih baik dalam dua bagian.

**Layout**: Section padding 80px–120px. Container max-width 1200px, centered.

**Section Header**:
- Heading: "Penelitian & Pengabdian UNTAN dalam Angka" — `text-3xl`, font-bold, `neutral-900`, centered
- Subheading: "Data usulan proposal DIPA dan realisasi penelitian" — `text-base`, `neutral-500`, centered

---

**Bagian A — Ringkasan Institusional** (Stat Grid):

4 kolom (desktop), 2 kolom (mobile). Gap 32px.

**Setiap stat**:

```
┌───────────────────────────┐
│  [Angka besar]            │  text-4xl (desktop) / text-3xl (mobile), font-bold, primary-500
│  [Label]                  │  text-sm, neutral-500, margin-top 4px
└───────────────────────────┘
```

| Angka | Label | Keterangan |
|-------|-------|------------|
| **1.018** | Dosen Peneliti | Dosen aktif di 99 program studi |
| **9** | Fakultas | Seluruh fakultas di Universitas Tanjungpura |
| **99** | Program Studi | Program studi sarjana dan pascasarjana |
| **Rp 96,35 M** | Realisasi Anggaran | Total anggaran penelitian & pengabdian 2022 |

**Visual**: Stat cards menggunakan border-bottom 3px `accent-500` sebagai aksen. Background card: `white`, `shadow-sm`, `radius-lg`.

---

**Bagian B — Data Usulan DIPA per Fakultas** (Tabel):

**Konteks**: Menggantikan banner scrolling teks di sistem lama yang menampilkan data per fakultas secara berurutan. Data ini sekarang ditampilkan dalam format tabel yang lebih mudah dibaca.

**Layout**: Full-width card, margin-top 48px. Background `white`, `shadow-sm`, `radius-lg`, overflow hidden.

**Tabel**:

| No | Fakultas | Penelitian | Pengabdian (PKM) | Total |
|----|----------|------------|-------------------|-------|
| 1 | Fakultas Hukum | 54 | 30 | 84 |
| 2 | Fakultas Ekonomi & Bisnis | ... | ... | ... |
| 3 | Fakultas Keguruan & Ilmu Pendidikan | ... | ... | ... |
| 4 | Fakultas Teknik | ... | ... | ... |
| 5 | Fakultas Pertanian | ... | ... | ... |
| 6 | Fakultas Kehutanan | ... | ... | ... |
| 7 | Fakultas Matematika & Ilmu Pengetahuan Alam | ... | ... | ... |
| 8 | Fakultas Ilmu Sosial & Ilmu Politik | ... | ... | ... |
| 9 | Fakultas Ilmu Komputer & Teknologi Informasi | ... | ... | ... |
| | **Total** | **...** | **...** | **...** |

- Baris total: background `primary-50`, font-bold
- Kolom angka: rata kanan
- Hover baris: background `neutral-50`

**Note**: Angka-angka institusional diambil dari data SIMLPPM (lihat Section 1.1). Data DIPA per fakultas menggunakan data terbaru. Dalam mode mock, data disimpan di file `mock/data/institutionalStats.ts`.

---

#### 9.0.5 Section: Informasi LPPM & Kontak

**Background**: `bg-white`. **id anchor**: `kontak` (target scroll dari navbar "Kontak").

**Layout**: Dua kolom (desktop), satu kolom (mobile). Gap 48px. Container max-width 1000px, centered. Section padding 80px–120px.

**Kolom Kiri — Tentang LPPM**:
- **Heading**: "Lembaga Penelitian dan Pengabdian kepada Masyarakat" — `text-2xl`, font-bold, `neutral-900`
- **Paragraf 1** (Visi): Menjelaskan visi LPPM UNTAN dalam mendorong budaya penelitian dan pengabdian.
- **Paragraf 2** (Misi): Poin-poin misi singkat dalam format bullet list:
  - Melaksanakan dan mengembangkan penelitian yang inovatif
  - Melaksanakan pengabdian kepada masyarakat berbasis riset
  - Meningkatkan publikasi ilmiah dan luaran penelitian
- **Tombol**: "Kunjungi Website LPPM" → link ke `https://lppm.untan.ac.id` (external, icon `ExternalLink`)

**Kolom Kanan — Informasi Kontak**:
- **Card** dengan background `neutral-50`, `radius-xl`, padding 32px:
  - **Ikon lokasi** (`MapPin`) + "Alamat": Jl. Prof. Dr. H. Hadari Nawawi, Pontianak, Kalimantan Barat 78124
  - **Ikon email** (`Mail`) + "Email": lppm@untan.ac.id
  - **Ikon telepon** (`Phone`) + "Telepon": (0561) 749 151
  - **Ikon jam** (`Clock`) + "Jam Operasional": Senin – Jumat, 08.00 – 16.00 WIB
- Setiap item: icon di kiri (primary-500, 20x20), teks di kanan, spacing 16px antar item

---

#### 9.0.5b Section: Panduan & Bantuan

**Background**: `bg-primary-50`.

**Konteks dari sistem lama**: Sistem lama menyediakan 3 link panduan peran dan 1 link data akun di sisi kiri halaman. Sekarang dikonsolidasikan menjadi satu section visual yang jelas.

**Layout**: Section padding 64px. Container max-width 1000px, centered.

**Section Header**:
- Heading: "Panduan & Bantuan" — `text-2xl`, font-bold, `neutral-900`, centered
- Subheading: "Dokumen panduan penggunaan SIMLPPM berdasarkan peran" — `text-sm`, `neutral-500`, centered

**Card Grid**: 4 kolom (desktop), 2 kolom (tablet), 1 kolom (mobile). Gap 16px.

| # | Label | Ikon | Keterangan | Tautan |
|---|-------|------|------------|--------|
| 1 | **Panduan Dosen** | `GraduationCap` | Panduan pengajuan proposal, monitoring, dan pelaporan untuk dosen pengusul | `Download PDF` (mock: `/static/panduan-dosen.pdf`) |
| 2 | **Panduan Operator Fakultas** | `ClipboardCheck` | Panduan verifikasi kelengkapan administrasi dan rekap data fakultas | `Download PDF` (mock: `/static/panduan-operator.pdf`) |
| 3 | **Panduan Administrator** | `Shield` | Panduan manajemen konfigurasi sistem dan kelola user untuk admin LPPM | `Download PDF` (mock: `/static/panduan-admin.pdf`) |
| 4 | **Data Akun SIMLPPM** | `UserCheck` | Informasi akun dan hak akses pengguna di SIMLPPM | `Lihat Data` (mock: `/static/data-akun.pdf`) |

**Setiap card**:
- Background `white`, `radius-lg`, padding 24px, `shadow-sm`
- Ikon di atas (40x40, background `primary-100`, icon `primary-500`), centered
- Label di bawah ikon (`text-sm`, font-semibold, `neutral-800`), centered
- Keterangan (`text-xs`, `neutral-500`), margin-top 4px
- Tombol/Link di bawah (`text-sm`, font-medium, `primary-500`, hover:underline), margin-top 12px
- Hover card: `shadow-md`, `translateY(-2px)`

---

#### 9.0.6 Section: Alur Penggunaan (Could Have — Sprint 3)

**Background**: `bg-primary-50`.

**Layout**: Section padding 80px. Container max-width 1000px.

**Purpose**: Memberikan gambaran singkat alur kerja SIMLPPM kepada pengguna baru.

**Section Header**: "Cara Menggunakan SIMLPPM" — `text-3xl`, font-bold, centered

**Horizontal Stepper** (4 step):

```
  ① ───────── ② ───────── ③ ───────── ④
  Login SSO     Ajukan       Monitor      Unggah
  SATU UNTAN    Proposal     Status       Laporan
```

| Step | Label | Deskripsi | Icon |
|------|-------|-----------|------|
| 1 | **Masuk** | Login menggunakan akun SATU UNTAN | `LogIn` |
| 2 | **Ajukan** | Isi formulir proposal penelitian atau pengabdian | `FilePlus2` |
| 3 | **Pantau** | Pantau status proposal melalui timeline monitoring | `Eye` |
| 4 | **Laporkan** | Unggah laporan akhir dan luaran penelitian | `FileCheck` |

**Visual**: Node berwarna `primary-500` dengan angka di dalam lingkaran. Garis penghubung `neutral-300`. Label di bawah node. Responsif: vertikal di mobile.

---

#### 9.0.7 Footer

**Background**: `neutral-900` (gelap).

**Konteks dari sistem lama**: Footer lama menampilkan "Home | Data Dosen" dan "Copyright © LPPM Universitas Tanjungpura | 2026". Footer baru memperluas tautan dan informasi.

**Layout**: Padding 32px vertikal. Container max-width 1200px.

**Elements**:
- **Baris 1**: 3 kolom (desktop) / stacked (mobile)
  - **Kolom Kiri**: Logo UNTAN + "SIMLPPM" (teks putih) + tagline "Sistem Informasi Manajemen LPPM — Universitas Tanjungpura"
  - **Kolom Tengah**: "Tautan Cepat" — link: Beranda, Statistik, Kontak, Panduan & Bantuan
  - **Kolom Kanan**: "Tautan Eksternal" — link: untan.ac.id, satu.untan.ac.id, lppm.untan.ac.id
- **Divider**: border `neutral-700`, margin-top 24px
- **Baris 2** (copyright): "Copyright © LPPM Universitas Tanjungpura | 2026" — teks `neutral-400`, `text-sm`, centered

**Link behavior**: semua link external pakai `target="_blank"`, `rel="noopener noreferrer"`. Warna link: `neutral-300`, hover: `white`. Link internal (Beranda, Statistik, Kontak) menggunakan smooth scroll ke section di landing page.

---

#### 9.0.8 Landing Page — TypeScript Data

```typescript
// /src/types/landing.ts
interface ModulCard {
  title: string;
  icon: string;        // nama ikon Lucide
  description: string;
  features: string[];
}

interface InstitutionalStat {
  value: string;       // "1.018", "9", "99", "Rp 96,35 M"
  label: string;
  detail: string;
}

interface DipaFacultyRow {
  no: number;
  facultyName: string;
  penelitian: number;
  pkm: number;
  total: number;
}

interface PanduanCard {
  label: string;
  icon: string;
  description: string;
  linkUrl: string;
  linkLabel: string;
}

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;      // "Pengumuman", "Kegiatan", "Prestasi"
  thumbnailUrl?: string;
  publishedAt: string;    // ISO date
}

interface AgendaItem {
  id: string;
  title: string;
  date: string;          // ISO date
  location?: string;
  time?: string;
}

interface LandingPageContent {
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
```

---

#### 9.0.9 Landing Page — Komponen yang Dibutuhkan

| Komponen | Lokasi File | Keterangan |
|----------|-------------|------------|
| `LandingNavbar` | `/src/components/layout/LandingNavbar.tsx` | Navbar transparan → solid on scroll, menu Beranda/Statistik/Kontak |
| `HeroSection` | `/src/components/landing/HeroSection.tsx` | Hero dengan CTA SSO |
| `ModulCardGrid` | `/src/components/landing/ModulCardGrid.tsx` | Grid 4 modul utama |
| `NewsList` | `/src/components/landing/NewsList.tsx` | Daftar artikel berita terkini (card list) |
| `AgendaList` | `/src/components/landing/AgendaList.tsx` | Daftar agenda mendatang (card list + date block) |
| `StatGrid` | `/src/components/landing/StatGrid.tsx` | Grid 4 statistik institusional |
| `DipaTable` | `/src/components/landing/DipaTable.tsx` | Tabel data usulan DIPA per fakultas |
| `LppmInfoSection` | `/src/components/landing/LppmInfoSection.tsx` | 2 kolom: tentang LPPM + kontak |
| `PanduanGrid` | `/src/components/landing/PanduanGrid.tsx` | Grid 4 kartu panduan & bantuan |
| `UsageStepper` | `/src/components/landing/UsageStepper.tsx` | Horizontal stepper alur penggunaan (Sprint 3) |
| `LandingFooter` | `/src/components/layout/LandingFooter.tsx` | Footer gelap, tautan cepat + eksternal |
| `useScrollNavbar` | `/src/hooks/useScrollNavbar.ts` | Custom hook: return `isScrolled` boolean |
| `useActiveSection` | `/src/hooks/useActiveSection.ts` | Custom hook: return id section yang sedang terlihat (untuk underline menu aktif) |

---

### 9.1 Halaman Login (SSO Redirect)

**Route**: `/login`

**Catatan**: Halaman ini **tidak memiliki form login**. SIMLPPM menggunakan SSO SATU UNTAN untuk autentikasi.

**Behavior**:
- Ketika user mengakses `/login`:
  1. Cek apakah sudah ada session → jika ya, redirect ke `/dashboard`
  2. Jika belum ada session → redirect ke `https://satu.untan.ac.id/gate/login?client_id=simlppm&redirect_uri={CALLBACK_URL}&response_type=code`
- Tidak ada UI form di halaman ini — hanya logic redirect

**Route**: `/auth/callback`

**Behavior** (handler, tanpa UI):
1. Baca `?code=...` dari URL
2. POST ke SSO token endpoint: exchange code → access_token + refresh_token
3. GET SSO userinfo endpoint: ambil profil user (NIP, nama, email, fakultas)
4. Cek ke database SIMLPPM: apakah NIP ini terdaftar dan punya role?
5. Jika ya: simpan session, redirect ke `/dashboard`
6. Jika tidak: redirect ke `/login-error?message=Akun belum terdaftar di SIMLPPM`

**Route**: `/login-error`

**Layout**: Centered card di tengah halaman, mirip style SSO SATU UNTAN.

**Elements**:
- Ikon CircleX besar (warna danger/red)
- Judul: "Gagal Masuk"
- Pesan error: dinamis dari query param `?message=...`
- Tombol "Coba Lagi" (primary) → redirect ke SSO login
- Tombol "Kembali" (outline) → redirect ke `/`
- **Tidak ada window.alert** — semua error inline (mengatasi P2)

**Route**: `/auth/logout`

**Behavior**:
1. Clear local session (Zustand + cookie)
2. Redirect ke SSO logout endpoint: `https://satu.untan.ac.id/gate/logout`
   (untuk global logout — user logout dari seluruh layanan SATU UNTAN, bukan hanya SIMLPPM)

### 9.2 Dashboard Dosen

**Route**: `/dashboard`

**Elements**:
- **DeadlineBanner** (UR-09): Jika ada agenda buka proposal aktif
- **Stat Cards** (2x2 grid):
  - Total Proposal Diajukan (ikon: FileText)
  - Proposal Aktif / Berjalan (ikon: Activity)
  - Menunggu Laporan (ikon: Clock)
  - Luaran HKI Tercatat (ikon: Shield)
- **Tabel Ringkasan**: 5 proposal terakhir dengan status badge
- **Quick Actions**: "Ajukan Proposal Baru" (primary button)

### 9.3 Dashboard Operator Fakultas

**Route**: `/dashboard`

**Elements**:
- **Stat Cards**:
  - Proposal Menunggu Verifikasi (ikon: AlertCircle, warna kuning)
  - Total Proposal Fakultas (ikon: FileText)
  - Proposal Diterima (ikon: CheckCircle, warna hijau)
  - Proposal Ditolak (ikon: XCircle, warna merah)
- **Tabel**: Daftar proposal menunggu verifikasi (sorted by tanggal terbaru)
- **Quick Action**: "Verifikasi Proposal Masuk"

### 9.4 Dashboard Admin Fakultas

**Route**: `/dashboard`

**Elements**:
- **Mini Charts** (UR-07): Bar chart partisipasi per prodi di fakultas
- **Stat Cards**: Total Dosen, Proposal Berjalan, Luaran HKI
- **Tabel**: Rekap proposal per skim
- **Tombol Ekspor** (UR-06)

### 9.5 Dashboard Ketua LPPM

**Route**: `/dashboard`

**Elements**:
- **Grafik Serapan Anggaran per Skim** (UR-07): Donut/bar chart interaktif
- **Grafik Partisipasi per Fakultas** (UR-07): Horizontal bar chart 9 fakultas
- **KPI Cards**: Total Proposal, Diterima, Berjalan, Selesai, Total Anggaran
- **Tabel Ringkasan per Fakultas** (klik baris → detail fakultas)
- **Tombol Ekspor Dashboard** (UR-06)

### 9.6 Dashboard Admin Sistem

**Route**: `/dashboard`

**Elements**:
- **System Health**: Total user aktif, total proposal di sistem
- **Stat Cards**: Skim Aktif, Program Terdaftar, User per Role
- **Recent Activity Log**: 10 perubahan terakhir di seluruh sistem
- **Quick Actions**: "Kelola Skim", "Kelola Prodi", "Kelola User"

### 9.7 Form Ajukan Proposal Baru

**Route**: `/pengajuan/baru`

**Layout**: Multi-step form (wizard) dengan progress indicator di atas.

**Steps**:
1. **Informasi Umum**
   - Judul Penelitian/Pengabdian (textarea)
   - Pilih Jenis: Penelitian / Pengabdian (radio/tabs)
   - Pilih Skim (dropdown, dengan TooltipHelp per skim)
   - Bidang Ilmu (dropdown bertingkat: fakultas → bidang → sub-bidang)
   - Tahun Pelaksanaan (dropdown)
   - Durasi Pelaksanaan (input angka + satuan bulan)

2. **Anggota Tim**
   - Ketua: auto-fill dari data user (NIDN, Nama, Fakultas)
   - Anggota Dosen Internal: auto-complete berbasis NIDN/nama dari database lintas fakultas (UR-03)
     - Tampilkan: NIDN, Nama, Fakultas, Bidang Keahlian
     - Input: ketik NIDN atau nama → dropdown hasil pencarian
   - Anggota Mahasiswa: auto-complete NIM/nama dari database akademik
   - Anggota Lain (eksternal): input manual (Nama, Institusi, Peran)

3. **Rencana Anggaran**
   - Total Anggaran (input number, format Rupiah)
   - Rincian Anggaran (dynamic table row): No, Uraian, Jumlah
   - Tombol "+ Tambah Rincian"

4. **Berkas Administrasi**
   - Unggah Proposal (wajib, .pdf, max 10MB)
   - Unggah Surat Pernyataan (wajib, .pdf)
   - Unggah CV Ketua (wajib, .pdf)
   - Unggah Lampiran Lain (opsional, multiple files)
   - Progress bar per file saat upload
   - Preview filename + ukuran + tombol hapus

5. **Luaran yang Diharapkan**
   - Jenis Luaran: Publikasi / HKI / Produk / Lainnya (checkbox)
   - Jika HKI → **Form HKI Terstruktur** (UR-04):
     - Jenis HKI: Paten / Hak Cipta / Merek Dagang (dropdown)
     - Nomor Permohonan (input text, dengan TooltipHelp format)
     - Status Perlindungan: Diajukan / Diberikan / Lainnya (dropdown)
     - Tautan Berkas HKI (opsional)

6. **Konfirmasi**
   - Ringkasan seluruh data dalam format read-only
   - Tombol "Kirim Proposal" (primary)
   - Tombol "Simpan sebagai Draft"
   - Tombol "Kembali ke Step Sebelumnya"

**Validation**: Inline per step (UR-05). Tidak bisa lanjut ke step berikutnya jika step saat ini ada error. Indikator error di progress bar (step dengan error ditandai merah).

### 9.8 Daftar Proposal (Monitoring) — Dosen

**Route**: `/monitoring`

**Elements**:
- **Filter bar**: Status (dropdown multi-select), Skim (dropdown), Tahun (dropdown), Search (text)
- **DataTable** dengan kolom: No, Judul, Skim, Status (badge), Tanggal Diajukan, Aksi
- **Aksi per baris**: "Lihat Detail" → halaman detail
- **Tidak ada scroll horizontal tersembunyi** (UR-02)

### 9.9 Detail Proposal — Dosen

**Route**: `/monitoring/:id`

**Elements**:
- **Header**: Judul Proposal + StatusBadge
- **TimelineStatus** (UR-08): Visual timeline dari "Diajukan" hingga status saat ini
- **Tab: Informasi Umum**: Semua data proposal (read-only)
- **Tab: Anggota Tim**: Daftar anggota dengan NIDN/Nama/Fakultas
- **Tab: Berkas**: Daftar file dengan tombol unduh
- **Tab: Activity Log** (UR-08): Riwayat perubahan status
  - Format: `[Tanggal] [Actor] mengubah status dari X menjadi Y. Catatan: ...`
- **Jika status "revisi"**: Tombol "Unggah Revisi"

### 9.10 Halaman Verifikasi Proposal — Operator

**Route**: `/verifikasi`

**Elements**:
- **Filter lanjutan** (UR-01): Bidang Ilmu, Status, Tanggal, Dosen
- **DataTable dengan selectable rows** (UR-01): Checkbox per baris untuk batch
- **Batch Action Bar** (muncul saat ada selection):
  - "Verifikasi X proposal terpilih" (primary)
  - "Kembalikan X proposal terpilih" (outline/danger)
- **Aksi individual**: Klik baris → modal detail → "Verifikasi" / "Kembalikan ke Dosen"
- **Jika "Kembalikan"**: Wajib isi catatan pengembalian (textarea)

### 9.11 Halaman Unggah Laporan — Dosen

**Route**: `/pelaporan/:proposalId`

**Elements**:
- **Info Proposal**: Judul, Skim, Status saat ini (read-only card)
- **Form Unggah Laporan Akhir**:
  - File Laporan Akhir (.pdf, wajib)
  - Abstrak Laporan (textarea)
  - Luaran yang Dihasilkan:
    - Jika HKI → **Form HKI Terstruktur** (sama seperti di form proposal, UR-04)
    - Jika Publikasi → Input: Judul Jurnal, Nama Jurnal, Volume, DOI, Tautan
    - Jika Produk → Input: Nama Produk, Tautan Dokumentasi
  - Bukti Luaran Lainnya (multiple file upload)
- **Validasi inline** (UR-05)
- **Tombol**: "Kirim Laporan"

### 9.12 Halaman Statistik

**Route**: `/statistik`

**Behavior per role**:

| Role | Tampilkan |
|------|-----------|
| Dosen | Tabel ringkasan proposal pribadi (total, diterima, ditolak, berjalan) |
| Operator | Tabel rekap per dosen di fakultas + tombol ekspor (UR-06) |
| Admin FK | Tabel rekap per skim + grafik + tombol ekspor (UR-06, UR-07) |
| Ketua LPPM | Grafik serapan anggaran + partisipasi FK + tombol ekspor (UR-07) |
| Admin Sistem | Seluruh data institusional + tombol ekspor |

### 9.13 Halaman Konfigurasi Skim — Admin Sistem

**Route**: `/konfigurasi/skim`

**Elements**:
- **DataTable**: Daftar skim penelitian/pengabdian (Kode, Nama Skim, Jenis, Status Aktif, Aksi)
- **CRUD**:
  - "Tambah Skim" → modal form (Kode Skim, Nama, Jenis, Pagu Anggaran, Tanggal Buka-Tutup)
  - Edit → pre-fill modal
  - Nonaktifkan → ConfirmDialog danger
- **Validasi inline** (UR-05)
- **Audit Trail**: Setiap perubahan tercatat di log (UR-08)

### 9.14 Halaman Manajemen Prodi — Admin Sistem

**Route**: `/konfigurasi/prodi`

**Elements**:
- **DataTable**: Kode Prodi, Nama Prodi, Fakultas, Jumlah Dosen, Status
- **Tambah Prodi**: Modal form dengan dropdown Fakultas (cascade)
- **Validasi inline** (UR-05)

### 9.15 Halaman Manajemen User & Role — Admin Sistem

**Route**: `/konfigurasi/users`

**Elements**:
- **DataTable**: NIDN, Nama, Fakultas, Role saat ini, Status
- **Edit Role**: Dropdown pindah role (DOSEN, REVIEWER, OPERATOR_FK, dll.)
- **Filter per Fakultas, per Role**

---

## 10. Data Models (TypeScript Interfaces)

```typescript
// ==================== AUTH ====================
interface User {
  id: string;
  nidn: string;
  name: string;
  email: string;
  facultyId: string;
  facultyName: string;
  studyProgram?: string;
  role: UserRole;
  avatarUrl?: string;
}

type UserRole =
  | 'DOSEN'
  | 'REVIEWER'
  | 'OPERATOR_FK'
  | 'ADMIN_FK'
  | 'KETUA_LPPM'
  | 'ADMIN_SISTEM';

// ==================== PROPOSAL ====================
type ProposalType = 'PENELITIAN' | 'PENGABDIAN';
type ProposalStatus = 'DRAFT' | 'DIAJUKAN' | 'DIVERIFIKASI' | 'DIREVIEW' | 'DITERIMA' | 'DITOLAK' | 'REVISI' | 'SELESAI';

interface Proposal {
  id: string;
  title: string;
  type: ProposalType;
  schemeId: string;
  schemeName: string;
  fieldOfStudy: string;
  year: number;
  duration: number; // bulan
  budget: number;
  status: ProposalStatus;
  submittedAt: string;
  updatedAt: string;
  submitter: Pick<User, 'id' | 'nidn' | 'name' | 'facultyName'>;
  members: TeamMember[];
  budgetDetails: BudgetItem[];
  files: ProposalFile[];
  outputs: ExpectedOutput[];
  statusHistory: StatusHistoryEntry[];
  reviewers?: Pick<User, 'id' | 'nidn' | 'name' | 'facultyName'>[];
  facultyId: string;
  facultyName: string;
}

interface TeamMember {
  id: string;
  nidn?: string;          // null untuk mahasiswa/eksternal
  name: string;
  faculty?: string;       // null untuk eksternal
  role: 'KETUA' | 'ANGGOTA_DOSEN' | 'ANGGOTA_MAHASISWA' | 'ANGGOTA_LAIN';
  studyProgram?: string;
}

interface BudgetItem {
  id: string;
  description: string;
  amount: number;
}

interface ProposalFile {
  id: string;
  category: 'PROPOSAL' | 'SURAT_PERNYATAAN' | 'CV_KETUA' | 'LAMPIRAN' | 'LAPORAN_AKHIR' | 'REVISI';
  fileName: string;
  fileSize: number;
  url: string;
  uploadedAt: string;
}

interface ExpectedOutput {
  id: string;
  type: 'PUBLIKASI' | 'HKI' | 'PRODUK' | 'LAINNYA';
  hkiData?: HKIData;
  publicationData?: PublicationData;
  description?: string;
}

interface HKIData {
  hkiType: 'PATEN' | 'HAK_CIPTA' | 'MEREK_DAGANG';
  applicationNumber: string;  // Nomor Permohonan
  protectionStatus: 'DIAJUKAN' | 'DIBERIKAN' | 'LAINNYA';
  fileUrl?: string;
}

interface PublicationData {
  title: string;
  journalName: string;
  volume?: string;
  doi?: string;
  url?: string;
}

interface StatusHistoryEntry {
  id: string;
  fromStatus: ProposalStatus;
  toStatus: ProposalStatus;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  note?: string;
  timestamp: string;
}

// ==================== SKIM ====================
interface Scheme {
  id: string;
  code: string;
  name: string;
  type: ProposalType;
  budgetCeiling?: number;
  openDate: string;
  closeDate: string;
  isActive: boolean;
  description?: string;
}

// ==================== STUDY PROGRAM ====================
interface StudyProgram {
  id: string;
  code: string;
  name: string;
  facultyId: string;
  facultyName: string;
  lecturerCount: number;
  isActive: boolean;
}

// ==================== STATISTICS ====================
interface FacultyStats {
  facultyId: string;
  facultyName: string;
  totalProposals: number;
  accepted: number;
  rejected: number;
  ongoing: number;
  completed: number;
  totalBudget: number;
  hkiCount: number;
}

interface SchemeStats {
  schemeId: string;
  schemeName: string;
  totalProposals: number;
  accepted: number;
  budgetAllocated: number;
  budgetUsed: number;
}

// ==================== AUDIT LOG ====================
interface AuditLog {
  id: string;
  entityType: 'PROPOSAL' | 'SCHEME' | 'STUDY_PROGRAM' | 'USER';
  entityId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'STATUS_CHANGE' | 'VERIFY' | 'REJECT';
  actorId: string;
  actorName: string;
  oldValue?: string;  // JSON serialized
  newValue?: string;  // JSON serialized
  timestamp: string;
}

// ==================== DEADLINE ====================
interface Deadline {
  id: string;
  title: string;
  type: ProposalType;
  openDate: string;
  closeDate: string;
  isActive: boolean;
}
```

---

## 11. Mock Data Strategy

Karena SPA dibangun tanpa backend nyata, gunakan strategi berikut:

### 11.1 File Mock Data

```
/src
  /mock
    /data
      users.ts          // 6 user (satu per role)
      proposals.ts      // ~20 proposal dengan berbagai status
      schemes.ts        // 5-8 skim
      studyPrograms.ts  // 10-15 prodi
      facultyStats.ts   // statistik per fakultas
      auditLogs.ts      // 30+ log entries
      deadlines.ts      // 1-2 deadline aktif
    /handlers.ts        // fungsi CRUD simulasi (delay 300ms)
```

### 11.2 Mock Auth (Mode Development)

Pada mode development, SSO tidak digunakan. Ganti dengan mock SSO callback flow:

```typescript
// /src/mock/auth.ts
//
// MODE DEVELOPMENT:
// Di halaman /login, tampilkan form mock pilihan role
// (HANYA untuk development, tidak ada di production)
//
// Di production, /login langsung redirect ke SSO SATU UNTAN

interface MockSSOUser {
 nip: string;
  name: string;
  email: string;
  facultyName: string;
 simlppmRole: UserRole;
}

const MOCK_SSO_USERS: Record<string, MockSSOUser> = {
 'dosen': {
    nip: 'D1042191008',
    name: 'Ahmad Abdillah, S.Kom.',
    email: 'ahmad.abdillah@untan.ac.id',
    facultyName: 'Fakultas Teknik',
    simlppmRole: 'DOSEN',
  },
  'operator': {
    nip: 'OPR001',
    name: 'Ghiffar Fabian Wibisono',
    email: 'ghiffar.wibisono@untan.ac.id',
    facultyName: 'Fakultas Teknik',
    simlppmRole: 'OPERATOR_FK',
  },
  'adminfk': {
    nip: 'ADM001',
    name: 'Dr. Ir. Yopa Eka Prawatya, S.T., M.Eng.',
    email: 'yopa.prawatya@untan.ac.id',
    facultyName: 'Fakultas Teknik',
    simlppmRole: 'ADMIN_FK',
  },
  'ketua': {
    nip: 'KTL001',
    name: 'Dr. Ir. U. Edi Suryadi, M.P.',
    email: 'edi.suryadi@untan.ac.id',
    facultyName: 'LPPM',
    simlppmRole: 'KETUA_LPPM',
  },
  'adminsys': {
    nip: 'SYS001',
    name: 'Fara Jusmania, S.E., M.M.',
    email: 'fara.jusmania@untan.ac.id',
    facultyName: 'LPPM',
    simlppmRole: 'ADMIN_SISTEM',
  },
};

// Halaman mock login (HANYA development)
// Menampilkan daftar akun dummy untuk quick-switch role
export function MockDevLoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2>Mock Login (Development Only)</h2>
      <p className="text-sm text-neutral-500">
        Production: SSO SATU UNTAN (satu.untan.ac.id)
      </p>
      {Object.entries(MOCK_SSO_USERS).map(([key, user]) => (
        <button
          key={key}
          onClick={() => mockSSOLogin(user)}
          className="w-64 p-3 border rounded-lg text-left hover:bg-neutral-50"
        >
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-neutral-500">
            {user.nip} · {user.simlppmRole}
          </div>
        </button>
      ))}
    </div>
  );
}
```

### 11.3 Mock API Pattern

```typescript
// Semua "API call" mengembalikan Promise dengan delay simulasi
export async function getProposals(params?: QueryParams): Promise<PaginatedResponse<Proposal>> {
  await delay(300); // simulasi latency
  let data = [...mockProposals];
  // apply filters, search, pagination
  return { data, total: data.length, page: params?.page || 1, pageSize: params?.pageSize || 10 };
}
```

---

## 12. File Structure / Routing

```
/src
  /app
    /layout.tsx               // root layout (font, metadata)
    /page.tsx                 // Landing Page (route: /)
    /login
      page.tsx                // redirect ke SSO SATU UNTAN
    /auth
      /callback
        page.tsx              // SSO callback handler (no UI)
      /logout
        page.tsx              // clear session + redirect SSO logout
    /login-error
      page.tsx                // tampil pesan error inline
    /(dashboard)              // layout group: sidebar + header
      layout.tsx              // shared dashboard layout
      /dashboard
        page.tsx              // redirects ke workspace role
      /pengajuan
        /baru
          page.tsx            // multi-step form
        page.tsx              // daftar proposal (dosen)
        /[id]
          page.tsx            // detail proposal
      /monitoring
        page.tsx
      /pelaporan
        /[id]
          page.tsx            // unggah laporan
      /verifikasi
        page.tsx              // operator only
      /statistik
        page.tsx
      /manajemen
        /dosen
          page.tsx            // admin FK
        /data
          page.tsx            // rekap P2M
      /konfigurasi
        /skim
          page.tsx            // admin sistem
        /prodi
          page.tsx
        /users
          page.tsx
      /audit-log
        page.tsx              // admin FK + admin sistem
  /components
    /ui                      // shadcn/ui components
    /layout
      Sidebar.tsx
      Header.tsx
      DashboardLayout.tsx
      LandingNavbar.tsx       // navbar transparan → solid on scroll
      LandingFooter.tsx       // footer gelap
    /landing
      HeroSection.tsx        // hero + CTA SSO
      ModulCardGrid.tsx      // grid 4 modul utama
      NewsList.tsx           // daftar berita terkini
      AgendaList.tsx         // daftar agenda mendatang
      StatGrid.tsx           // grid 4 statistik institusional
      DipaTable.tsx          // tabel data DIPA per fakultas
      LppmInfoSection.tsx   // tentang LPPM + kontak
      PanduanGrid.tsx        // grid 4 kartu panduan & bantuan
      UsageStepper.tsx       // horizontal stepper alur penggunaan
    /shared
      DataTable.tsx
      StatusBadge.tsx
      TimelineStatus.tsx
      InlineValidation.tsx
      TooltipHelp.tsx
      ConfirmDialog.tsx
      DeadlineBanner.tsx
      ExportButton.tsx
      EmptyState.tsx
      StatCard.tsx
    /forms
      ProposalForm.tsx       // multi-step wizard
      LaporanForm.tsx
      SkimForm.tsx
      ProdiForm.tsx
      HKIFormFields.tsx      // reusable HKI sub-form (UR-04)
      TeamMemberInput.tsx    // auto-complete NIDN (UR-03)
    /charts
      BudgetChart.tsx
      ParticipationChart.tsx
      FacultyBarChart.tsx
  /hooks
    useScrollNavbar.ts       // return isScrolled boolean untuk landing navbar
    useActiveSection.ts     // return id section terlihat untuk underline menu aktif
  /lib
    /utils.ts
    /constants.ts            // role config, status config, etc.
  /store
    /authStore.ts            // Zustand: user, role, token
    /uiStore.ts              // sidebar collapsed, theme
  /mock
    /data/
      institutionalStats.ts  // data statistik landing page
      news.ts                // data berita LPPM
      agendas.ts             // data agenda LPPM
    /handlers.ts
    /auth.ts
  /types
    index.ts                 // all TypeScript interfaces
    landing.ts               // landing page interfaces
```

---

## 13. Key Interactions & Behaviors

### 13.1 Masalah P1 — Login tanpa Dropdown Peran
- Halaman login: hanya NIDN + Password
- Mock auth handler: match NIDN → return user with role
- Redirect otomatis ke `/dashboard` (layout menampilkan sidebar sesuai role)

### 13.2 Masalah P2 — Tidak Ada window.alert
- Semua error validasi form → `<FormError />` inline di bawah field
- Semua error sistem (gagal upload, gagal simpan) → `<Toast error />` pojok kanan atas
- Semua konfirmasi aksi → `<ConfirmDialog />` modal
- **RULE: `window.alert()` tidak boleh ada di manapun dalam kode**

### 13.3 Masalah P3 — Tidak Ada Scroll Horizontal Tersembunyi
- Semua `<DataTable>` gunakan text-wrapping default
- Kolom aksi: sticky right
- Responsif: di layar kecil, kolom kurang penting masuk ke expandable row
- Indikator visual jika ada kolom yang tersembunyi: "[+X kolom lainnya]"

### 13.4 UR-01 — Filter Reviewer & Batch Actions
- Halaman verifikasi operator: filter bidang ilmu detail (dropdown bertingkat)
- Checkbox per baris + "Verifikasi Terpilih" / "Kembalikan Terpilih"
- Konfirmasi batch via ConfirmDialog

### 13.5 UR-03 — Auto-complete NIDN Lintas Fakultas
- Input anggota tim: debounce 300ms → cari dari mock data semua fakultas
- Dropdown: tampilkan NIDN, Nama, Fakultas, Bidang Keahlian
- Klik → tambahkan ke daftar anggota

### 13.6 UR-04 — Form HKI Terstruktur
- Komponen `<HKIFormFields />` reusable
- Field: Jenis HKI (dropdown), Nomor Permohonan (text), Status Perlindungan (dropdown), Tautan Berkas (file upload)
- Dipakai di: Form Proposal (step Luaran) + Form Pelaporan

### 13.7 UR-06 — Ekspor Excel
- Tombol "Ekspor ke Excel" di halaman statistik dan halaman data
- Client-side export menggunakan SheetJS (xlsx)
- Nama file otomatis: `rekap_[modul]_[fakultas]_[tahun].xlsx`

### 13.8 UR-07 — Dashboard Visual Eksekutif
- Ketua LPPM: grafik serapan anggaran (bar/donut) + partisipasi FK (horizontal bar)
- Admin FK: grafik ringkasan per prodi (bar chart)
- Gunakan Recharts, interaktif (hover tooltip, klik untuk drill-down)

### 13.9 UR-08 — Audit Trail / Activity Log
- Tabel log perubahan: Timestamp, Actor, Action, Entity, Detail
- Di halaman detail proposal: TimelineStatus + tab Activity Log
- Di halaman konfigurasi: Audit Log Sistem

### 13.10 UR-09 — Deadline Countdown
- Dashboard dosen: cek mock deadlines, jika ada yang aktif → tampilkan DeadlineBanner
- Hitung sisa hari, tentukan warna berdasarkan sisa hari

### 13.11 UR-10 — Tooltip Help
- Tambahkan `<TooltipHelp />` di samping field:
  - Pilih Skim
  - Bidang Ilmu
  - Nomor Permohonan HKI
  - Jenis Luaran
- Ikon: `CircleHelp` dari Lucide, ukuran 16px, warna `neutral-400`

### 13.12 UR-11 — Clone/Duplicate Proposal (Could Have)
- Di daftar proposal dosen: tombol "Duplikat" per baris
- Klik → pre-fill form ajukan proposal baru dengan data proposal tersebut
- User bisa edit sebelum mengirim

### 13.13 UR-13 — Font Size Option (Could Have)
- Di header: ikon "Aa" → dropdown: Kecil / Normal / Besar
- Simpan preference di localStorage
- Terapkan `font-size` multiplier pada root element

---

## 14. Sample Mock Data

### 14.1 Contoh Proposal

```typescript
const MOCK_PROPOSALS: Proposal[] = [
  {
    id: 'PRP-2026-001',
    title: 'Pengembangan Model Prediksi Kebakaran Hutan di Kalimantan Barat Menggunakan Citra Satelit dan Machine Learning',
    type: 'PENELITIAN',
    schemeId: 'SKM-01',
    schemeName: 'Penelitian Fundamental',
    fieldOfStudy: 'Teknik Informatika',
    year: 2026,
    duration: 12,
    budget: 75000000,
    status: 'DITERIMA',
    submittedAt: '2026-03-15T10:30:00Z',
    updatedAt: '2026-05-20T14:00:00Z',
    submitter: { id: 'U-001', nidn: 'D1042191008', name: 'Dr. Ahmad Yani, M.T.', facultyName: 'Fakultas Teknik' },
    facultyId: 'FK-01',
    facultyName: 'Fakultas Teknik',
    members: [
      { id: 'M-001', nidn: 'D1042191001', name: 'Dr. Erni Panca Kurniasih, S.E., M.Si.', faculty: 'Fakultas Ekonomi dan Bisnis', role: 'ANGGOTA_DOSEN' },
      { id: 'M-002', nidn: 'NIM2022001', name: 'Budi Santoso', role: 'ANGGOTA_MAHASISWA', studyProgram: 'Teknik Informatika' },
    ],
    budgetDetails: [
      { id: 'BD-001', description: 'Bahan Habis Pakai', amount: 15000000 },
      { id: 'BD-002', description: 'Perjalanan Lapangan', amount: 25000000 },
      { id: 'BD-003', description: 'Honor Tenaga Ahli', amount: 20000000 },
      { id: 'BD-004', description: 'Publikasi', amount: 15000000 },
    ],
    files: [
      { id: 'F-001', category: 'PROPOSAL', fileName: 'proposal_kebakaran_hutan_v2.pdf', fileSize: 2456000, url: '#', uploadedAt: '2026-03-15T10:30:00Z' },
    ],
    outputs: [
      { id: 'O-001', type: 'PUBLIKASI', publicationData: { title: 'Forest Fire Prediction Model', journalName: 'IJGIS', volume: 'Vol. 40', doi: '10.1080/xxx' } },
      { id: 'O-002', type: 'HKI', hkiData: { hkiType: 'HAK_CIPTA', applicationNumber: 'EC00202600001', protectionStatus: 'DIAJUKAN' } },
    ],
    statusHistory: [
      { fromStatus: 'DRAFT', toStatus: 'DIAJUKAN', actorId: 'U-001', actorName: 'Dr. Ahmad Yani, M.T.', actorRole: 'DOSEN', timestamp: '2026-03-15T10:30:00Z' },
      { fromStatus: 'DIAJUKAN', toStatus: 'DIVERIFIKASI', actorId: 'U-005', actorName: 'Ghiffar Fabian Wibisono', actorRole: 'OPERATOR_FK', timestamp: '2026-03-18T09:00:00Z', note: 'Kelengkapan berkas lengkap' },
      { fromStatus: 'DIVERIFIKASI', toStatus: 'DIREVIEW', actorId: 'U-006', actorName: 'Dr. Ir. Yopa Eka Prawatya, S.T., M.Eng.', actorRole: 'ADMIN_FK', timestamp: '2026-04-01T11:00:00Z' },
      { fromStatus: 'DIREVIEW', toStatus: 'DITERIMA', actorId: 'U-013', actorName: 'Dr. Muhammad Rizal, S.Hut., M.Si.', actorRole: 'REVIEWER', timestamp: '2026-05-20T14:00:00Z', note: 'Relevan dan metodologi kuat' },
    ],
    reviewers: [{ id: 'U-013', nidn: 'D1042191013', name: 'Dr. Muhammad Rizal, S.Hut., M.Si.', facultyName: 'Fakultas Kehutanan' }],
  },
  // ... tambahkan 15-20 proposal lainnya dengan variasi status, fakultas, skim
];
```

### 14.2 Contoh Skim

```typescript
const MOCK_SCHEMES: Scheme[] = [
  { id: 'SKM-01', code: 'PF', name: 'Penelitian Fundamental', type: 'PENELITIAN', budgetCeiling: 100000000, openDate: '2026-02-01', closeDate: '2026-06-30', isActive: true },
  { id: 'SKM-02', code: 'PU', name: 'Penelitian Terapan Unggulan', type: 'PENELITIAN', budgetCeiling: 200000000, openDate: '2026-02-01', closeDate: '2026-06-30', isActive: true },
  { id: 'SKM-03', code: 'PPM', name: 'Pengabdian kepada Masyarakat', type: 'PENGABDIAN', budgetCeiling: 50000000, openDate: '2026-03-01', closeDate: '2026-07-31', isActive: true },
  { id: 'SKM-04', code: 'PDU', name: 'Penelitian Dosen Pemula', type: 'PENELITIAN', budgetCeiling: 30000000, openDate: '2026-02-01', closeDate: '2026-06-30', isActive: true },
  { id: 'SKM-05', code: 'PBT', name: 'Penelitian Berbasis Tema', type: 'PENELITIAN', budgetCeiling: 150000000, openDate: '2026-04-01', closeDate: '2026-08-31', isActive: false },
];
```

### 14.3 Contoh Deadline

```typescript
const MOCK_DEADLINES: Deadline[] = [
  {
    id: 'DL-001',
    title: 'Pengajuan Proposal Penelitian Semester 2 Tahun 2026',
    type: 'PENELITIAN',
    openDate: '2026-06-01',
    closeDate: '2026-08-31',
    isActive: true,
  },
];
```

---

## 15. Mapping: Masalah → Solusi dalam SPA

| # | Masalah (dari inspeksi mandiri) | Solusi dalam SPA | Komponen |
|---|--------------------------------|-----------------|----------|
| P1 | Login harus pilih peran manual via dropdown, error tidak spesifik | SSO SATU UNTAN (satu.untan.ac.id), role auto-detect dari database, tidak ada form login di SPA | SSO Integration, Auth Callback Handler, Login Error Page |
| P2 | Notifikasi error via window.alert yang memblokir antarmuka | Inline validation + Toast notification | `<InlineValidation>`, `<Toast>` |
| P3 | Tombol aksi tersembunyi di scroll horizontal tanpa indikator | DataTable responsif, sticky action column, text-wrapping | `<DataTable>` |
| P4 | Widget card Berita & Agenda kosong (API mati) | Dashboard berbasis data dinamis, tidak ada widget kosong | Dashboard layouts |
| P5 | Tidak ada filter reviewer berbasis bidang ilmu | Filter bertingkat bidang ilmu di halaman verifikasi | Halaman Verifikasi |
| P6 | Nama label menu ambigu ("Verifikasi" dianggap final) | Penamaan ulang: "Verifikasi Kelengkapan Administrasi" | Sidebar, Labels |
| P7 | Tidak ada pencarian dosen lintas fakultas | Auto-complete NIDN dari semua fakultas | `<TeamMemberInput>` |
| P8 | Form HKI tidak terstruktur (hanya upload file) | Form terstruktur: No. Permohonan, Status, Tipe | `<HKIFormFields>` |
| P9 | Tidak ada sistem notifikasi/peringatan deadline | Deadline banner dengan countdown di dashboard | `<DeadlineBanner>` |
| P10 | Tidak ada audit trail / log perubahan | Activity log + timeline status di detail proposal | `<TimelineStatus>`, Audit Log page |
| P11 | Tidak ada batch actions (verifikasi satu per satu) | Checkbox selectable + batch action bar | `<DataTable selectable>` |
| P12 | Tidak ada tombol ekspor data | Tombol ekspor Excel client-side | `<ExportButton>` |
| P13 | Dashboard hanya teks mentah, tidak ada visualisasi | Grafik interaktif dengan Recharts | `<BudgetChart>`, `<ParticipationChart>` |

---

## 16. Implementation Priority (MoSCoW → Build Order)

### Sprint 1: Core (Must Have)
1. Setup project (Next.js, Tailwind, shadcn/ui)
2. Landing Page publik (hero, 4 modul, statistik, info LPPM, footer) + LandingNavbar + useScrollNavbar hook
3. Layout system dashboard (Sidebar, Header, DashboardLayout)
4. Auth mock + SSO redirect handler (P1)
5. Dashboard per role (5 dashboard)
6. DataTable component (UR-02, P3)
7. Inline validation system (UR-05, P2)
8. Halaman Form Ajukan Proposal multi-step (P8, UR-04)
9. Halaman Monitoring / Daftar Proposal
10. Halaman Detail Proposal + Timeline (UR-08)

### Sprint 2: Operational (Should Have)
11. Halaman Verifikasi Operator + batch actions (UR-01, P5, P11)
12. Halaman Pelaporan / Unggah Laporan (UR-04)
13. Halaman Statistik + Ekspor Excel (UR-06, P12)
14. Dashboard visual eksekutif — grafik (UR-07, P13)
15. Auto-complete NIDN lintas fakultas (UR-03, P7)
16. Deadline countdown banner (UR-09, P9)
17. Tooltip help (UR-10)

### Sprint 3: Enhancement (Could Have)
18. Alur Penggunaan stepper di landing page (Section 9.0.6)
19. Clone/duplicate proposal (UR-11)
20. Font size option (UR-13)
21. Badge "Terbaru" pada template unduhan (UR-12)
22. Halaman konfigurasi skim/prodi/user (Admin Sistem)
23. Audit log system (Admin)
24. Halaman manajemen dosen (Admin FK)

---

## 17. Acceptance Criteria per Skenario Tugas

| Tugas | Skenario | Kriteria Berhasil |
|-------|----------|-------------------|
| T1 | Login & akses dashboard | Klik akses SIMLPPM → redirect SSO SATU UNTAN → login (Google atau email+password) → callback → redirect ke workspace sesuai role |
| T2 | Ajukan proposal baru | Form multi-step terisi lengkap, validasi inline muncul saat error, proposal tersimpan |
| T3 | Periksa status proposal | Tabel monitoring tampil, klik detail → timeline status + activity log terlihat |
| T4 | Unggah laporan akhir | Form laporan + HKI terstruktur terisi, file terunggah, sukses |
| T5 | Akses statistik | Grafik/tabel sesuai role muncul, tombol ekspor berfungsi |
| T6 | Verifikasi proposal | Filter bidang ilmu bekerja, batch select + verifikasi bekerja |
| T7 | Kelola data & rekap | Tabel rekap muncul, ekspor Excel menghasilkan file |
| T8 | Akses dashboard analitik | Grafik serapan anggaran + partisipasi FK interaktif |
| T9 | Kelola konfigurasi | CRUD skim/prodi berfungsi, validasi inline muncul, log tercatat |

---

## 18. Notes for Development

1. **Mulai dari landing page + layout dashboard + auth dulu** — landing page adalah halaman pertama yang dilihat user, lalu layout dashboard dan auth adalah fondasi semua halaman terproteksi.
2. **Mock data harus realistis**: gunakan nama dosen UNTAN asli (dari data responden), nama fakultas yang benar, anggaran yang masuk akal.
3. **Setiap halaman harus berdiri sendiri** — bisa diakses langsung via URL tanpa crash meski tanpa navigasi dari sidebar.
4. **Tidak perlu backend** — semua data dari file mock. Tapi struktur kode harus seolah-olah ada API (gunakan fungsi async yang return Promise, bukan import data langsung).
5. **Mobile-first isn't priority** — pengguna utama adalah dosen dan staf yang bekerja di laptop/desktop. Tapi jangan sampai responsive-nya broken di tablet.
6. **Bahasa antarmuka**: Seluruh label UI dalam Bahasa Indonesia.
7. **Aksesibilitas minimal**: Semua form field punya label, semua tombol punya aria-label, focus state terlihat, navigasi bisa diakses via keyboard.