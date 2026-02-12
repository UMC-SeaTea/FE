//src/constants/diagnosis/types.ts
export type TastingNote =
  | "smoky"
  | "oceanic"
  | "fruity"
  | "floral"
  | "earthy"
  | "sweet"
  | "spices"
  | "nutty";

export type DiagnosisStage = "basic" | "advanced";

export type ScoreWeight = {
  type: TastingNote;
  weight: number;
};

export type DialScoreRange = {
  min: number; 
  max: number; 
  score: readonly ScoreWeight[];
};

export type BaseQuestion = {
  id: string;
  stage: DiagnosisStage;
  title: string;
  theme?: "purple" | "blue" | "mint";
};

export type TwoChoiceOption = {
  id: string;
  label: string;
  score: readonly ScoreWeight[];
};

export type MultiSelectOption = {
  id: string;
  label: string;
  score: readonly ScoreWeight[];
};

export type TwoChoiceQuestion = BaseQuestion & {
  type: "two_choice";
  options: [TwoChoiceOption, TwoChoiceOption];
};

export type DialQuestion = BaseQuestion & {
  type: "dial";
  min: number;
  max: number;
  step: number;
  defaultValue?: number;
  unit?: "%";

  dialScoreByRange: readonly DialScoreRange[];
};

export type MultiSelectQuestion = BaseQuestion & {
  type: "multi_select";
  options: MultiSelectOption[];
  minSelect?: number;
  maxSelect?: number;
  ctaText?: string;
};

export type DiagnosisQuestion =
  | TwoChoiceQuestion
  | DialQuestion
  | MultiSelectQuestion;
