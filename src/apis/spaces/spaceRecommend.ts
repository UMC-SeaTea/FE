import type { SpaceRecommendResponse } from '../../types/spaces/spaceRecommend';
import { axiosInstance } from '../axios';

export const getSpaceRecommend = async (params: {
  tastingTypeCode: string;
}): Promise<SpaceRecommendResponse> => {
  const res = await axiosInstance.get<SpaceRecommendResponse>(
    '/api/spaces/recommend',
    { params }
  );
  return res.data;
};
