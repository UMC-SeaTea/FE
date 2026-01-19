import { useMemo, useState } from "react";
import { MOCK_DIAGNOSIS_QUESTIONS } from "./questions/mockQuestions";
import type { DiagnosisQuestion } from "./questions/types";

type Answers = Record<string, unknown>;

export function useDiagnosisDetail() {
  const questions: DiagnosisQuestion[] = MOCK_DIAGNOSIS_QUESTIONS;
  const total = questions.length;

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const current = questions[stepIndex];

  const progressRatio = useMemo(() => {
    if (!total) return 0;
    return (stepIndex + 1) / total;
  }, [stepIndex, total]);

  const value = current ? answers[current.id] : undefined;

  const isNextEnabled = useMemo(() => {
    if (!current) return false;

    // 타입별 validation
    if (current.type === "two_choice") return typeof value === "string" && value.length > 0;
    if (current.type === "dial") return typeof value === "number";
    if (current.type === "multi_select") {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === "string") return value.length > 0;
      return false;
    }
    return false;
  }, [current, value]);

  const setAnswer = (v: unknown) => {
    if (!current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: v }));
  };

  const goNext = () => {
    if (!isNextEnabled) return;
    if (stepIndex >= total - 1) {
      // TODO: 결과 페이지 이동
      return;
    }
    setStepIndex((prev) => prev + 1);
  };

  const goBack = () => {
    if (stepIndex <= 0) return;
    setStepIndex((prev) => prev - 1);
  };

  return {
    stepIndex,
    total,
    current,
    answers,
    value,
    progressRatio,
    isNextEnabled,
    setAnswer,
    goNext,
    goBack,
  };
}
