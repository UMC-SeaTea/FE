export const handleKakaoLogin = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  if (!baseUrl) {
    console.error('API 주소(VITE_API_BASE_URL)가 설정되지 않았습니다!');
    alert('서버 연결 설정 오류입니다.');
    return;
  }

  window.location.href = `${baseUrl}/oauth2/authorization/kakao`;
};
