import type { SpaceDetailResponse } from '../../types/spaces/spaceDetail';
import { axiosInstance } from '../axios';

export const getSpaceDetail = async (
  spaceId: number
): Promise<SpaceDetailResponse> => {
  const res = await axiosInstance.get<SpaceDetailResponse>(
    `/space/v1/spaces/${spaceId}`
  );
  return res.data;
};
