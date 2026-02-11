import { useQuery } from "@tanstack/react-query";
import { getDiagnosisResultMe } from "../../apis/diagnosis/diagnosis";

export const useDiagnosisResult = () => {
  return useQuery({
    queryKey: ["diagnosisResult", "me"],
    queryFn: getDiagnosisResultMe,
  });
};