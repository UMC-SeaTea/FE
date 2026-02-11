import { useMutation } from '@tanstack/react-query';
import type { MyTeaBagResponse } from '../../types/myTeabag';
import type { SpaceDetailResponse } from '../../types/spaces/spaceDetail';
import { deleteMyTeabag, postMyTeabag } from '../../apis/teabag/myTeabag';
import { queryClient } from '../../lib/QueryClient';

const spaceDetailKey = (spaceId: number) => ['spaceDetail', spaceId] as const;

const setSavedInCache = (spaceId: number, nextSaved: boolean) => {
  queryClient.setQueryData<SpaceDetailResponse>(
    spaceDetailKey(spaceId),
    (old) => {
      if (!old?.result) return old;

      const prevSaved = Boolean(old.result.isSaved);
      if (prevSaved === nextSaved) return old;

      return {
        ...old,
        result: {
          ...old.result,
          isSaved: nextSaved,
          savedCount: nextSaved
            ? (old.result.savedCount ?? 0) + 1
            : Math.max((old.result.savedCount ?? 0) - 1, 0),
        },
      };
    }
  );
};

const createMyTeabagMutation = (
  mutationFn: (spaceId: number) => Promise<MyTeaBagResponse>,
  optimisticSavedValue: boolean
) => {
  return useMutation<
    MyTeaBagResponse,
    Error,
    number,
    { prev?: SpaceDetailResponse; key: ReturnType<typeof spaceDetailKey> }
  >({
    mutationFn,
    onMutate: async (spaceId) => {
      const key = spaceDetailKey(spaceId);
      await queryClient.cancelQueries({ queryKey: key });
      const prev = queryClient.getQueryData<SpaceDetailResponse>(key);
      setSavedInCache(spaceId, optimisticSavedValue);
      return { prev, key };
    },
    onError: (_err, _spaceId, ctx) => {
      if (ctx?.prev && ctx?.key) queryClient.setQueryData(ctx.key, ctx.prev);
    },
    onSettled: (_data, _err, spaceId) => {
      queryClient.invalidateQueries({ queryKey: spaceDetailKey(spaceId) });
    },
  });
};

export const usePostMyTeabag = () => createMyTeabagMutation(postMyTeabag, true);
export const useDeleteMyTeabag = () =>
  createMyTeabagMutation(deleteMyTeabag, false);
