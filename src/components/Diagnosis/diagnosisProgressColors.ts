// src/components/Diagnosis/diagnosisProgressColors.ts
export type ProgressTheme = {
  fill: string; // css background
};

export const PROGRESS_THEMES: ProgressTheme[] = [
  {
    // step 1 (연보라)
    fill: "linear-gradient(90deg, rgba(168,158,255,1) 0%, rgba(235,233,255,1) 100%)",
  },
  {
    // step 2 (조금 더 진한 보라)
    fill: "linear-gradient(90deg, rgba(116,100,255,1) 0%, rgba(235,233,255,1) 100%)",
  },
  {
    // step 3 (블루톤)
    fill: "linear-gradient(90deg, rgba(47,22,255,1) 0%, rgba(209,214,255,1) 100%)",
  },
];
