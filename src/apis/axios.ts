import type { InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';
import { LOCAL_STORAGE_KEYS } from '../constants/key';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRedirecting = false;
let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

const isReissueRequest = (url?: string) =>
  !!url && url.includes('/api/users/reissue');

// 토큰 오류시 토큰 제거 후 로그인 페이지로 리다이렉트 로직
const handleTokenError = (error: any) => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.accessToken);
  if (!isRedirecting) {
    isRedirecting = true;
    window.location.href = '/login/start';
  }

  return Promise.reject(error);
};

// refresh 호출 -> 쿠키로 refreshToken 전송.
const reissueAccessToken = async () => {
  const res = await axiosInstance.post('/api/users/reissue');
  const result = res.data?.result ?? res.data;
  const newAccessToken = result?.accessToken;

  if (!newAccessToken) throw new Error('새로운 토큰을 받지 못했습니다.');
  return newAccessToken;
};

const getNewAccessToken = () => {
  if (!refreshPromise) {
    refreshPromise = reissueAccessToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (isReissueRequest(config.url)) {
      return config;
    }

    // localStorage에서 accessToken을 가져와 요청 헤더에 추가
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken);
    if (token) {
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

    // status 없는 경우 처리
    if (!status) {
      return handleTokenError(error);
    }

    if (originalRequest.url?.includes('/api/login')) {
      return Promise.reject(error);
    }

    if (status === 401 && isReissueRequest(originalRequest.url)) {
      return handleTokenError(error);
    }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await getNewAccessToken();
        localStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, newAccessToken);

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (reissueError) {
        return handleTokenError(reissueError);
      }
    }

    if (status === 403) {
      alert('접근 권한이 없습니다.');
      window.location.href = '/';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
