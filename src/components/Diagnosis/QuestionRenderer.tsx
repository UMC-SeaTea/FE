import type { DiagnosisQuestion } from "../../constants/diagnosis/types";
import TwoChoiceQuestion from "./questionTypes/TwoChoiceQuestion";
import DialQuestion from "./questionTypes/DialQuestion";
import MultiSelectQuestion from "./questionTypes/MultiSelectQuestion";

type Props = {
  q: DiagnosisQuestion;
  value: unknown;
  onChange: (value: unknown) => void;

  stepIndex: number;

  onCommit?: () => void;

  onCtaClick?: () => void;
};

export default function QuestionRenderer({
  q,
  value,
  onChange,
  stepIndex,
  onCommit,
  onCtaClick,
}: Props) {
  if (q.type === "two_choice") {
    return (
      <TwoChoiceQuestion
        options={
          q.options.map((o) => ({ id: o.id, label: o.label })) as [
            { id: string; label: string },
            { id: string; label: string }
          ]
        }
        value={value as string | undefined}
        stepIndex={stepIndex}
        onChange={(id: string) => {
          onChange(id);
          onCommit?.();
        }}
      />
    );
  }

  if (q.type === "dial") {
    const v = typeof value === "number" ? value : undefined;

    return (
      <DialQuestion
        min={q.min}
        max={q.max}
        step={q.step ?? 1}
        value={v}
        unit={q.unit ?? "%"}
        label={q.title}
        onChange={(next: number) => onChange(next)}
        onCommit={onCommit}
      />
    );
  }

  if (q.type === "multi_select") {
    const selected = Array.isArray(value)
      ? (value as string[])
      : typeof value === "string"
      ? [value]
      : [];

    return (
      <MultiSelectQuestion
        options={q.options.map((o) => ({ id: o.id, label: o.label }))}
        selectedIds={selected}
        maxSelect={q.maxSelect ?? 999}
        onChange={(nextSelected: string[]) => onChange(nextSelected)}
        theme={q.theme ?? "mint"}
        ctaText={q.ctaText}
        ctaDisabled={selected.length < (q.minSelect ?? 1)}
        onCtaClick={onCtaClick}
      />
    );
  }

  return null;
}
