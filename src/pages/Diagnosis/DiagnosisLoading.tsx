import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import LoadingRing from "../../components/Diagnosis/LoadingRing";

import waveBack from "../../assets/Waves/diagnosis_result/wave_back.png";
import waveMiddle from "../../assets/Waves/diagnosis_result/wave_middle.png";
import waveFront from "../../assets/Waves/diagnosis_result/wave_front.png";

type PhaseText = {
  subtitle: string;
  body: string;
};

type Variant = "basic" | "advanced";
type SpinnerVariant = "default" | "ring";

type DiagnosisLoadingProps = {
  durationMs?: number;
  nextPath?: string;
  onEnter?: () => void;
  variant?: Variant;
  spinnerVariant?: SpinnerVariant;
};

const LOADER_COLORS = [
  "#D1D6FF",
  "#C5CCFF",
  "#A4ADFF",
  "#8692FF",
  "#5B6BFF",
  "#2F16FF",
  "#1600C9",
  "#0C0073",
];

export default function DiagnosisLoading({
  durationMs = 5000,
  nextPath = "/diagnosis/detail",
  onEnter,
  variant = "basic",
  spinnerVariant = "default",
}: DiagnosisLoadingProps) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<0 | 1>(0);

  const isAdvanced = variant === "advanced";

  const texts: [PhaseText, PhaseText] = useMemo(() => {
    if (isAdvanced) {
      
      return [
        {
          subtitle: "더 정확한 진단을 위해\n추가 질문을 준비하고 있어요.",
          body: "잠시만 기다려주세요.",
        },
        {
          subtitle: "더 정확한 진단을 위해\n추가 질문을 준비하고 있어요.",
          body: "잠시만 기다려주세요.",
        },
      ];
    }


    return [
      {
        subtitle: "나에게 꼭 맞는 휴식을 찾아보세요",
        body:
          "몇 가지 질문을 통해\n" +
          "당신의 현재 상태와 휴식 취향을 파악하고,\n\n" +
          "8가지 휴식 유형 중 하나를 알려드릴게요.",
      },
      {
        subtitle: "2분이면 충분해요",
        body: "다양한 방식으로 질문에 답하며\n당신의 마음을 탐색해 보세요.",
      },
    ];
  }, [isAdvanced]);

  useEffect(() => {
    onEnter?.();

    const TOTAL = durationMs;
    const HALF = Math.floor(TOTAL / 2);

    const mid = window.setTimeout(() => setPhase(1), HALF);
    const done = window.setTimeout(() => {
      navigate(nextPath, { replace: true });
    }, TOTAL);

    return () => {
      window.clearTimeout(mid);
      window.clearTimeout(done);
    };
  }, [durationMs, navigate, nextPath, onEnter]);

  return (
    <div className="fixed inset-0 z-[9999] w-screen h-[100dvh] overflow-hidden bg-footer">
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatMid {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes floatFast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-22px); }
        }

        
        @keyframes ring-spin { to { transform: rotate(360deg); } }

        
        @keyframes fade-up-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0px); }
        }

        
        @keyframes adv-subtitle-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0px); }
        }

        @keyframes adv-body-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .motion-safe-animation { animation: none !important; }
        }
      `}</style>

      <div className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 z-10 w-[110vw] max-w-none">
        <img
          src={waveBack}
          alt=""
          className="block w-full h-auto opacity-90"
          style={{ animation: "floatSlow 10s ease-in-out infinite" }}
        />
      </div>

      <div className="pointer-events-none absolute left-1/2 bottom-[-18px] -translate-x-1/2 z-20 w-[110vw] max-w-none">
        <img
          src={waveMiddle}
          alt=""
          className="block w-full h-auto opacity-95"
          style={{ animation: "floatMid 8s ease-in-out infinite" }}
        />
      </div>

      <div className="pointer-events-none absolute left-1/2 bottom-[-34px] -translate-x-1/2 z-30 w-[110vw] max-w-none">
        <img
          src={waveFront}
          alt=""
          className="block w-full h-auto"
          style={{ animation: "floatFast 6.5s ease-in-out infinite" }}
        />
      </div>

      <main className="relative z-40 min-h-[100dvh] flex flex-col items-center text-center px-[20px]">
        <div className="flex-1" />

        <div className="translate-y-[-12px] w-full flex flex-col items-center">
          {!isAdvanced && (
            <h1 className="font-title text-title-4 leading-[28px] tracking-[0px] text-white">
              Taste your Rest
            </h1>
          )}

          <div className="mt-[8px] h-[44px] relative w-full flex justify-center">
            <p
              key={isAdvanced ? "adv-subtitle" : `subtitle-${phase}`}
              className="absolute inset-0 font-body text-body-title text-white tracking-[-0.025em] leading-[140%] text-center whitespace-pre-line"
              style={{
                animation: isAdvanced
                  ? "adv-subtitle-in 420ms cubic-bezier(0.2, 0.8, 0.2, 1) both"
                  : "fade-up-in 260ms ease-out both",
              }}
            >
              {texts[phase].subtitle}
            </p>
          </div>

          <div className="mt-[32px] flex items-center justify-center">
            {spinnerVariant === "ring" ? (
              <div style={{ animation: "ring-spin 1.9s linear infinite" }}>
                <LoadingRing sizePx={54} colors={LOADER_COLORS} />
              </div>
            ) : (
              <LoadingSpinner color="white" />
            )}
          </div>

          <div className="mt-[36px] min-h-[96px] relative w-full flex justify-center">
            <p
              key={isAdvanced ? "adv-body" : `body-${phase}`}
              className="absolute inset-0 font-body text-body-5 text-white leading-[140%] tracking-[-0.02em] whitespace-pre-line text-center mx-auto"
              style={{
                maxWidth: 260,
                animation: isAdvanced
                  ? "adv-body-in 420ms cubic-bezier(0.2, 0.8, 0.2, 1) both"
                  : "fade-up-in 280ms ease-out both",
              }}
            >
              {texts[phase].body}
            </p>
          </div>
        </div>

        <div className="flex-1" />
      </main>
    </div>
  );
}
