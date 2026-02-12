import type { WaveLayer } from "./DiagnosisWaveLayers";

type Props = WaveLayer & {
 
  color: string;
  globalOpacity?: number;
};

export default function WaveLayerImg({
  Svg,
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

  color,
  globalOpacity = 1,
}: Props) {
  const finalOpacity = opacity * globalOpacity;

  return (
    <div
      className="absolute"
      style={{
        left: `${leftPx}px`,
        bottom: `${bottomPx}px`,
        width: `${widthPx}px`,
        height: `${heightPx}px`,
        opacity: finalOpacity,
        color,
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
          <Svg
            aria-hidden
            focusable={false}
            style={{
              width: "100%",
              height: "100%",
              transform: `rotate(${rotationDeg}deg)`,
              transformOrigin: "center",
              display: "block",
              color,
            }}
          />
        </div>
      </div>
    </div>
  );
}
