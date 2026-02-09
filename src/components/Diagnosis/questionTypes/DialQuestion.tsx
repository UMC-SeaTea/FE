import React, { useEffect, useMemo, useRef, useState } from "react";
import dialTicksSvg from "../../../assets/dialTicks.svg";
import dialHandleSvg from "../../../assets/dialHandle.svg";
import waveSvg from "../../../assets/Waves/dial_wave.svg";

type Props = {
  min: number;
  max: number;
  step: number;


  value?: number;

  unit?: string;
  label: string;

 
  onChange: (next: number) => void;
  onCommit?: (finalValue: number) => void;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function quantize(v: number, step: number) {
  if (step <= 0) return v;
  return Math.round(v / step) * step;
}

function angleFromPoint(cx: number, cy: number, x: number, y: number) {
  const dx = x - cx;
  const dy = y - cy;

  let deg = (Math.atan2(dy, dx) * 180) / Math.PI;
  deg += 90;
  if (deg < 0) deg += 360;
  return deg;
}

const MESSAGE_BY_PERCENT: Record<number, string> = {
  0: "숨만 쉬어도 힘들어요",
  10: "깊은 휴식이 절실해요",
  20: "얼른 쉬어야해요",
  30: "겨우겨우 버티는 중",
  40: "슬슬 한계예요",
  50: "잠깐 쉬고 싶어요",
  60: "아직은 할 만 해요",
  70: "컨디션 꽤 괜찮아요",
  80: "몸이 가뿐해요",
  90: "힘이 넘쳐나요",
  100: "뭐든 할 수 있어요",
};

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
  const SIZE = 300;
  const STROKE = 30;
  const INNER = 232;

  const TICKS_SIZE = 230;
  const HANDLE_HIT_SIZE = 48;
  const HANDLE_VISUAL_SIZE = STROKE; 
  const HANDLE_ICON_SIZE = 20;
  const cx = SIZE / 2;
  const cy = SIZE / 2;
  const COLOR_LIGHT = "#78C2FF";
  const COLOR_DARK = "#0087F6";
  const hasInteractedRef = useRef(false);

  const ratio = useMemo(() => {
    if (max <= min) return 0;

  
    if (typeof value !== "number") return 0;

    return clamp((value - min) / (max - min), 0, 1);
  }, [value, min, max]);

  const snappedPercent = useMemo(() => {
    const p = Math.round(ratio * 100);
    const s = quantize(p, 10);
    return clamp(s, 0, 100);
  }, [ratio]);

  const message = useMemo(() => MESSAGE_BY_PERCENT[snappedPercent] ?? "", [snappedPercent]);
  const percentText = `${snappedPercent}${unit}`;

  const angle = useMemo(() => {
    if (ratio <= 0) return 0.001;
    return Math.min(359.999, ratio * 360);
  }, [ratio]);

  const handleRadius = SIZE / 2 - STROKE / 2;

  const handlePos = useMemo(() => {
    const degForTrig = angle - 90;
    const rad = (degForTrig * Math.PI) / 180;
    return {
      x: cx + handleRadius * Math.cos(rad),
      y: cy + handleRadius * Math.sin(rad),
    };
  }, [angle, cx, handleRadius]);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const activePointerIdRef = useRef<number | null>(null);

  const commitTimerRef = useRef<number | null>(null);
  const clearCommitTimer = () => {
    if (commitTimerRef.current !== null) {
      window.clearTimeout(commitTimerRef.current);
      commitTimerRef.current = null;
    }
  };

  const scheduleCommit = (finalValue: number) => {
    clearCommitTimer();
    commitTimerRef.current = window.setTimeout(() => {
      onCommit?.(finalValue);
      commitTimerRef.current = null;
    }, 500);
  };

  const setFromClientPoint = (clientX: number, clientY: number) => {
    const el = wrapRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const a = angleFromPoint(cx, cy, x, y);
    const nextRatio = a / 360;

    const raw = min + nextRatio * (max - min);
    const stepped = quantize(raw, step);
    const next = clamp(stepped, min, max);

   
    hasInteractedRef.current = true;
    onChange(next);
  };

  const onHandlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    clearCommitTimer();

    setDragging(true);
    activePointerIdRef.current = e.pointerId;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);

   
    setFromClientPoint(e.clientX, e.clientY);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    if (activePointerIdRef.current !== e.pointerId) return;

    e.preventDefault();
    setFromClientPoint(e.clientX, e.clientY);
  };

  const endDrag = () => {
    if (!dragging) return;
    setDragging(false);
    activePointerIdRef.current = null;

    
    if (hasInteractedRef.current && typeof value === "number") {
      scheduleCommit(value);
    }
  };

  useEffect(() => {
    const up = () => dragging && endDrag();
    window.addEventListener("pointerup", up);
    return () => window.removeEventListener("pointerup", up);
  }, [dragging, value]);

  useEffect(() => () => clearCommitTimer(), []);

  const donutMask = useMemo(() => {
    return `radial-gradient(
      farthest-side,
      transparent calc(100% - ${STROKE}px),
      #000 calc(100% - ${STROKE}px)
    )`;
  }, [STROKE]);

  const progressMask = useMemo(() => {
    const a = angle;
    if (a <= 0.001) {
      return `conic-gradient(rgba(0,0,0,0) 0deg, rgba(0,0,0,0) 360deg)`;
    }
    return `conic-gradient(
      rgba(0,0,0,0) 0deg,
      rgba(0,0,0,1) ${a}deg,
      rgba(0,0,0,0) ${a}deg,
      rgba(0,0,0,0) 360deg
    )`;
  }, [angle]);

  const progressStyle = useMemo<React.CSSProperties>(() => {
    const a = Math.max(0, Math.min(359.999, angle));
    return {
      width: SIZE,
      height: SIZE,
      borderRadius: 999,
      background: `conic-gradient(
        ${COLOR_LIGHT} 0deg,
        ${COLOR_DARK} ${a}deg,
        transparent ${a}deg,
        transparent 360deg
      )`,
      WebkitMaskImage: progressMask,
      maskImage: progressMask,
    };
  }, [SIZE, angle, progressMask, COLOR_LIGHT, COLOR_DARK]);

  const SCALE = 1.22;
  const waveW = Math.round(INNER * SCALE);
  const waveH = Math.round(INNER * SCALE);

  const SLIVER = Math.max(24, Math.round(INNER * 0.12));
  const downAtZero = Math.max(0, waveH - SLIVER);

  const TOP_EMPTY_RATIO = 0.26;
  const contentShiftUp = Math.round(waveH * TOP_EMPTY_RATIO);

  const minY = -(waveH - INNER);

  const waveY = useMemo(() => {
    const raw = Math.round((1 - ratio) * downAtZero - contentShiftUp);
    return clamp(raw, minY, downAtZero);
  }, [ratio, downAtZero, contentShiftUp, minY]);

  const handleBlueAlpha = 1;

  const iconBackSize = Math.min(
    HANDLE_VISUAL_SIZE - 4,
    Math.max(22, Math.round(HANDLE_ICON_SIZE * 1.15))
  );

  return (
    <div
      ref={wrapRef}
      className="mx-auto relative select-none"
      style={{ width: SIZE, height: SIZE, touchAction: "none" }}
      onPointerMove={onPointerMove}
      aria-label={label}
    >
      {/* 링 */}
      <div className="absolute inset-0" style={{ WebkitMask: donutMask, mask: donutMask }}>
        <div className="absolute inset-0 bg-white rounded-full" />
        <div className="absolute inset-0" style={progressStyle} />
      </div>

      {/* 눈금 */}
      <img
        src={dialTicksSvg}
        alt=""
        draggable={false}
        className="absolute pointer-events-none"
        style={{
          width: TICKS_SIZE,
          height: TICKS_SIZE,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div
        className="absolute"
        style={{
          width: HANDLE_HIT_SIZE,
          height: HANDLE_HIT_SIZE,
          left: handlePos.x,
          top: handlePos.y,
          transform: "translate(-50%, -50%)",
          cursor: dragging ? "grabbing" : "grab",
          touchAction: "none",
          zIndex: 30,
        }}
        onPointerDown={onHandlePointerDown}
        onPointerUp={(e) => {
          if (!dragging) return;
          if (activePointerIdRef.current !== e.pointerId) return;
          endDrag();
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: HANDLE_VISUAL_SIZE,
            height: HANDLE_VISUAL_SIZE,
            borderRadius: 999,
            background: COLOR_DARK,
            transform: "translate(-50%, -50%)",
            opacity: handleBlueAlpha,
            pointerEvents: "none",
          }}
        />

        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: iconBackSize,
            height: iconBackSize,
            borderRadius: 999,
            background: "#fff",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />

        <img
          src={dialHandleSvg}
          alt=""
          draggable={false}
          style={{
            width: HANDLE_ICON_SIZE,
            height: HANDLE_ICON_SIZE,
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      </div>

      <div
        className="absolute pointer-events-none"
        style={{
          width: INNER,
          height: INNER,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <img
          src={waveSvg}
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            left: "50%",
            bottom: 0,
            width: waveW,
            height: waveH,
            objectFit: "contain",
            objectPosition: "center bottom",
            display: "block",
            transform: `translate(-50%, ${waveY}px)`,
            transition: dragging ? "none" : "transform 160ms ease-out",
            willChange: "transform",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center" style={{ transform: "translateY(6px)" }}>
          <div className="font-title text-title-2 text-[#0087F6]">{percentText}</div>
          <div className="mt-1 font-body text-body-title text-black">{message}</div>
        </div>
      </div>
    </div>
  );
}
