import React, { useMemo } from "react";
import Wave6 from "../../assets/Waves/backgroundwave 6.svg?react";
import Wave6Picked from "../../assets/Waves/backgroundwave 6-1.svg?react";
import Wave7 from "../../assets/Waves/backgroundwave 7.svg?react";
import Wave7Picked from "../../assets/Waves/backgroundwave 7-1.svg?react";
import Wave8 from "../../assets/Waves/backgroundwave 8.svg?react";
import Wave9 from "../../assets/Waves/backgroundwave 9.svg?react";
import Wave9Picked from "../../assets/Waves/backgroundwave 9-1.svg?react";

type Props = {
  stepIndex: number;
  picked?: boolean;
  color: string;
};

type WaveLevel = 6 | 7 | 8 | 9;
type WaveComp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
type WaveAsset = { base: WaveComp; picked?: WaveComp };

const WAVE_MAP: Record<WaveLevel, WaveAsset> = {
  6: { base: Wave6, picked: Wave6Picked },
  7: { base: Wave7, picked: Wave7Picked },
  8: { base: Wave8 },
  9: { base: Wave9, picked: Wave9Picked },
};

export default function DiagnosisWaveBackground({
  stepIndex,
  picked = false,
  color,
}: Props) {
  const level = Math.min(6 + stepIndex, 9) as WaveLevel;
  const wave = WAVE_MAP[level];
  const Wave = picked && wave.picked ? wave.picked : wave.base;
  const { floatY, floatScale, duration } = useMemo(() => {
    const s = Math.max(0, Math.min(stepIndex, 6)); 
    const floatY = 6 + s * 1.6; 
    const floatScale = 1.002 + s * 0.0006; 
    const duration = 5.8 - s * 0.25; 
    return { floatY, floatScale, duration };
  }, [stepIndex]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <style>{`
        @keyframes waveEnter {
          0%   { opacity: 0; transform: translateY(22px) scaleY(0.99); }
          45%  { opacity: 1; transform: translateY(-4px) scaleY(1.01); }
          70%  { transform: translateY(2px) scaleY(0.998); }
          100% { opacity: 1; transform: translateY(0) scaleY(1); }
        }

        @keyframes waveFloat {
          0%   { transform: translateY(0px) scaleY(1); }
          35%  { transform: translateY(calc(var(--floatY) * -1px)) scaleY(var(--floatScale)); }
          70%  { transform: translateY(calc(var(--floatY) * 0.55px)) scaleY(calc(2 - var(--floatScale))); }
          100% { transform: translateY(0px) scaleY(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .reduce-motion\\:no-anim { animation: none !important; }
        }
      `}</style>

      <div
        className="absolute left-0 right-0 bottom-0"
        style={{
          color,
          transition: "color 650ms ease",
          animation: "waveEnter 800ms ease-out both",
          transformOrigin: "bottom",
        }}
      >

        <div
          className="reduce-motion:no-anim"
          style={{
            ["--floatY" as any]: floatY,
            ["--floatScale" as any]: floatScale,
            animation: `waveFloat ${duration}s ease-in-out infinite`,
            willChange: "transform",
          }}
        >
          <Wave className="block w-full h-auto select-none" style={{ transform: "translateZ(0)" }} />
        </div>
      </div>
    </div>
  );
}
