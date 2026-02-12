import { useQuery } from '@tanstack/react-query';
import type {
  SpaceRecentResponse,
  SpaceRecentParams,
} from '../../types/spaces/spaceRecent';
import { getSpaceRecent } from '../../apis/spaces/spaceRecent';

export const useSpaceRecent = (params: SpaceRecentParams) => {
  return useQuery<SpaceRecentResponse>({
    queryKey: ['spaceRecent', params],
    queryFn: () => getSpaceRecent(params),
    staleTime: 0,
    refetchOnMount: 'always',
  });
};
