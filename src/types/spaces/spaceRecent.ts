import type { CommonResponse } from '../common';
import type { CursorInfo } from './spaceItem';
import type { SpaceList } from './spaceList';

export type SpaceRecentResponse = CommonResponse<{
  items: SpaceList[];
  cursorInfo: CursorInfo;
}>;

export type SpaceRecentParams = {
  size?: number;
  cursor?: string;
};
