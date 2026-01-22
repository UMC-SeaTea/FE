import wave6 from "../../assets/Waves/backgroundwave 6.svg";
import wave6_1 from "../../assets/Waves/backgroundwave 6-1.svg";
import wave7 from "../../assets/Waves/backgroundwave 7.svg";
import wave7_1 from "../../assets/Waves/backgroundwave 7-1.svg";
import wave8 from "../../assets/Waves/backgroundwave 8.svg";
import wave9 from "../../assets/Waves/backgroundwave 9.svg";
import wave9_1 from "../../assets/Waves/backgroundwave 9-1.svg";

type Props = {
  stepIndex: number;
  picked?: boolean;
};

type WaveLevel = 6 | 7 | 8 | 9;

type WaveAsset = {
  base: string;
  picked?: string;
};

const WAVE_MAP: Record<WaveLevel, WaveAsset> = {
  6: { base: wave6, picked: wave6_1 },
  7: { base: wave7, picked: wave7_1 },
  8: { base: wave8 },
  9: { base: wave9, picked: wave9_1 },
};

export default function DiagnosisWaveBackground({
  stepIndex,
  picked = false,
}: Props) {
  const level = Math.min(6 + stepIndex, 9) as WaveLevel;
  const wave = WAVE_MAP[level];
  const src = picked && wave.picked ? wave.picked : wave.base;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    >

      <style>
        {`
          @keyframes waveTransition {
            0% {
              opacity: 0;
              transform: translateY(22px) scaleY(0.99);
            }
            45% {
              opacity: 1;
              transform: translateY(-4px) scaleY(1.01);
            }
            70% {
              transform: translateY(2px) scaleY(0.998);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scaleY(1);
            }
          }
        `}
      </style>

      <img
        key={src} 
        src={src}
        alt=""
        draggable={false}
        className="
          absolute left-0 right-0 bottom-0
          w-full h-auto
          select-none
        "
        style={{
          animation: "waveTransition 800ms ease-out both",
          transformOrigin: "bottom",
        }}
      />
    </div>
  );
}
