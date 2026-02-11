// src/apis/diagnosis.ts
import { axiosInstance } from "../axios";
import type {
  DetailDiagnosisRequest,
  DetailDiagnosisResponse,
  DiagnosisResult,
  QuickDiagnosisRequest,
  QuickDiagnosisResponse,
} from "../../types/diagnosis/diagnosis";
import type { CommonResponse } from "../../types/common";


export type DiagnosisResultResponse = CommonResponse<DiagnosisResult>;

export const postDetailDiagnosis = async (
  body: DetailDiagnosisRequest
): Promise<DetailDiagnosisResponse> => {
  const res = await axiosInstance.post<DetailDiagnosisResponse>(
    "/api/diagnosis/detail",
    body
  );
  return res.data;
};

export const getDiagnosisResultMe = async (): Promise<DiagnosisResultResponse> => {
  const res = await axiosInstance.get<DiagnosisResultResponse>("/api/diagnosis/me");
  return res.data;
};


export const postQuickDiagnosis = async (
  body: QuickDiagnosisRequest
): Promise<QuickDiagnosisResponse> => {
  const { data } = await axiosInstance.post<QuickDiagnosisResponse>(
    "/api/diagnosis/quick/test",
    body
  );

  return data;
};