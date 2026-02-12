import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type RecentItem = {
  id: string;
  name: string;
  createdAt: number;
};

type RecentSearchState = {
  recentItems: RecentItem[];
  addRecent: (keyword: string) => void;
  removeRecent: (id: string) => void;
};

const MAX_RECENT = 10;

export const useRecentSearchStore = create<RecentSearchState>()(
  persist(
    (set, get) => ({
      recentItems: [],

      addRecent: (keyword: string) => {
        const name = keyword.trim();
        if (!name) return;

        const now = Date.now();
        const prev = get().recentItems;

        // 같은 키워드는 제거 후 최신으로
        const filtered = prev.filter((item) => item.name !== name);

        const newItem: RecentItem = {
          id: `${now}-${Math.random()}`,
          name,
          createdAt: now,
        };

        set({ recentItems: [newItem, ...filtered].slice(0, MAX_RECENT) });
      },

      removeRecent: (id: string) => {
        set((state) => ({
          recentItems: state.recentItems.filter((item) => item.id !== id),
        }));
      },
    }),
    {
      name: 'recent_searches',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
