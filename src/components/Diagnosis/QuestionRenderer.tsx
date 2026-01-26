import type { DiagnosisQuestion } from "./questions/types";
import TwoChoiceQuestion from "./questionTypes/TwoChoiceQuestion";
import DialQuestion from "./questionTypes/DialQuestion";
import MultiSelectQuestion from "./questionTypes/MultiSelectQuestion";

type Props = {
  q: DiagnosisQuestion;
  value: unknown;
  onChange: (value: unknown) => void;

  onCommit?: () => void;

  onCtaClick?: () => void;
};

export default function QuestionRenderer({
  q,
  value,
  onChange,
  onCommit,
  onCtaClick,
}: Props) {
  if (q.type === "two_choice") {
    return (
      <TwoChoiceQuestion
        options={q.options}
        value={value as string | undefined}
        onChange={(id: string) => {
          onChange(id);
          onCommit?.(); 
        }}
      />
    );
  }

  if (q.type === "dial") {
    const v = typeof value === "number" ? value : q.defaultValue ?? 0;

    return (
      <DialQuestion
        min={q.min}
        max={q.max}
        step={q.step ?? 1}
        value={v}
        unit={q.unit ?? "%"}
        label={q.labelByValue ? q.labelByValue(v) : ""}
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
        options={q.options}
        selectedIds={selected}
        maxSelect={q.maxSelect ?? 999}
        onChange={(nextSelected: string[]) => onChange(nextSelected)}
        theme={q.theme ?? "mint"}
        ctaText={q.ctaText}
        ctaDisabled={selected.length === 0}
        onCtaClick={onCtaClick}
      />
    );
  }

  return null;
}
