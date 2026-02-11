import type { TastingKey } from "../../types/tastingType/tastingType";

export const WAVE_COLOR_BY_TYPE: Record<TastingKey, string> = {
  smoky: "#0D0D0D",
  oceanic: "#78C2FF",
  fruity: "#F198FF",
  floral: "#A98BFF",
  earthy: "#6ED4BD",
  sweet: "#FFD688",
  spices: "#FFC8CC",
  nutty: "#D0BBB4",
};

export function getWaveColor(type?: TastingKey) {
  return WAVE_COLOR_BY_TYPE[type ?? "floral"];
}
