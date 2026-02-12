//src/types/tastingType/tastingType.ts
export const TASTING_KEYS = [
  'floral',
  'nutty',
  'sweet',
  'spices',
  'smoky',
  'fruity',
  'oceanic',
  'earthy',
] as const;

export type TastingKey = (typeof TASTING_KEYS)[number];

export function isTastingKey(v: unknown): v is TastingKey {
  return (
    typeof v === 'string' && (TASTING_KEYS as readonly string[]).includes(v)
  );
}

export function toTastingKey(code?: string | null): TastingKey {
  const normalized = typeof code === 'string' ? code.toLowerCase() : undefined;
  return isTastingKey(normalized) ? normalized : 'floral';
}

export type TastingType = {
  type: TastingKey;
  description: string;
  shortDescript: string;
  copyPhrase: string;
};
