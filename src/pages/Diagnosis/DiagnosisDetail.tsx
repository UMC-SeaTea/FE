// src/pages/Diagnosis/DiagnosisDetail.tsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import DiagnosisProgressBar from "../../components/Diagnosis/DiagnosisProgressBar";
import DiagnosisTopBar from "../../components/Diagnosis/DiagnosisTopBar";
import DiagnosisWaveBackground from "../../components/Diagnosis/DiagnosisWaveBackground";
import { useDiagnosisDetail } from "../../components/Diagnosis/useDiagnosisDetail";
import QuestionRenderer from "../../components/Diagnosis/QuestionRenderer";
import clsx from "clsx";

import DiagnosisAdvancedWaveOverlay from "../../components/Diagnosis/DiagnosisAdvancedWaveOverlay";

export default function DiagnosisDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const isAdvanced = params.get("mode") === "advanced";

  // ✅ advanced-loading에서 넘긴 sessionId 받기
  const initialSessionId = (location.state?.sessionId as number | undefined) ?? undefined;

  const {
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

  const [, setPicked] = useState(false);

  // ✅ mode가 바뀌면(= basic -> advanced) 질문 흐름 리셋
  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdvanced]);

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

  const onBack = () => {
    if (stepIndex === 0) navigate(-1);
    else goBack();
  };

  // ✅ DONE일 때만 결과 로딩으로 이동 (resultTypeCode 전달)
  const goResultLoading = (resultTypeCode: string) => {
    navigate("/diagnosis/result/loading", {
      state: {
        source: "detail",
        mode: isAdvanced ? "advanced" : "basic",
        resultTypeCode, // ✅ 중요: 결과/테마/배경에 쓰게 될 값
      },
    });
  };

  // ✅ NEED_MORE면 advanced-loading으로 이동하며 sessionId 전달
  const goAdvancedLoading = (sessionId: number) => {
    navigate("/diagnosis/advanced-loading", {
      state: { sessionId },
    });
  };

  // ✅ goNext 실행 후 결과 분기 처리 (DONE/NEED_MORE/NEXT)
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

      // NEXT면 그냥 훅 안에서 stepIndex 증가 처리됨
    } catch (e) {
      console.error(e);
      // TODO: 토스트/모달 등 에러 UI 넣기
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
        {!isAdvanced && <DiagnosisWaveBackground stepIndex={stepIndex} />}
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
                setAnswer(v);

                // ✅ two_choice는 기존처럼 자동 다음
                if (current.type === "two_choice") {
                  // 마지막 단계여도 "그냥 결과로 이동"이 아니라 API goNext 결과로 처리해야 함
                  triggerPickedThenNext(120);
                }
              }}
              onCommit={() => {
                // ✅ dial은 기존처럼 commit 시 자동 다음
                if (current.type === "dial") triggerPickedThenNext(420);
              }}
            />
          </div>
        </div>

        {/* ✅ 중간 multi_select는 "다음" 버튼 */}
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

      {/* ✅ 마지막 multi_select는 '결과 확인하기' 버튼
          - 기존에는 그냥 결과로 갔지만
          - 이제는 API 호출(goNext) 결과에 따라 DONE/NEED_MORE 처리해야 함 */}
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
