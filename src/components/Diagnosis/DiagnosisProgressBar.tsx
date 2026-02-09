// src/components/Diagnosis/DiagnosisProgressBar.tsx
import { getStepStyle } from "./diagnosisProgressColors";

type Props = {
  stepIndex: number;
  totalSteps: number;
};

export default function DiagnosisProgressBar({ stepIndex, totalSteps }: Props) {
  const ratio = totalSteps <= 0 ? 0 : (stepIndex + 1) / totalSteps;
  const fill = `${Math.max(0, Math.min(1, ratio)) * 100}%`;

  const { progress } = getStepStyle(stepIndex);

  return (
    <div className="px-[20px]">
      <div
        className="mx-auto w-[335px] h-[8px] rounded-[4px] overflow-hidden relative"
        style={{
          backgroundColor: "#FFFFFF",
          boxShadow: ["inset 0 0 4px 0 #E2E1E8", "0 2px 10px rgba(0,0,0,0.06)"].join(
            ", "
          ),
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)",
            opacity: 0.55,
          }}
        />

        <div
          className="h-full rounded-[4px] relative z-[1]"
          style={{
            width: fill,
            backgroundColor: progress,
          }}
        />
      </div>
    </div>
  );
}
