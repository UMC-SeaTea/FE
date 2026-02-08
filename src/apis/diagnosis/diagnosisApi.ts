import { axiosInstance } from "../axios";
import type { QuickDiagnosisRequest, QuickDiagnosisResponse } from "./diagnosisTypes";

export async function postQuickDiagnosis(
  payload: QuickDiagnosisRequest
): Promise<QuickDiagnosisResponse> {
  const res = await axiosInstance.post("/api/diagnosis/quick/test?memberId=3", payload);
  return res.data;
}
