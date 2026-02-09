import type { DiagnosisQuestion } from "./types";

export const ADVANCED_DIAGNOSIS_QUESTIONS: DiagnosisQuestion[] = [
  /**
   * Q5. (고가중치, 2지선다)
   * 혼자 깊이 생각하는 시간이 길어질수록
   */
  {
    id: "q5",
    stage: "advanced",
    type: "two_choice",
    title: "혼자 깊이 생각하는 시간이 길어질수록",
    theme: "purple",
    options: [
      {
        id: "A",
        label: "외롭고 답답해진다",
        score: [
          { type: "fruity", weight: 2 },
          { type: "spices", weight: 1 },
          { type: "sweet", weight: 2 },
          { type: "oceanic", weight: 1 },
        ],
      },
      {
        id: "B",
        label: "점점 편안해진다",
        score: [
          { type: "smoky", weight: 2 },
          { type: "nutty", weight: 1 },
          { type: "earthy", weight: 1 },
        ],
      },
    ],
  },

  /**
   * Q6. (고가중치, 2지선다)
   * 휴식 중 가장 방해되는 것은
   */
  {
    id: "q6",
    stage: "advanced",
    type: "two_choice",
    title: "휴식 중 가장 방해되는 것은",
    theme: "purple",
    options: [
      {
        id: "A",
        label: "사람의 말, 소음, 연락이다",
        score: [
          { type: "smoky", weight: 2 },
          { type: "earthy", weight: 1 },
          { type: "nutty", weight: 1 },
          { type: "sweet", weight: 1 },
        ],
      },
      {
        id: "B",
        label: "아무 일도 일어나지\n않는 지루함이다",
        score: [
          { type: "spices", weight: 2 },
          { type: "fruity", weight: 1 },
          { type: "floral", weight: 2 },
          { type: "oceanic", weight: 1 },
        ],
      },
    ],
  },

  /**
   * Q7. (고가중치, 2지선다)
   * 지금의 나에게 더 필요한 것은
   */
  {
    id: "q7",
    stage: "advanced",
    type: "two_choice",
    title: "지금의 나에게 더 필요한 것은",
    theme: "blue",
    options: [
      {
        id: "A",
        label: "안정과 정리",
        score: [
          { type: "nutty", weight: 2 },
          { type: "earthy", weight: 1 },
          { type: "smoky", weight: 1 },
          { type: "sweet", weight: 1 },
        ],
      },
      {
        id: "B",
        label: "변화와 자극",
        score: [
          { type: "floral", weight: 2 },
          { type: "spices", weight: 1 },
          { type: "fruity", weight: 1 },
          { type: "oceanic", weight: 2 },
        ],
      },
    ],
  },

  /**
   * Q8. (고가중치, 2지선다)
   * 휴식을 공간에 비유한다면
   */
  {
    id: "q8",
    stage: "advanced",
    type: "two_choice",
    title: "휴식을 공간에 비유한다면",
    theme: "mint",
    options: [
      {
        id: "A",
        label: "시야가 확\n트이는 바다",
        score: [
          { type: "oceanic", weight: 3 },
          { type: "floral", weight: 1 },
          { type: "fruity", weight: 1 },
          { type: "spices", weight: 1 },
        ],
      },
      {
        id: "B",
        label: "심신이 안정되는\n단골 카페",
        score: [
          { type: "earthy", weight: 2 },
          { type: "smoky", weight: 1 },
          { type: "nutty", weight: 1 },
          { type: "sweet", weight: 2 },
        ],
      },
    ],
  },
];
