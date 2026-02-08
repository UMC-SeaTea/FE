export type SpaceItem = {
  spaceId: number;
  name: string;
  tastingTypeCode: string;
  lat: number;
  lng: number;
  thumbnailImageUrl?: string;
  distanceMeters: number;
  address?: string;
  roadAddress?: string;
  phone?: string;
  openingHours?: string;
  description?: string;
  note?: boolean;
  savedCount?: number;
  sameTypeSavedCount?: number;
  isSaved?: boolean;
};

export type CursorInfo = {
  nextCursor: string | null;
  hasNext: boolean;
};
