export type QuickDiagnosisRequest = {
  keywords: string[]; 
};

export type QuickDiagnosisResult = {
  resultTypeCode: string;     
  keywords: string[];        
  scores: Record<string, number>; 
};

export type QuickDiagnosisResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: QuickDiagnosisResult;
};
