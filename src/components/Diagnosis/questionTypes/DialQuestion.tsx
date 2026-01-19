// src/components/Diagnosis/questionTypes/DialQuestion.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import subtractSvg from "../../../assets/Subtract.svg"; // 네가 추가한 Subtract.svg 경로에 맞게!
import dialWaveSvg from "../../../assets/dialWave.svg"; // (예시) 안에 파도 svg 파일 경로로 바꿔줘

type Props = {
  min: number;
  max: number;
  step: number;
  value: number;
  unit?: string;
  label: string;

  onChange: (next: number) => void;
  onCommit?: (finalValue: number) => void; // 손 떼면 호출
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function quantize(v: number, step: number) {
  if (step <= 0) return v;
  return Math.round(v / step) * step;
}

/** angle: 0~360 (0=12시, 시계방향) */
function angleFromPoint(cx: number, cy: number, x: number, y: number) {
  const dx = x - cx;
  const dy = y - cy;
  // atan2는 0이 3시, 반시계. -> 12시 시작/시계방향으로 변환
  let deg = (Math.atan2(dy, dx) * 180) / Math.PI; // -180~180, 0=3시
  deg = deg + 90; // 0=12시로 이동
  if (deg < 0) deg += 360;
  return deg; // 0~360
}

export default function DialQuestion({
  min,
  max,
  step,
  value,
  unit = "%",
  label,
  onChange,
  onCommit,
}: Props) {
  // 피그마: 바깥 원 250, 안쪽 원 192
  const SIZE = 250;
  const INNER = 192;

  // 링 두께(피그마 stroke 25px)
  const STROKE = 25;

  // 원 반지름: stroke가 바깥으로 안 잘리게 안쪽으로
  const r = (SIZE - STROKE) / 2;
  const cx = SIZE / 2;
  const cy = SIZE / 2;

  const circumference = 2 * Math.PI * r;

  const ratio = useMemo(() => {
    if (max <= min) return 0;
    return clamp((value - min) / (max - min), 0, 1);
  }, [value, min, max]);

  // 12시부터 시계방향으로 채우기: dashoffset을 circumference*(1-ratio)
  const dashArray = circumference;
  const dashOffset = circumference * (1 - ratio);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const percentText = `${Math.round(ratio * 100)}${unit}`;

  const setFromClientPoint = (clientX: number, clientY: number) => {
    const el = wrapRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const a = angleFromPoint(cx, cy, x, y); // 0~360
    const nextRatio = a / 360;
    const raw = min + nextRatio * (max - min);
    const stepped = quantize(raw, step);
    const next = clamp(stepped, min, max);

    onChange(next);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientPoint(e.clientX, e.clientY);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setFromClientPoint(e.clientX, e.clientY);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragging(false);

    // 손 떼자마자 바로 넘어가면 급하니까, commit은 즉시 호출하고
    // 실제 goNext는 페이지에서 딜레이 주는 방식으로 처리
    onCommit?.(value);
  };

  // 드래그 중 바깥 클릭/이탈 안정성
  useEffect(() => {
    const up = () => setDragging(false);
    window.addEventListener("pointerup", up);
    return () => window.removeEventListener("pointerup", up);
  }, []);

  return (
    <div className="mx-auto w-[250px] h-[250px] relative select-none" ref={wrapRef}>
      {/* 1) 링(SVG): base + progress */}
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <defs>
          {/* 뒷부분만 진해지게: 대부분 연한색, 끝(현재값 근처)만 진한색 */}
          <linearGradient id="dialProgressGrad" x1="0" y1="0" x2={SIZE} y2={SIZE} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#78C2FF" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#78C2FF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0087F6" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* base ring (연하게, 전체 고정) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#EDEDED"
          strokeWidth={STROKE}
        />

        {/* progress ring (12시 시작) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="url(#dialProgressGrad)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </svg>

      {/* 2) 안쪽 원(피그마 Subtract) + 파도 */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{ width: INNER, height: INNER, transform: "translate(-50%, -50%)" }}
      >
        {/* 파도는 원 안에서만 보여야 하니까 clip */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <img
            src={dialWaveSvg}
            alt=""
            className="absolute left-1/2 top-1/2"
            style={{
              transform: "translate(-50%, -50%)",
              width: 296.73,   // 네가 캡쳐로 보여준 파도 수치
              height: 140.61,
            }}
          />
        </div>

        {/* subtract(흰 원/테두리 느낌 등) */}
        <img src={subtractSvg} alt="" className="absolute inset-0 w-full h-full" />

        {/* 텍스트(너 팀 토큰 유지) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            {/* 퍼센트 텍스트: 너가 이미 토큰으로 맞춘 클래스가 있으면 그걸로 교체해도 됨 */}
            <div className="font-title text-title-2 font-[500] text-[var(--color-blue-500)]">
              {percentText}
            </div>
            <div className="mt-1 font-body text-body-title font-[600] text-[var(--color-black-2)]">
              {label}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
