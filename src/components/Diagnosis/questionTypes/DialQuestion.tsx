import React, { useEffect, useMemo, useRef, useState } from "react";

import dialTicksSvg from "../../../assets/dialTicks.svg";
import dialHandleSvg from "../../../assets/dialHandle.svg";
import maskGroupSvg from "../../../assets/Mask group.svg";

type Props = {
  min: number;
  max: number;
  step: number;
  value: number;
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
  const HANDLE_SIZE = 30;

  const cx = SIZE / 2;
  const cy = SIZE / 2;

  const COLOR_LIGHT = "#78C2FF";
  const COLOR_DARK = "#0087F6";

  
  const didInitRef = useRef(false);
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;

    
    onChange(min);

  }, [min]);

  const ratio = useMemo(() => {
    if (max <= min) return 0;
    return clamp((value - min) / (max - min), 0, 1);
  }, [value, min, max]);

  const percentText = `${Math.round(ratio * 100)}${unit}`;


  const angle = useMemo(() => {
    if (ratio <= 0) return 0.001;
    return Math.min(359.999, ratio * 360);
  }, [ratio]);

  const HANDLE_OUTSET = 8;
  const handleRadius = SIZE / 2 - STROKE / 2 - 6 + HANDLE_OUTSET;

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

    scheduleCommit(value);
  };

  useEffect(() => {
    const up = () => {
      if (dragging) endDrag();
    };
    window.addEventListener("pointerup", up);
    return () => window.removeEventListener("pointerup", up);
  }, [dragging, value]);

  useEffect(() => {
    return () => clearCommitTimer();
  }, []);

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

  return (
    <div
      ref={wrapRef}
      className="mx-auto relative select-none"
      style={{
        width: SIZE,
        height: SIZE,
        touchAction: "none",
      }}
      onPointerMove={onPointerMove}
    >
      <div className="absolute inset-0" style={{ WebkitMask: donutMask, mask: donutMask }}>
        <div className="absolute inset-0 bg-white rounded-full" />
        <div className="absolute inset-0" style={progressStyle} />
      </div>

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
        className="absolute rounded-full"
        style={{
          width: HANDLE_SIZE + 18,
          height: HANDLE_SIZE + 18,
          left: handlePos.x,
          top: handlePos.y,
          transform: "translate(-50%, -50%)",
          cursor: dragging ? "grabbing" : "grab",
          touchAction: "none",
        }}
        onPointerDown={onHandlePointerDown}
        onPointerUp={(e) => {
          if (!dragging) return;
          if (activePointerIdRef.current !== e.pointerId) return;
          endDrag();
        }}
      >
        <img
          src={dialHandleSvg}
          alt=""
          draggable={false}
          style={{
            width: HANDLE_SIZE,
            height: HANDLE_SIZE,
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.12))",
            pointerEvents: "none",
          }}
        />
      </div>

      <img
        src={maskGroupSvg}
        alt=""
        draggable={false}
        className="absolute pointer-events-none"
        style={{
          width: INNER,
          height: INNER,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center" style={{ transform: "translateY(6px)" }}>
          <div className="font-title text-title-2 text-[#0087F6]">{percentText}</div>
          <div className="mt-1 font-body text-body-title text-black">{label}</div>
        </div>
      </div>
    </div>
  );
}
