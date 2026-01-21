export type TwoChoiceQuestion = {
  id: string;
  type: "two_choice";
  title: string;
  choices: { id: string; label: string }[];
};

export type MultiSelectQuestion = {
  id: string;
  type: "multi_select";
  title: string;
  choices: { id: string; label: string }[];
  min?: number;
  max?: number;
};

export type DialQuestion = {
  id: string;
  type: "dial";
  title: string;
  min: number;
  max: number;
  step?: number;
  labels?: { left: string; right: string };
};

export type DiagnosisQuestion = TwoChoiceQuestion | MultiSelectQuestion | DialQuestion;

export const DIAGNOSIS_QUESTIONS: DiagnosisQuestion[] = [
  {
    id: "q1",
    type: "two_choice",
    title: "당신에게 재충전이란?",
    choices: [
      { id: "together", label: "좋은 사람들과의\n즐거운 대화" },
      { id: "alone", label: "온전히 나에게만\n집중하는 시간" },
    ],
  },
  {
    id: "q2",
    type: "two_choice",
    title: "당신에게 ‘휴식’은\n어떤 음악인가요?",
    choices: [
      { id: "familiar", label: "언제 들어도 편안한\n나의 최애\n플레이리스트" },
      { id: "new", label: "새로운 영감을 주는\n낯선 아티스트의 음악" },
    ],
  },
  {
    id: "q3",
    type: "dial",
    title: "오늘 당신의 에너지 레벨은\n어느 정도인가요?",
    min: 0,
    max: 100,
    step: 1,
    labels: { left: "낮음", right: "높음" },
  },
  {
    id: "q4",
    type: "multi_select",
    title: "지금 누구와 함께\n휴식을 즐기고싶나요?",
    choices: [
      { id: "alone", label: "혼자 있고 싶어요" },
      { id: "friend", label: "친구와 함께할래" },
      { id: "family", label: "가족과 함께할래" },
      { id: "partner", label: "누구라도 함께면 좋아요" },
    ],
    min: 1,
    max: 1, 
  },
];
