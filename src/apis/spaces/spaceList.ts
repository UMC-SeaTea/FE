import type { SpaceListResponse } from '../../types/spaces/spaceList';
import { axiosInstance } from '../axios';

export const getSpaceList = async (): Promise<SpaceListResponse> => {
  const res = await axiosInstance.get<SpaceListResponse>('/api/v1/spaces');
  return res.data;
};
