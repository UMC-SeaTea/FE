// src/pages/Diagnosis/DiagnosisDetail.tsx
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DiagnosisProgressBar from "../../components/Diagnosis/DiagnosisProgressBar";
import DiagnosisTopBar from "../../components/Diagnosis/DiagnosisTopBar";
import DiagnosisWaveBackground from "../../components/Diagnosis/DiagnosisWaveBackground";
import { useDiagnosisDetail } from "../../components/Diagnosis/useDiagnosisDetail";
import QuestionRenderer from "../../components/Diagnosis/QuestionRenderer";

export default function DiagnosisDetail() {
  const navigate = useNavigate();

  const {
    stepIndex,
    total,
    current,
    value,
    isNextEnabled,
    setAnswer,
    goNext,
    goBack,
  } = useDiagnosisDetail();

  const isLastStep = useMemo(() => stepIndex === total - 1, [stepIndex, total]);

  if (!current) return null;

  const onBack = () => {
    if (stepIndex === 0) navigate(-1);
    else goBack();
  };

  // ✅ dial / two_choice는 자동넘김
  // ✅ multi_select는 기본적으로 버튼 노출
  // ✅ 단, "마지막 단계"의 multi_select는 "다음" 숨김(= 결과 확인하기만)
  const showNextButton =
    current.type === "multi_select" && !(isLastStep && current.type === "multi_select");

  return (
    <div className="min-h-dvh bg-white relative overflow-hidden">
      <div className="pt-[80px]">
        <DiagnosisProgressBar
          stepIndex={stepIndex}
          totalSteps={total}
          theme={current.theme}
        />

        <div className="mt-[28px]">
          <DiagnosisTopBar title={current.title} onBack={onBack} />
        </div>

        <div className="mt-[170px] px-[20px]">
          <div className="mx-auto w-[335px]">
            <QuestionRenderer
              q={current}
              value={value}
              onChange={(v) => {
                setAnswer(v);

                // ✅ 2지선다: 선택 즉시 다음
                if (current.type === "two_choice") {
                  setTimeout(() => goNext(), 120);
                }
              }}
              onCommit={() => {
                // ✅ 다이얼: 손 떼면 여유 있게 다음
                if (current.type === "dial") {
                  setTimeout(() => goNext(), 420);
                }
              }}
              onCtaClick={() => {
                // ✅ 마지막 multi_select의 "결과 확인하기" 전용
                // TODO: 실제 결과 라우트로 변경
                navigate("/diagnosis/result");
              }}
            />
          </div>
        </div>

        {showNextButton && (
          <div className="mt-[28px] px-[20px]">
            <div className="mx-auto w-[335px]">
              <button
                type="button"
                onClick={goNext}
                disabled={!isNextEnabled}
                className={[
                  "w-full h-[52px] rounded-[14px]",
                  "font-body text-[16px] font-[600] transition-opacity",
                  isNextEnabled
                    ? "bg-[var(--color-brand)] text-white"
                    : "bg-[var(--color-gray-200)] text-[var(--color-gray-500)]",
                ].join(" ")}
              >
                다음
              </button>
            </div>
          </div>
        )}
      </div>

      <DiagnosisWaveBackground stepIndex={stepIndex} />
    </div>
  );
}
