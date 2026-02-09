import wave9 from "../../assets/wave9.png";
import wave8 from "../../assets/wave8.png";
import wave7 from "../../assets/wave7.png";
import wave6 from "../../assets/wave6.png";

export type WaveLayer = {
  src: string;
  widthPx: number;
  heightPx: number;
  leftPx: number;
  bottomPx: number;
  rotationDeg?: number;

  durationSec?: number;
  travelPx?: number;
  floatPx?: number;
  floatDurationSec?: number;
  opacity?: number;
};


export const advancedStackWaves: readonly WaveLayer[] = [
  {
    src: wave6,
    widthPx: 1072,
    heightPx: 271,
    leftPx: -153,
    bottomPx: -185,
    durationSec: 12,
    travelPx: -240,
    floatPx: 18,          
    floatDurationSec: 6,
    opacity: 1,           
  },
  {
    src: wave7,
    widthPx: 1072,
    heightPx: 271,
    leftPx: -245,
    bottomPx: -165,
    durationSec: 14,
    travelPx: 200,
    floatPx: 20,
    floatDurationSec: 6.2,
    opacity: 0.95,
  },
  {
    src: wave8,
    widthPx: 1072,
    heightPx: 319,
    leftPx: -392,
    bottomPx: -120,
    durationSec: 16,
    travelPx: -170,
    floatPx: 22,
    floatDurationSec: 6.6,
    opacity: 0.9,
  },
  {
    src: wave9,
    widthPx: 1072,
    heightPx: 431,
    leftPx: -424,
    bottomPx: -210,
    durationSec: 20,
    travelPx: 120,
    floatPx: 24,
    floatDurationSec: 7,
    opacity: 0.85,
  },
] as const;
