import type { SpaceBoundResponse } from '../../types/spaces/spaceBound';
import { axiosInstance } from '../axios';

export const getSpaceBound = async (): Promise<SpaceBoundResponse> => {
  const res = await axiosInstance.get<SpaceBoundResponse>('/api/spaces/bounds');
  return res.data;
};
