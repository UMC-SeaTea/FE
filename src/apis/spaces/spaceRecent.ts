import type {
  SpaceRecentParams,
  SpaceRecentResponse,
} from '../../types/spaces/spaceRecent';
import { axiosInstance } from '../axios';

export const getSpaceRecent = async (
  params: SpaceRecentParams
): Promise<SpaceRecentResponse> => {
  const res = await axiosInstance.get<SpaceRecentResponse>(
    '/api/spaces/recent',
    { params }
  );
  return res.data;
};
