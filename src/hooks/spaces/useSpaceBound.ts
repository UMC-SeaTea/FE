import { useQuery } from '@tanstack/react-query';
import { getSpaceBound } from '../../apis/spaces/spaceBound';
import type {
  SpaceBoundParams,
  SpaceBoundResponse,
} from '../../types/spaces/spaceBound';

export const useSpaceBound = (params: SpaceBoundParams | null) => {
  return useQuery<SpaceBoundResponse>({
    queryKey: ['spaces', params],
    queryFn: () => getSpaceBound(params as SpaceBoundParams),
    enabled: !!params,
  });
};
