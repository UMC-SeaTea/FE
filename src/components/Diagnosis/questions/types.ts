// src/components/Diagnosis/questions/types.ts
export type TwoChoiceOption = { id: string; label: string };
export type MultiSelectOption = { id: string; label: string };

export type BaseQuestion = {
  id: string;
  title: string;
  theme?: "purple" | "blue" | "mint"; // 진행바/파도 컬러용 (나중에 확장)
};

export type TwoChoiceQuestion = BaseQuestion & {
  type: "two_choice";
  options: [TwoChoiceOption, TwoChoiceOption];
};

export type DialQuestion = BaseQuestion & {
  type: "dial";
  min: number; // 0
  max: number; // 100
  step?: number; // 1
  defaultValue?: number; // 75
  unit?: "%";
  // 텍스트 매핑(75% -> "힘이 조금 나요🙂")
  labelByValue?: (value: number) => string;
};

export type MultiSelectQuestion = BaseQuestion & {
  type: "multi_select";
  options: MultiSelectOption[];
  maxSelect?: number;
  ctaText?: string; // "결과 확인하기"
};

export type DiagnosisQuestion = TwoChoiceQuestion | DialQuestion | MultiSelectQuestion;
