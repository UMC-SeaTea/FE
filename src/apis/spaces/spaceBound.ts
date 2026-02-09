import type {
  SpaceBoundParams,
  SpaceBoundResponse,
} from '../../types/spaces/spaceBound';
import { axiosInstance } from '../axios';

export const getSpaceBound = async (
  params: SpaceBoundParams
): Promise<SpaceBoundResponse> => {
  const res = await axiosInstance.get<SpaceBoundResponse>(
    '/api/spaces/bounds',
    { params }
  );
  return res.data;
};
