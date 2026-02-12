import type { CommonResponse } from '../common';
import type { SpaceList } from './spaceList';

export type SpaceRecentResponse = CommonResponse<SpaceList[]>;

export type SpaceRecentParams = {
  size?: number;
  cursor?: string;
};
