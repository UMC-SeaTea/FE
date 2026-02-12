import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LOCAL_STORAGE_KEYS } from '../constants/key';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const OAuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const isNewUser = searchParams.get('isNewUser') === 'true';

    const rawNickname = searchParams.get('nickname');
    const rawProfileImg = searchParams.get('profileImage');

    const kakaoNickname =
      rawNickname && rawNickname !== 'null'
        ? decodeURIComponent(rawNickname)
        : '';
    const kakaoProfileImg =
      rawProfileImg && rawProfileImg !== 'null'
        ? decodeURIComponent(rawProfileImg)
        : '';

    if (accessToken) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.accessToken, accessToken);

      if (isNewUser) {
        navigate('/signup', {
          replace: true,
          state: {
            step: 2,
            isSocial: true,
            socialData: {
              nickname: kakaoNickname,
              profileImage: kakaoProfileImg,
            },
          },
        });
      } else {
        navigate('/', { replace: true });
      }
    } else {
      console.error('소셜 로그인 실패: 토큰이 없습니다.');
      alert('로그인 처리에 실패했습니다. 다시 시도해주세요.');
      navigate('/login/start', { replace: true });
    }
  }, [searchParams, navigate]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-white">
      <LoadingSpinner />
      <div className="mt-8 font-body text-body-2 text-gray-200">
        로그인 처리 중입니다...
      </div>
    </div>
  );
};

export default OAuthCallbackPage;
