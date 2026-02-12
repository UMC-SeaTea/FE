import { TASTING_KEYS, type TastingKey } from "../types/tastingType/tastingType";

export const CODE_TO_TASTING_KEY = Object.fromEntries(
  TASTING_KEYS.map((k) => [k.toUpperCase(), k])
) as Record<string, TastingKey>;

export function toTastingKey(code?: string): TastingKey {
  if (!code) return "floral";
  return CODE_TO_TASTING_KEY[code.toUpperCase()] ?? "floral";
}
