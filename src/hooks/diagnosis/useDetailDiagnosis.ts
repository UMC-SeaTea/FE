import { useMutation } from "@tanstack/react-query";
import type {
  DetailDiagnosisRequest,
  DetailDiagnosisResponse,
} from "../../types/diagnosis/detailDiagnosis";
import { postDetailDiagnosis } from "../../apis/diagnosis/detailDiagnosis";

export const useDetailDiagnosis = () => {
  return useMutation<DetailDiagnosisResponse, Error, DetailDiagnosisRequest>({
    mutationFn: postDetailDiagnosis,
  });
};
