export type TwoChoiceOption = { id: string; label: string };
export type MultiSelectOption = { id: string; label: string };

export type BaseQuestion = {
  id: string;
  title: string;
  theme?: "purple" | "blue" | "mint";
};

export type TwoChoiceQuestion = BaseQuestion & {
  type: "two_choice";
  options: [TwoChoiceOption, TwoChoiceOption];
};

export type DialQuestion = BaseQuestion & {
  type: "dial";
  min: number; 
  max: number; 
  step?: number; 
  defaultValue?: number; 
  unit?: "%";

  labelByValue?: (value: number) => string;
};

export type MultiSelectQuestion = BaseQuestion & {
  type: "multi_select";
  options: MultiSelectOption[];
  maxSelect?: number;
  ctaText?: string; 
};

export type DiagnosisQuestion = TwoChoiceQuestion | DialQuestion | MultiSelectQuestion;
