import { useNavigate } from 'react-router-dom';
import teatImg from '../../assets/images/tea.png';
import ButtonMedium from '../Button/ButtonMedium';

const SideBarTest = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-[335px] pt-[16px] pb-[12px] px-[12px] bg-[#efe9ff] rounded-md">
        <div className="flex flex-col gap-[8px]">
          <div className="w-full h-[60px] flex items-center gap-[24px] px-[8px]">
            {/* 텍스트 */}
            <div className="flex flex-col gap-[4px]">
              <p className="font-body text-body-1 text-black">
                마음의 상태가 바뀌었나요?
              </p>
              <p className="w-[212px] font-body text-detail-4 text-gray-100">
                가장 마지막으로 진단받은 날짜는 7일 전이에요
              </p>
            </div>
            {/* 티백 이미지 */}
            <img src={teatImg} alt="Tea" className="w-[60px] h-[60px]" />
          </div>
          <div>
            <ButtonMedium
              text="새로 진단해보기"
              onClick={() => navigate('/diagnosis')}
              className="w-[311px] h-[44px] text-body-4"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarTest;
