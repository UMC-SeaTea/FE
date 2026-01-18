import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backMoveButton from "../../assets/backMoveButton.svg"
import kakaoLoginButton from "../../assets/kakao_login.svg"
import passwordOnButton from "../../assets/passwordOnButton.svg"
import passwordOffButton from "../../assets/passwordOffButton.svg"

const LoginPage = () => {
const navigate = useNavigate();


const [emailAdress, setEmailAdress] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false);

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isFormValid = emailRegex.test(emailAdress) && password.length >= 8;

return (
<>
  <div className="w-full min-h-screen flex flex-col">

    <div className="flex justify-start mt-[87px] gap-[122px] w-[331px] h-[30px] ml-[22px] items-center">
      <img src={backMoveButton} alt="back move button" className=" w-[10px] h-5 cursor-pointer"
      onClick={() => navigate('/loginstart', { replace: true })} />
      <div className="text-center font-title text-title-3 text-brand">로그인</div>
    </div>

    <div className="flex flex-col items-start w-[335px] gap-[22px] justify-center mt-[43px] mx-auto">
      
      <div className="items-start self-stretch flex flex-col gap-[8px] w-full">
        <div className="text-footer font-body text-body-2 ">이메일</div>
        <div className="flex items-center w-full h-[50px] gap-2.5 px-[17px] rounded-[25px] border border-gray-200 bg-white shadow-[0_0_9.9px_0_rgba(141,141,141,0.24)]">
          <input type="email" value={emailAdress} onChange={(e) => setEmailAdress(e.target.value)} placeholder="example@gmail.com"
          className="w-full bg-transparent outline-none font-body text-body-5 text-black-2 placeholder:text-gray-200"/>
        </div>
      </div>

      <div className="items-start self-stretch flex flex-col gap-[8px] w-full">
        <div className="text-footer font-body text-body-2 ">비밀번호</div>
        <div className="flex items-center w-full h-[50px] gap-2.5 px-[17px] rounded-[25px] border border-gray-200 bg-white shadow-[0_0_9.9px_0_rgba(141,141,141,0.24)] ">
          <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder=''
          className="
          w-full bg-transparent outline-none font-body tracking-wider text-body-5 text-black-2"/>
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="w-[30px] h-[30px] flex justify-center items-center shrink-0">
            <img src={showPassword ? passwordOnButton : passwordOffButton} alt="password visibility" className='w-[24px] h-[42px] object-contain'/>
          </button>
        </div>
      </div>

    </div>

    <button disabled={!isFormValid} className={`
      flex flex-col justify-center items-center self-stretch mx-auto w-[335px] h-[50px] mt-[32px] rounded-[25px]
      font-body text-body-title shrink-0 transition-colors
      ${isFormValid ? 'bg-brand text-white' : 'bg-gray-400 text-gray-200'}`}>
        로그인
    </button>


    <div className="flex mt-[9px] w-[75px] h-[21px] text-gray-300 font-body text-body-5 mx-auto">
      비밀번호 찾기
    </div>

    <img src={kakaoLoginButton} alt="kakao login button" className="w-[41px] h-[41px] mt-[22px] cursor-pointer mx-auto"/>
    
    <div className="mt-[12px] w-[110px] h-[21px] font-body text-body-3 text-gray-200 text-center mx-auto ">
    카카오톡으로 로그인</div>
  </div>
</>
  );
};

export default LoginPage;