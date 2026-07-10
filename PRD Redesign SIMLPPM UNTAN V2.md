# **SPESIFIKASI PERSYARATAN PRODUK (PRD)**

## **REDESIGN ANTARMUKA SIMLPPM UNIVERSITAS TANJUNGPURA (VERSION 2.0)**

## **1\. PENDAHULUAN & GAMBARAN UMUM (PROJECT OVERVIEW)**

### **1.1 Latar Belakang**

Sistem Informasi Manajemen Lembaga Penelitian dan Pengabdian kepada Masyarakat (SIMLPPM) Universitas Tanjungpura adalah platform web utama yang mengelola empat modul besar: **Pengajuan Proposal**, **Monitoring**, **Pelaporan**, dan **Statistik**. Sistem ini pertama kali diluncurkan pada Oktober 2019, melayani sekitar 1.018 dosen dari 99 program studi di 9 fakultas, dengan realisasi anggaran mencapai Rp 96,35 miliar (data tahun 2022).

Seiring berjalannya waktu, antarmuka sistem lama mengalami kendala *usability* signifikan yang menghambat produktivitas pengguna. Evaluasi terbaru mengidentifikasi 13 masalah kegunaan utama, termasuk formulir login yang tidak efisien, penamaan menu yang ambigu, input data tim yang kaku, serta visualisasi data yang kurang informatif.

### **1.2 Tujuan Redesign SPA**

Membangun ulang antarmuka web SIMLPPM menjadi arsitektur *Single Page Application* (SPA) modern yang menggantikan sistem lama (simlppm.untan.ac.id) dengan fokus pada:

1. **Peningkatan Efisiensi Alur Kerja:** Mengeliminasi 13 masalah kegunaan utama berdasarkan masukan responden.  
2. **Autentikasi Terintegrasi:** Menggunakan Single Sign-On (SSO) SATU UNTAN untuk mendeteksi hak akses (*role*) secara otomatis.  
3. **Penyelarasan Data Akademik:** Mengakomodasi seluruh riwayat golongan, ruang, pangkat akademik, serta status perlindungan data proposal pengusul.  
4. **Visualisasi Data Eksekutif:** Menampilkan data sebaran proposal dan anggaran secara dinamis per fakultas untuk membantu proses pengambilan keputusan.

### **1.3 Ruang Lingkup Kerja (Scope of Work)**

* **Termasuk dalam Pengembangan:**  
  * Landing Page Informasi Publik (Statistik Usulan DIPA 2026, Kontak, Panduan PDF).  
  * Modul Pengajuan Proposal Baru (Wizard Form multi-step terstruktur).  
  * Modul Profil Mandiri Dosen (Pembaruan data golongan, ruang, fungsional).  
  * Modul Verifikasi Administratif Operator (Batch Verification & Return).  
  * Modul Manajemen Dokumen Kontrak P2M (Khusus Admin Fakultas).  
  * Modul Statistik & Dashboard Eksekutif Ketua LPPM.  
  * Modul Konfigurasi Sistem (Skim, Prodi, Manajemen User oleh Admin Sistem).  
* **Tidak Termasuk dalam Pembangunan (Demarkasi Out of Scope):**  
  * Pengembangan Database & Backend API Nyata (Menggunakan simulasi asinkron data JSON statis).  
  * Sinkronisasi data otomatis dengan SIAKAD atau BKD eksternal secara riil.  
  * Fitur offline-synchronization (Demarkasi *Won't Have*).

## **2\. MANAJEMEN PENGGUNA & MATRIKS HAK AKSES**

### **2.1 Peran Pengguna (User Roles)**

| Peran (Role) | Kode Sistem | Cakupan Kerja (Workspace) |
| :---- | :---- | :---- |
| **Dosen Pengusul** | DOSEN | Mengelola proposal pribadi, mengunggah laporan kemajuan/akhir, memperbarui profil mandiri. |
| **Reviewer Internal** | REVIEWER | Menilai kelayakan substansi proposal yang ditugaskan melalui tab penilaian khusus. |
| **Operator Fakultas** | OPERATOR\_FK | Memverifikasi kelengkapan berkas administrasi awal proposal di tingkat fakultas. |
| **Admin Fakultas (WD I)** | ADMIN\_FK | Memantau sebaran proposal fakultas, mengunggah file kontrak P2M dosen terkait. |
| **Ketua LPPM** | KETUA\_LPPM | Memantau seluruh aktivitas P2M tingkat universitas, melihat grafik analitik anggaran. |
| **Administrator Sistem** | ADMIN\_SISTEM | Mengelola konfigurasi skim, program studi, hak akses pengguna, dan audit log sistem. |

### **2.2 Matriks Hak Akses Modul**

| Fitur / Modul | DOSEN | REVIEWER | OPERATOR\_FK | ADMIN\_FK | KETUA\_LPPM | ADMIN\_SISTEM |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Dashboard Analitik | ✅ (Personal) | ✅ (Personal) | ✅ (Fakultas) | ✅ (Visual FK) | ✅ (Eksekutif) | ✅ (Sistem) |
| Form Proposal Baru | ✅ | — | — | — | — | — |
| Profil Mandiri Dosen | ✅ | ✅ | — | — | — | — |
| Verifikasi Berkas | — | — | ✅ | — | — | — |
| Unggah File Kontrak | — | — | — | ✅ | — | — |
| Evaluasi Substansi | — | ✅ | — | — | — | — |
| Unggah Laporan Akhir | ✅ | — | — | — | — | — |
| Konfigurasi Skim/Prodi | — | — | — | — | — | ✅ |
| Ekspor Excel | — | — | ✅ | ✅ | ✅ | ✅ |

## **3\. ARSITEKTUR INFORMASI & STRUKTUR NAVIGASI (SIDEBAR)**

Sistem menggunakan **Modular Sidebar Navigation** tetap di sebelah kiri yang menyesuaikan item menunya secara otomatis berdasarkan autentikasi peran (*role-based dynamic menu*).

### **3.1 Navigasi Workspace Dosen (DOSEN & REVIEWER)**

Dashboard Dosen  
├── Pengajuan  
│   ├── Ajukan Proposal Baru  
│   ├── Draft Proposal  
│   └── Riwayat Proposal Saya  
├── Monitoring  
│   ├── Proposal Aktif  
│   └── Riwayat Status & Review  
├── Pelaporan  
│   ├── Unggah Laporan Akhir  
│   └── Luaran HKI Terdaftar  
├── Pengaturan Akun  
│   └── Ubah Profil Dosen  
└── Panduan & File  
    └── Template & Dokumen Pendukung

### **3.2 Navigasi Workspace Operator Fakultas (OPERATOR\_FK)**

Dashboard Operator  
├── Verifikasi Kelengkapan  
│   ├── Daftar Proposal Masuk  
│   └── Riwayat Verifikasi Administrasi  
├── Monitoring  
│   └── Seluruh Proposal Fakultas  
├── Statistik  
│   └── Rekapitulasi Fakultas  
└── Ekspor Data  
    └── Unduh Format Excel

### **3.3 Navigasi Workspace Admin Fakultas (ADMIN\_FK)**

Dashboard Admin FK  
├── Data Dosen  
│   └── Daftar Profil Dosen Fakultas  
├── Berkas Kontrak  
│   └── Unggah File Kontrak P2M  
├── Rekap P2M Fakultas  
│   ├── Analitik Sebaran Skim  
│   └── Rekap Berdasarkan Status  
├── Statistik  
│   └── Grafik Capaian Fakultas  
└── Ekspor Data  
    └── Unduh Rekap Excel

## **4\. DESIGN SYSTEM & DESAIN ANTARMUKA (DESIGN TOKENS)**

Sistem baru menggunakan bahasa desain modern berbasis brand institusi Universitas Tanjungpura dengan menyederhanakan elemen visual agar lebih fokus pada data.

### **4.1 Skema Warna Institusi**

* **Warna Utama (Primary Blue):** \#2563eb (Biru Universitas Tanjungpura, melambangkan profesionalisme dan integrasi akademik).  
* **Warna Aksen (Accent Yellow):** \#eab308 (Kuning Emas, melambangkan kejayaan, prestasi, dan inovasi).  
* **Warna Latar Belakang:** \#f1f5f9 (Abu-abu terang netral untuk mengurangi kelelahan mata).  
* **Warna Teks Utama:** \#0f172a (Gelap pekat untuk keterbacaan yang optimal).  
* *Catatan Redesign:* Opsi "Skins" (pilihan warna merah, hijau, ungu, dll.) serta pilihan layout kaku (*boxed, layout hover*) pada sistem lama **dihapus sepenuhnya** demi menjaga konsistensi identitas visual institusi.

### **4.2 Opsi Ukuran Huruf (UR-13 Accessibility)**

Untuk mendukung dosen senior, disediakan opsi "AA" pada pojok kanan atas Header untuk mengubah ukuran teks secara instan:

* **Kecil (Small):** Mengurangi font sebesar 10% dari ukuran standar.  
* **Normal:** Ukuran standar (Inter, 16px untuk teks tubuh).  
* **Besar (Large):** Meningkatkan ukuran font sebesar 15% pada seluruh elemen teks dan form.

## **5\. LANDING PAGE & SISTEM AUTENTIKASI**

### **5.1 Spesifikasi Landing Page Publik (Sebelum Login)**

Landing Page berfungsi sebagai portal informasi terbuka sebelum pengguna masuk ke dalam dashboard SIMLPPM. Landing page baru memuat elemen-elemen berikut:

1. **Top Navigation:** Menu pintas ke halaman depan (Beranda), Halaman Publikasi Statistik, dan Kontak LPKM UNTAN.  
2. **Blok Data Usulan Proposal DIPA Tahun 2026:**  
   Menampilkan visualisasi tabel real-time usulan proposal Penelitian dan PKM tingkat Fakultas guna menjamin transparansi data:

| Fakultas / Unit | Jumlah Penelitian | Jumlah PKM |
| :---- | :---- | :---- |
| Fakultas Keguruan dan Ilmu Pendidikan (FKIP) | 183 | 86 |
| Fakultas Teknik | 117 | 68 |
| Fakultas Ekonomi dan Bisnis (FEB) | 116 | 32 |
| Fakultas Ilmu Sosial dan Ilmu Politik (FISIP) | 73 | 30 |
| Fakultas Kedokteran | 70 | 51 |
| Fakultas Pertanian | 67 | 46 |
| Fakultas Matematika dan Ilmu Pengetahuan Alam (FMIPA) | 63 | 29 |
| Fakultas Kehutanan | 62 | 51 |
| Fakultas Hukum | 54 | 30 |
| Sekretariat / Rektorat | 0 | 0 |

3. **Unduhan Dokumen Panduan Resmi (PDF):**  
   Tombol hijau besar pada sistem lama digantikan oleh kartu dokumen yang rapi dan dilengkapi dengan badge status **"Terbaru"** berwarna merah:  
   * *Panduan Aplikasi SIMLPPM (Dosen)* \- format PDF.  
   * *Panduan Aplikasi SIMLPPM (Operator Fakultas)* \- format PDF.  
   * *Panduan Aplikasi SIMLPPM (Administrator LPPM)* \- format PDF.  
4. **Tombol Gerbang Utama (Single Sign-On):**  
   Tombol tunggal bertuliskan **"Masuk dengan SATU UNTAN"**. Pengguna tidak perlu lagi memilih role secara manual lewat dropdown.

### **5.2 Alur Autentikasi SSO**

* Ketika pengguna menekan tombol "Masuk", sistem akan mengarahkan pengguna ke gateway resmi https://satu.untan.ac.id/gate/login.  
* Setelah berhasil memverifikasi akun lewat Google atau password SATU UNTAN, sistem akan mengirimkan data identitas pengguna kembali ke callback URL SIMLPPM.  
* SIMLPPM mendeteksi identitas NIDN/NIP tersebut dan mencocokkan perannya secara otomatis di database internal, kemudian langsung mengarahkan pengguna ke workspace masing-masing.

## **6\. SPESIFIKASI HALAMAN INTERNAL (PAGE SPECIFICATIONS)**

### **6.1 Halaman Ubah Profil | Data Dosen (Akun Dosen)**

Halaman mandiri yang dapat digunakan oleh dosen pengusul untuk memastikan seluruh data akademis terperbarui sebelum mengajukan proposal.

* **Identitas Terkunci (Read-Only \- Sinkronisasi SSO):**  
  * NIDN (misal: ahmad)  
  * NIP (misal: ahmad)  
  * Username (misal: ahmad)  
  * Nama Lengkap (misal: Drs. Ahmad Rabiul Muzammil, M.Si.)  
  * Fakultas (Default: Fakultas Teknik)  
  * Program Studi (Default: Informatika (S1))  
* **Kolom Input Akademik (Dapat Diubah):**  
  * **Golongan (II-IV):** Pilihan dropdown (II, III, IV).  
  * **Ruang (a-e):** Pilihan dropdown (a, b, c, d, e).  
  * **E-mail Aktif:** Kolom input teks dengan validasi format instansi (@untan.ac.id).  
  * **No. Telp / WhatsApp:** Kolom input angka wajib untuk koordinasi pengumuman penting.  
  * **Tempat Lahir & Tanggal Lahir:** Kolom input teks bebas dan penunjuk tanggal (*datepicker* dengan default 1970-01-01).  
  * **Jenis Kelamin:** Pilihan radio button (Laki-laki / Perempuan).  
  * **Jabatan Fungsional:** Pilihan radio button (Asisten Ahli, Lektor, Lektor Kepala, Guru Besar).  
  * **Pas Foto Profil:** Slot pengunggahan berkas digital (.jpg / .png, maksimal 2MB) dilengkapi dengan pratinjau instan (*live preview*).  
* **Sistem Interaksi & Validasi:**  
  * Semua pesan error validasi diletakkan di bawah kolom input secara *inline* (**UR-05**).  
  * Aksi tombol di bagian bawah form berupa \[Simpan Perubahan\] (Primer, Biru) dan \[Batal\] (Sekunder, Abu-abu). Tombol reset dihapus untuk mencegah hilangnya data ketikan secara tidak sengaja.

### **6.2 Form Ajukan Proposal Baru (Wizard Multi-Step Form)**

Formulir pengajuan proposal yang dirancang interaktif dalam bentuk tahapan logis (wizard) untuk menghindari kelelahan pengisian form panjang.

#### **Step 1: Informasi Umum Proposal**

* **Judul Proposal:** Kolom textarea luas (Wajib diisi).  
* **Tahun Pelaksanaan:** Pilihan dropdown tahun (Default otomatis terkunci pada tahun berjalan: 2026).  
* **Sumber Dana:** Pilihan dropdown (bukan radio button kaku) berisi opsi:  
  1. HIBAH KEMENRISTEK / BRIN  
  2. HIBAH DIKTI  
  3. DIPA UNTAN  
  4. KERJA SAMA  
  5. MANDIRI  
  6. BATCH  
  7. LAIN-LAIN  
* **Skim Penelitian/PKM:** Dropdown dinamis berdasarkan konfigurasi sistem. Pilihan default meliputi: LPDP, KEDAI REKA, HILIRISET, PDP (Penelitian Dosen Pemula). Dilengkapi dengan icon bantuan (\<TooltipHelp/\>) untuk menjelaskan persyaratan tiap skim.  
* **Bidang Ilmu:** Dropdown bertingkat (cascade) dengan pilihan awal rumpun besar (Saintek, Soshum, Bahasa, Kesehatan, dll.) diikuti sub-bidang spesifik.  
* **Pengelola Dana (Sumber Dana PNBP):** Pilihan dropdown fakultas/lembaga pengelola (Default terpilih: Fakultas Hukum).  
* **Program Studi Pengusul:** Otomatis mendeteksi program studi terdaftar dosen (misal: Informatika (S1)).  
* **Total Dana Diajukan:** Input angka rupiah (Wajib diisi).

#### **Step 2: Tim Pelaksana (Dosen & Anggota)**

* **Ketua Pengusul:** Kolom terkunci secara otomatis berbasis profil login dosen pengusul (misal: Drs. Ahmad Rabiul Muzammil, M.Si.).  
* **Anggota Dosen Internal (1 s.d 10 Anggota):**  
  Menggunakan komponen pencarian cerdas (\<TeamMemberInput/\>). Pengguna tinggal mengetikkan NIDN atau Nama Dosen dari fakultas manapun di lingkungan Universitas Tanjungpura. Sistem akan melakukan pencarian otomatis (debounce 300ms) untuk memilih dosen yang bersangkutan. Dilengkapi dengan tombol \[Hapus\] per baris anggota.  
* **Anggota Lain (Mahasiswa & Tenaga Kependidikan/Tendik):**  
  Sesuai instruksi pengumuman penting universitas, form wajib menampung Anggota Mahasiswa (pencarian otomatis berbasis NIM dari database universitas) serta Tenaga Kependidikan/Laboran (ditulis manual dan dipisahkan dengan menekan tombol Enter).

#### **Step 3: Berkas Administrasi & Status Akses**

* **File Dokumen Proposal:** Tombol unggah berkas PDF dengan batas ukuran maksimal hingga **15MB** (sesuai spesifikasi sistem lama) dilengkapi dengan *progress bar* pengunggahan real-time.  
* **Status Akses File:** Pilihan radio button untuk menentukan visibilitas dokumen:  
  * Open (Terpilih secara default \- dokumen dapat diakses publik setelah disetujui).  
  * Protected (Hanya dapat diakses oleh tim peneliti, operator, dan reviewer yang ditugaskan).  
* **File Kontrak Kerja P2M:** Slot khusus pengunggahan dokumen kontrak formal (.pdf, maksimal 15MB). Kolom ini bersifat *Read-Only* bagi dosen, pengunggahan berkas kontrak dilakukan secara eksklusif oleh peran **Admin Fakultas** di workspace mereka.

## **7\. STRUKTUR DATA (TYPESCRIPT INTERFACES)**

// Model data pengguna terintegrasi akademis UNTAN  
interface User {  
  id: string;  
  nidn: string;  
  nip: string;  
  username: string;  
  name: string;  
  email: string;  
  phone?: string;  
  birthPlace?: string;  
  birthDate?: string;  
  gender: 'LAKI\_LAKI' | 'PEREMPUAN';  
  academicRank: 'ASISTEN\_AHLI' | 'LEKTOR' | 'LEKTOR\_KEPALA' | 'GURU\_BESAR';  
  clericalGolongan: 'II' | 'III' | 'IV';  
  clericalRuang: 'a' | 'b' | 'c' | 'd' | 'e';  
  facultyId: string;  
  facultyName: string;  
  studyProgram?: string;  
  role: UserRole;  
  avatarUrl?: string;   
}

// Model data Proposal P2M  
interface Proposal {  
  id: string;  
  title: string;  
  year: number;  
  fundingSource: 'KEMENRISTEK\_BRIN' | 'DIKTI' | 'DIPA\_UNTAN' | 'KERJASAMA' | 'MANDIRI' | 'BATCH' | 'LAIN\_LAIN';  
  schemeId: string;  
  schemeName: string;  
  fieldOfStudy: string;  
  managementUnit: string;   
  budget: number;  
  fileProposalUrl: string;  
  fileStatus: 'OPEN' | 'PROTECTED';  
  fileContractUrl?: string; // Diunggah oleh Admin Fakultas  
  status: ProposalStatus;  
  submitter: Pick\<User, 'id' | 'nidn' | 'name' | 'facultyName' | 'studyProgram'\>;  
  members: TeamMember\[\];  
}

interface TeamMember {  
  id: string;  
  nidn\_nim?: string;  
  name: string;  
  role: 'KETUA' | 'ANGGOTA\_DOSEN' | 'MAHASISWA' | 'TENDIK';  
  faculty?: string;  
}

## **8\. ALUR MONITORING & VERIFIKASI (OPERATOR & ADMIN)**

### **8.1 Verifikasi Administratif Operator Fakultas (UR-01)**

* Halaman verifikasi menampilkan tabel proposal yang masuk dari fakultas bersangkutan.  
* Dilengkapi checkbox di setiap baris proposal untuk melakukan aksi massal (**Batch Actions**):  
  * \[Verifikasi Terpilih\] (Menandai seluruh proposal terpilih memiliki berkas administrasi yang lengkap).  
  * \[Kembalikan Terpilih\] (Membuka modal komentar wajib untuk menjelaskan kekurangan berkas agar dapat diperbaiki dosen pengusul).

### **8.2 Unggah File Kontrak oleh Admin Fakultas**

* Melalui menu **Berkas Kontrak Dosen**, Admin Fakultas dapat melihat daftar proposal yang disetujui di bawah naungan fakultasnya.  
* Admin Fakultas dapat mengunggah file PDF kontrak maksimal 15MB ke masing-masing baris proposal.  
* File kontrak ini akan langsung tercermin secara instan pada halaman detail proposal di sisi Dosen pengusul.