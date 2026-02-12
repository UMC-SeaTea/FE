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

export type TastingType = {
  type: TastingKey;
  description: string;
  shortDescript: string;
  copyPhrase: string;
};
