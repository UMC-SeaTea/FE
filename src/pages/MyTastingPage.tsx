import NavBar from '../components/common/NavBar';
import menuIcon from '../assets/menu_black.svg';
import HomeTestType from '../components/common/HomeTestType';
import PastResult from '../components/common/PastResult';
import Footer from '../components/common/Footer';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useState } from 'react';
import TastingNote from '../components/common/TastingNote';
import PlaceTestCard from '../components/PlaceTest/PlaceTestCard';

const MyTastingPage = () => {
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  return (
    <>
      <div className="h-[44px]" />
      <NavBar variant="5" text="휴식 유형" icon={menuIcon} />
      <div className="pt-[50px] flex flex-col gap-[12px]">
        <div className="flex items-center gap-[4px]">
          <p className="pl-[20px] font-body text-body-title text-black">
            나의 테이스팅 노트
          </p>
          <button
            className="cursor-pointer"
            onClick={() => setIsOpenInfo((prev) => !prev)}
          >
            <AiOutlineQuestionCircle className="w-[15px] h-[15px] m-[1.5px] text-gray-300" />
          </button>
        </div>
        <div>
          <div className="border-t text-black" />
          <HomeTestType variant="recommend" type="smoky" />
        </div>
      </div>

      <div className="flex flex-col pt-[42px] px-[20px] gap-[42px] pb-[37px]">
        {isOpenInfo && <TastingNote />}
        {/* 새로 진단하기 */}
        <div>
          <p className="pb-[24px] text-body-title font-body text-black">
            새로 진단하기
          </p>
          <div className="flex flex-col gap-[8px]">
            <PlaceTestCard
              badgeText="정확도 UP"
              badgeBg="bg-brand"
              badgeTextColor="text-white"
              title="휴식 유형 상세 진단"
              durationText="약 1-2분 소요"
            />
            <PlaceTestCard
              badgeText="지금 바로"
              badgeBg="bg-[#DADEFF]"
              badgeTextColor="text-brand"
              title="휴식 유형 간단 진단"
              durationText="10초 완성!"
            />
          </div>
        </div>
        {/* 과거 진단내역 */}
        <div className="flex flex-col gap-[20px]">
          <p className="font-body text-body-title text-black">과거 진단내역</p>
          <div className="flex flex-col gap-[8px]">
            <PastResult type="Floral" date="2025.10.09" />
            <PastResult type="Nutty" date="2025.09.09" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyTastingPage;
