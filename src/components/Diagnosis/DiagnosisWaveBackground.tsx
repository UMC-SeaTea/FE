// src/components/Diagnosis/DiagnosisWaveBackground.tsx
import React from "react";

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

export default function DiagnosisWaveBackground({ stepIndex, picked = false, color }: Props) {
  const level = Math.min(6 + stepIndex, 9) as WaveLevel;
  const wave = WAVE_MAP[level];
  const Wave = picked && wave.picked ? wave.picked : wave.base;

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <style>
        {`
          @keyframes waveTransition {
            0% { opacity: 0; transform: translateY(22px) scaleY(0.99); }
            45% { opacity: 1; transform: translateY(-4px) scaleY(1.01); }
            70% { transform: translateY(2px) scaleY(0.998); }
            100% { opacity: 1; transform: translateY(0) scaleY(1); }
          }
        `}
      </style>

      <div
        className="absolute left-0 right-0 bottom-0"
        style={{
          color,
          transition: "color 650ms ease",
          animation: "waveTransition 800ms ease-out both",
          transformOrigin: "bottom",
        }}
      >
        <Wave className="block w-full h-auto select-none" style={{ transform: "translateZ(0)" }} />
      </div>
    </div>
  );
}
