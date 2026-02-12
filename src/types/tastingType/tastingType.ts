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

export type TastingType = {
  type: TastingKey;
  description: string;
  shortDescript: string;
  copyPhrase: string;
};
