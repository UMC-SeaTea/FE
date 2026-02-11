//src/types/diagnosis/diagnosis.ts
import type { CommonResponse } from "../common";

export type DetailDiagnosisRequest = {
  step: 1 | 2;
  sessionId?: number;

  q1?: string;
  q2?: string;
  q3?: number;
  q4?: string[];

  q5?: string;
  q6?: string;
  q7?: string;
  q8?: string;
};

export type DetailDiagnosisResult = {
  status: "DONE" | "NEED_MORE";
  nextStep: number | null;
  resultTypeCode: string | null;
  sessionId: number;
};

export type DetailDiagnosisResponse =
  CommonResponse<DetailDiagnosisResult>;

export type DiagnosisTypeCode =
  | "FLORAL"
  | "FRUITY"
  | "OCEANIC"
  | "EARTHY"
  | "NUTTY"
  | "SMOKY"
  | "SPICES"
  | "SWEET";

export type DiagnosisResult = {
  typeCode: DiagnosisTypeCode;
  displayName: string;
  subtitle: string;
  description: string;
  imageUrl: string | null;
};

