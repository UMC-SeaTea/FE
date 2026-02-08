import type { CommonResponse } from '../common';
import type { CursorInfo } from './spaceItem';
import type { SpaceList } from './spaceList';

export type SpaceRecommendResponse = CommonResponse<{
  items: SpaceList[] | null;
  cursorInfo: CursorInfo;
}>;
