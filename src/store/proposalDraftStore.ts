import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProposalType } from '@/types';

// Struktur Data Draft (Parsial dari Struktur Asli)
export interface ProposalDraft {
  // Step 1: Info Umum
  title: string;
  type: ProposalType | null;
  schemeId: string;
  fieldOfStudy: string;
  year: number;
  duration: number; // bulan

  // Step 2: Anggota Tim
  members: Array<{
    nidn: string;
    name: string;
    role: 'KETUA' | 'ANGGOTA_DOSEN' | 'ANGGOTA_MAHASISWA' | 'ANGGOTA_LAIN';
    faculty?: string;
  }>;

  // Step 3: Rencana Anggaran
  budgetDetails: Array<{
    id: string;
    description: string;
    amount: number;
  }>;

  // Step 4: Berkas
  files: Array<{
    id: string;
    category: string;
    fileName: string;
  }>;

  // Step 5: Luaran
  expectedOutputs: Array<string>;
}

const initialDraftState: ProposalDraft = {
  title: '',
  type: null,
  schemeId: '',
  fieldOfStudy: '',
  year: new Date().getFullYear(),
  duration: 6,
  members: [],
  budgetDetails: [],
  files: [],
  expectedOutputs: [],
};

interface ProposalDraftStore {
  draft: ProposalDraft;
  currentStep: number;
  setDraft: (partialDraft: Partial<ProposalDraft>) => void;
  setCurrentStep: (step: number) => void;
  resetDraft: () => void;
}

export const useProposalDraftStore = create<ProposalDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraftState,
      currentStep: 1,
      setDraft: (partialDraft) => 
        set((state) => ({ 
          draft: { ...state.draft, ...partialDraft } 
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      resetDraft: () => set({ draft: initialDraftState, currentStep: 1 }),
    }),
    {
      name: 'simlppm-proposal-draft',
    }
  )
);
