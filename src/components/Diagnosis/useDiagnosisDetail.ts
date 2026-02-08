import { useMemo, useState } from "react";

import type { DiagnosisQuestion } from "../../constants/diagnosis/types";
import { BASIC_DIAGNOSIS_QUESTIONS } from "../../constants/diagnosis/basicQuestions";
import { ADVANCED_DIAGNOSIS_QUESTIONS } from "../../constants/diagnosis/advancedQuestions";

type Answers = Record<string, unknown>;

export function useDiagnosisDetail(isAdvanced = false) {
  const questions: DiagnosisQuestion[] = isAdvanced
    ? ADVANCED_DIAGNOSIS_QUESTIONS
    : BASIC_DIAGNOSIS_QUESTIONS;

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

    if (current.type === "two_choice") return typeof value === "string" && value.length > 0;

    if (current.type === "dial") return typeof value === "number";

    if (current.type === "multi_select") {
      if (Array.isArray(value)) {
        const min = current.minSelect ?? 1;
        const max = current.maxSelect ?? Infinity;
        return value.length >= min && value.length <= max;
      }
      if (typeof value === "string") return value.length > 0;
      return false;
    }

    return false;
  }, [current, value]);

  const setAnswer = (v: unknown) => {
    if (!current) return;


    if (current.type === "multi_select") {
      const max = current.maxSelect ?? Infinity;
      if (Array.isArray(v) && v.length > max) return;
    }

    setAnswers((prev) => ({ ...prev, [current.id]: v }));
  };

  const goNext = () => {
    if (!isNextEnabled) return;
    if (stepIndex >= total - 1) return;
    setStepIndex((prev) => prev + 1);
  };

  const goBack = () => {
    if (stepIndex <= 0) return;
    setStepIndex((prev) => prev - 1);
  };

  const reset = () => {
    setStepIndex(0);
    setAnswers({});
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
    reset,
  };
}
