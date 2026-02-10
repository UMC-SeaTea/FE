import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login, getMyInfo } from '../../apis/auth/auth';
import type { LoginRequest } from '../../types/auth/auth';
import { AxiosError } from 'axios';

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => login(data),

    onSuccess: (response) => {
      if (response.isSuccess) {
        alert(response.message || '로그인에 성공했습니다!');
        navigate('/', { replace: true });
      } else {
        alert(response.message || '로그인에 실패했습니다.');
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message =
        error.response?.data?.message || '이메일 또는 비밀번호를 확인해주세요.';
      alert(message);
    },
  });

  const { data: userInfo, isLoading: isUserLoading } = useQuery({
    queryKey: ['user', 'me'],
    queryFn: getMyInfo,
    retry: false,
  });

  const logout = () => {
    queryClient.removeQueries({ queryKey: ['user'] });
    queryClient.clear();
    navigate('/login/start');
  };

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    user: userInfo?.result,
    isUserLoading,
    logout,
  };
};
