import type { CommonResponse } from '../common';
import type { SpaceList } from './spaceList';

export type SpaceDetail = SpaceList & {
  roadAddress: string;
  phone: string;
  openingHours: string;
  description: string;
  note: string;
  savedCount: number;
  sameTypeSavedCount: number;
  isSaved: boolean;
};

export type SpaceDetailResponse = CommonResponse<SpaceDetail>;
