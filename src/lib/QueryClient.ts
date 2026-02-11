// src/lib/QueryClient.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, 
      refetchOnWindowFocus: false,
      staleTime: 1000 * 30, 
    },
    mutations: {
      retry: 2,
    },
  },
});
