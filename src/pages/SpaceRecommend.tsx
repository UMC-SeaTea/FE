import NavBar from '../components/common/NavBar';
import backIcon from '../assets/backButton_white.svg';
import HomeTestType from '../components/common/HomeTestType';
import tea from '../assets/images/teaIcon.png';
import refresh from '../assets/refresh.svg';
import PlaceList from '../components/common/PlaceList';
import FeedbackGoodButton from '../components/common/Feedback/FeedbackGoodButton';
import FeedbackBadButton from '../components/common/Feedback/FeedbackBadutton';

const SpaceRecommend = () => {
  return (
    <>
      <div className="flex flex-col gap-[42px]">
        <NavBar variant="4" text="공간 추천" icon={backIcon} />
        <HomeTestType
          type="smoky"
          title="smoky"
          description="고요하고 차분한 분위기에서 방해받지 않고, 온전히 혼자만의 시간을 즐겨요"
        />
        <div className="flex flex-col gap-[19px] pl-[20px]">
          {/* 텍스트 + refresh아이콘 */}
          <div className="w-[335px] flex items-center justify-between">
            <div className="flex items-center gap-[6px]">
              <p className="font-body text-body-title text-black">
                OO님의 취향저격 예상!
              </p>
              <img src={tea} alt="tea icon" className="w-[22px] h-[22px]" />
            </div>
            <img
              src={refresh}
              alt="refresh icon"
              className="w-[28px] h-[28px] cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-2 pb-[32px]">
            <PlaceList />
            <PlaceList />
            <PlaceList />
          </div>
        </div>
        <div
          className="w-[375px] h-[187px] bg-[#F6F6F6] 
        pt-[34px] pb-[55px] pl-[50px] pr-[49px]"
        >
          <div className="flex flex-col gap-[16px]">
            {/* 텍스트 부분 */}
            <div className="flex flex-col text-center gap-[4px]">
              <p className="font-body text-body-1 text-[#414045]">
                SeaTea의 추천은 어떠셨나요?
              </p>
              <p className="font-body text-detail-4 text-gray-100">
                평가를 남겨주시면 SeaTea가 더 좋은 휴식을 우려올게요
              </p>
            </div>
            {/* 정확/정확X 버튼 */}
            <div className="flex gap-[8px]">
              <FeedbackGoodButton label="정확해요" />
              <FeedbackBadButton label="정확하지 않아요" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpaceRecommend;
