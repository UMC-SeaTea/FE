import { axiosInstance } from './axios';

import type { MemberProfileResponse } from '../types/member';

export const getMemberProfile = async (
  memberId: number
): Promise<MemberProfileResponse> => {
  const { data } = await axiosInstance.get<MemberProfileResponse>(
    `/api/members/${memberId}`
  );
  return data;
};
