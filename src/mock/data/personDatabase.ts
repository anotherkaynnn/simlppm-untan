export interface PersonRecord {
  id: string;
  name: string;
  nidn_nim: string;
  faculty?: string;
  studyProgram?: string;
  type?: 'DOSEN' | 'MAHASISWA' | 'TENDIK';
}

export const personDatabase: PersonRecord[] = [
  // Dosen Teknik
  { id: "p1", name: "Dr. Budi Santoso, M.Kom.", nidn_nim: "198001012005011001", faculty: "Fakultas Teknik", studyProgram: "Informatika", type: 'DOSEN' },
  { id: "p10", name: "Prof. Dr. Ir. Wahyu Hidayat, S.T., M.T.", nidn_nim: "197203151999031001", faculty: "Fakultas Teknik", studyProgram: "Sipil", type: 'DOSEN' },
  { id: "p11", name: "Rina Kumala, S.T., M.Eng.", nidn_nim: "198808222015042002", faculty: "Fakultas Teknik", studyProgram: "Elektro", type: 'DOSEN' },
  
  // Dosen MIPA
  { id: "p2", name: "Prof. Dr. Siti Aminah, M.Si.", nidn_nim: "197505052000032001", faculty: "Fakultas MIPA", studyProgram: "Biologi", type: 'DOSEN' },
  { id: "p12", name: "Dr. Hendra Gunawan, S.Si., M.Sc.", nidn_nim: "198304122008121004", faculty: "Fakultas MIPA", studyProgram: "Kimia", type: 'DOSEN' },
  { id: "p13", name: "Anita Sari, S.Si., M.Stat.", nidn_nim: "199011152019032005", faculty: "Fakultas MIPA", studyProgram: "Matematika", type: 'DOSEN' },

  // Dosen Ekonomi & Bisnis
  { id: "p14", name: "Dr. Eko Prasetyo, S.E., M.M.", nidn_nim: "197906202006041002", faculty: "Fakultas Ekonomi dan Bisnis", studyProgram: "Manajemen", type: 'DOSEN' },
  { id: "p15", name: "Fitriani, S.E., M.Ak.", nidn_nim: "198602102012122003", faculty: "Fakultas Ekonomi dan Bisnis", studyProgram: "Akuntansi", type: 'DOSEN' },

  // Dosen Fakultas Lain
  { id: "p5", name: "Ir. Joko Widodo, M.T.", nidn_nim: "197802102008121002", faculty: "Fakultas Pertanian", studyProgram: "Agroteknologi", type: 'DOSEN' },
  { id: "p6", name: "Dr. Andi Wijaya, S.H., M.H.", nidn_nim: "198211202010121003", faculty: "Fakultas Hukum", studyProgram: "Ilmu Hukum", type: 'DOSEN' },
  { id: "p7", name: "Susi Susanti, S.Pd., M.Pd.", nidn_nim: "198503152012122001", faculty: "Fakultas Keguruan dan Ilmu Pendidikan", studyProgram: "Pendidikan Matematika", type: 'DOSEN' },
  { id: "p16", name: "dr. Ryan Setiawan, Sp.PD.", nidn_nim: "198109092009121001", faculty: "Fakultas Kedokteran", studyProgram: "Pendidikan Dokter", type: 'DOSEN' },

  // Mahasiswa Teknik
  { id: "p3", name: "Ahmad Dahlan", nidn_nim: "D1041181001", faculty: "Fakultas Teknik", studyProgram: "Informatika", type: 'MAHASISWA' },
  { id: "p17", name: "Kevin Sanjaya", nidn_nim: "D1011191054", faculty: "Fakultas Teknik", studyProgram: "Sipil", type: 'MAHASISWA' },
  { id: "p18", name: "Maria Ulfa", nidn_nim: "D1021201021", faculty: "Fakultas Teknik", studyProgram: "Elektro", type: 'MAHASISWA' },

  // Mahasiswa Fakultas Lain
  { id: "p4", name: "Putri Rahmawati", nidn_nim: "E1031191022", faculty: "Fakultas Ekonomi dan Bisnis", studyProgram: "Manajemen", type: 'MAHASISWA' },
  { id: "p8", name: "Rizky Ramadhan", nidn_nim: "F1051201045", faculty: "Fakultas Keguruan dan Ilmu Pendidikan", studyProgram: "Pendidikan Fisika", type: 'MAHASISWA' },
  { id: "p9", name: "Anton Syahputra", nidn_nim: "H1051181021", faculty: "Fakultas Kehutanan", studyProgram: "Kehutanan", type: 'MAHASISWA' },
  { id: "p19", name: "Sarah Wijayanto", nidn_nim: "G1011211012", faculty: "Fakultas Pertanian", studyProgram: "Agribisnis", type: 'MAHASISWA' },
  { id: "p20", name: "Nanda Pratama", nidn_nim: "B1011201088", faculty: "Fakultas Hukum", studyProgram: "Ilmu Hukum", type: 'MAHASISWA' }
];
