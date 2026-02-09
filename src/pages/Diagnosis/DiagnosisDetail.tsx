// src/pages/Diagnosis/DiagnosisDetail.tsx
import { useEffect, useMemo, useState } from "react";
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

export default function DiagnosisDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const isAdvanced = params.get("mode") === "advanced";

  const initialSessionId = (location.state?.sessionId as number | undefined) ?? undefined;

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
  } = useDiagnosisDetail({ isAdvanced, initialSessionId });

  const [picked, setPicked] = useState(false);

  /**
   * ✅ 플리커 방지용 "즉시 반영 answers"
   * - setAnswer는 비동기라 step 전환 순간 answers가 잠깐 비어 보일 수 있음
   * - shadow에 먼저 반영하고, answers 변경되면 shadow를 다시 동기화
   */
  const [answersShadow, setAnswersShadow] = useState<Record<string, unknown>>({});

  useEffect(() => {
    setAnswersShadow(answers);
  }, [answers]);

  // mode 변경 시 리셋
  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdvanced]);

  // step 이동 시 picked 상태 초기화
  useEffect(() => {
    setPicked(false);
  }, [stepIndex]);

  if (!current) return null;

  const isLastStep = stepIndex === total - 1;
  const isMulti = current.type === "multi_select";

  const selectedIds =
    current.type === "multi_select"
      ? Array.isArray(value)
        ? (value as string[])
        : typeof value === "string"
        ? [value]
        : []
      : [];

  /**
   * ✅ PM 요구사항: "현재 step까지의 답변 누적"으로 leadingType 계산 → waveColor 결정
   * ✅ answersShadow를 사용해서 step 전환 순간 DEFAULT로 떨어지는 플리커 제거
   */
  const waveColor = useMemo(() => {
    const hasAnyAnswer = Object.keys(answersShadow).length > 0;
    if (!hasAnyAnswer) return DEFAULT_WAVE_COLOR;

    // 현재 단계(= 지금까지 본 질문)까지만 누적 계산
    const visibleQuestions = questions.slice(0, stepIndex + 1);

    // 현재 단계까지만 answers 반영 (미래 답 포함 방지)
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
      state: { sessionId },
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
      console.error(e);
    }
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
          <DiagnosisWaveBackground stepIndex={stepIndex} picked={picked} color={waveColor} />
        )}
        {isAdvanced && <DiagnosisAdvancedWaveOverlay count={advancedCount} />}
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
                // ✅ 0) 즉시 반영 shadow 먼저 업데이트 (플리커 제거 핵심)
                setAnswersShadow((prev) => ({ ...prev, [current.id]: v }));

                // ✅ 1) 실제 훅 answers 업데이트
                setAnswer(v);

                // ✅ auto next
                if (current.type === "two_choice") {
                  triggerPickedThenNext(120);
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

      {isLastStep && isMulti && (
        <div className="fixed left-0 right-0 bottom-0 z-20 px-[20px] pb-[34px]">
          <div className="mx-auto w-[335px]">
            <button
              type="button"
              onClick={() => void handleNextFlow()}
              disabled={!isNextEnabled || isSubmitting}
              className={clsx(
                "w-full h-[50px] rounded-[25px] p-[14px] text-center",
                "font-body text-body-title",
                selectedIds.length === 0 || isSubmitting
                  ? "bg-white text-light-blue border border-light-blue cursor-not-allowed"
                  : "bg-brand text-white cursor-pointer"
              )}
            >
              {isSubmitting ? "처리 중..." : "결과 확인하기"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
