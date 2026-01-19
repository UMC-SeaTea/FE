// src/components/Diagnosis/DiagnosisProgressBar.tsx
type Props = {
  stepIndex: number;     // 0-based
  totalSteps: number;    // ex) 4
  theme?: "purple" | "blue" | "mint";
};

const COLOR_BY_THEME: Record<NonNullable<Props["theme"]>, string> = {
  purple: "#A89EFF",
  blue: "#4FA9FF",
  mint: "#5FE3C1",
};

export default function DiagnosisProgressBar({ stepIndex, totalSteps, theme = "purple" }: Props) {
  const ratio = totalSteps <= 0 ? 0 : (stepIndex + 1) / totalSteps;
  const fill = `${Math.max(0, Math.min(1, ratio)) * 100}%`;

  return (
    <div className="px-[20px]">
      <div className="mx-auto w-[335px] h-[8px] rounded-[4px] bg-[rgba(10,10,10,0.06)] overflow-hidden">
        <div
          className="h-full rounded-[4px]"
          style={{
            width: fill,
            backgroundColor: COLOR_BY_THEME[theme],
          }}
        />
      </div>
    </div>
  );
}
