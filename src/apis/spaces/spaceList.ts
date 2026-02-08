import type {
  SpaceListParams,
  SpaceListResponse,
} from '../../types/spaces/spaceList';
import { axiosInstance } from '../axios';

export const getSpaceList = async (
  params: SpaceListParams
): Promise<SpaceListResponse> => {
  const res = await axiosInstance.get<SpaceListResponse>('/api/v1/spaces', {
    params,
  });
  return res.data;
};
