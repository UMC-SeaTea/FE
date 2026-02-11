import type { CursorInfo } from '../types/spaces/spaceItem';
import type { SpaceList } from '../types/spaces/spaceList';

export type MyTeabagItem = SpaceList;

export interface CommonResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export type MyTeabagResponse = CommonResponse<{
  items: MyTeabagItem[];
  cursorInfo: CursorInfo;
}>;

export type MyTeabagDeleteResponse = CommonResponse<{
  saved: boolean;
}>;
