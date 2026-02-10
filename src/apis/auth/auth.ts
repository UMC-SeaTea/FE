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
  const response = await axiosInstance.post('/api/login', null, {
    params: {
      email: data.email,
      password: data.password,
    },
  });
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

/*이미지 업로드 전용  API구현 시 연동 예정 */
export const uploadImage = async (formData: FormData) => {
  // 임시 URL
  const response = await axiosInstance.post<CommonResponse<string>>(
    '/api/uploadPfp',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return response.data;
};
