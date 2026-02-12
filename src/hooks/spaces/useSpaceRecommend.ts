import { useQuery } from '@tanstack/react-query';
import { type SpaceRecommendResponse } from '../../types/spaces/spaceRecommend';
import { getSpaceRecommend } from '../../apis/spaces/spaceRecommend';

export const useSpaceRecommend = (params: { tastingTypeCode: string }) => {
  return useQuery<SpaceRecommendResponse>({
    queryKey: ['spaceRecommend', params.tastingTypeCode],
    queryFn: () => getSpaceRecommend(params),
  });
};
