import { useQuery } from '@tanstack/react-query';
import type {
  SpaceListParams,
  SpaceListResponse,
} from '../../types/spaces/spaceList';
import { getSpaceList } from '../../apis/spaces/spaceList';

export const useSpaceList = (params: SpaceListParams) => {
  return useQuery<SpaceListResponse>({
    queryKey: ['spaces', params],
    queryFn: () => getSpaceList(params),
  });
};
