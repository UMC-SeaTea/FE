import type { DiagnosisQuestion } from "./types";

export const BASIC_DIAGNOSIS_QUESTIONS: DiagnosisQuestion[] = [
  /**
   * Q1. (2지선다)
   */
  {
    id: "q1",
    stage: "basic",
    type: "two_choice",
    title: "지금 나에게 휴식이\n필요하다고 느끼는 이유는\n무엇인가요?",
    theme: "purple",
    options: [
      {
        id: "A",
        label: "너무 많은 자극으로\n지쳤다",
        score: [
          { type: "smoky", weight: 1 },
          { type: "nutty", weight: 1 },
          { type: "earthy", weight: 1 },
          { type: "oceanic", weight: 1 },
        ],
      },
      {
        id: "B",
        label: "일상이 지겹게\n반복된다",
        score: [
          { type: "fruity", weight: 1 },
          { type: "spices", weight: 1 },
          { type: "floral", weight: 1 },
          { type: "sweet", weight: 1 },
        ],
      },
    ],
  },

  /**
   * Q2. (2지선다)
   */
  {
    id: "q2",
    stage: "basic",
    type: "two_choice",
    title: "가장 최근에 휴식을 경험했던\n나는 어떤 모습이었나요?",
    theme: "purple",
    options: [
      {
        id: "A",
        label: "조용한 공간에서\n혼자 있는 나",
        score: [
          { type: "smoky", weight: 1 },
          { type: "nutty", weight: 1 },
          { type: "earthy", weight: 1 },
          { type: "oceanic", weight: 1 },
        ],
      },
      {
        id: "B",
        label: "어딘가로 나가\n움직이는 나",
        score: [
          { type: "fruity", weight: 1 },
          { type: "spices", weight: 1 },
          { type: "oceanic", weight: 1 },
          { type: "sweet", weight: 1 },
        ],
      },
    ],
  },

  /**
   * Q3. (다이얼, 0~100)
   */
  {
    id: "q3",
    stage: "basic",
    type: "dial",
    title: "오늘 나의 에너지 레벨은\n어느 정도인가요?",
    theme: "blue",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 0,
    unit: "%",
    dialScoreByRange: [
      {
        min: 0,
        max: 30,
        score: [
          { type: "smoky", weight: 2 },
          { type: "nutty", weight: 1 },
          { type: "earthy", weight: 1 },
        ],
      },
      {
        min: 31,
        max: 60,
        score: [
          { type: "oceanic", weight: 1 },
          { type: "sweet", weight: 1 },
          { type: "floral", weight: 1 },
        ],
      },
      {
        min: 61,
        max: 100,
        score: [
          { type: "fruity", weight: 2 },
          { type: "spices", weight: 1 },
          { type: "floral", weight: 1 },
        ],
      },
    ],
  },

  /**
   * Q4. (다중 선택, 최소 1개, 최대 2개)
   */
  {
    id: "q4",
    stage: "basic",
    type: "multi_select",
    title: "지금 나는 누구와 함께\n휴식하길 원하나요?",
    theme: "mint",
    minSelect: 1,
    maxSelect: 2,
    ctaText: "결과 확인하기",
    options: [
      {
        id: "alone",
        label: "혼자 있고 싶어요",
        score: [
          { type: "smoky", weight: 1 },
          { type: "nutty", weight: 1 },
          { type: "oceanic", weight: 1 },
        ],
      },
      {
        id: "lover",
        label: "친구 또는 연인과 함께",
        score: [
          { type: "fruity", weight: 1 },
          { type: "sweet", weight: 1 },
          { type: "floral", weight: 1 },
        ],
      },
      {
        id: "family",
        label: "가족과 편안하게",
        score: [
          { type: "earthy", weight: 1 },
          { type: "sweet", weight: 1 },
          { type: "oceanic", weight: 1 },
        ],
      },
      {
        id: "any",
        label: "누구와도 상관 없어요",
        score: [
          { type: "spices", weight: 1 },
          { type: "floral", weight: 1 },
          { type: "nutty", weight: 1 },
        ],
      },
    ],
  },
];
