// src/components/Diagnosis/questions/mockQuestions.ts
import type { DiagnosisQuestion } from "./types";

export const MOCK_DIAGNOSIS_QUESTIONS: DiagnosisQuestion[] = [
  {
    id: "q1",
    type: "two_choice",
    title: "지금 나에게 휴식이\n필요하다고 느끼는 이유는\n무엇인가요?",
    theme: "purple",
    options: [
      { id: "together", label: "너무 많은 자극으로\n지쳤다" },
      { id: "alone", label: "일상이 지겹게\n반복된다" },
    ],
  },
  {
    id: "q2",
    type: "two_choice",
    title: "가장 최근에 휴식을 경험했던\n나는 어떤 모습이었나요?",
    theme: "purple",
    options: [
      { id: "familiar", label: "조용한 공간에서\n혼자 있는 나" },
      { id: "new", label: "어딘가로 나가\n움직이는 나" },
    ],
  },
  {
    id: "q3",
    type: "dial",
    title: "오늘 나의 에너지 레벨은\n어느 정도인가요?",
    theme: "blue",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 75,
    unit: "%",
    labelByValue: (v) => {
      if (v >= 100) return "힘이 꽤 나요 🙂";
      if (v >= 60) return "무난해요 🙂";
      if (v >= 30) return "조금 지쳐요 🥲";
      return "많이 지쳤어요 🥲";
    },
  },
  {
    id: "q4",
    type: "multi_select",
    title: "지금 나는 누구와 함께\n휴식하길 원하나요?",
    theme: "mint",
    options: [
      { id: "alone", label: "혼자 있고 싶어요" },
      { id: "lover", label: "친구 또는 연인과 함께" },
      { id: "family", label: "가족과 편안하게" },
      { id: "any", label: "누구와도 상관 없어요" },
    ],
    maxSelect: 4,
    ctaText: "결과 확인하기",
  },
];
