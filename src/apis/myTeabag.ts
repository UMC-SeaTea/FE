import { axiosInstance } from './axios';
import type {
  MyTeabagResponse,
  MyTeabagDeleteResponse,
} from '../types/myTeabag';

export const getMyTeabagList = async (
  size: number = 20,
  cursor?: string | null
) => {
  const params: any = { size };

  if (cursor) {
    params.cursor = cursor;
  }

  const { data } = await axiosInstance.get<MyTeabagResponse>(
    '/api/spaces/teabag',
    {
      params,
    }
  );
  return data;
};

export const deleteMyTeabag = async (spaceId: number) => {
  const { data } = await axiosInstance.delete<MyTeabagDeleteResponse>(
    `/api/spaces/${spaceId}/teabag`
  );
  return data;
};
