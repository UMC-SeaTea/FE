import type {
  DiagnosisQuestion,
  ScoreWeight,
  TastingNote,
} from "../../../constants/diagnosis/types";
import { EMPTY_SCORES, type AnswersMap, type ScoreMap } from "./types";

function addScore(scores: ScoreMap, scoreWeights: readonly ScoreWeight[]) {
  const next = { ...scores };
  for (const { type, weight } of scoreWeights) {
    next[type] += weight;
  }
  return next;
}

function calcScoresFromAnswers(
  questions: readonly DiagnosisQuestion[],
  answers: AnswersMap
): ScoreMap {
  let scores: ScoreMap = { ...EMPTY_SCORES };

  for (const q of questions) {
    const a = answers[q.id];
    if (a == null) continue;

    if (q.type === "two_choice") {
      const pickedId = String(a);
      const opt = q.options.find((o) => o.id === pickedId);
      if (opt) scores = addScore(scores, opt.score);
      continue;
    }

    if (q.type === "dial") {
      const v = typeof a === "number" ? a : Number(a);
      const range = q.dialScoreByRange.find((r) => v >= r.min && v <= r.max);
      if (range) scores = addScore(scores, range.score);
      continue;
    }

    if (q.type === "multi_select") {
      const pickedIds = Array.isArray(a) ? a : [String(a)];
      for (const id of pickedIds) {
        const opt = q.options.find((o) => o.id === id);
        if (opt) scores = addScore(scores, opt.score);
      }
      continue;
    }
  }

  return scores;
}

export function calcLeadingType(
  questions: readonly DiagnosisQuestion[],
  answers: AnswersMap
): TastingNote {
  const scores = calcScoresFromAnswers(questions, answers);


  let best: TastingNote = "floral";
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
