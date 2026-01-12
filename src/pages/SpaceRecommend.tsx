import NavBar from '../components/common/NavBar';
import backIcon from '../assets/backButton_white.svg';
import HomeTestType from '../components/common/HomeTestType';
import tea from '../assets/images/teaIcon.png';
import refresh from '../assets/refresh.svg';
import PlaceList from '../components/common/PlaceList';

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
          <div className="flex flex-col gap-2">
            <PlaceList />
            <PlaceList />
            <PlaceList />
          </div>
        </div>
      </div>
    </>
  );
};

export default SpaceRecommend;
