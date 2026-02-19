import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getDiagnosisHistory } from '../../apis/diagnosis/diagnosis';
import type { DiagnosisHistoryResponse } from '../../types/diagnosis/history';

export const useDiagnosisHistory = (page: number, size = 10) => {
  return useQuery<DiagnosisHistoryResponse>({
    queryKey: ['diagnosisHistory', page, size],
    queryFn: () => getDiagnosisHistory(page, size),
    placeholderData: keepPreviousData,
  });
};

export const useDiagnosisHisotryGuard = () => {
  return useQuery<DiagnosisHistoryResponse>({
    queryKey: ['diagnosisHistory', 0, 10],
    queryFn: () => getDiagnosisHistory(0, 10),
    placeholderData: undefined,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
};
