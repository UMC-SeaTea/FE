import { axiosInstance } from '../axios';

import type { CommonResponse } from '../../types/common';

import type {
  LoginRequest,
  SignUpRequest,
  SignUpResult,
  UserInfoResult,
} from '../../types/auth/auth';

export type SignUpResponse = CommonResponse<SignUpResult>;
export type UserInfoResponse = CommonResponse<UserInfoResult>;

export const login = async (data: LoginRequest) => {
  const response = await axiosInstance.post('/api/login', data);

  return response.data;
};

export const signUp = async (data: SignUpRequest) => {
  const response = await axiosInstance.post<SignUpResponse>(
    '/api/sign-up',
    data
  );
  return response.data;
};

export const getMyInfo = async () => {
  const response = await axiosInstance.get<UserInfoResponse>('/api/users/me');
  return response.data;
};

export const uploadProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post<CommonResponse<string>>(
    '/api/upload/profile/image',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const changeNickname = async (newNickname: string) => {
  const response = await axiosInstance.patch('/api/users/me/change/nickname', {
    newNickname,
  });
  return response.data;
};

export const checkEmailDuplicate = async (email: string) => {
  const response = await axiosInstance.get<CommonResponse<string>>(
    '/api/check/email',
    {
      params: { email },
    }
  );
  return response.data;
};

export const checkNicknameDuplicate = async (nickname: string) => {
  const response = await axiosInstance.get<CommonResponse<string>>(
    '/api/check/nickname',
    {
      params: { nickname },
    }
  );
  return response.data;
};
