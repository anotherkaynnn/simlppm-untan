import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Proposal } from '@/types';
import { mockProposals } from '@/mock/data/proposals';

interface ProposalStore {
  proposals: Proposal[];
  addProposal: (proposal: Proposal) => void;
}

export const useProposalStore = create<ProposalStore>()(
  persist(
    (set) => ({
      proposals: mockProposals,
      addProposal: (proposal) => 
        set((state) => ({ 
          proposals: [proposal, ...state.proposals] 
        })),
    }),
    {
      name: 'simlppm-proposal-store',
    }
  )
);
