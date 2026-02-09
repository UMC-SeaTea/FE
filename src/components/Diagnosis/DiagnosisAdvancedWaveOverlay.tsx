import WaveLayerImg from "./WaveLayerImg";
import { advancedStackWaves } from "./DiagnosisWaveLayers";

type Props = {
  count: number;   
  height?: number;
};

export default function DiagnosisAdvancedWaveOverlay({ count, height = 520 }: Props) {
  const safeCount = Math.max(0, Math.min(count, advancedStackWaves.length));
  const waves = advancedStackWaves.slice(0, safeCount);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-0 right-0 bottom-0"
      style={{
        height,
        overflow: "hidden",
        WebkitMaskImage:
          "linear-gradient(to top, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
        maskImage:
          "linear-gradient(to top, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
      }}
    >

      <style>{`
        @keyframes wave-x {
          0%   { transform: translateX(0px); }
          100% { transform: translateX(var(--travelX, 160px)); }
        }
        @keyframes wave-y {
          0%   { transform: translateY(0px); }
          40%  { transform: translateY(calc(var(--floatY, 16px) * -1)); }
          100% { transform: translateY(calc(var(--floatY, 16px) * 0.55)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .reduce-motion\\:no-anim { animation: none !important; }
        }
      `}</style>

      {waves.map((w, idx) => (
        <WaveLayerImg key={`${w.src}-${idx}`} {...w} />
      ))}
    </div>
  );
}
