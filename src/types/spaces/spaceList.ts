import type { CommonResponse } from '../common';
import type { CursorInfo, SpaceItem } from './spaceItem';

export type SpaceListResponse = CommonResponse<{
  items: SpaceItem[] | null;
  cursorInfo: CursorInfo;
}>;

export type SpaceListParams = {
  lat?: number;
  lng?: number;
  q?: string;
  size?: number;
  cursor?: string;
};
