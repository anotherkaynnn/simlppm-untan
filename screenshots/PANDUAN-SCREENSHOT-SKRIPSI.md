# Panduan Screenshot Prototipe SIMLPPM (Redesign) untuk Skripsi

Memetakan tiap screenshot → **kebutuhan responden (UR)** & **temuan peneliti** yang dijawab, lengkap dengan keterangan (caption) siap pakai untuk BAB Hasil/Pembahasan.

Semua file ada di folder `screenshots/`. Prototipe: `simlppm-new` (Next.js 16, brand **biru** UNTAN). Login simulasi role: ketik `dosen` / `operator` / `adminfk` / `ketua` / `admin` / `reviewer` di field username.

> **Cara pakai untuk demo/ambil ulang screenshot HD:** `npm run build && npm start` di folder `simlppm-new` → buka `localhost:3000`. Kalau perlu resolusi/state tertentu, ambil ulang manual; kalau tidak, 30 file di folder ini sudah cukup.

---

## A. SCREENSHOT INTI — Menjawab TEMUAN PENELITI (gap prototipe lama → ditutup di redesign)

Ini yang **wajib masuk skripsi**, karena tiap satu membuktikan sebuah temuan/kekurangan yang teridentifikasi pada evaluasi awal telah diperbaiki. Urutkan sesuai dampak ke SUS.

| No | File | Halaman | Menjawab UR | Temuan peneliti (kondisi lama → diperbaiki) | Keterangan gambar (caption) |
|----|------|---------|-------------|---------------------------------------------|------------------------------|
| 1 | `04_pengajuan_baru.png` | Pengajuan Baru (wizard) | UR-09, UR-20, UR-21, UR-25, UR-35 | Lama: form bisa submit kosong, hanya 1 tooltip, anggota tim input manual, tak ada autosave | Formulir pengajuan multi-langkah dengan **validasi real-time**, **tooltip bantuan di tiap field**, **autocomplete anggota tim (NIDN/NIM lintas fakultas)**, **autosave draf**, dan info format/ukuran file. |
| 2 | `02_login.png` | Login | UR-01, UR-02, UR-13 | Lama: login tanpa validasi inline | Halaman login dengan **validasi inline** (field wajib) dan **deteksi peran otomatis**; konsisten secara visual dengan dashboard. |
| 3 | `14_panduan_template.png` / `13_panduan.png` | Panduan | UR-29, UR-32 | Lama: `/panduan` masih placeholder; dokumen tanpa versi/tanggal | Halaman panduan dalam sistem: **template unduhan + FAQ accordion**, dengan **badge versi & tanggal pembaruan** dokumen. |
| 4 | `11_pelaporan_hki.png` | Pelaporan HKI | UR-22, UR-31 | Lama: `/pelaporan/hki` placeholder | Formulir **luaran HKI terstruktur** dengan field kondisional per jenis (klaim paten / kelas merek) dan status perlindungan. |
| 5 | `30_audit.png` / `29_audit_log.png` | Audit Trail | UR-19 | Lama: `/audit` placeholder | **Jejak audit sistem** dengan filter aksi + rentang tanggal dan badge warna per jenis aksi. |
| 6 | `08_monitoring_aktif.png` | Monitoring Aktif | UR-24, UR-27 | Lama: `/monitoring/aktif` placeholder | Pemantauan proposal aktif dengan **indikator progres per tahap** dan badge deadline (H-x). |
| 7 | `18_review_detail.png` | Detail Review | UR-27 | Lama: rubrik penilaian tidak ada | Layar reviewer dengan **rubrik penilaian terstruktur** (skor per kriteria) di samping ringkasan proposal. |
| 8 | `06_pengajuan_riwayat.png` | Riwayat Pengajuan | UR-17, UR-23 | Lama: tombol ekspor tanpa handler, tak ada duplikasi | Riwayat proposal dengan **ekspor Excel/CSV berfungsi** dan aksi **Duplikasi proposal** per baris. |
| 9 | `19_verifikasi.png` | Verifikasi (Operator) | UR-15, UR-16 | Lama: filter bidang ilmu placeholder (`|| true`) | Antrean verifikasi dengan **filter bidang ilmu & status berfungsi** dan **aksi batch** (verifikasi massal). |
| 10 | `03_dosen_dashboard.png` | Dashboard Dosen | UR-06, UR-14, UR-33 | Lama: bell tanpa dropdown, tak ada breadcrumb, dashboard tak difilter per user | Dashboard dosen: **breadcrumb**, **dropdown notifikasi berfungsi** (badge jumlah belum dibaca), daftar proposal **terfilter milik pengguna**. |
| 11 | `01_landing.png` | Landing Publik | UR-04, UR-05, UR-12 | Lama: tak ada berita/pengumuman | Halaman publik dengan **hierarki tipografi**, kontras memadai, statistik DIPA, dan **seksi Berita & Pengumuman**. |
| 12 | `21_statistik.png` | Statistik | UR-17, UR-18 | Lama: chart CSS statis, ekspor mati | Dasbor statistik dengan **grafik interaktif** (hover menampilkan detail) dan **ekspor data**. |

---

## B. SCREENSHOT PENDUKUNG — Kelengkapan alur & peran (per role)

Masukkan seperlunya untuk menunjukkan cakupan sistem end-to-end lintas 6 peran.

**Publik & Dosen**
- `05_pengajuan_draft.png` — Draf tersimpan (UR-25 autosave)
- `07_monitoring.png` — Monitoring proposal (timeline status)
- `09_monitoring_detail.png` — Detail proposal + tab penilaian
- `10_pelaporan.png` — Daftar pelaporan luaran
- `12_pelaporan_detail.png` — Form pelaporan kondisional (publikasi/HKI/produk)
- `15_profil.png` — Profil + **badge peran** (UR-34) + **preferensi notifikasi email** (UR-24)
- `16_pengaturan.png` — Pengaturan akun/tampilan (font toggle, UR-05)

**Reviewer**
- `17_review.png` — Daftar tugas review

**Operator FK**
- `20_manajemen_data.png` — Manajemen data usulan

**Admin FK**
- `22_manajemen_dosen.png` — Manajemen dosen
- `23_manajemen_reviewer.png` — Manajemen reviewer (UR-15 filter)
- `24_manajemen_berkas.png` — Manajemen berkas
- `25_manajemen_ekspor.png` — Ekspor data (UR-17)

**Admin Sistem**
- `26_konfigurasi_prodi.png` — Konfigurasi prodi
- `27_konfigurasi_skim.png` — Konfigurasi skim pendanaan
- `28_konfigurasi_users.png` — Konfigurasi pengguna & peran

---

## C. Rangkuman keterpenuhan (untuk narasi pembahasan)

- **Must Have: 15/15 penuh (100%).**
- Gap prototipe lama (16 terpenuhi / 8 sebagian / 11 belum) → pada redesign hampir seluruhnya ditutup & fungsional (diverifikasi via source review + walkthrough).
- **Keterbatasan yang dideklarasikan (bukan kegagalan):** UR-04 landing pakai data mock (siap-integrasi API), UR-26 penampil PDF tersimulasi, UR-24 pengingat email tersimulasi (toast). Sebutkan eksplisit di sub-bab keterbatasan agar jujur secara metodologis.

---

## D. Saran penyusunan di skripsi

1. **Satu temuan = satu gambar + satu paragraf.** Pakai tabel bagian A sebagai kerangka: kutip kondisi lama → tunjukkan gambar → jelaskan perbaikan → kaitkan ke UR.
2. **Beri anotasi** (kotak/panah merah) pada elemen kunci di gambar — mis. lingkari dropdown notifikasi di `03`, tooltip di `04`, badge versi di `14`. Ini memperkuat klaim visual.
3. **Konsistensi penomoran gambar** ikut nomor file (01–30) agar mudah dilacak ke folder.
4. Untuk objek uji SUS memakai **prototipe Figma**; pastikan tampilan screenshot React ini selaras dengan Figma yang diuji, atau nyatakan bahwa implementasi React adalah realisasi dari desain Figma tersebut.
