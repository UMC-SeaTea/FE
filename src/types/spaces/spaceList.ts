import type { CommonResponse } from '../common';
import type { CursorInfo, SpaceBase } from './spaceItem';

export type SpaceList = SpaceBase & {
  thumbnailImageUrl: string;
  address: string;
  distanceMeters: number;
};

export type SpaceListResponse = CommonResponse<{
  items: SpaceList[] | null;
  cursorInfo: CursorInfo;
}>;

export type SpaceListParams = {
  lat?: number;
  lng?: number;
  q?: string;
  size?: number;
  cursor?: string;
};
