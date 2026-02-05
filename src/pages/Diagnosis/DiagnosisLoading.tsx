import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import waveBack from "../../assets/Waves/diagnosis_result/wave_back.png";
import waveMiddle from "../../assets/Waves/diagnosis_result/wave_middle.png";
import waveFront from "../../assets/Waves/diagnosis_result/wave_front.png";

type PhaseText = {
  subtitle: string;
  body: string;
};

type DiagnosisLoadingProps = {
  durationMs?: number;
  nextPath?: string;
  onEnter?: () => void;
};

export default function DiagnosisLoading({
  durationMs = 5000,
  nextPath = "/diagnosis/detail",
  onEnter,
}: DiagnosisLoadingProps) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<0 | 1>(0);

  const texts: [PhaseText, PhaseText] = useMemo(
    () => [
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
    ],
    []
  );

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
    <div className="fixed inset-0 z-[9999] w-screen h-[100dvh] overflow-hidden bg-[#0A0A0A]">
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

        @keyframes fade-up-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0px); }
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
          <h1 className="font-title text-title-4 leading-[28px] tracking-[0px] text-white">
            Taste your Rest
          </h1>

          <div className="mt-[8px] h-[25px] relative w-full flex justify-center">
            <p
              key={`subtitle-${phase}`}
              className="
                absolute inset-0
                font-body text-body-title
                text-white
                tracking-[-0.025em] leading-[140%]
                text-center
                whitespace-nowrap
              "
              style={{ animation: "fade-up-in 260ms ease-out both" }}
            >
              {texts[phase].subtitle}
            </p>
          </div>


          <div className="mt-[32px] flex items-center justify-center">
            <LoadingSpinner color="white" />
          </div>

          <div className="mt-[36px] min-h-[96px] relative w-full flex justify-center">
            <p
              key={`body-${phase}`}
              className="
                absolute inset-0
                font-body text-body-5 text-white leading-[140%] tracking-[-0.02em]
                whitespace-pre-line text-center mx-auto
              "
              style={{
                maxWidth: 260,
                animation: "fade-up-in 280ms ease-out both",
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
