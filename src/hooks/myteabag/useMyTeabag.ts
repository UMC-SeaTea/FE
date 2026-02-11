import { useMutation } from '@tanstack/react-query';
import type { MyTeaBagResponse } from '../../types/myTeabag';
import { deleteMyTeabag, postMyTeabag } from '../../apis/teabag/myTeabag';

export const usePostMyTeabag = () => {
  return useMutation<MyTeaBagResponse, Error, number>({
    mutationFn: (spaceId: number) => postMyTeabag(spaceId),
  });
};

export const useDeleteMyTeabag = () => {
  return useMutation<MyTeaBagResponse, Error, number>({
    mutationFn: (spaceId: number) => deleteMyTeabag(spaceId),
  });
};
