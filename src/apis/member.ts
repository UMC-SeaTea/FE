import { axiosInstance } from '../apis/axios';
import type {
  MemberProfileResponse,
  ChangeNicknameRequest,
  ChangeNicknameResponse,
  ChangeProfileImageRequest,
  ChangeProfileImageResponse,
  UploadImageResponse,
} from '../types/member';

export const getMemberProfile = async (): Promise<MemberProfileResponse> => {
  const { data } =
    await axiosInstance.get<MemberProfileResponse>('/api/users/profile');
  return data;
};

export const updateNickname = async (data: ChangeNicknameRequest) => {
  const response = await axiosInstance.patch<ChangeNicknameResponse>(
    '/api/users/me/change/nickname',
    data
  );
  return response.data;
};

export const uploadProfileImageFile = async (formData: FormData) => {
  const response = await axiosInstance.post<UploadImageResponse>(
    '/api/upload/profile/image',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return response.data;
};

export const updateProfileImageUrl = async (
  data: ChangeProfileImageRequest
) => {
  const response = await axiosInstance.patch<ChangeProfileImageResponse>(
    '/api/users/me/change/profile/image',
    data
  );
  return response.data;
};
