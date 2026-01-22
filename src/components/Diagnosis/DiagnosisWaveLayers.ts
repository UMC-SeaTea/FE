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

export const diagnosisWaves: readonly WaveLayer[] = [
  {
    src: wave9,
    widthPx: 1072,
    heightPx: 431,
    leftPx: -424,
    bottomPx: -190,       
    rotationDeg: 0,     
    durationSec: 18,
    travelPx: 140,
    floatPx: 10,
    floatDurationSec: 9,
    opacity: 1,
  },
  {
    src: wave8,
    widthPx: 1072,
    heightPx: 319,
    leftPx: -392,
    bottomPx: -75,       
    rotationDeg: 0,
    durationSec: 14,
    travelPx: -180,
    floatPx: 12,
    floatDurationSec: 7.5,
    opacity: 1,
  },
  {
    src: wave7,
    widthPx: 1072,
    heightPx: 271,
    leftPx: -245,
    bottomPx: -135,      
    rotationDeg: 0,
    durationSec: 12,
    travelPx: 220,
    floatPx: 14,
    floatDurationSec: 6.5,
    opacity: 1,
  },
  {
    src: wave6,
    widthPx: 1072,
    heightPx: 271,
    leftPx: -153,
    bottomPx: -155,      
    rotationDeg: 0,
    durationSec: 10,
    travelPx: -260,
    floatPx: 16,
    floatDurationSec: 6,
    opacity: 1,
  },
];
