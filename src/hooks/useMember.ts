import { useQuery } from '@tanstack/react-query';
import { getMemberProfile } from '../apis/member';
import { LOCAL_STORAGE_KEYS } from '../constants/key';

export const useMemberProfile = () => {
  const hasToken = !!localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken);

  return useQuery({
    queryKey: ['memberProfile'],
    queryFn: getMemberProfile,
    enabled: hasToken,
  });
};
