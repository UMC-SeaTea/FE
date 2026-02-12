import type { InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { LOCAL_STORAGE_KEYS } from '../constants/key';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const refreshInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
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
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig;
    const { status } = error.response || {};

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await refreshInstance.post('/api/auth/reissue');

        const result = response.data.result || response.data;
        const newAccessToken = result?.accessToken;

        if (!newAccessToken) {
          throw new Error('새로운 토큰을 받지 못했습니다.');
        }

        localStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (reissueError) {
        return handleTokenError(reissueError);
      }
    }

    if (status === 403) {
      alert('접근 권한이 없습니다.');
    }

    return Promise.reject(error);
  }
);
