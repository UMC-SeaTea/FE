// import type { CommonResponse } from '../common';

// export type SpaceBoundResponse = CommonResponse<{
//   items: SpaceBase[];
// }>;

export type SpaceBoundParams = {
  southWestLat: number;
  southWestLng: number;
  northEastLat: number;
  northEastLng: number;
};
