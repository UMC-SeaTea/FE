type LoadingRingProps = {
  sizePx?: number;
  colors: string[];
};

export default function LoadingRing({ sizePx = 54, colors }: LoadingRingProps) {
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
