import { useQuery } from '@tanstack/react-query';
import type { SpaceDetailResponse } from '../../types/spaces/spaceDetail';
import { getSpaceDetail } from '../../apis/spaces/spaceDetail';

export const useSpaceDetail = (spaceId: number) => {
  return useQuery<SpaceDetailResponse>({
    queryKey: ['spaceDetail', spaceId],
    queryFn: () => getSpaceDetail(spaceId),
  });
};
