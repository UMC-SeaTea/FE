import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../components/common/FormInput';
import { useAuth } from '../../hooks/auth/useAuth';
import backMoveButton from '../../assets/backButton_brand.svg';
import kakaoLoginButton from '../../assets/kakao_login.svg';
import { handleKakaoLogin } from '../../hooks/auth/useKakaoLogin';

const LoginPage = () => {
  const navigate = useNavigate();

  const { login, isLoggingIn } = useAuth();

  const [emailAdress, setEmailAdress] = useState('');
  const [password, setPassword] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isFormValid = emailRegex.test(emailAdress) && password.length >= 8;

  const handleLoginClick = () => {
    if (!isFormValid) return;

    login({ email: emailAdress, password: password });
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="flex justify-start mt-[87px] gap-[122px] w-[331px] h-[30px] ml-[22px] items-center">
        <img
          src={backMoveButton}
          alt="back move button"
          className="w-[10px] h-5 cursor-pointer"
          onClick={() => navigate('/login/start', { replace: true })}
        />
        <div className="text-center font-title text-title-3 text-brand">
          로그인
        </div>
      </div>

      <div className="flex flex-col items-start w-[335px] gap-[22px] justify-center mt-[43px] mx-auto">
        <FormInput
          label="이메일"
          value={emailAdress}
          onChange={(e) => setEmailAdress(e.target.value)}
          placeholder="example@gmail.com"
          type="email"
        />

        <FormInput
          label="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isPassword={true}
        />
      </div>

      <button
        disabled={!isFormValid || isLoggingIn}
        onClick={handleLoginClick}
        className={`flex flex-col justify-center items-center self-stretch mx-auto w-[335px] h-[50px] mt-[32px] rounded-[25px] font-body text-body-title shrink-0 transition-colors ${
          isFormValid ? 'bg-brand text-white' : 'bg-gray-400 text-gray-200'
        }`}
      >
        {isLoggingIn ? '로그인 중...' : '로그인'}
      </button>

      <div className="flex mt-[9px] w-[75px] h-[21px] text-gray-300 font-body text-body-5 mx-auto cursor-pointer">
        비밀번호 찾기
      </div>

      <img
        src={kakaoLoginButton}
        onClick={handleKakaoLogin}
        alt="kakao login button"
        className="w-[41px] h-[41px] mt-[22px] cursor-pointer mx-auto"
      />

      <div
        onClick={handleKakaoLogin}
        className="mt-[12px] w-[110px] h-[21px] font-body text-body-3 text-gray-200 text-center mx-auto "
      >
        카카오톡으로 로그인
      </div>
    </div>
  );
};

export default LoginPage;
