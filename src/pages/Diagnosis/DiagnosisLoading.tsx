import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { diagnosisWaves, type WaveLayer } from "./diagnosisWaveLayers";

type PhaseText = {
  subtitle: string;
  body: string;
};

type DiagnosisLoadingProps = {
  durationMs?: number;
  nextPath?: string;
  onEnter?: () => void;
  waves?: readonly WaveLayer[];
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
  nextPath = "/diagnosis/question/1",
  onEnter,
  waves = diagnosisWaves,
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

    const TOTAL = durationMs; // 
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
    <div className="relative min-h-dvh w-full bg-white overflow-hidden">
      <style>{`
        @keyframes ring-spin { to { transform: rotate(360deg); } }

        @keyframes wave-x {
          0%   { transform: translateX(0px); }
          100% { transform: translateX(var(--travelX, 160px)); }
        }

        @keyframes wave-y {
          0%   { transform: translateY(0px); }
          40%  { transform: translateY(calc(var(--floatY, 16px) * -1)); }
          100% { transform: translateY(calc(var(--floatY, 16px) * 0.55)); }
        }

        @keyframes fade-up-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .reduce-motion\\:no-anim { animation: none !important; }
        }
      `}</style>

      <main className="relative z-10 min-h-dvh flex flex-col items-center text-center px-[20px]">
        <div className="flex-1" />

        <div className="translate-y-[-12px] w-full flex flex-col items-center">
          <h1 className="font-title text-title-4 leading-[28px] tracking-[0px] text-deep-blue">
            Taste your Rest
          </h1>

          <div className="mt-[8px] h-[25px] relative w-full flex justify-center">
            <p
              key={`subtitle-${phase}`}
              className="
                absolute inset-0
                font-body text-body-title
                text-deep-blue
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
            <LoadingRing sizePx={54} colors={LOADER_COLORS} />
          </div>

          
          <div className="mt-[36px] min-h-[96px] relative w-full flex justify-center">
            <p
              key={`body-${phase}`}
              className="
                absolute inset-0
                font-body text-body-5 text-deep-blue leading-[140%] tracking-[-0.02em] whitespace-pre-line text-center mx-auto"
              
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


      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 bottom-0 z-0"
        style={{
          height: 520,
          overflow: "hidden",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
        }}
      >
        {waves.map((w, idx) => (
          <WaveLayerImg key={idx} {...w} />
        ))}
      </div>
    </div>
  );
}

function LoadingRing({
  sizePx = 54,
  colors,
}: {
  sizePx?: number;
  colors: string[];
}) {
  const dots = Array.from({ length: 8 });

  return (
    <div
      role="status"
      aria-label="진단을 준비 중입니다"
      className="relative reduce-motion:no-anim"
      style={{
        width: sizePx,
        height: sizePx,
        animation: "ring-spin 1.1s linear infinite",
      }}
    >
      {dots.map((_, i) => {
        const angle = (360 / dots.length) * i;
        const color = colors[i] ?? "#0C0073";

        return (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 block rounded-full"
            style={{
              width: 6,
              height: 6,
              marginLeft: -3,
              marginTop: -3,
              background: color,
              transform: `rotate(${angle}deg) translate(18px) rotate(-${angle}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}

function WaveLayerImg({
  src,
  widthPx,
  heightPx,
  leftPx,
  bottomPx,
  rotationDeg = 0,
  durationSec = 12,
  travelPx = 160,
  floatPx = 16,
  floatDurationSec = 7,
  opacity = 1,
}: WaveLayer) {
  return (
    <div
      className="absolute"
      style={{
        left: `${leftPx}px`,
        bottom: `${bottomPx}px`,
        width: `${widthPx}px`,
        height: `${heightPx}px`,
        opacity,
      }}
    >
      <div
        className="reduce-motion:no-anim"
        style={{
          width: "100%",
          height: "100%",
          ["--travelX" as any]: `${travelPx}px`,
          animation: `wave-x ${durationSec}s ease-in-out infinite alternate`,
        }}
      >
        <div
          className="reduce-motion:no-anim"
          style={{
            width: "100%",
            height: "100%",
            ["--floatY" as any]: `${floatPx}px`,
            animation: `wave-y ${floatDurationSec}s ease-in-out infinite alternate`,
          }}
        >
          <img
            src={src}
            alt=""
            draggable={false}
            className="block select-none"
            style={{
              width: "100%",
              height: "100%",
              transform: `rotate(${rotationDeg}deg)`,
              transformOrigin: "center",
            }}
          />
        </div>
      </div>
    </div>
  );
}
