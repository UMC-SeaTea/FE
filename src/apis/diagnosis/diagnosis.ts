// src/apis/diagnosis.ts
import { axiosInstance } from "../axios";
import type {
  DetailDiagnosisRequest,
  DetailDiagnosisResponse,
  DiagnosisTypeCode,
} from "../../types/diagnosis/detailDiagnosis";


// 결과조회
export type DiagnosisResult = {
  typeCode: DiagnosisTypeCode;
  displayName: string;
  subtitle: string;
  description: string;
  imageUrl: string | null;
};

export type DiagnosisResultResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: DiagnosisResult;
};


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
