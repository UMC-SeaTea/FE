//src/componenets/Diagnosis/score/calcLeadintTypeFromAnsers.ts
import type {
  DiagnosisQuestion,
  ScoreWeight,
  TastingNote,
} from "../../../constants/diagnosis/types";


type Answers = Record<string, unknown>;

type ScoreMap = Record<TastingNote, number>;

const EMPTY_SCORES: ScoreMap = {
  smoky: 0,
  oceanic: 0,
  fruity: 0,
  floral: 0,
  earthy: 0,
  sweet: 0,
  spices: 0,
  nutty: 0,
};

function addScore(scores: ScoreMap, score: readonly ScoreWeight[]) {
  const next = { ...scores };
  for (const { type, weight } of score) {
    next[type] += weight;
  }
  return next;
}

function normalizeString(v: unknown) {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

function normalizeNumber(v: unknown) {
  if (typeof v === "number") return v;
  if (v == null) return undefined;
  const n = Number(v);
  return Number.isNaN(n) ? undefined : n;
}

function normalizeStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String);
  if (typeof v === "string" && v.length > 0) return [v];
  return [];
}


export function calcLeadingTypeFromAnswers(
  questions: readonly DiagnosisQuestion[],
  answers: Answers,
  fallback: TastingNote = "floral"
): TastingNote {
  let scores: ScoreMap = { ...EMPTY_SCORES };

  for (const q of questions) {
    const raw = answers[q.id];
    if (raw == null) continue;

    if (q.type === "two_choice") {
      const pickedId = normalizeString(raw);
      if (!pickedId) continue;
      const opt = q.options.find((o) => o.id === pickedId);
      if (opt) scores = addScore(scores, opt.score);
      continue;
    }

    if (q.type === "dial") {
      const v = normalizeNumber(raw);
      if (typeof v !== "number") continue;
      const range = q.dialScoreByRange.find((r) => v >= r.min && v <= r.max);
      if (range) scores = addScore(scores, range.score);
      continue;
    }

    if (q.type === "multi_select") {
      const pickedIds = normalizeStringArray(raw);
      if (!pickedIds.length) continue;
      for (const id of pickedIds) {
        const opt = q.options.find((o) => o.id === id);
        if (opt) scores = addScore(scores, opt.score);
      }
      continue;
    }
  }


  let best: TastingNote = fallback;
  let bestScore = -Infinity;

  (Object.keys(scores) as TastingNote[]).forEach((t) => {
    const s = scores[t];
    if (s > bestScore) {
      bestScore = s;
      best = t;
    }
  });

  return best;
}
