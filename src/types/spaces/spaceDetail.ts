import type { CommonResponse } from '../common';
import type { SpaceBase } from './spaceItem';

export type SpaceDetail = SpaceBase & {
  thumbnailImageUrl: string;
  address: string;
  roadAddress: string;
  phone: string;
  openingHours: string;
  description: string;
  note: string;
  distanceMeters: number;
  savedCount: number;
  sameTypeSavedCount: number;
  isSaved: boolean;
};

export type SpaceDetailResponse = CommonResponse<SpaceDetail>;
