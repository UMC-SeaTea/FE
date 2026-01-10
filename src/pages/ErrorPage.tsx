import { useNavigate } from 'react-router-dom';
import brokenPlate from '../assets/images/brokenPlate.png';
import ButtonMedium from '../components/Button/ButtonMedium';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-[#2F16FF] min-h-screen w-full text-center pt-[180px]">
        <div className="flex flex-col items-center justify-center">
          <p className="text-white font-title text-[100px] leading-[60px] tracking-[-12px] font-normal pb-[14px]">
            404
          </p>
          <p className="text-white font-body text-[16px] leading-[22px] font-normal pb-[46px]">
            존재하지 않는 페이지입니다.
          </p>
          <img
            src={brokenPlate}
            alt="Broken Plate"
            className="w-[84px] h-[50px]"
          />
          <div className="h-[350px]" />
          <ButtonMedium
            text="다른 휴식 찾으러 가기"
            onClick={() => navigate('/')}
          />
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
