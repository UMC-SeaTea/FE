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

export interface ChangeNicknameRequest {
  newNickname: string;
}

export interface ChangeNicknameResult {
  id: number;
  nickname: string;
  updatedAt: string;
}

export interface ChangeProfileImageRequest {
  profileImageUrl: string;
}

export interface ChangeProfileImageResult {
  id: number;
  profileImageUrl: string;
  updatedAt: string;
}

export type MemberProfileResponse = CommonResponse<MemberProfileResult>;
export type ChangeNicknameResponse = CommonResponse<ChangeNicknameResult>;
export type ChangeProfileImageResponse =
  CommonResponse<ChangeProfileImageResult>;
export type UploadImageResponse = CommonResponse<string>;
