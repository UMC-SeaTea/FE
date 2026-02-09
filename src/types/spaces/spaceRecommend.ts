import type { CommonResponse } from '../common';
import type { CursorInfo } from './spaceItem';
import type { SpaceList } from './spaceList';

export type SpaceRecommend = SpaceList & {
  description: string;
};

export type SpaceRecommendResponse = CommonResponse<{
  items: SpaceRecommend[] | null;
  cursorInfo: CursorInfo;
}>;
