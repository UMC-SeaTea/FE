import { useMemo, useState } from "react";

import type { DiagnosisQuestion } from "../../constants/diagnosis/types";
import { BASIC_DIAGNOSIS_QUESTIONS } from "../../constants/diagnosis/basicQuestions";
import { ADVANCED_DIAGNOSIS_QUESTIONS } from "../../constants/diagnosis/advancedQuestions";

import { useDetailDiagnosis } from "../../hooks/diagnosis/useDetailDiagnosis";
import type { DetailDiagnosisRequest } from "../../types/diagnosis/detailDiagnosis";

type Answers = Record<string, unknown>;

type GoNextResult =
  | { status: "NEXT" }
  | { status: "NEED_MORE"; sessionId: number }
  | { status: "DONE"; resultTypeCode: string };

function normalizeString(v: unknown) {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

function normalizeNumber(v: unknown) {
  if (typeof v === "number") return v;
  if (v == null) return undefined;
  const n = Number(v);
  return Number.isNaN(n) ? undefined : n;
}

function normalizeStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String);
  if (typeof v === "string" && v.length > 0) return [v];
  return [];
}

type Params = {
  isAdvanced?: boolean;
  initialSessionId?: number | null;
};

export function useDiagnosisDetail(params: Params = {}) {
  const isAdvanced = params.isAdvanced ?? false;

  const questions: DiagnosisQuestion[] = isAdvanced
    ? ADVANCED_DIAGNOSIS_QUESTIONS
    : BASIC_DIAGNOSIS_QUESTIONS;

  const total = questions.length;

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  // ✅ 라우트 이동 후에도 주입 가능
  const [sessionId, setSessionId] = useState<number | null>(params.initialSessionId ?? null);

  const { mutateAsync, isPending } = useDetailDiagnosis();

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

  // ✅ step1 payload
  const buildStep1Body = (): DetailDiagnosisRequest => ({
    step: 1,
    q1: normalizeString(answers.q1),
    q2: normalizeString(answers.q2),
    q3: normalizeNumber(answers.q3),
    q4: normalizeStringArray(answers.q4),
  });

  // ✅ step2 payload
  const buildStep2Body = (): DetailDiagnosisRequest => ({
    step: 2,
    sessionId: sessionId ?? undefined,
    q5: normalizeString(answers.q5),
    q6: normalizeString(answers.q6),
    q7: normalizeString(answers.q7),
    q8: normalizeString(answers.q8),
  });

  const goNext = async (): Promise<GoNextResult | void> => {
    if (!isNextEnabled) return;
    if (isPending) return;

    // ✅ BASIC 마지막(q4)에서 step1 제출
    if (!isAdvanced && current?.id === "q4") {
      const res = await mutateAsync(buildStep1Body());
      if (!res.isSuccess) throw new Error(res.message);

      if (res.result.status === "DONE") {
        const code = res.result.resultTypeCode ?? "";
        if (!code) throw new Error("resultTypeCode is missing");
        return { status: "DONE", resultTypeCode: code };
      }

      // NEED_MORE
      const sid = res.result.sessionId;
      setSessionId(sid);
      return { status: "NEED_MORE", sessionId: sid };
    }

    // ✅ ADVANCED 마지막(q8)에서 step2 제출
    if (isAdvanced && current?.id === "q8") {
      if (!sessionId) throw new Error("sessionId is missing for step2");

      const res = await mutateAsync(buildStep2Body());
      if (!res.isSuccess) throw new Error(res.message);

      const code = res.result.resultTypeCode ?? "";
      if (!code) throw new Error("resultTypeCode is missing");
      return { status: "DONE", resultTypeCode: code };
    }

    // ✅ 일반 다음
    if (stepIndex >= total - 1) return;
    setStepIndex((prev) => prev + 1);
    return { status: "NEXT" };
  };

  const goBack = () => {
    if (stepIndex <= 0) return;
    setStepIndex((prev) => prev - 1);
  };

  const reset = () => {
    setStepIndex(0);
    setAnswers({});
    setSessionId(params.initialSessionId ?? null);
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

    isSubmitting: isPending,
    sessionId,
    setSessionId, // ✅ advanced-loading에서 주입/수정 필요하면 사용
  };
}
