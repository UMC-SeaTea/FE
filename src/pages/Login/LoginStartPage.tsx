import { useNavigate } from "react-router-dom"; 
import loginLogo from "../../assets/logo.svg"
import kakaoLogo from "../../assets/kakao_logo.svg"

const LoginStartPage = () => {
  const navigate = useNavigate();

  return(
    <>
    <div className="w-full min-h-screen flex flex-col justify-between pt-[113px] pb-[92px] px-[20px]"
    style={{ background: 'linear-gradient(180deg, #FFF 50%, #8097FF 100%)' }}>
        <div className="flex flex-col items-center gap-[4.89px]">
            <img src={loginLogo} alt="login logo" className="w-[198.109px] h-[198.109px] rounded-[25.157px]"/>
            <div className="whitespace-pre-wrap text-footer font-body text-body-title mt-[4px] text-center">
                가장 지친 날,{'\n'}가장 완벽한 쉼.</div>    
        </div>
        <div className="flex flex-col w-full gap-3">
            <div 
                onClick={() => navigate('/login')}
                className="flex justify-center items-center w-full h-[50px] pt-[12px] pb-[13px] bg-white rounded-[25px] cursor-pointer"
            >
                <div className="text-footer font-body text-body-title mt-[4px] text-center">로그인</div>
            </div>
            
            <div 
                className="flex justify-center items-center w-full h-[50px] pt-[12px] pb-[13px] bg-footer rounded-[25px] cursor-pointer"
            >
                <div className="text-white font-body text-body-title mt-[4px] text-center">회원가입</div>
            </div>
            <div className="flex justify-center items-center w-full h-[50px] pt-[12px] pb-[13px] bg-[#F4DD02] rounded-[25px] gap-[9px] cursor-pointer">
                    <img src={kakaoLogo} alt="kakao logo" className="w-[15px] h-[15px] mt-[4px]"/>
                    <div className="text-[#4A2219] font-body text-body-title mt-[4px]  text-center">카카오로 시작하기</div>  
            </div>
        </div>
    </div>
    </>
  )
};

export default LoginStartPage