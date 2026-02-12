import type {
  MyTeabagListResponse,
  MyTeaBagResponse,
} from '../../types/myTeabag';
import { axiosInstance } from '../axios';

export const postMyTeabag = async (spaceId: number) => {
  const { data } = await axiosInstance.post<MyTeaBagResponse>(
    `/api/spaces/${spaceId}/teabag`
  );
  return data;
};

export const getMyTeabagList = async (
  size: number = 20,
  cursor?: string | null
) => {
  const params: { size: number; cursor?: string } = { size };

  if (cursor) {
    params.cursor = cursor;
  }

  const { data } = await axiosInstance.get<MyTeabagListResponse>(
    '/api/spaces/teabag',
    {
      params,
    }
  );
  return data;
};

export const deleteMyTeabag = async (spaceId: number) => {
  const { data } = await axiosInstance.delete<MyTeaBagResponse>(
    `/api/spaces/${spaceId}/teabag`
  );
  return data;
};
