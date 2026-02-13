import { axiosInstance } from '../axios';

import type {
  DetailDiagnosisRequest,
  DetailDiagnosisResponse,
  DiagnosisResult,
  QuickDiagnosisRequest,
  QuickDiagnosisResponse,
} from '../../types/diagnosis/diagnosis';

import type { CommonResponse } from '../../types/common';
import type { DiagnosisHistoryResponse } from '../../types/diagnosis/history';

export type DiagnosisResultResponse = CommonResponse<DiagnosisResult>;

export const getDiagnosisResultMe =
  async (): Promise<DiagnosisResultResponse> => {
    const res =
      await axiosInstance.get<DiagnosisResultResponse>('/api/diagnosis/me');
    return res.data;
  };

export const postDetailDiagnosis = async (
  body: DetailDiagnosisRequest
): Promise<DetailDiagnosisResponse> => {
  const res = await axiosInstance.post<DetailDiagnosisResponse>(
    '/api/diagnosis/detail',
    body
  );
  return res.data;
};

export const postQuickDiagnosis = async (
  payload: QuickDiagnosisRequest
): Promise<QuickDiagnosisResponse> => {
  const { data } = await axiosInstance.post<QuickDiagnosisResponse>(
    '/api/diagnosis/quick',
    payload
  );
  return data;
};

export const getDiagnosisHistory = async (
  page = 0,
  size = 10
): Promise<DiagnosisHistoryResponse> => {
  const res = await axiosInstance.get<DiagnosisHistoryResponse>(
    '/api/diagnosis/me/history',
    { params: { page, size } }
  );

  return res.data;
};
