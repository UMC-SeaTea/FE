import type { CommonResponse } from '../types/common';

export interface MemberProfileResult {
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  role: string;
  savedSpaceCount: number;
  currentType: {
    id: number;
    code: string;
    displayName: string;
    subtitle: string;
    description: string;
    imageUrl: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export type MemberProfileResponse = CommonResponse<MemberProfileResult>;
