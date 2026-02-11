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

export interface LoginResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    id: number;
    email: string;
    role: string;
    profile_image: string | null;
    accessToken: string;
    refreshToken: string;
  };
}
