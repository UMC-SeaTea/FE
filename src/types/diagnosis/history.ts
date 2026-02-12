import type { CommonResponse } from "../common";
import type { Page } from "../page";

export type DiagnosisMode = "QUICK" | "DETAIL";

export type DiagnosisHistoryItem = {
  sessionId: number;
  mode: DiagnosisMode;
  createdAt: string;
  typeCode: string;
  displayName: string;
  imageUrl: string | null;
};

export type DiagnosisHistoryResponse =
  CommonResponse<Page<DiagnosisHistoryItem>>;
