// src/components/Diagnosis/useDiagnosisDetail.ts
import { useEffect, useMemo, useRef, useState } from "react";
import type { DiagnosisQuestion } from "../../constants/diagnosis/types";
import { BASIC_DIAGNOSIS_QUESTIONS } from "../../constants/diagnosis/basicQuestions";
import { ADVANCED_DIAGNOSIS_QUESTIONS } from "../../constants/diagnosis/advancedQuestions";
import { useDetailDiagnosis } from "../../hooks/diagnosis/useDetailDiagnosis";
import type { DetailDiagnosisRequest } from "../../types/diagnosis/diagnosis";

type Answers = Record<string, unknown>;

export type GoNextResult =
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
  autoAdvanceDelayMs?: number; // default 800
};

export function useDiagnosisDetail(params: Params = {}) {
  const isAdvanced = params.isAdvanced ?? false;
  const autoAdvanceDelayMs = params.autoAdvanceDelayMs ?? 800;

  const questions: DiagnosisQuestion[] = isAdvanced
    ? ADVANCED_DIAGNOSIS_QUESTIONS
    : BASIC_DIAGNOSIS_QUESTIONS;

  const total = questions.length;

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const [sessionId, setSessionId] = useState<number | null>(
    params.initialSessionId ?? null
  );

  const { mutateAsync, isPending } = useDetailDiagnosis();

  const current = questions[stepIndex];
  const value = current ? answers[current.id] : undefined;

  const isLastStep = stepIndex >= total - 1;

  const progressRatio = useMemo(() => {
    if (!total) return 0;
    return (stepIndex + 1) / total;
  }, [stepIndex, total]);

  const isNextEnabled = useMemo(() => {
    if (!current) return false;

    if (current.type === "two_choice") {
      return typeof value === "string" && value.length > 0;
    }

    if (current.type === "dial") {
      return typeof value === "number";
    }

    if (current.type === "multi_select") {
      if (Array.isArray(value)) {
        const min = current.minSelect ?? 1;
        const max = current.maxSelect ?? 2;
        return value.length >= min && value.length <= max;
      }
      if (typeof value === "string") return value.length > 0;
      return false;
    }

    return false;
  }, [current, value]);

  
  const userActionRef = useRef(false);
  const autoTimerRef = useRef<number | null>(null);
  const clearAutoTimer = () => {
    if (autoTimerRef.current != null) {
      window.clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  };

  const setAnswer = (v: unknown) => {
    if (!current) return;

  
    if (current.type === "multi_select") {
      const max = 2;
      if (Array.isArray(v) && v.length > max) return;
    }

    userActionRef.current = true;
    clearAutoTimer();

    setAnswers((prev) => ({ ...prev, [current.id]: v }));
  };

  const buildStep1Body = (): DetailDiagnosisRequest => ({
    step: 1,
    q1: normalizeString(answers.q1),
    q2: normalizeString(answers.q2),
    q3: normalizeNumber(answers.q3),
    q4: normalizeStringArray(answers.q4),
  });

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

    
    if (!isAdvanced && current?.id === "q4") {
      const res = await mutateAsync(buildStep1Body());
      if (!res.isSuccess) throw new Error(res.message);
      if (!res.result) throw new Error("result is null");

      const status = res.result.status;

      if (status === "DONE") {
        const code = res.result.resultTypeCode ?? "";
        if (!code) throw new Error("resultTypeCode is missing");
        return { status: "DONE", resultTypeCode: code };
      }

      if (status === "NEED_MORE") {
        const sid = res.result.sessionId;
        if (!sid) throw new Error("sessionId is missing");
        setSessionId(sid);
        return { status: "NEED_MORE", sessionId: sid };
      }

      throw new Error(`Unexpected status: ${status}`);
    }

    
    if (isAdvanced && current?.id === "q8") {
      if (!sessionId) throw new Error("sessionId is missing for step2");

      const res = await mutateAsync(buildStep2Body());
      if (!res.isSuccess) throw new Error(res.message);
      if (!res.result) throw new Error("result is null");

      const code = res.result.resultTypeCode ?? "";
      if (!code) throw new Error("resultTypeCode is missing");
      return { status: "DONE", resultTypeCode: code };
    }

    
    if (stepIndex >= total - 1) return;
    setStepIndex((prev) => prev + 1);
    return { status: "NEXT" };
  };

  const goBack = () => {
    if (stepIndex <= 0) return;
    clearAutoTimer();
    userActionRef.current = false;
    setStepIndex((prev) => prev - 1);
  };

  const reset = () => {
    clearAutoTimer();
    userActionRef.current = false;
    setStepIndex(0);
    setAnswers({});
    setSessionId(params.initialSessionId ?? null);
  };

  
  useEffect(() => {
    clearAutoTimer();
    userActionRef.current = false;
  }, [stepIndex]);

  
  useEffect(() => {
    clearAutoTimer();

    if (!current) return;
    if (isPending) return;

    
    if (!userActionRef.current) return;

    
    if (isLastStep) return;

    
    if (current.type === "dial") return;

    
    const hasCta = current.type === "multi_select" ? !!current.ctaText : false;
    if (hasCta) return;

    if (!isNextEnabled) return;

    userActionRef.current = false;

    autoTimerRef.current = window.setTimeout(() => {
      void goNext();
    }, autoAdvanceDelayMs);

    return () => clearAutoTimer();
    
  }, [
    current?.id,
    current?.type,
    isNextEnabled,
    isPending,
    value,
    autoAdvanceDelayMs,
    isLastStep,
  ]);

  
  const showConfirmButton = isAdvanced && current?.id === "q8";

  
  const confirm = async () => {
    return await goNext();
  };

  return {
    questions,
    answers,

    stepIndex,
    total,
    current,
    value,
    progressRatio,
    isNextEnabled,

    setAnswer,
    goNext,
    goBack,
    reset,

    isSubmitting: isPending,
    sessionId,
    setSessionId,

    
    showConfirmButton,
    confirm,
  };
}
