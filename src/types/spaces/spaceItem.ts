export type SpaceBase = {
  spaceId: number;
  name: string;
  tastingTypeCode: string;
  lat: number;
  lng: number;
};

export type CursorInfo = {
  nextCursor: string | null;
  hasNext: boolean;
};
