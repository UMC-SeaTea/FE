import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { LOCAL_STORAGE_KEYS } from '../constants/key';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const axiosInstance = axios.create({
 baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const refreshInstance = (refresh: string): AxiosInstance =>
  axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      refreshToken: refresh,
    },
  });

// 토큰 오류시 토큰 제거 후 로그인 페이지로 리다이렉트 로직
const handleTokenError = (error: any) => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.accessToken);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.refreshToken);
  window.location.href = '/login/start';
  return Promise.reject(error);
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // localStorage에서 accessToken을 가져와 요청 헤더에 추가
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
// axiosInstance의 response를 가로채어 401 에러 발생 시 refresh 토큰으로 accessToken을 재발급.
axiosInstance.interceptors.response.use(
  (response) => response, // 성공 시 응답 반환
  async (error) => {
    const status = error.response?.status;
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    if (!status) {
      console.error('Request failed without a status', error);
      return Promise.reject(error);
    }

    // 401 에러면서, 아직 재시도 하지 않은 요청 경우 처리
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem(
        LOCAL_STORAGE_KEYS.refreshToken
      );

      // refreshToken이 없으면 로그인 페이지로 이동
      if (!refreshToken) {
        return handleTokenError(error);
      }

      // refreshToken으로 새 accessToken 발급
      try {
        const { data } =
          await refreshInstance(refreshToken).post('/api/auth/reissue');

        // 새 토큰 반환
        const newAccessToken = data?.result?.accessToken;
        const newRefreshToken = data?.result?.refreshToken;

        if (!newAccessToken || !newRefreshToken)
          throw new Error('토큰 재발급 실패');
        localStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, newAccessToken);
        localStorage.setItem(LOCAL_STORAGE_KEYS.refreshToken, newRefreshToken);

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        // 에러 발생 시 로그인 페이지로 이동
        return handleTokenError(error);
      }
    }

    // 403 에러, 접근 권한이 없는 경우
    if (status === 403) {
      alert('접근 권한이 없습니다. 관리자에게 문의하세요.');
      window.location.href = '/';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
