import { axiosInstance } from './axios';
import type { MemberProfileResponse } from '../types/member';

export const getMemberProfile = async (): Promise<MemberProfileResponse> => {
  const { data } =
    await axiosInstance.get<MemberProfileResponse>('/api/users/profile');
  return data;
};
