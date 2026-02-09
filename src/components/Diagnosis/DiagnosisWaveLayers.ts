import type React from "react";
import Wave6 from "../../assets/wave6.svg?react";
import Wave7 from "../../assets/wave7.svg?react";
import Wave8 from "../../assets/wave8.svg?react";
import Wave9 from "../../assets/wave9.svg?react";

export type WaveSvg = React.FC<React.SVGProps<SVGSVGElement>>;

export type WaveLayer = {
  Svg: WaveSvg;

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
    Svg: Wave6,
    widthPx: 1072,
    heightPx: 271,
    leftPx: -153,
    bottomPx: -185,
    durationSec: 40,
    travelPx: -240,
    floatPx: 18,
    floatDurationSec: 6,
    opacity: 0.55,
  },
  {
    Svg: Wave7,
    widthPx: 1072,
    heightPx: 271,
    leftPx: -245,
    bottomPx: -165,
    durationSec: 40,
    travelPx: 200,
    floatPx: 20,
    floatDurationSec: 6.2,
    opacity: 0.70,
  },
  {
    Svg: Wave8,
    widthPx: 1072,
    heightPx: 319,
    leftPx: -392,
    bottomPx: -120,
    durationSec: 40,
    travelPx: -170,
    floatPx: 22,
    floatDurationSec: 6.6,
    opacity: 0.80,
  },
  {
    Svg: Wave9,
    widthPx: 1072,
    heightPx: 431,
    leftPx: -424,
    bottomPx: -210,
    durationSec: 40,
    travelPx: 120,
    floatPx: 24,
    floatDurationSec: 7,
    opacity: 0.90,
  },
] as const;
