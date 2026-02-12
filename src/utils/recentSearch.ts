const STORAGE_KEY = 'recentSearches';

export type RecentItem = {
  id: string;
  name: string;
  timeText: string;
};

export const getRecentSearches = (): RecentItem[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveRecentSearches = (items: RecentItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};
