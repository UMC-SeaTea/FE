import type { CommonResponse } from '../common';
import type { CursorInfo, SpaceItem } from './spaceItem';

export type SpaceListResponse = CommonResponse<{
  items: SpaceItem[];
  cursorInfo: CursorInfo;
}>;
