// import { useParams } from 'react-router-dom';
import NavBar from '../../components/common/NavBar';
import backIcon from '../../assets/backButton_black.svg';
import NoteSearch from '../../components/common/NoteSearch';
import SampleImg from '../../assets/images/exampleSpace.png';
import placeIcon from '../../assets/place_gray.svg';
import timeIcon from '../../assets/timeIcon.svg';
import phoneIcon from '../../assets/phoneIcon.svg';
import shareButton from '../../assets/RoundButton/share_btn.svg';
import { useNavigate } from 'react-router-dom';
// import teaBag from '../../assets/teaBag.svg';

const MapDetailPage = () => {
  //   const { sid } = useParams<{ sid: string }>();
  const handleShare = async () => {
    try {
      await navigator.share({
        title: '국립현대미술관 서울',
        url: window.location.href,
      });
    } catch (error) {
      console.error('링크 공유 실패', error);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <NavBar
        variant="3"
        icon={backIcon}
        onClick={() => {
          navigate(-1);
        }}
      />
      <div className="px-[20px]">
        <div className="flex flex-col gap-[12px] pt-[42px] pb-[23px]">
          <div className="flex items-start justify-between">
            <p className="text-black font-body text-[20px] font-semibold">
              국립현대미술관 서울
            </p>
            {/* 유저토큰 있는 경우에만 */}
            {/* (accessToken && (
            <img src={teaBag} alt="tea bag" className="w-[28px] h-[28px]" />
            )) */}
          </div>
          <NoteSearch text="Floral" />
        </div>
        {/* 이미지 */}
        <div className="relative w-[335px] h-[335px] overflow-hidden">
          <img
            src={SampleImg}
            alt="Example Space"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* 그라데이션 */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_55.8%,#000_92.93%)]" />
          {/* 하단 텍스트 */}
          <div className="absolute bottom-0 left-0 text-white px-[15px] py-[16px] font-body text-[14px]">
            <div className="flex flex-col gap-[4px]">
              <div className="flex text-[#FBFBFB] font-regular">
                <div className="flex gap-[4px]">
                  <p>총</p>
                  <p className="text-white">42명</p>
                </div>
                <p>의 SeaTea 사용자가 저장했어요.</p>
              </div>
              <div className="flex gap-[4px] font-medium">
                <p>나와 동일한 유형</p>
                <p className=" text-[#B4ABFF] font-bold">18명</p>
              </div>
              {/* 유저토큰 X의 경우 */}
              {/* (accessToken &&{' '}
            {
              <p className="text-gray-300 text-detail-4 font-body whitespace-nowrap">
                로그인하면 나와 같은 사용자가 얼마나 저장했는지 확인할 수
                있어요.
              </p>
            }
            ) */}
            </div>
          </div>
        </div>
        <div className="h-[8px]" />
        {/* 하단 장소 정보 */}
        <div className="w-[335px] rounded-md border border-gray-400">
          <div className="px-[16px] py-[24px] font-body text-detail-1 flex flex-col gap-[16px] text-[#444]">
            {/* 장소 */}
            <div className="flex items-start gap-[4px]">
              <img
                src={placeIcon}
                alt="place icon"
                className="w-[20px] h-[20px]"
              />
              <div className="flex flex-col gap-[4px]">
                <p className="text-body-4">서울특별시 종로구 삼청로 30</p>
                <div className="flex gap-[4px]">
                  <p className="text-gray-100">내 위치에서</p>
                  <p className="text-brand">1.2km</p>
                </div>
              </div>
            </div>
            {/* 영업 시간 */}
            <div className="flex items-center gap-[4px]">
              <img
                src={timeIcon}
                alt="time icon"
                className="w-[20px] h-[20px]"
              />
              <p className="">오전 10:00 ~ 오후 6:00</p>
            </div>
            {/* 전화 번호 */}
            <div className="flex items-center gap-[4px]">
              <img
                src={phoneIcon}
                alt="phone icon"
                className="w-[20px] h-[20px]"
              />
              <p>02-3701-9500</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleShare}
          className="fixed bottom-[58px] right-[20px] w-[52px] h-[52px] z-50 cursor-pointer"
        >
          <img src={shareButton} alt="share button" className="" />
        </button>
      </div>
    </>
  );
};

export default MapDetailPage;
