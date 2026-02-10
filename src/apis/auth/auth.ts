import { axiosInstance } from '../axios';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface CommonResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResult {
  id: number;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  profile_url: string;
}

export interface SignUpResult {
  id: number;
  createdAt: string;
}

export interface UserInfoResult {
  role: string;
  nickname: string;
  email: string;
}

export const login = async (data: LoginRequest) => {
  const response = await axiosInstance.post('/api/login', null, {
    params: {
      email: data.email,
      password: data.password,
    },
  });

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

export const signUp = async (data: SignUpRequest) => {
  const response = await axios.post<CommonResponse<SignUpResult>>(
    `${BASE_URL}/api/sign-up`,
    data
  );
  return response.data;
};

export const getMyInfo = async () => {
  const response =
    await axiosInstance.get<CommonResponse<UserInfoResult>>('/api/users/me');
  return response.data;
};
