import { useQuery } from '@tanstack/react-query';
import { getMemberProfile } from '../apis/member';

export const useMemberProfile = (memberId: number | null) => {
  return useQuery({
    queryKey: ['memberProfile', memberId],
    queryFn: () => getMemberProfile(memberId!),
    enabled: !!memberId,
  });
};
