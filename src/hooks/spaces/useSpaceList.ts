import { useQuery } from '@tanstack/react-query';
import type { SpaceListResponse } from '../../types/spaces/spaceList';
import { getSpaceList } from '../../apis/spaces/spaceList';

export const useSpaceList = () => {
  return useQuery<SpaceListResponse>({
    queryKey: [],
    queryFn: () => getSpaceList(),
  });
};
