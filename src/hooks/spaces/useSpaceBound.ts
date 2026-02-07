import { getSpaceBound } from '../../apis/spaces/spaceBound';
import type { SpaceBoundResponse } from '../../types/spaces/spaceBound';

export const useSpaceBound = () => {
  return useQuery<SpaceBoundResponse>({
    queryKey: ['spaces'],
    queryFn: () => getSpaceBound(),
  });
};
