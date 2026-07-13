import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProposalType } from '@/types';

// Struktur Data Draft (Parsial dari Struktur Asli)
export interface ProposalDraft {
  // Step 1: Info Umum
  title: string;
  type: string;
  schemeId: string;
  fieldOfStudy: string;
  managementUnit: string;
  year: number;
  budget: number;
  fundingSource: string;

  // Step 2: Anggota Tim
  dosenList: Array<{ id: number; id_person: string; nidn: string; nama: string; tugas: string }>;
  mahasiswaList: Array<{ id: number; id_person: string; nim: string; nama: string; tugas: string }>;
  tendikList: Array<{ id: number; nama: string; tugas: string }>;

  // Step 3: Berkas
  fileName: string;
}

const initialDraftState: ProposalDraft = {
  title: '',
  type: '',
  schemeId: '',
  fieldOfStudy: '',
  managementUnit: 'Fakultas Hukum',
  year: new Date().getFullYear(),
  budget: 0,
  fundingSource: '',
  dosenList: [],
  mahasiswaList: [],
  tendikList: [],
  fileName: '',
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
