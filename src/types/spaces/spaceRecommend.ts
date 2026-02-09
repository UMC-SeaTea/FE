import type { CommonResponse } from '../common';
import type { CursorInfo, SpaceBase } from './spaceItem';

export type SpaceRecommend = SpaceBase & {
  thumbnailImageUrl: string;
  address: string;
  description: string;
  distanceMeters: number;
};

export type SpaceRecommendResponse = CommonResponse<{
  items: SpaceRecommend[] | null;
  cursorInfo: CursorInfo;
}>;
