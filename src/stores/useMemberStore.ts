import { create } from 'zustand';
import type { MemberProfileResult } from '../types/member';
import { getMemberProfile } from '../apis/member';

type MemberState = {
  profile: MemberProfileResult | null;
  isLoading: boolean;
  error: string | null;

  setProfile: (profile: MemberProfileResult | null) => void;
  fetchProfile: () => Promise<void>;
  clearProfile: () => void;
};

export const useMemberStore = create<MemberState>((set) => ({
  profile: null,
  isLoading: false,
  error: null,

  setProfile: (profile) => set({ profile }),

  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await getMemberProfile();

      set({ profile: res.result ?? null, isLoading: false });
    } catch (e: any) {
      set({
        error: e?.message ?? '프로필 조회 실패',
        isLoading: false,
      });
    }
  },

  clearProfile: () => set({ profile: null, error: null, isLoading: false }),
}));
