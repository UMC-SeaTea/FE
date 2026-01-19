type Props = { stepIndex: number };

export default function DiagnosisWaveBackground({ stepIndex }: Props) {
  void stepIndex;

  return (
    <div
      className="pointer-events-none absolute left-0 right-0 bottom-0 h-[260px]"
      aria-hidden="true"
    >
      {/* 지금은 placeholder. 나중에 stepIndex로 높이/색 강도 변경 */}
      <div className="w-full h-full bg-gradient-to-t from-[rgba(168,158,255,0.18)] to-transparent" />
    </div>
  );
}
