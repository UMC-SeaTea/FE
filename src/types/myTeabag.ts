import type { CursorInfo } from '../types/spaces/spaceItem';
import type { SpaceList } from '../types/spaces/spaceList';
import type { CommonResponse } from './common';

export type MyTeabagItem = SpaceList;

export type MyTeabagListResponse = CommonResponse<{
  items: MyTeabagItem[];
  cursorInfo: CursorInfo;
}>;

export type MyTeaBagResponse = CommonResponse<{ saved: boolean }>;
