import type { TastingNote } from "../../../constants/diagnosis/types";

export type AnswerValue = string | number | string[];

export type AnswersMap = Record<string, AnswerValue | undefined>;

export type ScoreMap = Record<TastingNote, number>;

export const EMPTY_SCORES: ScoreMap = {
  smoky: 0,
  oceanic: 0,
  fruity: 0,
  floral: 0,
  earthy: 0,
  sweet: 0,
  spices: 0,
  nutty: 0,
};
