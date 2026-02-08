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

export type DetailDiagnosisResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    status: "DONE" | "NEED_MORE";
    nextStep: number | null;
    resultTypeCode: string | null;
    sessionId: number;
  };
};
