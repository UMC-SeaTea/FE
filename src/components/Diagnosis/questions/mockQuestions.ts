// src/components/Diagnosis/questions/mockQuestions.ts
import type { DiagnosisQuestion } from "./types";

export const MOCK_DIAGNOSIS_QUESTIONS: DiagnosisQuestion[] = [
  {
    id: "q1",
    type: "two_choice",
    title: "당신에게 재충전이란?",
    theme: "purple",
    options: [
      { id: "together", label: "좋은 사람들과의\n즐거운 대화" },
      { id: "alone", label: "온전히 나에게만\n집중하는 시간" },
    ],
  },
  {
    id: "q2",
    type: "two_choice",
    title: "당신에게 '휴식'은\n어떤 음악인가요?",
    theme: "purple",
    options: [
      { id: "familiar", label: "언제 들어도 편안한\n나의 최애\n플레이리스트" },
      { id: "new", label: "새로운 영감을 주는\n낯선 아티스트의 음악" },
    ],
  },
  {
    id: "q3",
    type: "dial",
    title: "오늘 당신의 에너지 레벨은\n어느 정도인가요?",
    theme: "blue",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 75,
    unit: "%",
    labelByValue: (v) => {
      if (v >= 80) return "힘이 꽤 나요 🙂";
      if (v >= 60) return "힘이 조금 나요 🙂";
      if (v >= 40) return "무난해요 🙂";
      if (v >= 20) return "조금 지쳐요 🥲";
      return "많이 지쳤어요 🥲";
    },
  },
  {
    id: "q4",
    type: "multi_select",
    title: "지금 누구와 함께\n휴식을 원하시나요?",
    theme: "mint",
    options: [
      { id: "alone", label: "혼자 있고 싶어요" },
      { id: "lover", label: "친구 또는 연인과 함께" },
      { id: "family", label: "가족과 편안하게" },
      { id: "any", label: "누구와도 상관 없어요" },
    ],
    maxSelect: 1,
    ctaText: "결과 확인하기",
  },
];
