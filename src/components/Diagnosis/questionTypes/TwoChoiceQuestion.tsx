// src/components/Diagnosis/questionTypes/TwoChoiceQuestion.tsx
import DiagnosisOptionCard from "../DiagnosisOptionCard";
import { getStepStyle } from "../diagnosisProgressColors";

type Option = { id: string; label: string };

type Props = {
  options: [Option, Option];
  value?: string;
  onChange: (id: string) => void;
  stepIndex: number;
};

export default function TwoChoiceQuestion({ options, value, onChange, stepIndex }: Props) {
  const styleSet = getStepStyle(stepIndex);

  return (
    <div className="mx-auto w-[335px] grid grid-cols-2 gap-[11px]">
      {options.map((opt) => (
        <DiagnosisOptionCard
          key={opt.id}
          label={opt.label}
          selected={value === opt.id}
          onClick={() => onChange(opt.id)}
          styleSet={styleSet}
        />
      ))}
    </div>
  );
}
