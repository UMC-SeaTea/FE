// src/components/Diagnosis/QuestionRenderer.tsx
import type { DiagnosisQuestion } from "./questions/types";
import TwoChoiceQuestion from "./questionTypes/TwoChoiceQuestion";
import DialQuestion from "./questionTypes/DialQuestion";
import MultiSelectQuestion from "./questionTypes/MultiSelectQuestion";

type Props = {
  q: DiagnosisQuestion;
  value: unknown;
  onChange: (value: unknown) => void;

  // ✅ Dial에서 "손 뗐을 때" 호출 (자동 다음 넘김용)
  onCommit?: () => void;

  // ✅ 마지막 multi_select에서 "결과 확인하기" 클릭 처리
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
        onChange={(id: string) => onChange(id)}
      />
    );
  }

  if (q.type === "dial") {
    const v = typeof value === "number" ? value : q.defaultValue ?? 75;

    return (
      <DialQuestion
        min={q.min}
        max={q.max}
        step={q.step ?? 1}
        value={v}
        unit={q.unit ?? "%"}
        label={q.labelByValue ? q.labelByValue(v) : ""}
        onChange={(next: number) => onChange(next)}
        onCommit={onCommit} // ✅ 여기로 전달
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
        // ✅ 다중선택 가능: q.maxSelect가 있으면 그 값, 없으면 제한 크게
        maxSelect={q.maxSelect ?? 999}
        onChange={(nextSelected: string[]) => onChange(nextSelected)}
        ctaText={q.ctaText}
        ctaDisabled={selected.length === 0}
        onCtaClick={onCtaClick} // ✅ 여기로 전달
      />
    );
  }

  return null;
}
