import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'simlppm-auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

// Mock Users for Development
export const MOCK_USERS: Record<string, User> = {
  DOSEN: {
    id: "U01",
    nidn: "0011223344",
    name: "Dr. Budi Santoso, S.T., M.T.",
    email: "budi.santoso@ft.untan.ac.id",
    facultyId: "FT",
    facultyName: "Fakultas Teknik",
    studyProgram: "Teknik Informatika",
    role: "DOSEN"
  },
  DOSEN_REVIEWER: {
    id: "U01B",
    nidn: "0011223399",
    name: "Dr. Siti Rahayu, M.Sc.",
    email: "siti.rahayu@fmipa.untan.ac.id",
    facultyId: "FMIPA",
    facultyName: "Fakultas MIPA",
    studyProgram: "Matematika",
    role: "DOSEN",
    isReviewer: true // Ditunjuk sebagai reviewer oleh admin
  },
  REVIEWER: {
    id: "U02",
    nidn: "0022334455",
    name: "Prof. Dr. Andi Wijaya",
    email: "andi.wijaya@untan.ac.id",
    facultyId: "FMIPA",
    facultyName: "Fakultas MIPA",
    role: "REVIEWER"
  },
  OPERATOR_FK: {
    id: "U03",
    nidn: "OP-FT-01",
    name: "Ghiffar Fabian Wibisono, S.M.",
    email: "op.ft@untan.ac.id",
    facultyId: "FT",
    facultyName: "Fakultas Teknik",
    role: "OPERATOR_FK"
  },
  ADMIN_FK: {
    id: "U04",
    nidn: "ADM-FT-01",
    name: "Dr. Ir. Yopa Eka Prawatya, S.T., M.Eng., IPM",
    email: "admin.ft@untan.ac.id",
    facultyId: "FT",
    facultyName: "Fakultas Teknik",
    role: "ADMIN_FK"
  },
  KETUA_LPPM: {
    id: "U05",
    nidn: "1122334455",
    name: "Prof. Dr. Ir. Ketua LPPM",
    email: "ketua@lppm.untan.ac.id",
    facultyId: "LPPM",
    facultyName: "LPPM UNTAN",
    role: "KETUA_LPPM"
  },
  ADMIN_SISTEM: {
    id: "U06",
    nidn: "SYS-01",
    name: "Administrator Sistem",
    email: "admin@simlppm.untan.ac.id",
    facultyId: "LPPM",
    facultyName: "LPPM UNTAN",
    role: "ADMIN_SISTEM"
  }
};
