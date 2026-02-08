import { axiosInstance } from "../axios";
import type {
  DetailDiagnosisRequest,
  DetailDiagnosisResponse,
} from "../../types/diagnosis/detailDiagnosis";

export const postDetailDiagnosis = async (
  body: DetailDiagnosisRequest
): Promise<DetailDiagnosisResponse> => {
  const res = await axiosInstance.post<DetailDiagnosisResponse>(
    "/api/diagnosis/detail",
    body
  );

  return res.data;
};
