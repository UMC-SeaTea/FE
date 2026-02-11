import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMemberProfile,
  updateNickname,
  uploadProfileImageFile,
  updateProfileImageUrl,
} from '../apis/member';
import { LOCAL_STORAGE_KEYS } from '../constants/key';
import type { MemberProfileResponse } from '../types/member';

export const useMemberProfile = () => {
  const hasToken = !!localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken);

  return useQuery({
    queryKey: ['memberProfile'],
    queryFn: getMemberProfile,
    enabled: hasToken,
    staleTime: 1000 * 30,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const nicknameMutation = useMutation({
    mutationFn: updateNickname,
    onSuccess: (data) => {
      queryClient.setQueryData<MemberProfileResponse>(
        ['memberProfile'],
        (oldData) => {
          if (!oldData || !oldData.result) return oldData;
          return {
            ...oldData,
            result: {
              ...oldData.result,
              nickname: data.result?.nickname || oldData.result.nickname,
            },
          };
        }
      );
    },
  });

  const imageMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const uploadRes = await uploadProfileImageFile(formData);

      if (!uploadRes.isSuccess || !uploadRes.result) {
        throw new Error('이미지 업로드 실패');
      }

      const imageUrl = uploadRes.result;
      return await updateProfileImageUrl({ profileImageUrl: imageUrl });
    },
    onSuccess: (data) => {
      queryClient.setQueryData<MemberProfileResponse>(
        ['memberProfile'],
        (oldData) => {
          if (!oldData || !oldData.result) return oldData;

          return {
            ...oldData,
            result: {
              ...oldData.result,
              profileImageUrl:
                data.result?.profileImageUrl || oldData.result.profileImageUrl,
            },
          };
        }
      );
    },
  });

  return {
    updateNickname: nicknameMutation.mutateAsync,
    updateImage: imageMutation.mutateAsync,
    isPending: nicknameMutation.isPending || imageMutation.isPending,
  };
};
