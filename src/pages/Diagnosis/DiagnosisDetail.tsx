// src/pages/Diagnosis/DiagnosisDetail.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import DiagnosisProgressBar from "../../components/Diagnosis/DiagnosisProgressBar";
import DiagnosisTopBar from "../../components/Diagnosis/DiagnosisTopBar";
import DiagnosisWaveBackground from "../../components/Diagnosis/DiagnosisWaveBackground";
import { useDiagnosisDetail } from "../../components/Diagnosis/useDiagnosisDetail";
import QuestionRenderer from "../../components/Diagnosis/QuestionRenderer";
import DiagnosisAdvancedWaveOverlay from "../../components/Diagnosis/DiagnosisAdvancedWaveOverlay";

import { calcLeadingTypeFromAnswers } from "../../components/Diagnosis/score/calcLeadingTypeFromAnswers";
import type { TastingKey } from "../../types/tastingType/tastingType";
import { getWaveColor } from "../../constants/tastingType/waveBg";

const DEFAULT_WAVE_COLOR = "#2F16FF";

function hasMeaningfulAnswer(v: unknown, qType: string) {
  if (v === undefined || v === null) return false;

  if (qType === "multi_select") {
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === "string") return v.trim().length > 0;
    return false;
  }

  if (typeof v === "string") return v.trim().length > 0;

  return true;
}


function toResultTypeCode(key: string) {
  return String(key).toUpperCase();
}

export default function DiagnosisDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const isAdvanced = params.get("mode") === "advanced";

  const initialSessionId =
    (location.state?.sessionId as number | undefined) ?? undefined;

  const {
    questions,
    answers,

    stepIndex,
    total,
    current,
    value,
    isNextEnabled,
    setAnswer,
    goNext,
    goBack,
    reset,
    isSubmitting,
  } = useDiagnosisDetail({ isAdvanced, initialSessionId, autoAdvanceDelayMs: 800 });

  const [picked, setPicked] = useState(false);

  
  const [answersShadow, setAnswersShadow] = useState<Record<string, unknown>>({});

  useEffect(() => {
    setAnswersShadow(answers);
  }, [answers]);

  useEffect(() => {
    reset();
    
  }, [isAdvanced]);

  useEffect(() => {
    setPicked(false);
  }, [stepIndex]);

  if (!current) return null;

  const isLastStep = stepIndex === total - 1;

  const selectedIds =
    current.type === "multi_select"
      ? Array.isArray(value)
        ? (value as string[])
        : typeof value === "string"
        ? [value]
        : []
      : [];

  
  const showAdvancedConfirm =
    isAdvanced && isLastStep && current.type === "two_choice";

  
  const showBasicConfirm =
    !isAdvanced && isLastStep && current.type === "multi_select";

  
  const canAdvancedConfirm =
    showAdvancedConfirm &&
    typeof value === "string" &&
    value.trim().length > 0;

  
  const fallbackResultTypeCode = useMemo(() => {
    const hasAnyAnswer = Object.keys(answersShadow).length > 0;
    if (!hasAnyAnswer) return "FLORAL";

    const visibleQuestions = questions.slice(0, stepIndex + 1);
    const visibleIds = new Set(visibleQuestions.map((q) => q.id));

    const visibleAnswers: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(answersShadow)) {
      if (visibleIds.has(k)) visibleAnswers[k] = v;
    }

    const leading = calcLeadingTypeFromAnswers(
      visibleQuestions,
      visibleAnswers,
      "floral"
    ) as unknown as TastingKey;

    return toResultTypeCode(leading);
  }, [answersShadow, questions, stepIndex]);

  const waveColor = useMemo(() => {
    const hasAnyAnswer = Object.keys(answersShadow).length > 0;
    if (!hasAnyAnswer) return DEFAULT_WAVE_COLOR;

    const visibleQuestions = questions.slice(0, stepIndex + 1);

    const visibleIds = new Set(visibleQuestions.map((q) => q.id));
    const visibleAnswers: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(answersShadow)) {
      if (visibleIds.has(k)) visibleAnswers[k] = v;
    }

    const leading = calcLeadingTypeFromAnswers(
      visibleQuestions,
      visibleAnswers,
      "floral"
    ) as unknown as TastingKey;

    return getWaveColor(leading);
  }, [answersShadow, questions, stepIndex]);

  const startWaveColor =
    (location.state?.startWaveColor as string | undefined) ?? undefined;

  const startWaveColorRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (isAdvanced && startWaveColor && !startWaveColorRef.current) {
      startWaveColorRef.current = startWaveColor;
    }
  }, [isAdvanced, startWaveColor]);

  const isFirstAdvancedStep = isAdvanced && stepIndex === 0;

  const firstStepAnswered = useMemo(() => {
    if (!isFirstAdvancedStep) return true;
    const v = answersShadow[current.id];
    return hasMeaningfulAnswer(v, current.type);
  }, [answersShadow, current.id, current.type, isFirstAdvancedStep]);

  const finalWaveColor = useMemo(() => {
    if (!isAdvanced) return waveColor;

    if (isFirstAdvancedStep && !firstStepAnswered && startWaveColorRef.current) {
      return startWaveColorRef.current;
    }

    return waveColor;
  }, [isAdvanced, isFirstAdvancedStep, firstStepAnswered, waveColor]);

  const onBack = () => {
    if (stepIndex === 0) navigate(-1);
    else goBack();
  };

  const goResultLoading = (resultTypeCode: string) => {
    navigate("/diagnosis/result/loading", {
      state: {
        source: "detail",
        mode: isAdvanced ? "advanced" : "basic",
        resultTypeCode,
      },
    });
  };

  const goAdvancedLoading = (sessionId: number) => {
    navigate("/diagnosis/advanced-loading", {
      state: { sessionId, startWaveColor: waveColor },
    });
  };

  const handleNextFlow = async () => {
    try {
      const r = await goNext();
      if (!r) return;

      if (r.status === "DONE") {
        goResultLoading(r.resultTypeCode);
        return;
      }

      if (r.status === "NEED_MORE") {
        goAdvancedLoading(r.sessionId);
        return;
      }
    } catch (e) {
      
      console.error("[Diagnosis] goNext failed:", e);

      
      goResultLoading(fallbackResultTypeCode);
    }
  };

  
  const triggerPickedOnly = (durationMs: number) => {
    setPicked(true);
    window.setTimeout(() => setPicked(false), durationMs);
  };

  
  const triggerPickedThenNext = (delayMs: number) => {
    setPicked(true);
    window.setTimeout(() => {
      setPicked(false);
      void handleNextFlow();
    }, delayMs);
  };

  const advancedCount = Math.min(4, stepIndex + 1);

  return (
    <div className="relative min-h-dvh bg-white overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        {!isAdvanced && (
          <DiagnosisWaveBackground
            stepIndex={stepIndex}
            picked={picked}
            color={waveColor}
          />
        )}

        {isAdvanced && (
          <DiagnosisAdvancedWaveOverlay
            count={advancedCount}
            color={finalWaveColor}
          />
        )}
      </div>

      <div className="relative z-10 pt-[80px] pb-[120px]">
        <DiagnosisProgressBar stepIndex={stepIndex} totalSteps={total} />

        <div className="mt-[28px]">
          <DiagnosisTopBar title={current.title} onBack={onBack} />
        </div>

        <div className="mt-[170px] px-[20px]">
          <div className="mx-auto w-[335px]">
            <QuestionRenderer
              q={current}
              value={value}
              stepIndex={stepIndex}
              onChange={(v) => {
                setAnswersShadow((prev) => ({ ...prev, [current.id]: v }));
                setAnswer(v);

                
                if (current.type === "two_choice") {
                  triggerPickedOnly(120);
                }
              }}
              onCommit={() => {
                if (current.type === "dial") triggerPickedThenNext(420);
              }}
            />
          </div>
        </div>

        
        {!isLastStep && current.type === "multi_select" && (
          <div className="mt-[28px] px-[20px]">
            <div className="mx-auto w-[335px]">
              <button
                type="button"
                onClick={() => triggerPickedThenNext(140)}
                disabled={!isNextEnabled || isSubmitting}
                className={clsx(
                  "w-full h-[52px] rounded-[14px]",
                  "font-body text-body-title leading-[140%] tracking-[-0.025em] transition-opacity",
                  isNextEnabled && !isSubmitting
                    ? "bg-brand text-white"
                    : "bg-gray-200 text-gray-500"
                )}
              >
                다음
              </button>
            </div>
          </div>
        )}
      </div>

      
      {showBasicConfirm && (
        <div className="fixed left-0 right-0 bottom-0 z-20 px-[20px] pb-[34px] pointer-events-auto">
          <div className="mx-auto w-[335px]">
            <button
              type="button"
              onClick={() => triggerPickedThenNext(140)}
              disabled={!isNextEnabled || isSubmitting}
              className={clsx(
                "w-full h-[50px] rounded-[25px] p-[14px] text-center",
                "font-body text-body-title",
                selectedIds.length === 0 || isSubmitting
                  ? "bg-white text-light-blue border border-light-blue cursor-not-allowed"
                  : "bg-brand text-white cursor-pointer"
              )}
            >
              {isSubmitting ? "진단 중..." : "결과 확인하기"}
            </button>
          </div>
        </div>
      )}

    
      {showAdvancedConfirm && (
        <div className="fixed left-0 right-0 bottom-0 z-20 px-[20px] pb-[34px] pointer-events-auto">
          <div className="mx-auto w-[335px]">
            <button
              type="button"
              onClick={() => triggerPickedThenNext(140)}
              disabled={!canAdvancedConfirm || isSubmitting}
              className={clsx(
                "w-full h-[50px] rounded-[25px] p-[14px] text-center",
                "font-body text-body-title",
                !canAdvancedConfirm || isSubmitting
                  ? "bg-white text-light-blue border border-light-blue cursor-not-allowed"
                  : "bg-brand text-white cursor-pointer"
              )}
            >
              {isSubmitting ? "진단 중..." : "결과 확인하기"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
