import {
  useInfiniteQuery,
  type InfiniteData,
  type UseInfiniteQueryResult,
} from "@tanstack/react-query";
import { getDiagnosisHistory } from "../../apis/diagnosis/diagnosis";
import type { DiagnosisHistoryResponse } from "../../types/diagnosis/history";

export const useInfiniteDiagnosisHistory = (
  size = 10
): UseInfiniteQueryResult<InfiniteData<DiagnosisHistoryResponse, number>, Error> => {
  return useInfiniteQuery({
    queryKey: ["diagnosisHistoryInfinite", size] as const,
    initialPageParam: 0 as number,
    queryFn: ({ pageParam }) => getDiagnosisHistory(pageParam, size),
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      const page = lastPage.result;
      if (!page) return undefined;
      if (page.last) return undefined;
      return lastPageParam + 1;
    },
  });
};
