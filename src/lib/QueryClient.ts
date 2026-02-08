import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 신선도 유지 시간
      staleTime: 1000 * 30, // 30초
      retry: 2,
    },
    mutations: {
      retry: 2,
    },
  },
});
